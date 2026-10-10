
import "server-only";

import { google, type sheets_v4 } from "googleapis";
import { event } from "@/config/event";

/* ==========================================
   CONFIGURATION
========================================== */

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

const BASE64_CREDENTIALS =
  process.env.GOOGLE_CREDENTIALS_BASE64;

// Keep the existing operational Google Sheet tab.
export const TARGET_TAB_NAME =
  process.env.GOOGLE_SHEET_TAB ||
  "Website Enquiries";

const WEBSITE_NAME =
  "Kenya Buildcon International Expo 2027";

/* ==========================================
   EXACT GOOGLE SHEET COLUMNS

   IMPORTANT:
   Do not change the order of these columns.
========================================== */

export const SHEET_COLUMNS = [
  "Date & Time",
  "Platform",
  "Register As",
  "Company Name",
  "Contact Person",
  "Designation",
  "Email Id",
  "Mobile No.",
  "Website",
  "Address",
  "Country",
  "Booth Size Requirement",
  "Area of Interest",
  "Info. Get From",
  "Message",
  "Correction",
  "STATUS 1",
  "STATUS 2",
  "STATUS 3",
  "STATUS 4",
  "STATUS 5",
  "STATUS 6",
  "STATUS 7",
  "STATUS 8",
  "STATUS 9",
] as const;

/* ==========================================
   TYPES

   Compatible with existing API routes.
========================================== */

export type SheetRow = {
  // Identification
  referenceId?: string;
  type?: string;
  registerAs?: string;

  // Contact information
  name?: string;
  contactPerson?: string;

  company?: string;
  companyName?: string;

  designation?: string;

  email?: string;
  emailId?: string;

  phone?: string;
  mobile?: string;
  mobileNo?: string;

  website?: string;
  address?: string;
  city?: string;
  country?: string;

  // Exhibition information
  boothSizeRequirement?: string;

  productInterest?: string;
  areaOfInterest?: string;

  message?: string;

  // Source tracking
  infoGetFrom?: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  landingPage?: string;
};

/* ==========================================
   CREDENTIAL DECODING
========================================== */

type GoogleServiceAccountCredentials = {
  client_email?: string;
  private_key?: string;
  project_id?: string;
};

function getDecodedCredentials():
  GoogleServiceAccountCredentials | null {
  if (!BASE64_CREDENTIALS) {
    return null;
  }

  try {
    const decoded = Buffer.from(
      BASE64_CREDENTIALS,
      "base64"
    ).toString("utf-8");

    const credentials: unknown =
      JSON.parse(decoded);

    if (
      !credentials ||
      typeof credentials !== "object"
    ) {
      throw new Error(
        "Google credentials must be a JSON object."
      );
    }

    const result =
      credentials as GoogleServiceAccountCredentials;

    if (
      !result.client_email ||
      !result.private_key
    ) {
      throw new Error(
        "Google service-account credentials are incomplete."
      );
    }

    return result;
  } catch (error) {
    console.error(
      "Google Sheets credentials could not be decoded:",
      error instanceof Error
        ? error.message
        : "Unknown credentials error"
    );

    return null;
  }
}

/* ==========================================
   GOOGLE SHEETS CLIENT
========================================== */

let cachedClient:
  | sheets_v4.Sheets
  | null
  | undefined;

function getSheetsClient():
  sheets_v4.Sheets | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const credentials =
    getDecodedCredentials();

  if (!credentials) {
    cachedClient = null;
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  cachedClient = google.sheets({
    version: "v4",
    auth,
  });

  return cachedClient;
}

/* ==========================================
   CONFIGURATION CHECK
========================================== */

function isConfigured(): boolean {
  return Boolean(
    SHEET_ID &&
    BASE64_CREDENTIALS
  );
}

export function isSheetsConfigured(): boolean {
  return isConfigured();
}

/* ==========================================
   DATE FORMAT

   Use configured event time zone.
========================================== */

function formatCurrentDateTime(): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: event.dates.timezone,
  }).format(new Date());
}

/* ==========================================
   SAFE TEXT HELPERS
========================================== */

function cleanText(
  value: string | undefined,
  fallback = "-"
): string {
  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = value.trim();

  return cleaned || fallback;
}

function combineNonEmpty(
  values: Array<string | undefined>,
  separator = " | "
): string {
  return values
    .filter(
      (value): value is string =>
        typeof value === "string" &&
        value.trim().length > 0
    )
    .map((value) => value.trim())
    .join(separator);
}

/* ==========================================
   FORM IDENTIFICATION

   Each API route should pass registerAs.

   Examples:
   Contact Enquiry
   Brochure Download
   Exhibitor Registration
   Visitor Registration
========================================== */

function getFormName(row: SheetRow): string {
  return cleanText(
    row.registerAs || row.type,
    "Website Enquiry"
  );
}

/* ==========================================
   SOURCE TRACKING

   Stored in existing:
   Info. Get From column
========================================== */

function getSourceInfo(row: SheetRow): string {
  const sourceDetails = combineNonEmpty([
    `Website: ${WEBSITE_NAME}`,
    row.infoGetFrom,

    row.utmSource
      ? `UTM Source: ${row.utmSource}`
      : undefined,

    row.utmMedium
      ? `UTM Medium: ${row.utmMedium}`
      : undefined,

    row.utmCampaign
      ? `UTM Campaign: ${row.utmCampaign}`
      : undefined,

    row.landingPage
      ? `Page: ${row.landingPage}`
      : undefined,
  ]);

  return sourceDetails || "Direct Website";
}

/* ==========================================
   ENQUIRY MESSAGE

   Keep reference ID and form identification
   in the existing Message column.
========================================== */

function getEnquiryMessage(row: SheetRow): string {
  return combineNonEmpty([
    `Form: ${getFormName(row)}`,

    row.referenceId
      ? `Reference ID: ${row.referenceId}`
      : undefined,

    row.message
      ? `Enquiry: ${row.message}`
      : undefined,
  ]);
}

/* ==========================================
   MAP ROW TO EXACT 25 COLUMNS
========================================== */

function toRowValues(
  row: SheetRow
): string[] {
  const registerAs =
    getFormName(row);

  const companyName = cleanText(
    row.companyName || row.company
  );

  const contactPerson = cleanText(
    row.contactPerson || row.name
  );

  const designation = cleanText(
    row.designation
  );

  const emailId = cleanText(
    row.emailId || row.email
  );

  const mobileNo = cleanText(
    row.mobileNo ||
      row.mobile ||
      row.phone
  );

  const website = cleanText(
    row.website
  );

  const address = cleanText(
    row.address || row.city
  );

  const country = cleanText(
    row.country
  );

  const boothSizeRequirement =
    cleanText(
      row.boothSizeRequirement
    );

  const areaOfInterest = cleanText(
    row.areaOfInterest ||
      row.productInterest
  );

  const infoGetFrom =
    getSourceInfo(row);

  const message =
    getEnquiryMessage(row);

  const values = [
    formatCurrentDateTime(),
    "Website",
    registerAs,
    companyName,
    contactPerson,
    designation,
    emailId,
    mobileNo,
    website,
    address,
    country,
    boothSizeRequirement,
    areaOfInterest,
    infoGetFrom,
    message,

    // Operational fields: intentionally blank.
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  return values;
}

/* ==========================================
   APPEND LEAD TO GOOGLE SHEETS

   IMPORTANT:
   _tabIgnored is kept for backward
   compatibility with existing routes.

   All leads use TARGET_TAB_NAME.
========================================== */

export async function appendLeadRow(
  _tabIgnored: string,
  row: SheetRow
): Promise<void> {
  if (!isConfigured()) {
    throw new Error(
      "Google Sheets is not configured."
    );
  }

  const sheets =
    getSheetsClient();

  if (!sheets) {
    throw new Error(
      "Google Sheets client could not be created."
    );
  }

  const values =
    toRowValues(row);

  if (
    values.length !==
    SHEET_COLUMNS.length
  ) {
    throw new Error(
      `Google Sheets column mismatch: expected ${SHEET_COLUMNS.length}, received ${values.length}.`
    );
  }

  const escapedTabName =
    TARGET_TAB_NAME.replace(
      /'/g,
      "''"
    );

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,

    range:
      `'${escapedTabName}'!A:Y`,

    // Prevent user-entered values from being
    // interpreted as Sheets formulas.
    valueInputOption: "RAW",

    insertDataOption: "INSERT_ROWS",

    requestBody: {
      values: [values],
    },
  });
}
