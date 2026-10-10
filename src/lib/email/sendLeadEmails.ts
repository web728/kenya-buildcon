
import "server-only";

import {
  sendMail,
  getNotificationRecipients,
} from "./mailer";

import {
  organiserNotificationEmail,
} from "./templates";

import type { ExhibitorEnquiryInput } from "@/lib/validation/exhibitorEnquiry";
import type { VisitorRegistrationInput } from "@/lib/validation/visitorRegistration";
import type { ContactEnquiryInput } from "@/lib/validation/contactEnquiry";
import type { PartnerEnquiryInput } from "@/lib/validation/partnerEnquiry";
import type { BrochureDownloadInput } from "@/lib/validation/brochureDownload";

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

const WEBSITE_URL =
  "https://www.kenyabuildcon.com";

type NotificationRow = {
  label: string;
  value: string | number | boolean | null | undefined;
};

type NotificationOptions = {
  formName: string;
  rows: NotificationRow[];
};

function formatValue(
  value: NotificationRow["value"]
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function formatList(
  values: readonly string[] | undefined
): string {
  return values?.length
    ? values.join(", ")
    : "Not provided";
}

/**
 * Sends internal notification to the two
 * configured organisers only.
 *
 * No customer acknowledgement.
 * No downloadable attachments.
 * No visible reference ID.
 */
async function sendAdminNotification({
  formName,
  rows,
}: NotificationOptions): Promise<void> {
  const recipients =
    getNotificationRecipients();

  if (recipients.length !== 2) {
    throw new Error(
      "Exactly two unique admin notification recipients must be configured."
    );
  }

  const details = [
    {
      label: "Website",
      value: WEBSITE_NAME,
    },
    {
      label: "Website URL",
      value: WEBSITE_URL,
    },
    {
      label: "Submitted Form",
      value: formName,
    },
    ...rows,
  ].map((row) => ({
    label: row.label,
    value: formatValue(row.value),
  }));

  const plainText = [
    WEBSITE_NAME,
    WEBSITE_URL,
    "",
    formName,
    "====================================",
    "",
    ...details.map(
      ({ label, value }) =>
        `${label}: ${value}`
    ),
    "",
    "Internal organiser notification.",
  ].join("\n");

  await sendMail({
    to: recipients,

    subject: `[Kenya Buildcon 2027] ${formName}`,

    html: organiserNotificationEmail({
      heading: formName,
      rows: details,
    }),

    text: plainText,

    // No attachments.
  });
}

/* ==========================================
   EXHIBITOR ENQUIRY
========================================== */

export async function sendExhibitorEnquiryEmails(
  data: ExhibitorEnquiryInput & {
    referenceId: string;
  }
): Promise<void> {
  await sendAdminNotification({
    formName: "Exhibitor Enquiry Form",

    rows: [
      {
        label: "Company Name",
        value: data.companyName,
      },
      {
        label: "Country",
        value: data.country,
      },
      {
        label: "City",
        value: data.city,
      },
      {
        label: "Company Website",
        value: data.website,
      },
      {
        label: "Company Type",
        value: data.companyType,
      },
      {
        label: "First Name",
        value: data.firstName,
      },
      {
        label: "Last Name",
        value: data.lastName,
      },
      {
        label: "Designation",
        value: data.designation,
      },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Mobile / WhatsApp",
        value: data.mobile,
      },
      {
        label: "Product Category",
        value: data.productCategory,
      },
      {
        label: "Products / Services",
        value: data.productsServices,
      },
      {
        label: "Preferred Participation",
        value: data.preferredParticipation,
      },
      {
        label: "Required Area",
        value: data.requiredArea,
      },
      {
        label: "Existing Business in Kenya",
        value: data.existingBusinessInKenya,
      },
      {
        label: "Looking for Distributor",
        value: data.lookingForDistributor,
      },
      {
        label: "Message",
        value: data.message,
      },
    ],
  });
}

/* ==========================================
   VISITOR REGISTRATION
========================================== */

export async function sendVisitorRegistrationEmails(
  data: VisitorRegistrationInput & {
    referenceId: string;
  }
): Promise<void> {
  await sendAdminNotification({
    formName: "Visitor Registration Form",

    rows: [
      {
        label: "First Name",
        value: data.firstName,
      },
      {
        label: "Last Name",
        value: data.lastName,
      },
      {
        label: "Company",
        value: data.company,
      },
      {
        label: "Designation",
        value: data.designation,
      },
      {
        label: "Country",
        value: data.country,
      },
      {
        label: "City",
        value: data.city,
      },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Mobile / WhatsApp",
        value: data.mobile,
      },
      {
        label: "Nature of Business",
        value: data.natureOfBusiness,
      },
      {
        label: "Products Interested",
        value: formatList(
          data.productsInterested
        ),
      },
      {
        label: "Purchasing Responsibility",
        value: data.purchasingResponsibility,
      },
      {
        label: "Purpose of Visit",
        value: data.purposeOfVisit,
      },
    ],
  });
}

/* ==========================================
   CONTACT ENQUIRY
========================================== */

export async function sendContactEnquiryEmails(
  data: ContactEnquiryInput & {
    referenceId: string;
  }
): Promise<void> {
  await sendAdminNotification({
    formName: "Contact Enquiry Form",

    rows: [
      {
        label: "Full Name",
        value: data.name,
      },
      {
        label: "Company / Organisation",
        value: data.company,
      },
      {
        label: "Designation",
        value: data.designation,
      },
      {
        label: "Country",
        value: data.country,
      },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Mobile / WhatsApp",
        value: data.mobile,
      },
      {
        label: "Area of Interest",
        value: data.interest,
      },
      {
        label: "Message",
        value: data.message,
      },
    ],
  });
}

/* ==========================================
   PARTNERSHIP ENQUIRY
========================================== */

export async function sendPartnerEnquiryEmails(
  data: PartnerEnquiryInput & {
    referenceId: string;
  }
): Promise<void> {
  await sendAdminNotification({
    formName: "Partnership Enquiry Form",

    rows: [
      {
        label: "Organisation",
        value: data.organisation,
      },
      {
        label: "Organisation Type",
        value: data.organisationType,
      },
      {
        label: "Country",
        value: data.country,
      },
      {
        label: "Organisation Website",
        value: data.website,
      },
      {
        label: "Contact Person",
        value: data.contactPerson,
      },
      {
        label: "Designation",
        value: data.designation,
      },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Phone",
        value: data.phone,
      },
      {
        label: "Approximate Membership",
        value: data.approximateMembership,
      },
      {
        label: "Industry Represented",
        value: data.industryRepresented,
      },
      {
        label: "Nature of Enquiry",
        value: data.natureOfEnquiry,
      },
      {
        label: "Message",
        value: data.message,
      },
    ],
  });
}

/* ==========================================
   BROCHURE DOWNLOAD
========================================== */

export async function sendBrochureDownloadEmails(
  data: BrochureDownloadInput & {
    referenceId: string;
  }
): Promise<void> {
  await sendAdminNotification({
    formName: "Brochure Download Form",

    rows: [
      {
        label: "Full Name",
        value: data.name,
      },
      {
        label: "Company / Organisation",
        value: data.company,
      },
      {
        label: "Country",
        value: data.country,
      },
      {
        label: "Email",
        value: data.email,
      },
      {
        label: "Mobile / WhatsApp",
        value: data.mobile,
      },
    ],
  });
}

/* ==========================================
   NEWSLETTER SUBSCRIPTION
========================================== */

export async function sendNewsletterSubscriptionEmails(
  data: {
    email: string;
    country?: string;
    interest?: string[];
  }
): Promise<void> {
  await sendAdminNotification({
    formName: "Newsletter Subscription Form",

    rows: [
      {
        label: "Subscriber Email",
        value: data.email,
      },
      {
        label: "Country",
        value: data.country,
      },
      {
        label: "Interests",
        value: formatList(data.interest),
      },
    ],
  });
}
