
import { NextRequest, NextResponse } from "next/server";

import { brochureDownloadSchema } from "@/lib/validation/brochureDownload";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { BrochureDownload } from "@/models/BrochureDownload";
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

import { sendBrochureDownloadEmails } from "@/lib/email/sendLeadEmails";
import { isEmailConfigured } from "@/lib/email/mailer";

/* ==========================================
   RUNTIME CONFIGURATION
========================================== */

export const runtime = "nodejs";

const BROCHURE_FILE_URL =
  "/downloads/4th-Kenya-Buildcon-International-Expo-2027-Brochure.pdf";

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

const FORM_NAME =
  "Brochure Download Form";

/* ==========================================
   BROCHURE DOWNLOAD API
========================================== */

export async function POST(req: NextRequest) {
  /* ========================================
     1. IP RATE LIMIT
  ======================================== */

  const ip = getClientIp(req.headers);

  if (isRateLimited(`brochure:${ip}`)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions. Please try again later.",
      },
      { status: 429 }
    );
  }

  /* ========================================
     2. PARSE REQUEST BODY
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
     3. VERIFY RECAPTCHA
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

  const parsed =
    brochureDownloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Please check the highlighted fields.",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  /* ========================================
     5. SPAM / HONEYPOT PROTECTION

     Do not save or send notification
     for detected spam submissions.
  ======================================== */

  const isHoneypotFilled =
    Boolean(data.website_hp);

  const isSubmittedTooFast =
    typeof data.startedAt === "number" &&
    data.startedAt > 0 &&
    Date.now() - data.startedAt < MIN_SUBMIT_MS;

  if (isHoneypotFilled || isSubmittedTooFast) {
    return NextResponse.json({
      success: true,
      referenceId: generateReferenceId("BRCH"),
      fileUrl: BROCHURE_FILE_URL,
    });
  }

  /* ========================================
     6. PREPARE SUBMISSION DETAILS
  ======================================== */

  const referenceId =
    generateReferenceId("BRCH");

  const landingPage =
    data.landingPage || "/downloads";

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
     7. SAVE TO MONGODB ATLAS

     Database must save successfully
     before submission is accepted.
  ======================================== */

  try {
    const connection =
      await connectToDatabase();

    if (!connection) {
      throw new Error(
        "Database connection unavailable"
      );
    }

    await BrochureDownload.create({
      referenceId,

      name: data.name,
      company: data.company,
      country: data.country,
      email: data.email,
      mobile: data.mobile,

      utm: data.utm,
      landingPage,

      userAgent,
    });
  } catch (error) {
    console.error(
      "BrochureDownload MongoDB save failed:",
      safeDbErrorMessage(error)
    );

    return NextResponse.json(
      {
        error:
          "We couldn't process your request right now. Please try again in a moment.",
      },
      { status: 503 }
    );
  }

  /* ========================================
     8. GOOGLE SHEETS SYNC

     Existing sheet tab:
     Website Enquiries

     Existing 25 columns unchanged.
  ======================================== */

  if (isSheetsConfigured()) {
    try {
      await appendLeadRow(
        "Website Enquiries",
        {
          referenceId,

          // Clearly identifies the form.
          registerAs: "Brochure Download",
          type: "Brochure Download",

          // Submitted fields.
          name: data.name,
          company: data.company,
          country: data.country,
          email: data.email,
          phone: data.mobile,

          // Other existing sheet columns.
          designation: "",
          city: "",
          productInterest: "",

          // Website and form identification.
          message: [
            `Website: ${WEBSITE_NAME}`,
            `Form: ${FORM_NAME}`,
            `Consent: ${
              data.consent ? "Yes" : "No"
            }`,
            `Page: ${landingPage}`,
          ].join(" | "),

          // Existing tracking fields.
          utmSource,
          utmMedium,
          utmCampaign,
          landingPage,
        }
      );

      await BrochureDownload.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "synced",
        }
      );
    } catch (error) {
      console.error(
        "Brochure Google Sheets sync failed:",
        error
      );

      await BrochureDownload.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "failed",
        }
      ).catch(() => {});
    }
  }

  /* ========================================
     9. ADMIN EMAIL NOTIFICATION

     Uses existing admin-only email helper.

     Two recipients:
     FORM_NOTIFICATION_EMAIL_1
     FORM_NOTIFICATION_EMAIL_2

     No customer acknowledgement email.
  ======================================== */

  if (isEmailConfigured()) {
    try {
      await sendBrochureDownloadEmails({
        ...data,
        referenceId,
      });

      await BrochureDownload.updateOne(
        { referenceId },
        {
          emailStatus: "sent",
        }
      );
    } catch (error) {
      console.error(
        "Brochure admin notification failed:",
        error
      );

      await BrochureDownload.updateOne(
        { referenceId },
        {
          emailStatus: "failed",
        }
      ).catch(() => {});
    }
  }

  /* ========================================
     10. SUCCESS RESPONSE

     Reference ID is used internally
     by the existing frontend hook.

     The frontend does not show it.
  ======================================== */

  return NextResponse.json({
    success: true,
    referenceId,
    fileUrl: BROCHURE_FILE_URL,
  });
}
