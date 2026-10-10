
import { NextRequest, NextResponse } from "next/server";

import { visitorRegistrationSchema } from "@/lib/validation/visitorRegistration";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { VisitorRegistration } from "@/models/VisitorRegistration";
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

import { sendVisitorRegistrationEmails } from "@/lib/email/sendLeadEmails";

import {
  isEmailConfigured,
  getNotificationRecipients,
} from "@/lib/email/mailer";

export const runtime = "nodejs";

/* ==========================================
   CONFIGURATION
========================================== */

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

const FORM_NAME = "Visitor Registration Form";

const SHEET_TAB = "Website Enquiries";

/* ==========================================
   FORMAT HELPERS
========================================== */

function formatDetail(value: unknown): string {
  if (typeof value === "string") {
    return value.trim() || "Not provided";
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.map(formatDetail).join(", ");
  }

  return "Not provided";
}

/* ==========================================
   VISITOR REGISTRATION API
========================================== */

export async function POST(req: NextRequest) {
  /* ========================================
     1. RATE LIMIT
  ======================================== */

  const ip = getClientIp(req.headers);

  if (isRateLimited(`visitor:${ip}`)) {
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
     4. VALIDATE FIELDS
  ======================================== */

  const parsed =
    visitorRegistrationSchema.safeParse(body);

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
     5. BOT PROTECTION
  ======================================== */

  const hasHoneypot = Boolean(data.website_hp);

  const submittedTooFast =
    typeof data.startedAt === "number" &&
    data.startedAt > 0 &&
    Date.now() - data.startedAt < MIN_SUBMIT_MS;

  if (hasHoneypot || submittedTooFast) {
    return NextResponse.json({
      success: true,
      referenceId: generateReferenceId("KBVR"),
    });
  }

  /* ========================================
     6. PREPARE DETAILS
  ======================================== */

  const referenceId = generateReferenceId("KBVR");

  const email = data.email.trim().toLowerCase();

  const fullName = [
    data.firstName,
    data.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const landingPage =
    data.landingPage || "/register-to-visit";

  const userAgent =
    req.headers.get("user-agent") ||
    undefined;

  const utmSource = data.utm?.source ?? "";
  const utmMedium = data.utm?.medium ?? "";
  const utmCampaign = data.utm?.campaign ?? "";

  const productsInterested = Array.isArray(
    data.productsInterested
  )
    ? data.productsInterested.join(", ")
    : "";

  /* ========================================
     7. MONGODB ATLAS

     Existing duplicate-email behaviour
     preserved, with normalized email.
  ======================================== */

  let alreadyRegisteredId: string | null = null;

  try {
    const connection =
      await connectToDatabase();

    if (!connection) {
      throw new Error(
        "Database connection unavailable."
      );
    }

    const existing =
      await VisitorRegistration.findOne({
        email,
      }).lean();

    if (existing) {
      const existingReference = (
        existing as {
          referenceId?: string;
        }
      ).referenceId;

      alreadyRegisteredId =
        existingReference || referenceId;
    } else {
      await VisitorRegistration.create({
        referenceId,

        firstName: data.firstName,
        lastName: data.lastName,
        designation: data.designation,

        company: data.company,
        country: data.country,
        city: data.city,

        email,
        mobile: data.mobile,

        natureOfBusiness:
          data.natureOfBusiness,

        productsInterested:
          data.productsInterested,

        purchasingResponsibility:
          data.purchasingResponsibility,

        purposeOfVisit:
          data.purposeOfVisit,

        utm: data.utm,
        landingPage,
        userAgent,
      });
    }
  } catch (error) {
    console.error(
      "VisitorRegistration MongoDB save failed:",
      safeDbErrorMessage(error)
    );

    return NextResponse.json(
      {
        error:
          "We couldn't save your registration right now. Please try again in a moment.",
      },
      { status: 503 }
    );
  }

  /* ========================================
     8. EXISTING REGISTRATION

     No duplicate Sheet row or admin email.
  ======================================== */

  if (alreadyRegisteredId) {
    return NextResponse.json({
      success: true,
      referenceId: alreadyRegisteredId,
      alreadyRegistered: true,
    });
  }

  /* ========================================
     9. GOOGLE SHEETS

     Existing 25 columns remain unchanged.
     Tab: Website Enquiries
  ======================================== */

  if (isSheetsConfigured()) {
    try {
      const sheetMessage = [
        `Website: ${WEBSITE_NAME}`,
        `Form: ${FORM_NAME}`,

        `Nature of Business: ${formatDetail(
          data.natureOfBusiness
        )}`,

        `Products Interested: ${formatDetail(
          data.productsInterested
        )}`,

        `Purchasing Responsibility: ${formatDetail(
          data.purchasingResponsibility
        )}`,

        `Purpose of Visit: ${formatDetail(
          data.purposeOfVisit
        )}`,

        `Page: ${landingPage}`,
      ].join("\n");

      await appendLeadRow(SHEET_TAB, {
        referenceId,

        // Form identity
        registerAs: "Visitor Registration",
        type: "Visitor Registration",

        // Contact
        name: fullName,
        contactPerson: fullName,

        company: data.company,
        companyName: data.company,

        designation: data.designation,

        email,
        phone: data.mobile,

        // Location
        country: data.country,
        city: data.city,

        // Visitor interests
        areaOfInterest: productsInterested,
        productInterest: productsInterested,

        // Other visitor-specific fields
        message: sheetMessage,

        // Tracking
        utmSource,
        utmMedium,
        utmCampaign,
        landingPage,
      });

      await VisitorRegistration.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "synced",
        }
      ).catch((error) => {
        console.error(
          "Visitor Sheets status update failed:",
          error
        );
      });
    } catch (error) {
      console.error(
        "Visitor Google Sheets sync failed:",
        error
      );

      await VisitorRegistration.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "failed",
        }
      ).catch(() => {});
    }
  }

  /* ========================================
     10. ADMIN-ONLY EMAIL

     Uses your updated sendLeadEmails.ts.
     No customer confirmation/pass email.
  ======================================== */

  if (isEmailConfigured()) {
    const recipients = getNotificationRecipients();

    if (recipients.length !== 2) {
      console.error(
        "Visitor notification requires exactly two admin recipients."
      );

      await VisitorRegistration.updateOne(
        { referenceId },
        {
          emailStatus: "failed",
        }
      ).catch(() => {});
    } else {
      try {
        await sendVisitorRegistrationEmails({
          ...data,
          email,
          referenceId,
        });

        await VisitorRegistration.updateOne(
          { referenceId },
          {
            emailStatus: "sent",
          }
        ).catch((error) => {
          console.error(
            "Visitor email status update failed:",
            error
          );
        });
      } catch (error) {
        console.error(
          "Visitor admin email failed:",
          error
        );

        await VisitorRegistration.updateOne(
          { referenceId },
          {
            emailStatus: "failed",
          }
        ).catch(() => {});
      }
    }
  }

  /* ========================================
     11. SUCCESS

     Internal reference ID is returned for
     existing frontend success handling.
  ======================================== */

  return NextResponse.json({
    success: true,
    referenceId,
  });
}
