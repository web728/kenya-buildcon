import { event } from "@/config/event";

const BRAND_RED = "#C8262D";
const BRAND_RED_DARK = "#A51E24";
const BRAND_GREEN = "#25B34B";

/** Escapes user-supplied text before it is interpolated into email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function baseLayout(bodyHtml: string): string {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(event.name)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F2F5F8;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;color:#1E293B;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F2F5F8;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01);border:1px solid #E2E8F0;">

            <!-- Header Section -->
            <tr>
              <td style="background:#0B1720;padding:32px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="color:${BRAND_RED};font-weight:900;font-size:22px;letter-spacing:-0.5px;">${escapeHtml(event.venue.country)}</span>
                      <span style="color:#ffffff;font-weight:900;font-size:22px;letter-spacing:-0.5px;"> ${escapeHtml(event.brandWord)}</span>
                      <div style="color:#94A3B8;font-size:11px;margin-top:6px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">
                        ${escapeHtml(event.editionLabel)} &middot; International Expo ${escapeHtml(event.edition)}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Kenyan flag stripe (table cells render in every client, unlike CSS gradients) -->
            <tr>
              <td style="padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td height="4" style="background:${BRAND_RED};font-size:0;line-height:0;">&nbsp;</td>
                    <td height="4" style="background:#ffffff;font-size:0;line-height:0;">&nbsp;</td>
                    <td height="4" style="background:${BRAND_GREEN};font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main Content Area -->
            <tr>
              <td style="padding:40px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer Section -->
            <tr>
              <td style="background-color:#F8FAFC;padding:28px 40px;border-top:1px solid #F1F5F9;font-size:12px;line-height:1.6;color:#64748B;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <strong style="color:#334155;">${escapeHtml(event.name)}</strong><br />
                      ${escapeHtml(event.dates.display)} &nbsp;&bull;&nbsp; ${escapeHtml(event.dates.openingHours)} &nbsp;&bull;&nbsp; ${escapeHtml(event.venue.fullLocation)}<br />
                      <a href="${event.website}" style="color:${BRAND_RED_DARK};text-decoration:none;font-weight:600;" target="_blank">${escapeHtml(event.websiteDisplay)}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value?: string | null): string {
  if (!value) return "";
  return `
  <tr>
    <td style="padding:10px 0;font-size:13px;color:#64748B;width:160px;vertical-align:top;border-bottom:1px solid #F1F5F9;font-weight:500;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;font-size:13px;color:#0F172A;font-weight:600;border-bottom:1px solid #F1F5F9;white-space:pre-line;">${escapeHtml(value)}</td>
  </tr>`;
}

export function organiserNotificationEmail(params: {
  heading: string;
  referenceId: string;
  rows: Array<{ label: string; value?: string | null }>;
}): string {
  const body = `
    <div style="display:inline-block;padding:4px 12px;background:#FDECEC;color:${BRAND_RED_DARK};border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;letter-spacing:0.02em;">
      ADMIN NOTIFICATION
    </div>
    <h1 style="font-size:22px;font-weight:800;color:#0F172A;margin:0 0 6px;letter-spacing:-0.5px;">${escapeHtml(params.heading)}</h1>
    <p style="font-size:13px;color:#64748B;margin:0 0 24px;">Reference ID: <strong style="color:${BRAND_RED_DARK};">${escapeHtml(params.referenceId)}</strong></p>

    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:8px 20px;margin-bottom:10px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${params.rows.map((r) => detailRow(r.label, r.value)).join("")}
      </table>
    </div>
  `;
  return baseLayout(body);
}

export function userAcknowledgementEmail(params: {
  greetingName: string;
  heading: string;
  bodyText: string;
  referenceId: string;
}): string {
  const body = `
    <h1 style="font-size:22px;font-weight:800;color:#0F172A;margin:0 0 16px;letter-spacing:-0.5px;">${escapeHtml(params.heading)}</h1>
    <p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 12px;">Dear <strong>${escapeHtml(params.greetingName)}</strong>,</p>
    <p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 28px;">${escapeHtml(params.bodyText)}</p>

    <!-- Reference Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FEF6F6;border:1px solid #F8C9CB;border-radius:12px;margin:0 0 28px;">
      <tr>
        <td style="padding:20px;text-align:center;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:${BRAND_RED_DARK};font-weight:700;margin-bottom:4px;">Your Official Reference ID</div>
          <div style="font-size:26px;font-weight:900;color:${BRAND_RED};letter-spacing:1px;">${escapeHtml(params.referenceId)}</div>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td align="center">
          <a href="${event.website}" target="_blank" style="display:inline-block;background-color:${BRAND_RED};color:#ffffff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;">
            Visit Event Website
          </a>
        </td>
      </tr>
    </table>

    <p style="font-size:13px;line-height:1.6;color:#64748B;margin:0;border-top:1px dashed #E2E8F0;padding-top:20px;">
      This email confirms receipt of your submission. Our team will review your details and be in touch shortly regarding next steps.
    </p>
  `;
  return baseLayout(body);
}
