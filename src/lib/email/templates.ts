
import { event } from "@/config/event";

const RED = "#BE202B";
const GREEN = "#25B34B";
const DARK = "#111111";
const MUTED = "#646464";
const BORDER = "#E8E8E8";

type DetailRow = {
  label: string;
  value?: string | null;
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

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readable(value?: string | null): string {
  return value?.trim() || "Not provided";
}

function baseLayout(
  content: string,
  previewText: string
): string {
  const website = event.website;
  const name = event.name;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(name)}</title>
</head>

<body style="margin:0;padding:0;background:#F4F5F6;color:${DARK};font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;line-height:1px;color:#F4F5F6;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(previewText)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0"
    border="0" width="100%" style="background:#F4F5F6;">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <table role="presentation" cellpadding="0" cellspacing="0"
          border="0" width="100%"
          style="max-width:680px;border-collapse:collapse;background:#FFFFFF;border:1px solid #E5E5E5;">

          <tr>
            <td style="background:${DARK};padding:29px 28px;">
              <p style="margin:0 0 7px;font-size:10px;font-weight:700;line-height:1.6;letter-spacing:2px;color:#F4AFB4;">
                OFFICIAL EXHIBITION WEBSITE
              </p>

              <h1 style="margin:0;color:#FFFFFF;font-size:25px;font-weight:800;line-height:1.3;letter-spacing:-0.5px;">
                KENYA <span style="color:#F26B72;">BUILDCON</span>
              </h1>

              <p style="margin:7px 0 0;color:#C9C9C9;font-size:11px;line-height:1.7;font-weight:600;">
                ${escapeHtml(event.editionLabel)} &nbsp;|&nbsp; International Expo 2027
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellpadding="0"
                cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td width="80%" height="4" style="background:${RED};font-size:0;">&nbsp;</td>
                  <td width="15%" height="4" style="background:${GREEN};font-size:0;">&nbsp;</td>
                  <td width="5%" height="4" style="background:${DARK};font-size:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 28px 34px;">
              ${content}
            </td>
          </tr>

          <tr>
            <td style="padding:23px 28px;background:#FAFAFA;border-top:1px solid ${BORDER};">
              <p style="margin:0 0 5px;color:${DARK};font-weight:800;font-size:13px;line-height:1.6;">
                ${escapeHtml(name)}
              </p>

              <p style="margin:0 0 12px;color:${MUTED};font-size:12px;line-height:1.8;">
                ${escapeHtml(event.dates.display)}<br />
                ${escapeHtml(event.venue.name)}, ${escapeHtml(event.venue.city)}, Kenya
              </p>

              <a href="${escapeHtml(website)}"
                style="color:${RED};font-size:12px;font-weight:700;text-decoration:none;">
                ${escapeHtml(event.websiteDisplay)}
              </a>
            </td>
          </tr>
        </table>

        <p style="max-width:680px;margin:15px 0 0;color:#888888;font-size:10px;line-height:1.8;text-align:center;">
          Automated internal notification from the Kenya Buildcon website.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(
  label: string,
  value?: string | null,
  index = 0
): string {
  const background =
    index % 2 === 0 ? "#FFFFFF" : "#FAFAFA";

  return `
    <tr>
      <td valign="top" width="36%"
        style="padding:14px 15px;background:${background};border-bottom:1px solid ${BORDER};color:${MUTED};font-weight:700;font-size:12px;line-height:1.6;">
        ${escapeHtml(label)}
      </td>
      <td valign="top"
        style="padding:14px 15px;background:${background};border-bottom:1px solid ${BORDER};color:${DARK};font-weight:600;font-size:13px;line-height:1.7;overflow-wrap:anywhere;word-break:break-word;white-space:pre-wrap;">
        ${escapeHtml(readable(value))}
      </td>
    </tr>`;
}

export function organiserNotificationEmail({
  heading,
  rows,
}: OrganiserNotificationParams): string {
  // Reference ID is deliberately not rendered.
  // Empty/missing business values remain visible.
  const details = rows
    .map((row, index) =>
      detailRow(row.label, row.value, index)
    )
    .join("");

  const content = `
    <p style="margin:0 0 15px;color:${RED};font-size:10px;font-weight:800;letter-spacing:1.5px;line-height:1.6;">
      NEW WEBSITE FORM SUBMISSION
    </p>

    <h2 style="margin:0;color:${DARK};font-size:25px;font-weight:800;letter-spacing:-0.5px;line-height:1.3;">
      ${escapeHtml(heading)}
    </h2>

    <p style="margin:12px 0 23px;color:${MUTED};font-size:13px;line-height:1.85;">
      A new enquiry has been submitted through the official
      Kenya Buildcon International Expo 2027 website.
      The complete form information is provided below.
    </p>

    <table role="presentation" cellpadding="0"
      cellspacing="0" border="0" width="100%"
      style="border-collapse:collapse;margin-bottom:22px;background:#F7F8F8;border-left:3px solid ${GREEN};">
      <tr>
        <td style="padding:13px 16px;">
          <p style="margin:0;color:${DARK};font-size:12px;line-height:1.7;font-weight:700;">
            Website: Kenya Buildcon International Expo 2027
          </p>
        </td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0"
      cellspacing="0" border="0" width="100%"
      style="border-collapse:collapse;border:1px solid ${BORDER};">
      ${details}
    </table>

    <table role="presentation" cellpadding="0"
      cellspacing="0" border="0" width="100%"
      style="border-collapse:collapse;margin-top:22px;">
      <tr>
        <td style="padding:15px 17px;background:#F7F7F7;border:1px solid ${BORDER};">
          <p style="margin:0 0 5px;font-size:12px;font-weight:800;color:${DARK};">
            Need all enquiry details?
          </p>
          <p style="margin:0;color:${MUTED};font-size:12px;line-height:1.8;">
            Open the attached <strong>Enquiry-Details.txt</strong>
            file to copy the complete submission or save it
            for your records.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:18px 0 0;font-size:11px;color:#888888;line-height:1.8;">
      This notification is intended for the exhibition organising team.
    </p>
  `;

  return baseLayout(
    content,
    `New Kenya Buildcon website enquiry: ${heading}`
  );
}

// Retain the original named export for compatibility.
// This function only generates HTML; it does not send emails.
export function userAcknowledgementEmail({
  greetingName,
  heading,
  bodyText,
}: UserAcknowledgementParams): string {
  const content = `
    <h2 style="margin:0 0 18px;font-size:24px;color:${DARK};font-weight:800;line-height:1.3;">
      ${escapeHtml(heading)}
    </h2>

    <p style="margin:0 0 15px;font-size:14px;color:${MUTED};line-height:1.8;">
      Dear <strong style="color:${DARK};">${escapeHtml(greetingName)}</strong>,
    </p>

    <p style="margin:0 0 25px;font-size:14px;color:${MUTED};line-height:1.9;">
      ${escapeHtml(bodyText)}
    </p>

    <p style="margin:0;padding:18px;border-left:3px solid ${GREEN};background:#F7F8F8;color:${DARK};font-size:13px;line-height:1.8;">
      Your information has been received by the exhibition team.
    </p>
  `;

  return baseLayout(content, heading);
}
