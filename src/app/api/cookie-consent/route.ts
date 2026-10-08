import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase, safeDbErrorMessage } from "@/lib/db/mongodb";
import { generateReferenceId } from "@/lib/utils/referenceId";
import { isRateLimited, getClientIp } from "@/lib/utils/rateLimit";
import { appendLeadRow, isSheetsConfigured } from "@/lib/google/sheets";
import { sendMail, getNotificationRecipients } from "@/lib/email/mailer";
import { organiserNotificationEmail } from "@/lib/email/templates"; // userAcknowledgementEmail removed
import { isEmailConfigured } from "@/lib/email/mailer";
import mongoose from "mongoose";
import { event } from "@/config/event";

// Lightweight Schema for Cookie Leads
const CookieLeadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  mobile: z.string().trim().min(6).max(25),
  company: z.string().trim().max(100).optional(),
});

// Inline Model fallback if not created in models folder
const CookieLeadModel =
  mongoose.models.CookieLead ||
  mongoose.model(
    "CookieLead",
    new mongoose.Schema(
      {
        referenceId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        company: { type: String },
        consentDate: { type: Date, default: Date.now },
        userAgent: { type: String },
        sheetsSyncStatus: { type: String, default: "pending" },
        emailStatus: { type: String, default: "pending" },
      },
      { timestamps: true }
    )
  );

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (isRateLimited(`cookie:${ip}`)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const parsed = CookieLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter valid contact details." }, { status: 400 });
  }

  const data = parsed.data;
  const referenceId = generateReferenceId("CKIE");

  // 1. Save to MongoDB (Source of Truth)
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Database unavailable");

    await CookieLeadModel.create({
      referenceId,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      company: data.company || "Trade Visitor",
      userAgent: req.headers.get("user-agent") || undefined,
    });
  } catch (err) {
    console.error("Cookie lead DB save failed:", safeDbErrorMessage(err));
    return NextResponse.json({ error: "Could not save consent right now." }, { status: 503 });
  }

  // 2. Append to Same Google Sheet (Tab: "Cookie Leads")
  if (isSheetsConfigured()) {
    try {
      await appendLeadRow("Website Enquiries", {
        referenceId,
        registerAs: "Cookie Consent & Trade Alerts",
        name: data.name,
        company: data.company || "Trade Visitor",
        designation: "Opt-in Consent",
        country: "",
        city: "",
        email: data.email,
        phone: data.mobile,
        type: "Cookie Consent & Trade Alerts",
        productInterest: "",
        message: "Accepted site cookies and opted in for exhibition show highlights.",
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        landingPage: "/cookie-policy",
      });
      await CookieLeadModel.updateOne({ referenceId }, { sheetsSyncStatus: "synced" });
    } catch (err) {
      console.error("Cookie Sheet sync failed", err);
      await CookieLeadModel.updateOne({ referenceId }, { sheetsSyncStatus: "failed" }).catch(() => {});
    }
  }

  // 3. Send Notification to BOTH Organisers (Futurex & ETSIPL)
  if (isEmailConfigured()) {
    try {
      const recipients = getNotificationRecipients();
      if (recipients.length > 0) {
        await sendMail({
          to: recipients,
          subject: `New Visitor Cookie Opt-in – ${data.name}`, // Removed referenceId from subject
          html: organiserNotificationEmail({
            heading: "New Trade Alert & Cookie Opt-In Lead",
            
            rows: [
              { label: "Name", value: data.name },
              { label: "Email", value: data.email },
              { label: "Mobile", value: data.mobile },
              { label: "Company", value: data.company || "Trade Visitor" },
              { label: "Status", value: "Cookies Accepted & Lead Captured" },
            ],
          }),
        });
      }

      // USER ACKNOWLEDGEMENT MAIL CODE DELETED

      await CookieLeadModel.updateOne({ referenceId }, { emailStatus: "sent" });
    } catch (err) {
      console.error("Cookie email delivery failed", err);
      await CookieLeadModel.updateOne({ referenceId }, { emailStatus: "failed" }).catch(() => {});
    }
  }

  // Frontend par bhi referenceId return nahi hoga
  return NextResponse.json({ success: true });
}