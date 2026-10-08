// Ensures the operational Google Sheet has the lead tab and header row the app
// writes to (see src/lib/google/sheets.ts). Safe to re-run — never deletes data.
// Run with: npm run setup:sheets

import { google } from "googleapis";

const { GOOGLE_SHEET_ID, GOOGLE_CREDENTIALS_BASE64, GOOGLE_SHEET_TAB } = process.env;

if (!GOOGLE_SHEET_ID || !GOOGLE_CREDENTIALS_BASE64) {
  console.error("GOOGLE_SHEET_ID and GOOGLE_CREDENTIALS_BASE64 must both be set.");
  process.exit(1);
}

const TAB = GOOGLE_SHEET_TAB || "Website Enquiries";

// Must match SHEET_COLUMNS in src/lib/google/sheets.ts (25 columns, A–Y)
const HEADERS = [
  "Date & Time", "Platform", "Register As", "Company Name", "Contact Person", "Designation",
  "Email Id", "Mobile No.", "Website", "Address", "Country", "Booth Size Requirement",
  "Area of Interest", "Info. Get From", "Message", "Correction",
  "STATUS 1", "STATUS 2", "STATUS 3", "STATUS 4", "STATUS 5", "STATUS 6", "STATUS 7", "STATUS 8", "STATUS 9",
];

let credentials;
try {
  credentials = JSON.parse(Buffer.from(GOOGLE_CREDENTIALS_BASE64, "base64").toString("utf-8"));
} catch {
  console.error("GOOGLE_CREDENTIALS_BASE64 is not valid base64-encoded service-account JSON.");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function main() {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID });
  const existingTitles = new Set(spreadsheet.data.sheets?.map((s) => s.properties?.title) ?? []);

  if (!existingTitles.has(TAB)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: GOOGLE_SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: TAB } } }] },
    });
    console.log(`Created tab: ${TAB}`);
  }

  const existing = await sheets.spreadsheets.values.get({ spreadsheetId: GOOGLE_SHEET_ID, range: `'${TAB}'!A1:Y1` });
  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `'${TAB}'!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
    console.log(`Wrote header row to ${TAB}`);
  } else {
    console.log(`${TAB} already has a header row — left unchanged`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
