
import { NextRequest, NextResponse } from "next/server";

import { exhibitorEnquirySchema } from "@/lib/validation/exhibitorEnquiry";
import { MIN_SUBMIT_MS } from "@/lib/validation/shared";

import {
  connectToDatabase,
  safeDbErrorMessage,
} from "@/lib/db/mongodb";

import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
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

import { sendExhibitorEnquiryEmails } from "@/lib/email/sendLeadEmails";

import {
  isEmailConfigured,
  getNotificationRecipients,
} from "@/lib/email/mailer";

export const runtime = "nodejs";

/* ==========================================
   IDENTIFICATION
========================================== */

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

const FORM_NAME = "Exhibitor Enquiry Form";

const SHEET_TAB = "Website Enquiries";

function formatDetail(
  value: string | null | undefined
): string {
  return value?.trim() || "Not provided";
}

/* ==========================================
   EXHIBITOR ENQUIRY API
========================================== */

export async function POST(req: NextRequest) {
  /* ========================================
     1. RATE LIMIT
  ======================================== */

  const ip = getClientIp(req.headers);

  if (isRateLimited(`exhibitor:${ip}`)) {
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
      {
        error: "Invalid request body.",
      },
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
     4. SCHEMA VALIDATION
  ======================================== */

  const parsed =
    exhibitorEnquirySchema.safeParse(body);

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
     5. HONEYPOT + BOT TIMING CHECK
  ======================================== */

  const hasHoneypot = Boolean(
    data.website_hp
  );

  const submittedTooFast =
    typeof data.startedAt === "number" &&
    data.startedAt > 0 &&
    Date.now() - data.startedAt < MIN_SUBMIT_MS;

  if (hasHoneypot || submittedTooFast) {
    return NextResponse.json({
      success: true,
      referenceId: generateReferenceId("KBEX"),
    });
  }

  /* ========================================
     6. PREPARE DATA
  ======================================== */

  const referenceId =
    generateReferenceId("KBEX");

  const fullName = [
    data.firstName,
    data.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const landingPage =
    data.landingPage || "/exhibit";

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

     All existing exhibitor fields retained.
  ======================================== */

  try {
    const connection =
      await connectToDatabase();

    if (!connection) {
      throw new Error(
        "Database connection unavailable."
      );
    }

    await ExhibitorEnquiry.create({
      referenceId,

      // Company information
      companyName: data.companyName,
      country: data.country,
      city: data.city,
      website: data.website || undefined,
      companyType: data.companyType,

      // Contact person
      firstName: data.firstName,
      lastName: data.lastName,
      designation: data.designation,
      email: data.email,
      mobile: data.mobile,

      // Product and participation details
      productCategory: data.productCategory,
      productsServices: data.productsServices,
      preferredParticipation:
        data.preferredParticipation,
      requiredArea: data.requiredArea,

      // Business intentions
      existingBusinessInKenya:
        data.existingBusinessInKenya || undefined,

      lookingForDistributor:
        data.lookingForDistributor || undefined,

      // Message
      message: data.message,

      // Attribution
      utm: data.utm,
      landingPage,
      userAgent,
    });
  } catch (error) {
    console.error(
      "ExhibitorEnquiry MongoDB save failed:",
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

     Tab: Website Enquiries
     Existing 25 columns unchanged.
  ======================================== */

  if (isSheetsConfigured()) {
    try {
      const sheetMessage = [
        `Website: ${WEBSITE_NAME}`,
        `Form: ${FORM_NAME}`,

        `Company Type: ${formatDetail(
          data.companyType
        )}`,

        `Products / Services: ${formatDetail(
          data.productsServices
        )}`,

        `Preferred Participation: ${formatDetail(
          data.preferredParticipation
        )}`,

        `Required Area: ${formatDetail(
          data.requiredArea
        )}`,

        `Existing Business in Kenya: ${formatDetail(
          data.existingBusinessInKenya
        )}`,

        `Looking for Distributor: ${formatDetail(
          data.lookingForDistributor
        )}`,

        `Message: ${formatDetail(
          data.message
        )}`,

        `Page: ${landingPage}`,
      ].join("\n");

      await appendLeadRow(SHEET_TAB, {
        referenceId,

        // Identifies the submitted form.
        registerAs: "Exhibitor Enquiry",
        type: "Exhibitor Enquiry",

        // Company
        companyName: data.companyName,
        company: data.companyName,
        website: data.website || "",

        // Contact person
        name: fullName,
        contactPerson: fullName,
        designation: data.designation,

        // Contact details
        email: data.email,
        phone: data.mobile,

        // Location
        country: data.country,
        city: data.city ?? "",

        // Existing sheet:
        // Booth Size Requirement column
        boothSizeRequirement:
          data.requiredArea || "",

        // Existing sheet:
        // Area of Interest column
        areaOfInterest:
          data.productCategory,

        productInterest:
          data.productCategory,

        // Existing Message column:
        // preserves other exhibitor fields.
        message: sheetMessage,

        // Attribution
        utmSource,
        utmMedium,
        utmCampaign,
        landingPage,
      });

      await ExhibitorEnquiry.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "synced",
        }
      ).catch((error) => {
        console.error(
          "Exhibitor Sheets status update failed:",
          error
        );
      });
    } catch (error) {
      console.error(
        "Exhibitor Google Sheets sync failed:",
        error
      );

      await ExhibitorEnquiry.updateOne(
        { referenceId },
        {
          sheetsSyncStatus: "failed",
        }
      ).catch(() => {});
    }
  }

  /* ========================================
     9. ORGANISER-ONLY EMAIL

     Existing admin-only email helper.
     No customer acknowledgement here.
  ======================================== */

  if (isEmailConfigured()) {
    const recipients =
      getNotificationRecipients();

    if (recipients.length !== 2) {
      console.error(
        "Exhibitor notification requires exactly two admin recipients."
      );

      await ExhibitorEnquiry.updateOne(
        { referenceId },
        {
          emailStatus: "failed",
        }
      ).catch(() => {});
    } else {
      try {
        await sendExhibitorEnquiryEmails({
          ...data,
          referenceId,
        });

        await ExhibitorEnquiry.updateOne(
          { referenceId },
          {
            emailStatus: "sent",
          }
        ).catch((error) => {
          console.error(
            "Exhibitor email status update failed:",
            error
          );
        });
      } catch (error) {
        console.error(
          "Exhibitor admin email failed:",
          error
        );

        await ExhibitorEnquiry.updateOne(
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

     Reference ID retained for existing
     frontend success handling.
  ======================================== */

  return NextResponse.json({
    success: true,
    referenceId,
  });
}
