import { NextRequest, NextResponse } from "next/server";
import { partnerEnquirySchema } from "@/lib/validation/partnerEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { PartnerEnquiry } from "@/models/PartnerEnquiry";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { recaptchaGuard } from "@/lib/utils/recaptcha";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendPartnerEnquiryEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`partner:${ip}`)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
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

  // 2. Schema Validation
  const parsed = partnerEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Bot Trap Check
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("KBPT") });
  }

  const referenceId = generateReferenceId("KBPT");

  // 3. MongoDB (Source of Truth)
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await PartnerEnquiry.create({
          referenceId,
      organisation: data.organisation,
      organisationType: data.organisationType,
      country: data.country,
      website: data.website || undefined,
      contactPerson: data.contactPerson,
      designation: data.designation,
      email: data.email,
      phone: data.phone,
      approximateMembership: data.approximateMembership,
      industryRepresented: data.industryRepresented,
      natureOfEnquiry: data.natureOfEnquiry,
      message: data.message,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("PartnerEnquiry save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't save your enquiry right now. Please try again in a moment." },
      { status: 503 },
    );
  }

  // 4. Same Google Sheet (Tab: "Partner Enquiries")
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
            referenceId,
        registerAs: "Partner Enquiry",
        name: data.contactPerson,
        company: data.organisation,
        designation: data.designation ?? "",
        country: data.country,
        city: "",
        email: data.email,
        phone: data.phone,
        type: data.organisationType,
        productInterest: data.industryRepresented ?? "",
        message: `${data.natureOfEnquiry}: ${data.message || ""}`.trim(),
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await PartnerEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await PartnerEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  // 5. Send Notification to BOTH Organisers (Futurex & ETSIPL) + User Acknowledgement
  if (isEmailConfigured()) {
    try {
      await sendPartnerEnquiryEmails({ ...data, referenceId });
      await PartnerEnquiry.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Partner enquiry email failed", err);
      await PartnerEnquiry.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}