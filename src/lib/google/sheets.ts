import { google, type sheets_v4 } from "googleapis";
import { event } from "@/config/event";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const BASE64_CREDENTIALS = process.env.GOOGLE_CREDENTIALS_BASE64;

/** Worksheet tab that receives every lead; override per deployment with GOOGLE_SHEET_TAB. */
export const TARGET_TAB_NAME = process.env.GOOGLE_SHEET_TAB || "Website Enquiries";

// Exact 25 columns strictly matching your operational Google Sheet
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

export type SheetRow = {
  // Primary identifier & category
  referenceId?: string;
  type?: string;
  registerAs?: string;

  // Contact & Organisation details
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

  // Trade Expo specifics
  boothSizeRequirement?: string;
  productInterest?: string;
  areaOfInterest?: string;
  message?: string;

  // Source & Attribution
  infoGetFrom?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string;
};

/**
 * Safely decodes base64 Google Credentials JSON string from environment variables
 */
function getDecodedCredentials() {
  if (!BASE64_CREDENTIALS) return null;

  try {
    const jsonString = Buffer.from(BASE64_CREDENTIALS, "base64").toString("utf-8");
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Failed to parse GOOGLE_CREDENTIALS_BASE64:", err);
    return null;
  }
}

let cachedClient: sheets_v4.Sheets | null | undefined;

/** Builds the Sheets client once per server instance (token refresh is handled by GoogleAuth). */
function getSheetsClient(): sheets_v4.Sheets | null {
  if (cachedClient !== undefined) return cachedClient;
  const credentials = getDecodedCredentials();
  if (!credentials) {
    cachedClient = null;
    return cachedClient;
  }
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  cachedClient = google.sheets({ version: "v4", auth });
  return cachedClient;
}

function isConfigured(): boolean {
  return Boolean(SHEET_ID && BASE64_CREDENTIALS);
}

function formatCurrentDateTime(): string {
  // Formats to Expo Local / East Africa Time (EAT, UTC+3)
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

function toRowValues(row: SheetRow): string[] {
  // Mapping values strictly in order of your Google Sheet columns
  const registerAs = row.registerAs || row.type || "Website Enquiry";
  const companyName = row.companyName || row.company || "-";
  const contactPerson = row.contactPerson || row.name || "-";
  const designation = row.designation || "-";
  const emailId = row.emailId || row.email || "-";
  const mobileNo = row.mobileNo || row.mobile || row.phone || "-";
  const website = row.website || "-";
  const address = row.address || row.city || "-";
  const country = row.country || "-";
  const boothSizeRequirement = row.boothSizeRequirement || "-";
  const areaOfInterest = row.areaOfInterest || row.productInterest || "-";
  const infoGetFrom =
    row.infoGetFrom ||
    (row.utmSource ? `UTM: ${row.utmSource}` : "") ||
    row.landingPage ||
    "Direct Website";
  const message = row.message || "-";

  return [
    formatCurrentDateTime(), // Date & Time
    "Website",               // Platform
    registerAs,              // Register As (Cookies, Contact, Brochure, Visitor, etc.)
    companyName,             // Company Name
    contactPerson,           // Contact Person
    designation,             // Designation
    emailId,                 // Email Id
    mobileNo,                // Mobile No.
    website,                 // Website
    address,                 // Address
    country,                 // Country
    boothSizeRequirement,    // Booth Size Requirement
    areaOfInterest,          // Area of Interest
    infoGetFrom,             // Info. Get From
    message,                 // Message
    "",                      // Correction (Blank)
    "",                      // STATUS 1 (Blank)
    "",                      // STATUS 2 (Blank)
    "",                      // STATUS 3 (Blank)
    "",                      // STATUS 4 (Blank)
    "",                      // STATUS 5 (Blank)
    "",                      // STATUS 6 (Blank)
    "",                      // STATUS 7 (Blank)
    "",                      // STATUS 8 (Blank)
    "",                      // STATUS 9 (Blank)
  ];
}

/**
 * Appends a lead row to the configured tab (TARGET_TAB_NAME) of the operational Google Sheet.
 * All lead types share one tab; the "Register As" column identifies the form.
 */
export async function appendLeadRow(_tabIgnored: string, row: SheetRow): Promise<void> {
  if (!isConfigured()) {
    console.warn("Google Sheets credentials not configured. Skipping append.");
    return;
  }

  const sheets = getSheetsClient();
  if (!sheets) {
    console.warn("Invalid Base64 Google credentials. Skipping append.");
    return;
  }

  // Append across columns A to Y (25 columns)
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `'${TARGET_TAB_NAME}'!A:Y`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [toRowValues(row)] },
  });
}

export function isSheetsConfigured(): boolean {
  return isConfigured();
}