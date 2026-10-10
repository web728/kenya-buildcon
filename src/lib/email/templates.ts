
import { event } from "@/config/event";

/* ==========================================
   KENYA BUILDCON BRAND
========================================== */

const BLACK = "#111111";
const BLACK_SOFT = "#191919";
const BLACK_CARD = "#202020";
const RED = "#BE202B";
const GREEN = "#25B34B";
const WHITE = "#FFFFFF";
const MUTED = "#B8B8B8";
const BORDER = "#393939";

type DetailRow = {
  label: string;
  value?: string | number | boolean | null;
};

type OrganiserNotificationParams = {
  heading: string;
  referenceId?: string;
  rows: DetailRow[];
};

type UserAcknowledgementParams = {
  greetingName: string;
  heading: string;
  bodyText: string;
  referenceId?: string;
};

/* ==========================================
   SAFE HTML FORMATTING
========================================== */

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayValue(
  value: DetailRow["value"]
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

function htmlValue(
  value: DetailRow["value"]
): string {
  return escapeHtml(displayValue(value));
}

/* ==========================================
   PREMIUM EMAIL SHELL
========================================== */

function baseLayout(
  bodyHtml: string,
  previewText: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">

  <title>${escapeHtml(event.name)}</title>
</head>

<body bgcolor="${BLACK}"
  style="margin:0;padding:0;background-color:${BLACK};color:${WHITE};font-family:Arial,Helvetica,sans-serif;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BLACK};font-size:1px;">
    ${escapeHtml(previewText)}
  </div>

  <table role="presentation"
    cellpadding="0"
    cellspacing="0"
    border="0"
    width="100%"
    bgcolor="${BLACK}"
    style="width:100%;background-color:${BLACK};border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <table role="presentation"
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          bgcolor="${BLACK_SOFT}"
          style="width:100%;max-width:680px;background-color:${BLACK_SOFT};border:1px solid ${BORDER};border-collapse:collapse;">

          <!-- HEADER -->
          <tr>
            <td bgcolor="${BLACK}"
              style="padding:34px 30px 30px;background-color:${BLACK};">

              <p style="margin:0 0 12px;font-size:10px;font-weight:800;line-height:1.5;letter-spacing:2.1px;color:${GREEN};">
                OFFICIAL WEBSITE NOTIFICATION
              </p>

              <p style="margin:0;color:${WHITE};font-size:30px;font-weight:900;line-height:1.2;letter-spacing:-0.7px;">
                KENYA
                <span style="color:${RED};">BUILDCON</span>
              </p>

              <p style="margin:11px 0 0;color:${MUTED};font-size:12px;font-weight:600;line-height:1.7;">
                ${escapeHtml(event.editionLabel)}
                &nbsp; | &nbsp;
                INTERNATIONAL EXPO 2027
              </p>

            </td>
          </tr>

          <!-- RED GREEN BRAND BAR -->
          <tr>
            <td style="padding:0;">
              <table role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="border-collapse:collapse;">
                <tr>
                  <td bgcolor="${RED}" height="5"
                    width="75%" style="font-size:0;line-height:0;background-color:${RED};">
                    &nbsp;
                  </td>
                  <td bgcolor="${GREEN}" height="5"
                    width="25%" style="font-size:0;line-height:0;background-color:${GREEN};">
                    &nbsp;
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td bgcolor="${BLACK_SOFT}"
              style="padding:32px 30px 38px;background-color:${BLACK_SOFT};">

              ${bodyHtml}

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td bgcolor="${BLACK}"
              style="padding:28px 30px;background-color:${BLACK};border-top:1px solid ${BORDER};">

              <p style="margin:0 0 7px;color:${WHITE};font-size:14px;font-weight:800;line-height:1.5;">
                ${escapeHtml(event.name)}
              </p>

              <p style="margin:0 0 14px;color:${MUTED};font-size:12px;line-height:1.8;">
                ${escapeHtml(event.dates.display)}
                <br>
                ${escapeHtml(event.venue.fullLocation)}
              </p>

              <a href="https://www.kenyabuildcon.com"
                target="_blank"
                style="font-size:12px;color:${GREEN};font-weight:800;text-decoration:none;">
                www.kenyabuildcon.com
              </a>

              <p style="margin:22px 0 0;padding-top:16px;border-top:1px solid ${BORDER};font-size:10px;line-height:1.7;color:${MUTED};">
                Internal website notification for the exhibition organising team.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/* ==========================================
   DETAIL TABLE ROW
========================================== */

function detailRow(
  row: DetailRow,
  index: number
): string {
  const background =
    index % 2 === 0
      ? BLACK_SOFT
      : BLACK_CARD;

  return `
    <tr>
      <td valign="top"
        width="37%"
        bgcolor="${background}"
        style="width:37%;padding:15px 14px;background-color:${background};border-bottom:1px solid ${BORDER};color:${MUTED};font-size:12px;font-weight:700;line-height:1.7;">
        ${escapeHtml(row.label)}
      </td>

      <td valign="top"
        bgcolor="${background}"
        style="padding:15px 14px;background-color:${background};border-bottom:1px solid ${BORDER};color:${WHITE};font-size:13px;font-weight:600;line-height:1.75;overflow-wrap:anywhere;word-break:break-word;white-space:pre-wrap;">
        ${htmlValue(row.value)}
      </td>
    </tr>
  `;
}

/* ==========================================
   ADMIN NOTIFICATION EMAIL
========================================== */

export function organiserNotificationEmail({
  heading,
  rows,
}: OrganiserNotificationParams): string {
  // Internal reference IDs are deliberately
  // excluded from visible email content.

  const detailsHtml = rows
    .map((row, index) =>
      detailRow(row, index)
    )
    .join("");

  // Copy-friendly plain text presented
  // directly inside the email.
  const copyText = rows
    .map(
      (row) =>
        `${row.label}: ${displayValue(row.value)}`
    )
    .join("\n");

  const content = `
    <!-- FORM CATEGORY -->
    <p style="margin:0 0 13px;color:${GREEN};font-size:10px;font-weight:800;letter-spacing:2px;line-height:1.5;">
      NEW FORM SUBMISSION
    </p>

    <!-- TITLE -->
    <h1 style="margin:0 0 15px;color:${WHITE};font-size:27px;font-weight:900;line-height:1.3;letter-spacing:-0.5px;">
      ${escapeHtml(heading)}
    </h1>

    <p style="margin:0 0 25px;color:${MUTED};font-size:13px;line-height:1.9;">
      A new submission has been received through
      the official Kenya Buildcon International
      Expo 2027 website.
    </p>

    <!-- WEBSITE IDENTIFICATION -->
    <table role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="border-collapse:collapse;margin-bottom:23px;">
      <tr>
        <td bgcolor="${BLACK_CARD}"
          style="background-color:${BLACK_CARD};padding:17px 18px;border-left:4px solid ${RED};">

          <p style="margin:0 0 6px;color:${MUTED};font-size:10px;line-height:1.5;font-weight:800;letter-spacing:1px;">
            SOURCE WEBSITE
          </p>

          <p style="margin:0;color:${WHITE};font-size:14px;font-weight:800;line-height:1.6;">
            Kenya Buildcon International Expo 2027
          </p>

        </td>
      </tr>
    </table>

    <!-- DETAILS HEADING -->
    <p style="margin:0 0 12px;color:${WHITE};font-size:14px;font-weight:800;line-height:1.5;">
      Submitted Information
    </p>

    <!-- DETAILS -->
    <table role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="border-collapse:collapse;border:1px solid ${BORDER};">

      ${detailsHtml}

    </table>

    <!-- COPY FRIENDLY VERSION -->
    <table role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="border-collapse:collapse;margin-top:27px;">

      <tr>
        <td bgcolor="${BLACK_CARD}"
          style="padding:20px;background-color:${BLACK_CARD};border:1px solid ${BORDER};border-top:3px solid ${GREEN};">

          <p style="margin:0 0 7px;color:${GREEN};font-size:10px;font-weight:800;letter-spacing:1.4px;line-height:1.6;">
            COPY-READY DETAILS
          </p>

          <p style="margin:0 0 15px;color:${MUTED};font-size:12px;line-height:1.8;">
            Select the text below to copy all
            submitted fields. No attachment required.
          </p>

          <div style="padding:16px;background-color:${BLACK};border:1px solid ${BORDER};">
            <pre style="margin:0;color:${WHITE};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.9;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(copyText)}</pre>
          </div>

        </td>
      </tr>
    </table>

    <p style="margin:23px 0 0;color:${MUTED};font-size:11px;line-height:1.8;">
      This is an automated internal notification.
      No reply has been sent to the person who
      submitted the form.
    </p>
  `;

  return baseLayout(
    content,
    `New submission: ${heading}`
  );
}

/* ==========================================
   ACKNOWLEDGEMENT TEMPLATE

   Kept for compatibility only.
   Does not send an email itself.
========================================== */

export function userAcknowledgementEmail({
  greetingName,
  heading,
  bodyText,
}: UserAcknowledgementParams): string {
  const content = `
    <p style="margin:0 0 12px;color:${GREEN};font-size:10px;font-weight:800;letter-spacing:1.6px;">
      KENYA BUILDCON 2027
    </p>

    <h1 style="margin:0 0 24px;color:${WHITE};font-size:26px;font-weight:900;line-height:1.3;">
      ${escapeHtml(heading)}
    </h1>

    <p style="margin:0 0 18px;color:${WHITE};font-size:14px;line-height:1.8;">
      Dear <strong>${escapeHtml(greetingName)}</strong>,
    </p>

    <p style="margin:0 0 24px;color:${MUTED};font-size:14px;line-height:1.9;white-space:pre-wrap;">
      ${escapeHtml(bodyText)}
    </p>

    <table role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="border-collapse:collapse;">
      <tr>
        <td bgcolor="${BLACK_CARD}"
          style="padding:20px;background-color:${BLACK_CARD};border-left:4px solid ${GREEN};">
          <p style="margin:0;color:${WHITE};font-size:13px;font-weight:700;line-height:1.8;">
            Your information has been received by the exhibition team.
          </p>
        </td>
      </tr>
    </table>
  `;

  return baseLayout(content, heading);
}
