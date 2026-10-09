
import { event } from "@/config/event";

/* ==========================================
   BRAND COLORS
========================================== */

const BRAND_RED = "#BE202B";
const BRAND_RED_DARK = "#A51B25";
const BRAND_GREEN = "#25B34B";

const TEXT_MAIN = "#111111";
const TEXT_MUTED = "#64748B";

/* ==========================================
   TYPES
========================================== */

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

/* ==========================================
   HTML ESCAPING
========================================== */

/**
 * Escapes user-supplied text before it is
 * interpolated into email HTML.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ==========================================
   BASE EMAIL LAYOUT
========================================== */

function baseLayout(bodyHtml: string): string {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    >
    <title>${escapeHtml(event.name)}</title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background-color:#F8FAFC;
      font-family:Arial,Helvetica,sans-serif;
      color:${TEXT_MAIN};
      -webkit-font-smoothing:antialiased;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        background-color:#F8FAFC;
        padding:40px 14px;
      "
    >
      <tr>
        <td align="center">

          <!-- Main Email Container -->
          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              max-width:640px;
              background-color:#FFFFFF;
              border:1px solid #E2E8F0;
              border-collapse:separate;
              border-spacing:0;
            "
          >

            <!-- Header -->
            <tr>
              <td
                align="center"
                style="
                  background-color:${TEXT_MAIN};
                  padding:34px 24px;
                  text-align:center;
                "
              >
                <div
                  style="
                    font-size:27px;
                    font-weight:800;
                    line-height:1.25;
                    letter-spacing:-0.5px;
                  "
                >
                  <span style="color:#F26B70;">
                    ${escapeHtml(event.venue.country)}
                  </span>

                  <span style="color:#FFFFFF;">
                    ${escapeHtml(event.brandWord)}
                  </span>
                </div>

                <div
                  style="
                    margin-top:9px;
                    color:#CBD5E1;
                    font-size:11px;
                    font-weight:700;
                    letter-spacing:1.5px;
                    text-transform:uppercase;
                  "
                >
                  ${escapeHtml(event.editionLabel)}
                  &bull;
                  International Expo
                  ${escapeHtml(String(event.edition))}
                </div>
              </td>
            </tr>

            <!-- Brand Accent -->
            <tr>
              <td style="padding:0;">
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="border-collapse:collapse;"
                >
                  <tr>
                    <td
                      width="45%"
                      height="4"
                      style="
                        background-color:${BRAND_RED};
                        font-size:0;
                        line-height:0;
                      "
                    >&nbsp;</td>

                    <td
                      width="10%"
                      height="4"
                      style="
                        background-color:${TEXT_MAIN};
                        font-size:0;
                        line-height:0;
                      "
                    >&nbsp;</td>

                    <td
                      width="45%"
                      height="4"
                      style="
                        background-color:${BRAND_GREEN};
                        font-size:0;
                        line-height:0;
                      "
                    >&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td
                style="
                  padding:36px 30px;
                  background-color:#FFFFFF;
                "
              >
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  background-color:#F8FAFC;
                  border-top:1px solid #E2E8F0;
                  padding:28px 24px;
                  text-align:center;
                "
              >
                <div
                  style="
                    color:${TEXT_MAIN};
                    font-size:14px;
                    font-weight:800;
                    margin-bottom:9px;
                  "
                >
                  ${escapeHtml(event.name)}
                </div>

                <div
                  style="
                    color:${TEXT_MUTED};
                    font-size:12px;
                    line-height:1.8;
                    margin-bottom:15px;
                  "
                >
                  ${escapeHtml(event.dates.display)}
                  <br>
                  ${escapeHtml(event.dates.openingHours)}
                  &bull;
                  ${escapeHtml(event.venue.fullLocation)}
                </div>

                <a
                  href="${escapeHtml(event.website)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    color:${BRAND_RED};
                    text-decoration:none;
                    font-size:12px;
                    font-weight:800;
                    letter-spacing:0.4px;
                  "
                >
                  ${escapeHtml(event.websiteDisplay)}
                </a>
              </td>
            </tr>

          </table>

          <!-- Automated Email Note -->
          <table
            role="presentation"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="max-width:640px;"
          >
            <tr>
              <td
                align="center"
                style="
                  padding:20px 12px;
                  color:#94A3B8;
                  font-size:11px;
                  line-height:1.6;
                "
              >
                This is an automated email from
                ${escapeHtml(event.name)}.
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

/* ==========================================
   DETAIL ROW
========================================== */

function detailRow(
  label: string,
  value?: string | null
): string {
  if (!value) return "";

  return `
    <tr>
      <td
        style="
          padding:13px 15px;
          background-color:#F8FAFC;
          width:135px;
          vertical-align:top;
          border-bottom:1px solid #E2E8F0;
          color:${TEXT_MUTED};
          font-size:11px;
          font-weight:700;
          line-height:1.5;
          letter-spacing:0.3px;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          padding:13px 15px;
          background-color:#FFFFFF;
          vertical-align:top;
          border-bottom:1px solid #E2E8F0;
          color:${TEXT_MAIN};
          font-size:13px;
          font-weight:600;
          line-height:1.7;
          overflow-wrap:anywhere;
          word-break:break-word;
          white-space:pre-line;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

/* ==========================================
   REFERENCE ID DISPLAY
========================================== */

function referenceIdBlock(
  referenceId?: string
): string {
  if (!referenceId) return "";

  return `
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        border-collapse:collapse;
        margin:0 0 24px;
      "
    >
      <tr>
        <td
          style="
            padding:16px 18px;
            background-color:#F8FAFC;
            border-left:3px solid ${BRAND_RED};
          "
        >
          <div
            style="
              color:${TEXT_MUTED};
              font-size:10px;
              font-weight:800;
              text-transform:uppercase;
              letter-spacing:1px;
              margin-bottom:6px;
            "
          >
            Reference ID
          </div>

          <div
            style="
              color:${TEXT_MAIN};
              font-size:16px;
              font-weight:800;
              line-height:1.5;
              overflow-wrap:anywhere;
            "
          >
            ${escapeHtml(referenceId)}
          </div>
        </td>
      </tr>
    </table>
  `;
}

/* ==========================================
   ORGANISER NOTIFICATION EMAIL

   Used for:
   - Exhibitor enquiry
   - Visitor registration
   - Contact enquiry
   - Partner enquiry
   - Brochure download
   - Newsletter subscription
========================================== */

export function organiserNotificationEmail(
  params: OrganiserNotificationParams
): string {
  const { heading, referenceId, rows } = params;

  const body = `
    <!-- Notification Label -->
    <div
      style="
        display:inline-block;
        padding:7px 12px;
        background-color:#FEF2F2;
        color:${BRAND_RED_DARK};
        border:1px solid #FECACA;
        font-size:10px;
        font-weight:800;
        letter-spacing:0.8px;
        text-transform:uppercase;
        margin-bottom:18px;
      "
    >
      New Lead Notification
    </div>

    <!-- Heading -->
    <h1
      style="
        margin:0 0 20px;
        color:${TEXT_MAIN};
        font-size:24px;
        font-weight:800;
        line-height:1.3;
        letter-spacing:-0.5px;
      "
    >
      ${escapeHtml(heading)}
    </h1>

    <!-- Reference ID -->
    ${referenceIdBlock(referenceId)}

    <!-- Details Table -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        border:1px solid #E2E8F0;
        border-collapse:collapse;
      "
    >
      ${rows.map((row) =>
        detailRow(row.label, row.value)
      ).join("")}
    </table>

    <!-- Notification Footer -->
    <p
      style="
        margin:22px 0 0;
        color:${TEXT_MUTED};
        font-size:12px;
        line-height:1.7;
      "
    >
      This enquiry was submitted through the
      official ${escapeHtml(event.name)} website.
    </p>
  `;

  return baseLayout(body);
}

/* ==========================================
   USER ACKNOWLEDGEMENT EMAIL

   Used for:
   - Exhibitor enquiry
   - Visitor registration
   - Contact enquiry
   - Partner enquiry
   - Brochure download
   - Newsletter subscription
========================================== */

export function userAcknowledgementEmail(
  params: UserAcknowledgementParams
): string {
  const {
    greetingName,
    heading,
    bodyText,
    referenceId,
  } = params;

  const body = `
    <!-- Heading -->
    <h1
      style="
        margin:0 0 22px;
        color:${TEXT_MAIN};
        font-size:25px;
        font-weight:800;
        line-height:1.3;
        letter-spacing:-0.5px;
      "
    >
      ${escapeHtml(heading)}
    </h1>

    <!-- Greeting -->
    <p
      style="
        margin:0 0 16px;
        color:#334155;
        font-size:15px;
        line-height:1.8;
      "
    >
      Dear
      <strong style="color:${TEXT_MAIN};">
        ${escapeHtml(greetingName)}
      </strong>,
    </p>

    <!-- Main Message -->
    <p
      style="
        margin:0 0 25px;
        color:#334155;
        font-size:14px;
        line-height:1.85;
      "
    >
      ${escapeHtml(bodyText)}
    </p>

    <!-- Reference ID -->
    ${referenceIdBlock(referenceId)}

    <!-- Status Card -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        background-color:#F8FAFC;
        border:1px solid #E2E8F0;
        border-collapse:collapse;
        margin:0 0 26px;
      "
    >
      <tr>
        <td
          align="center"
          style="
            padding:25px 20px;
            text-align:center;
          "
        >
          <div
            style="
              display:inline-block;
              width:42px;
              height:42px;
              line-height:42px;
              text-align:center;
              background-color:#DCFCE7;
              color:#1D9440;
              font-size:23px;
              font-weight:800;
              border-radius:50%;
              margin-bottom:12px;
            "
          >
            &#10003;
          </div>

          <div
            style="
              margin-bottom:7px;
              color:${TEXT_MAIN};
              font-size:17px;
              font-weight:800;
            "
          >
            Successfully Received
          </div>

          <div
            style="
              color:${TEXT_MUTED};
              font-size:13px;
              line-height:1.7;
            "
          >
            Your details have been received
            by our event team.
          </div>
        </td>
      </tr>
    </table>

    <!-- Website CTA -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="margin:0 0 28px;"
    >
      <tr>
        <td align="center">
          <a
            href="${escapeHtml(event.website)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display:inline-block;
              padding:14px 28px;
              background-color:${BRAND_RED};
              color:#FFFFFF;
              font-size:12px;
              font-weight:800;
              text-decoration:none;
              text-transform:uppercase;
              letter-spacing:0.6px;
              border-radius:5px;
            "
          >
            Explore Exhibition
          </a>
        </td>
      </tr>
    </table>

    <!-- Help Text -->
    <p
      style="
        margin:0;
        padding-top:20px;
        border-top:1px solid #E2E8F0;
        color:${TEXT_MUTED};
        font-size:12px;
        line-height:1.8;
        text-align:center;
      "
    >
      If you have any questions, please
      contact our event team.
    </p>
  `;

  return baseLayout(body);
}
