
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";

import {
  appendLeadRow,
  isSheetsConfigured,
} from "@/lib/google/sheets";

import { sendNewsletterSubscriptionEmails } from "@/lib/email/sendLeadEmails";

import {
  isEmailConfigured,
  getNotificationRecipients,
} from "@/lib/email/mailer";

import {
  isRateLimited,
  getClientIp,
} from "@/lib/utils/rateLimit";

import { recaptchaGuard } from "@/lib/utils/recaptcha";

/* ==========================================
   RUNTIME
========================================== */

export const runtime = "nodejs";

/* ==========================================
   WEBSITE / FORM IDENTIFICATION
========================================== */

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

const FORM_NAME =
  "Newsletter Subscription Form";

const SHEET_TAB =
  "Website Enquiries";

/* ==========================================
   VALIDATION
========================================== */

const NewsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .max(200),

  // Honeypot
  website: z.string().max(500).optional(),

  startedAt: z.number().optional(),

  country: z
    .string()
    .max(100)
    .optional(),

  interest: z
    .array(z.string().max(50))
    .max(5)
    .optional(),

  recaptchaToken: z.string().optional(),
});

const MIN_SUBMIT_MS = 1200;

/* ==========================================
   NEWSLETTER API
========================================== */

export async function POST(req: NextRequest) {
  /* ========================================
     1. RATE LIMIT
  ======================================== */

  const ip = getClientIp(req.headers);

  if (isRateLimited(`newsletter:${ip}`)) {
    return NextResponse.json(
      {
        error:
          "Too many attempts. Please try again later.",
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
     3. VALIDATE SUBMISSION
  ======================================== */

  const parsed = NewsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid submission.",
      },
      { status: 400 }
    );
  }

  const {
    email,
    website,
    startedAt,
    country,
    interest,
  } = parsed.data;

  /* ========================================
     4. RECAPTCHA
  ======================================== */

  const recaptchaError = await recaptchaGuard(
    parsed.data,
    ip
  );

  if (recaptchaError) {
    return recaptchaError;
  }

  /* ========================================
     5. BOT PROTECTION
  ======================================== */

  const hasHoneypot = Boolean(website);

  const submittedTooFast =
    typeof startedAt === "number" &&
    startedAt > 0 &&
    Date.now() - startedAt < MIN_SUBMIT_MS;

  if (hasHoneypot || submittedTooFast) {
    return NextResponse.json({
      success: true,
    });
  }

  /* ========================================
     6. NORMALIZE DATA
  ======================================== */

  const normalizedEmail =
    email.trim().toLowerCase();

  const normalizedCountry =
    country?.trim() || "";

  const normalizedInterests =
    interest?.filter(Boolean) || [];

  const interestsText =
    normalizedInterests.length > 0
      ? normalizedInterests.join(", ")
      : "General Updates";

  /* ========================================
     7. MONGODB ATLAS

     Save subscriber using email as
     the unique identifier.

     Existing upsert behaviour preserved.
  ======================================== */

  try {
    const connection =
      await connectToDatabase();

    if (!connection) {
      throw new Error(
        "Database connection unavailable."
      );
    }

    await NewsletterSubscriber.updateOne(
      {
        email: normalizedEmail,
      },
      {
        $set: {
          email: normalizedEmail,
          country: normalizedCountry,
          interest: normalizedInterests,
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(
      "NewsletterSubscriber MongoDB save failed:",
      safeDbErrorMessage(error)
    );

    return NextResponse.json(
      {
        error:
          "We couldn't process your subscription right now. Please try again in a moment.",
      },
      { status: 503 }
    );
  }

  /* ========================================
     8. GOOGLE SHEETS

     Existing:
     Website Enquiries tab
     Exact 25-column structure unchanged.
  ======================================== */

  if (isSheetsConfigured()) {
    try {
      await appendLeadRow(SHEET_TAB, {
        registerAs: "Newsletter Signup",
        type: "Newsletter Signup",

        // Newsletter only collects these fields.
        name: "",
        company: "",
        designation: "",
        country: normalizedCountry,
        city: "",

        email: normalizedEmail,
        phone: "",

        // Existing Area of Interest column.
        areaOfInterest: interestsText,
        productInterest: interestsText,

        // Existing Message column.
        message: [
          `Website: ${WEBSITE_NAME}`,
          `Form: ${FORM_NAME}`,
          `Subscriber Email: ${normalizedEmail}`,
          `Country: ${
            normalizedCountry || "Not provided"
          }`,
          `Interests: ${interestsText}`,
        ].join("\n"),

        // Source attribution.
        infoGetFrom:
          "Kenya Buildcon Website - Newsletter",

        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        landingPage: "",
      });

      await NewsletterSubscriber.updateOne(
        { email: normalizedEmail },
        {
          sheetsSyncStatus: "synced",
        }
      ).catch((error) => {
        console.error(
          "Newsletter Sheets status update failed:",
          error
        );
      });
    } catch (error) {
      console.error(
        "Newsletter Google Sheets sync failed:",
        error
      );

      await NewsletterSubscriber.updateOne(
        { email: normalizedEmail },
        {
          sheetsSyncStatus: "failed",
        }
      ).catch(() => {});
    }
  }

  /* ========================================
     9. ADMIN-ONLY EMAIL

     Uses:
     FORM_NOTIFICATION_EMAIL_1
     FORM_NOTIFICATION_EMAIL_2

     No customer acknowledgement email
     from the updated email helper.
  ======================================== */

  if (isEmailConfigured()) {
    const recipients =
      getNotificationRecipients();

    if (recipients.length !== 2) {
      console.error(
        "Newsletter notification requires exactly two admin recipients."
      );

      await NewsletterSubscriber.updateOne(
        { email: normalizedEmail },
        {
          emailStatus: "failed",
        }
      ).catch(() => {});
    } else {
      try {
        await sendNewsletterSubscriptionEmails({
          email: normalizedEmail,
          country: normalizedCountry,
          interest: normalizedInterests,
        });

        await NewsletterSubscriber.updateOne(
          { email: normalizedEmail },
          {
            emailStatus: "sent",
          }
        ).catch((error) => {
          console.error(
            "Newsletter email status update failed:",
            error
          );
        });
      } catch (error) {
        console.error(
          "Newsletter admin notification failed:",
          error
        );

        await NewsletterSubscriber.updateOne(
          { email: normalizedEmail },
          {
            emailStatus: "failed",
          }
        ).catch(() => {});
      }
    }
  }

  /* ========================================
     10. SUCCESS RESPONSE

     No reference ID displayed.
  ======================================== */

  return NextResponse.json({
    success: true,
  });
}
