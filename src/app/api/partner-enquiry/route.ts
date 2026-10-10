
import { NextRequest, NextResponse } from "next/server";

import { partnerEnquirySchema } from "@/lib/validation/partnerEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { PartnerEnquiry } from "@/models/PartnerEnquiry";
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

import { sendPartnerEnquiryEmails } from "@/lib/email/sendLeadEmails";

import {
  isEmailConfigured,
  getNotificationRecipients,
} from "@/lib/email/mailer";

export const runtime = "nodejs";

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

const FORM_NAME = "Partner Enquiry Form";

const SHEET_TAB = "Website Enquiries";

function formatField(value: unknown): string {
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
    return value.map(formatField).join(", ");
  }

  return "Not provided";
}

export async function POST(req: NextRequest) {
  /* ========================================
     1. RATE LIMIT
  ======================================== */

  const ip = getClientIp(req.headers);

  if (isRateLimited(`partner:${ip}`)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions. Please try again later.",
      },
      { status: 429 }
    );
  }

  /* ========================================
     2. PARSE REQUEST
  ======================================== */

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  /* ========================================
     3. RECAPTCHA
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

  const parsed = partnerEnquirySchema.safeParse(
    body
  );

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
      referenceId: generateReferenceId("KBPT"),
    });
  }

  /* ========================================
     6. PREPARE DATA
  ======================================== */

  const referenceId = generateReferenceId("KBPT");

  const landingPage =
    data.landingPage || "/partners";

  const userAgent =
    req.headers.get("user-agent") || undefined;

  const utmSource = data.utm?.source ?? "";
  const utmMedium = data.utm?.medium ?? "";
  const utmCampaign = data.utm?.campaign ?? "";

  /* ========================================
     7. MONGODB ATLAS
     Preserve all original model fields.
  ======================================== */

  try {
    const connection = await connectToDatabase();

    if (!connection) {
      throw new Error(
        "Database connection unavailable."
      );
    }

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

      approximateMembership:
        data.approximateMembership,

      industryRepresented:
        data.industryRepresented,

      natureOfEnquiry: data.natureOfEnquiry,
      message: data.message,

      utm: data.utm,
      landingPage,
      userAgent,
    });
  } catch (error) {
    console.error(
      "PartnerEnquiry MongoDB save failed:",
      safeDbErrorMessage(error)
    );

    return NextResponse.json(
      {
        error:
          "We couldn't save your enquiry right now. Please try again in a moment.",
      },
      { status: 503 }
    );
  }

  /* ========================================
     8. GOOGLE SHEETS
     Same tab and exact 25 columns.
  ======================================== */

  if (isSheetsConfigured()) {
    try {
      const sheetMessage = [
        `Website: ${WEBSITE_NAME}`,
        `Form: ${FORM_NAME}`,
        `Organisation Type: ${formatField(
          data.organisationType
        )}`,
        `Organisation Website: ${formatField(
          data.website
        )}`,
        `Approximate Membership: ${formatField(
          data.approximateMembership
        )}`,
        `Industry Represented: ${formatField(
          data.industryRepresented
        )}`,
        `Nature of Enquiry: ${formatField(
          data.natureOfEnquiry
        )}`,
        `Message: ${formatField(data.message)}`,
        `Landing Page: ${landingPage}`,
      ].join("\n");

      await appendLeadRow(SHEET_TAB, {
        referenceId,

        registerAs: "Partner Enquiry",
        type: "Partner Enquiry",

        company: data.organisation,
        companyName: data.organisation,

        contactPerson: data.contactPerson,
        name: data.contactPerson,

        designation: data.designation ?? "",

        email: data.email,
        phone: data.phone,

        website: data.website || "",
        country: data.country,
        city: "",

        areaOfInterest:
          data.industryRepresented ?? "",

        productInterest:
          data.industryRepresented ?? "",

        message: sheetMessage,

        infoGetFrom:
          "Kenya Buildcon Website - Partner Enquiry",

        utmSource,
        utmMedium,
        utmCampaign,
        landingPage,
      });

      await PartnerEnquiry.updateOne(
        { referenceId },
        { sheetsSyncStatus: "synced" }
      ).catch((error) => {
        console.error(
          "Partner Sheets status update failed:",
          error
        );
      });
    } catch (error) {
      console.error(
        "Partner Google Sheets sync failed:",
        error
      );

      await PartnerEnquiry.updateOne(
        { referenceId },
        { sheetsSyncStatus: "failed" }
      ).catch(() => {});
    }
  }

  /* ========================================
     9. ADMIN EMAILS
     Uses admin-only sendLeadEmails.ts.
  ======================================== */

  if (isEmailConfigured()) {
    const recipients = getNotificationRecipients();

    if (recipients.length !== 2) {
      console.error(
        "Partner enquiry requires exactly two admin notification recipients."
      );

      await PartnerEnquiry.updateOne(
        { referenceId },
        { emailStatus: "failed" }
      ).catch(() => {});
    } else {
      try {
        await sendPartnerEnquiryEmails({
          ...data,
          referenceId,
        });

        await PartnerEnquiry.updateOne(
          { referenceId },
          { emailStatus: "sent" }
        ).catch((error) => {
          console.error(
            "Partner email status update failed:",
            error
          );
        });
      } catch (error) {
        console.error(
          "Partner admin notification failed:",
          error
        );

        await PartnerEnquiry.updateOne(
          { referenceId },
          { emailStatus: "failed" }
        ).catch(() => {});
      }
    }
  }

  /* ========================================
     10. SUCCESS
     Reference ID is retained for the
     existing frontend success workflow.
  ======================================== */

  return NextResponse.json({
    success: true,
    referenceId,
  });
}
