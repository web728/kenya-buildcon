# Environment Variables

Copy `.env.example` to `.env.local` for local development. In production (Vercel or a Node
host), set these as platform environment variables — never commit real values.

## Site

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical site URL, e.g. `https://kenyabuildcon.com`. Used for metadata, sitemap, structured data. |

## MongoDB

| Variable | Required | Notes |
|---|---|---|
| `MONGODB_URI` | Yes (production) | Connection string. Without it, the site still runs — dynamic sections render empty states instead of erroring. |
| `MONGODB_DB` | No | Database name. Defaults to `kenya_buildcon`. |

## Admin auth (Auth.js)

| Variable | Required | Notes |
|---|---|---|
| `AUTH_SECRET` | Yes (production) | Generate with `npx auth secret`. Keep this secret and stable — rotating it logs out all admins. |
| `ADMIN_INITIAL_EMAIL` | For seeding | Used only by `npm run seed:admin`. |
| `ADMIN_INITIAL_PASSWORD` | For seeding | Used only by `npm run seed:admin`. Minimum 10 characters. |

## Google Sheets sync

Create a Google Cloud service account with access to the Sheets API, then share your
operational spreadsheet with the service account's email address as an Editor.

| Variable | Required | Notes |
|---|---|---|
| `GOOGLE_PROJECT_ID` | No | Informational. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | No | Informational — the address to share the spreadsheet with. |
| `GOOGLE_CREDENTIALS_BASE64` | For Sheets sync | The service-account JSON key, base64-encoded on one line. |
| `GOOGLE_SHEET_ID` | For Sheets sync | The Kenya spreadsheet ID from its URL (`.../d/<this-part>/edit`). Do not reuse the Tanzania sheet. |
| `GOOGLE_SHEET_TAB` | No | Worksheet tab for leads. Defaults to `Website Enquiries`. Run `npm run setup:sheets` to create it with the header row. |

Without `GOOGLE_CREDENTIALS_BASE64` and `GOOGLE_SHEET_ID`, form submissions still save to MongoDB — Sheets sync is skipped
silently and `sheetsSyncStatus` stays `pending` on the record.

## Email (Nodemailer / Gmail)

Two supported paths — **never use your normal Gmail password**.

**Preferred: Gmail OAuth2**

| Variable | Notes |
|---|---|
| `MAIL_CLIENT_ID` | OAuth2 client ID from Google Cloud Console. |
| `MAIL_CLIENT_SECRET` | OAuth2 client secret. |
| `MAIL_REFRESH_TOKEN` | Long-lived refresh token for `MAIL_USER`. |

**Alternative: Gmail App Password** (requires 2-Step Verification enabled on the account)

| Variable | Notes |
|---|---|
| `MAIL_APP_PASSWORD` | 16-character app password generated at myaccount.google.com/apppasswords. |

**Common to both**

| Variable | Required | Notes |
|---|---|---|
| `MAIL_USER` | For email | The Gmail address sending mail. |
| `MAIL_FROM_NAME` | No | Defaults to "Kenya Buildcon". |
| `MAIL_FROM_EMAIL` | No | Defaults to `MAIL_USER`. |
| `FORM_NOTIFICATION_EMAIL_1` | For notifications | Organiser inbox #1 — receives every lead. |
| `FORM_NOTIFICATION_EMAIL_2` | For notifications | Organiser inbox #2 — receives every lead. |

Without email configured, submissions still save to MongoDB — email sending is skipped
silently and `emailStatus` stays `pending` on the record.

## Contact details (Contact page)

All optional — until set, the Contact page shows `[TO BE PROVIDED]` placeholders rather than
inventing values.

`NEXT_PUBLIC_CONTACT_EXHIBITOR_EMAIL`, `NEXT_PUBLIC_CONTACT_EXHIBITOR_PHONE`,
`NEXT_PUBLIC_CONTACT_INTERNATIONAL_EMAIL`, `NEXT_PUBLIC_CONTACT_INTERNATIONAL_PHONE`,
`NEXT_PUBLIC_CONTACT_VISITOR_EMAIL`, `NEXT_PUBLIC_CONTACT_VISITOR_PHONE`,
`NEXT_PUBLIC_CONTACT_GENERAL_EMAIL`, `NEXT_PUBLIC_CONTACT_GENERAL_PHONE`

## Social links (footer)

All optional — a social icon only renders once its URL is set.

`NEXT_PUBLIC_SOCIAL_LINKEDIN`, `NEXT_PUBLIC_SOCIAL_FACEBOOK`, `NEXT_PUBLIC_SOCIAL_INSTAGRAM`,
`NEXT_PUBLIC_SOCIAL_TWITTER`, `NEXT_PUBLIC_SOCIAL_YOUTUBE`

## Analytics (optional, consent-gated)

Scripts only load after a visitor accepts Analytics/Marketing cookies in the cookie banner.

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`). |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID. |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag partner ID. |

## Spam protection

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v2 site key **registered for kenyabuildcon.com**. The widget renders only when set. |
| `RECAPTCHA_SECRET_KEY` | Matching secret. When set, every lead API rejects submissions without a valid token. |

Set both or neither. All forms also use a honeypot field, a minimum-time-to-submit check and
per-IP rate limiting.

## Search Console

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | HTML-tag verification code for the kenyabuildcon.com Search Console property. |
