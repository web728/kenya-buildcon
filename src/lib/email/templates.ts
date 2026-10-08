import { event } from "@/config/event";

const BRAND_RED = "#C8262D";
const BRAND_RED_DARK = "#9A1B22";
const BRAND_GREEN = "#25B34B";
const TEXT_MAIN = "#0F172A";
const TEXT_MUTED = "#64748B";

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
  <body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;color:${TEXT_MAIN};-webkit-font-smoothing:antialiased;">
    
    <!-- Outer Background Table -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;padding:60px 16px;">
      <tr>
        <td align="center">
          
          <!-- Main Email Container -->
          <table role="presentation" width="100%" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px -15px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.1);border:1px solid #E2E8F0;">

            <!-- Premium Dark Header -->
            <tr>
              <td style="background-color:#070E14;padding:40px 48px;text-align:center;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <div style="font-size:28px;line-height:1.2;letter-spacing:-0.5px;">
                        <span style="color:${BRAND_RED};font-weight:900;">${escapeHtml(event.venue.country)}</span>
                        <span style="color:#ffffff;font-weight:900;"> ${escapeHtml(event.brandWord)}</span>
                      </div>
                      <div style="color:#94A3B8;font-size:12px;margin-top:10px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;">
                        ${escapeHtml(event.editionLabel)} &bull; International Expo ${escapeHtml(event.edition)}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Sleek Kenyan Flag Accent Bar -->
            <tr>
              <td style="padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="33.33%" height="4" style="background-color:${BRAND_RED};font-size:0;line-height:0;">&nbsp;</td>
                    <td width="33.33%" height="4" style="background-color:#ffffff;font-size:0;line-height:0;">&nbsp;</td>
                    <td width="33.33%" height="4" style="background-color:${BRAND_GREEN};font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding:48px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Sophisticated Footer -->
            <tr>
              <td style="background-color:#F1F5F9;padding:32px 48px;border-top:1px solid #E2E8F0;text-align:center;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <div style="color:#334155;font-weight:700;font-size:14px;margin-bottom:8px;">${escapeHtml(event.name)}</div>
                      <div style="color:${TEXT_MUTED};font-size:13px;line-height:1.6;margin-bottom:16px;">
                        ${escapeHtml(event.dates.display)} <br/>
                        ${escapeHtml(event.dates.openingHours)} &bull; ${escapeHtml(event.venue.fullLocation)}
                      </div>
                      <a href="${event.website}" style="display:inline-block;color:${BRAND_RED};text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;border-bottom:2px solid #FBCFE8;padding-bottom:2px;" target="_blank">
                        ${escapeHtml(event.websiteDisplay)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
          
          <!-- Bottom Copyright/Muted Text -->
          <table role="presentation" width="100%" style="max-width:640px;">
            <tr>
              <td style="padding:24px 0;text-align:center;color:#94A3B8;font-size:12px;">
                This is an automated notification from ${escapeHtml(event.brandWord)} system.
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
    <td style="padding:16px 20px;background-color:#F8FAFC;font-size:12px;color:${TEXT_MUTED};width:140px;vertical-align:top;border-bottom:1px solid #E2E8F0;text-transform:uppercase;letter-spacing:0.05em;font-weight:700;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:16px 20px;background-color:#ffffff;font-size:15px;color:${TEXT_MAIN};font-weight:600;border-bottom:1px solid #E2E8F0;white-space:pre-line;line-height:1.5;">
      ${escapeHtml(value)}
    </td>
  </tr>`;
}

// FIX: Removed `referenceId` from params completely
export function organiserNotificationEmail(params: {
  heading: string;
  rows: Array<{ label: string; value?: string | null }>;
}): string {
  const body = `
    <!-- Premium Badge -->
    <div style="display:inline-block;padding:6px 14px;background-color:#FEF2F2;color:${BRAND_RED_DARK};border:1px solid #FECACA;border-radius:24px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:20px;">
      &bull; Lead Notification
    </div>
    
    <h1 style="font-size:24px;font-weight:800;color:${TEXT_MAIN};margin:0 0 32px;letter-spacing:-0.5px;line-height:1.3;">
      ${escapeHtml(params.heading)}
    </h1>

    <!-- Sleek Data Table -->
    <div style="border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.02);">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${params.rows.map((r) => detailRow(r.label, r.value)).join("")}
      </table>
    </div>
  `;
  return baseLayout(body);
}

// FIX: Removed `referenceId` from params completely
export function userAcknowledgementEmail(params: {
  greetingName: string;
  heading: string;
  bodyText: string;
}): string {
  const body = `
    <h1 style="font-size:26px;font-weight:800;color:${TEXT_MAIN};margin:0 0 20px;letter-spacing:-0.5px;line-height:1.3;">
      ${escapeHtml(params.heading)}
    </h1>
    
    <p style="font-size:16px;line-height:1.7;color:#334155;margin:0 0 16px;">
      Dear <strong style="color:${TEXT_MAIN};">${escapeHtml(params.greetingName)}</strong>,
    </p>
    
    <p style="font-size:16px;line-height:1.7;color:#334155;margin:0 0 36px;">
      ${escapeHtml(params.bodyText)}
    </p>

    <!-- Premium Status Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(145deg, #F8FAFC, #F1F5F9);border:1px solid #E2E8F0;border-radius:12px;margin:0 0 36px;">
      <tr>
        <td style="padding:28px 20px;text-align:center;">
          <div style="width:48px;height:48px;background-color:#DCFCE7;color:${BRAND_GREEN};border-radius:50%;display:inline-block;line-height:48px;font-size:24px;margin-bottom:12px;">
            ✓
          </div>
          <div style="font-size:18px;font-weight:800;color:${TEXT_MAIN};margin-bottom:6px;">Status: Confirmed</div>
          <div style="font-size:14px;color:${TEXT_MUTED};font-weight:500;">Your details have been securely recorded.</div>
        </td>
      </tr>
    </table>

    <!-- Premium CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
      <tr>
        <td align="center">
          <a href="${event.website}" target="_blank" style="display:inline-block;background-color:${BRAND_RED};color:#ffffff;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:16px 36px;border-radius:8px;text-decoration:none;box-shadow:0 4px 12px rgba(200,38,45,0.25);">
            Explore Exhibition
          </a>
        </td>
      </tr>
    </table>

    <p style="font-size:14px;line-height:1.6;color:#94A3B8;margin:0;border-top:1px solid #E2E8F0;padding-top:24px;text-align:center;">
      If you have any queries, simply reply to this email. We look forward to hosting you.
    </p>
  `;
  return baseLayout(body);
}