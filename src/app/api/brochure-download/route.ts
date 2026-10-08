import { NextRequest, NextResponse } from "next/server";
import { brochureDownloadSchema } from "@/lib/validation/brochureDownload";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { BrochureDownload } from "@/models/BrochureDownload";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { recaptchaGuard } from "@/lib/utils/recaptcha";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendBrochureDownloadEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

const BROCHURE_FILE_URL = "/downloads/Kenya-Buildcon-Expo-Brochure-2027.pdf";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`brochure:${ip}`)) {
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

  // 2. Form Schema Validation
  const parsed = brochureDownloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Bot Trap Check
  if (data.website_hp || (data.startedAt && Date.now() - data.startedAt < MIN_SUBMIT_MS)) {
    return NextResponse.json({ success: true, referenceId: generateReferenceId("BRCH") });
  }

  const referenceId = generateReferenceId("BRCH");

  // 3. Save to MongoDB
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await BrochureDownload.create({
         referenceId,
      name: data.name,
      company: data.company,
      country: data.country,
      email: data.email,
      mobile: data.mobile,
      utm: data.utm,
      landingPage: data.landingPage,
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("BrochureDownload save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't process your request right now. Please try again in a moment." },
      { status: 503 }
    );
  }

  // 4. Save to Same Google Sheet (Sheet Tab: "Brochure Downloads")
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
           referenceId,
        registerAs: "Brochure Download",
        name: data.name,
        company: data.company,
        designation: "",
        country: data.country,
        city: "",
        email: data.email,
        phone: data.mobile,
        type: "Brochure Download",
        productInterest: "",
        message: "",
        utmSource: data.utm?.source ?? "",
        utmMedium: data.utm?.medium ?? "",
        utmCampaign: data.utm?.campaign ?? "",
        landingPage: data.landingPage ?? "",
      });
      await BrochureDownload.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Sheets sync failed", err);
      await BrochureDownload.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

// 5. Send Notification Email
  if (isEmailConfigured()) {
    try {
      await sendBrochureDownloadEmails({
        ...data,
        referenceId,
      });
      await BrochureDownload.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Brochure download email notification failed", err);
      await BrochureDownload.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true, referenceId, fileUrl: BROCHURE_FILE_URL });
}