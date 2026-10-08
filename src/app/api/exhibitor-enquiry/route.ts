import { NextRequest, NextResponse } from "next/server";
import { exhibitorEnquirySchema } from "@/lib/validation/exhibitorEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { recaptchaGuard } from "@/lib/utils/recaptcha";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendExhibitorEnquiryEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`exhibitor:${ip}`)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // 1. Verify Google reCAPTCHA v2 (enforced when RECAPTCHA_SECRET_KEY is set)
  const recaptchaError = await recaptchaGuard(body, ip);
  if (recaptchaError) return recaptchaError;

  // 2. Validate incoming data
  const parsed = exhibitorEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot + speed check
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("KBEX") });
  }

  const referenceId = generateReferenceId("KBEX");

  // 3. Save to MongoDB
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await ExhibitorEnquiry.create({
          referenceId,
      companyName: data.companyName,
      country: data.country,
      city: data.city,
      website: data.website || undefined,
      companyType: data.companyType,
      firstName: data.firstName,
      lastName: data.lastName,
      designation: data.designation,
      email: data.email,
      mobile: data.mobile,
      productCategory: data.productCategory,
      productsServices: data.productsServices,
      preferredParticipation: data.preferredParticipation,
      requiredArea: data.requiredArea,
      existingBusinessInKenya: data.existingBusinessInKenya || undefined,
      lookingForDistributor: data.lookingForDistributor || undefined,
      message: data.message,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("ExhibitorEnquiry save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't save your enquiry right now. Please try again in a moment." },
      { status: 503 }
    );
  }

  // 4. Append to the operational Google Sheet
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
            referenceId,
        registerAs: "Exhibitor Enquiry",
        name: `${data.firstName} ${data.lastName}`,
        company: data.companyName,
        designation: data.designation,
        country: data.country,
        city: data.city ?? "",
        email: data.email,
        phone: data.mobile,
        type: data.companyType,
        productInterest: data.productCategory,
        message: data.productsServices,
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await ExhibitorEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  // 5. Notify the organiser inboxes (FORM_NOTIFICATION_EMAIL_1/2) + acknowledge the enquirer
  if (isEmailConfigured()) {
    try {
      await sendExhibitorEnquiryEmails({ ...data, referenceId });
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Exhibitor enquiry email failed", err);
      await ExhibitorEnquiry.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}