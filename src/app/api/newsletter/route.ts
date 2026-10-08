import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendNewsletterSubscriptionEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { recaptchaGuard } from "@/lib/utils/recaptcha";

const NewsletterSchema = z.object({
  email: z.string().trim().email().max(200),
  website: z.string().max(500).optional(), // honeypot — non-empty submissions are silently discarded below
  startedAt: z.number().optional(),
  country: z.string().max(100).optional(),
  interest: z.array(z.string().max(50)).max(5).optional(),
  recaptchaToken: z.string().optional(),
});

const MIN_SUBMIT_MS = 1200;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`newsletter:${ip}`)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = NewsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { email, website, startedAt, country, interest } = parsed.data;

  // 1. Verify Google reCAPTCHA v2 (enforced when RECAPTCHA_SECRET_KEY is set)
  const recaptchaError = await recaptchaGuard(parsed.data, ip);
  if (recaptchaError) return recaptchaError;

  // Honeypot: bots fill hidden fields
  if (website) {
    return NextResponse.json({ success: true });
  }

  // Reject submissions completed implausibly fast
  if (startedAt && Date.now() - startedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ success: true });
  }

  const normalizedEmail = email.toLowerCase();

  // 2. Save to MongoDB (Source of Truth)
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database connection unavailable");

    await NewsletterSubscriber.updateOne(
      { email: normalizedEmail },
      { 
        $set: { 
          email: normalizedEmail, 
          country, 
          interest,
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );
  } catch (err) {
    console.error("NewsletterSubscriber save failed:", safeDbErrorMessage(err));
    return NextResponse.json(
      { error: "We couldn't process your subscription right now. Please try again in a moment." },
      { status: 503 }
    );
  }

  // 3. Append to Same Google Sheet (Tab: "Newsletter")
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
      
        registerAs: "Newsletter Signup",
        name: "",
        company: "",
        designation: "",
        country: country ?? "",
        city: "",
        email: normalizedEmail,
        phone: "",
        type: "Newsletter Signup",
        productInterest: (interest ?? []).join(", "),
        message: "",
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        landingPage: "",
      });
      await NewsletterSubscriber.updateOne({ email: normalizedEmail }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Newsletter Sheets sync failed", err);
      await NewsletterSubscriber.updateOne({ email: normalizedEmail }, { sheetsSyncStatus: "failed" }).catch(
        () => {}
      );
    }
  }

  // 4. Send Email Alert to BOTH Organisers (Futurex & ETSIPL) + User Acknowledgement
  if (isEmailConfigured()) {
    try {
      await sendNewsletterSubscriptionEmails({
        email: normalizedEmail,
        country,
        interest,
      });
      await NewsletterSubscriber.updateOne({ email: normalizedEmail }, { emailStatus: "sent" }).catch(() => {});
    } catch (err) {
      console.error("Newsletter email dispatch failed", err);
      await NewsletterSubscriber.updateOne({ email: normalizedEmail }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true });
}