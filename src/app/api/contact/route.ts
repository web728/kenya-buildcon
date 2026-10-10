
import { NextRequest, NextResponse } from "next/server";

import { contactEnquirySchema } from "@/lib/validation/contactEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { ContactEnquiry } from "@/models/ContactEnquiry";
import { generateReferenceId } from "@/lib/utils/referenceId";

import {
  isRateLimited,
  getClientIp,
} from "@/lib/utils/rateLimit";

import { recaptchaGuard } from "@/lib/utils/recaptcha";

import {
  appendLeadRow,
  isSheetsConfigured,
} from "@/lib/google/sheets";

import { sendContactEnquiryEmails } from "@/lib/email/sendLeadEmails";
import {
  isEmailConfigured,
  getNotificationRecipients,
} from "@/lib/email/mailer";

/* ==========================================
   RUNTIME
========================================== */

export const runtime = "nodejs";

/* ==========================================
   IDENTIFICATION
========================================== */

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

const FORM_NAME = "Contact Enquiry Form";

const SHEET_TAB = "Website Enquiries";

/* ==========================================
   CONTACT API
========================================== */

export async function POST(req: NextRequest) {
  /* ========================================
     1. RATE LIMIT
  ======================================== */

  const ip = getClientIp(req.headers);

  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions. Please try again later.",
      },
      { status: 429 }
    );
  }

  /* ========================================
     2. READ JSON
  ======================================== */

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      { status: 400 }
    );
  }

  /* ========================================
     3. RECAPTCHA VERIFICATION
  ======================================== */

  const recaptchaError = await recaptchaGuard(
    body,
    ip
  );

  if (recaptchaError) {
    return recaptchaError;
  }

  /* ========================================
     4. ZOD VALIDATION
  ======================================== */

  const parsed = contactEnquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  /* ========================================
     5. SPAM PROTECTION

     Keep existing honeypot and timing checks.
  ======================================== */

  const hasHoneypot =
    Boolean(data.website_hp);

  const submittedTooQuickly =
    typeof data.startedAt === "number" &&
    data.startedAt > 0 &&
    Date.now() - data.startedAt < MIN_SUBMIT_MS;

  if (hasHoneypot || submittedTooQuickly) {
    return NextResponse.json({
      success: true,
      referenceId: generateReferenceId("KBCN"),
    });
  }

  /* ========================================
     6. PREPARE DATA
  ======================================== */

  const referenceId =
    generateReferenceId("KBCN");

  const landingPage =
    data.landingPage || "/contact";

  const userAgent =
    req.headers.get("user-agent") ||
    undefined;

  const utmSource =
    data.utm?.source ?? "";

  const utmMedium =
    data.utm?.medium ?? "";

  const utmCampaign =
    data.utm?.campaign ?? "";

  /* ========================================
     7. MONGODB ATLAS

     Save before other integrations.
  ======================================== */

  try {
    const connection =
      await connectToDatabase();

    if (!connection) {
      throw new Error(
        "Database connection unavailable."
      );
    }

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
      landingPage,
      userAgent,
    });
  } catch (error) {
    console.error(
      "ContactEnquiry MongoDB save failed:",
      safeDbErrorMessage(error)
    );

    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please try again in a moment.",
      },
      { status: 503 }
    );
  }

  /* ========================================
     8. GOOGLE SHEETS

     Existing tab: Website Enquiries
     Existing 25 columns unchanged.
  ======================================== */

  if (isSheetsConfigured()) {
    try {
      await appendLeadRow(SHEET_TAB, {
        referenceId,

        // Form identification
        registerAs: "Contact Enquiry",
        type: "Contact Enquiry",

        // Contact details
        name: data.name,
        company: data.company,
        designation: data.designation ?? "",

        country: data.country,
        city: "",

        email: data.email,
        phone: data.mobile,

        // Contact-specific field
        productInterest: data.interest,

        // Message and website information
        message: [
          `Website: ${WEBSITE_NAME}`,
          `Form: ${FORM_NAME}`,
          `Interest: ${data.interest}`,
          `Message: ${data.message}`,
          `Consent: ${
            data.consent ? "Yes" : "No"
          }`,
        ].join("\n"),

        // Source tracking
        utmSource,
        utmMedium,
        utmCampaign,
        landingPage,
      });

      await ContactEnquiry.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "synced",
        }
      );
    } catch (error) {
      console.error(
        "Contact enquiry Sheets sync failed:",
        error
      );

      await ContactEnquiry.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "failed",
        }
      ).catch(() => {});
    }
  }

  /* ========================================
     9. TWO ADMIN EMAIL NOTIFICATIONS

     Customer receives no acknowledgement
     when updated admin-only email helper
     is installed.
  ======================================== */

  if (isEmailConfigured()) {
    const recipients =
      getNotificationRecipients();

    if (recipients.length !== 2) {
      console.error(
        "Contact notification requires exactly 2 configured admin recipients."
      );

      await ContactEnquiry.updateOne(
        { referenceId },
        {
          emailStatus: "failed",
        }
      ).catch(() => {});
    } else {
      try {
        await sendContactEnquiryEmails({
          ...data,
          referenceId,
        });

        await ContactEnquiry.updateOne(
          { referenceId },
          {
            emailStatus: "sent",
          }
        ).catch(() => {});
      } catch (error) {
        console.error(
          "Contact enquiry admin email failed:",
          error
        );

        await ContactEnquiry.updateOne(
          { referenceId },
          {
            emailStatus: "failed",
          }
        ).catch(() => {});
      }
    }
  }

  /* ========================================
     10. SUCCESS RESPONSE

     Frontend hook uses referenceId to
     detect success. The ID is not shown
     if SuccessPanel is configured to
     omit it.
  ======================================== */

  return NextResponse.json({
    success: true,
    referenceId,
  });
}
