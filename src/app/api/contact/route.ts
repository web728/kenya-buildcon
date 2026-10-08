import { NextRequest, NextResponse } from "next/server";
import { contactEnquirySchema } from "@/lib/validation/contactEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { ContactEnquiry } from "@/models/ContactEnquiry";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { recaptchaGuard } from "@/lib/utils/recaptcha";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendContactEnquiryEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`contact:${ip}`)) {
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

  const parsed = contactEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot & bot speed check
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("KBCN") });
  }

  const referenceId = generateReferenceId("KBCN");

  // Save to MongoDB
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await ContactEnquiry.create({
         referenceId,
      name: data.name,
      company: data.company,
      designation: data.designation,
      country: data.country,
      email: data.email,
      mobile: data.mobile,
      interest: data.interest,
      message: data.message,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("ContactEnquiry save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again in a moment." },
      { status: 503 }
    );
  }

  // 2. Google Sheets sync check
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
        referenceId,
        registerAs: "Contact Form",
        name: data.name,
        company: data.company,
        designation: data.designation ?? "",
        country: data.country,
        city: "",
        email: data.email,
        phone: data.mobile,
        type: data.interest,
        productInterest: "",
        message: data.message,
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await ContactEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await ContactEnquiry.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  // 3. Send Emails to BOTH organisers: Namit (Futurex) + Vijayanka (ETSIPL)
  if (isEmailConfigured()) {
    try {
      await sendContactEnquiryEmails({ ...data, referenceId });
      await ContactEnquiry.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Contact enquiry email failed", err);
      await ContactEnquiry.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId });
}