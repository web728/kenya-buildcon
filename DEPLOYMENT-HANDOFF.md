# Deployment Handoff

Kenya Buildcon International Expo 2027 — production website handoff for the deployment
developer. For step-by-step deployment instructions see [DEPLOYMENT.md](./DEPLOYMENT.md); for
what each environment variable does see
[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md).

## Required Production Inputs

These must come from the client/organiser before or during launch. None are included in this
package.

**Required before launch:**

- MongoDB Atlas production connection string (`MONGODB_URI`)
- `AUTH_SECRET` — generate with `npx auth secret`, do not reuse a dev value
- Initial admin email + password (`ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD`) — used once
  with `npm run seed:admin`, then rotate/manage via the database directly
- `NEXT_PUBLIC_SITE_URL` set to the final production domain (`https://kenyabuildcon.com`)
- Final public contact emails and phone numbers for the Contact page (currently render as
  `[TO BE PROVIDED]` until the `NEXT_PUBLIC_CONTACT_*` variables are set — this is intentional
  placeholder behavior, not a bug)
- A real Open Graph image at `public/images/og/og-default.jpg` (1200×630) — referenced in
  metadata but not supplied in this package

**Required for Google Sheets sync (optional but recommended):**

- Google Cloud service account with Sheets API access
- `GOOGLE_PROJECT_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`
- Run `npm run setup:sheets` once against the production sheet to create the required tabs

**Required for email notifications (optional but recommended):**

- OAuth2 credentials (`MAIL_CLIENT_ID`, `MAIL_CLIENT_SECRET`, `MAIL_REFRESH_TOKEN`) — preferred,
  or a Gmail App Password (`MAIL_APP_PASSWORD`) as fallback. Never a normal Gmail account
  password.
- `MAIL_USER`, `MAIL_FROM_EMAIL`
- `FORM_NOTIFICATION_EMAIL_1` / `_2` — organiser inboxes that receive lead notifications

**Optional / can be added later (site works correctly without these — features degrade
gracefully, they do not break):**

- Social media URLs (`NEXT_PUBLIC_SOCIAL_*`)
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` (spam protection)
- Real event/venue photography beyond the current stock images
- Hotel list, exhibitor manual PDF, floor plan (`/plan-your-visit`, `/exhibitor-services`,
  `/downloads` currently show "coming soon" states for these — intentional, not missing content)

## Post-Deployment Checklist

- [ ] Configure all production environment variables (see Required Production Inputs above)
- [ ] Confirm MongoDB connection (visit a database-backed page, e.g. `/exhibitors`, and check
      server logs for connection errors)
- [ ] Submit a real test entry through **Book a Stand** — confirm success + reference ID
- [ ] Submit a real test entry through **Register to Visit** — confirm success + reference ID
- [ ] Submit a real test entry through **Contact** — confirm success + reference ID
- [ ] Submit a real test entry through **Partnership Enquiry** — confirm success + reference ID
- [ ] Submit a real test entry through **Newsletter** — confirm success
- [ ] Confirm all 5 submissions created MongoDB records
- [ ] Confirm Google Sheets sync (if configured) — check the corresponding tab for each
      submission
- [ ] Confirm organiser notification email delivery (if configured)
- [ ] Confirm user acknowledgement email delivery (if configured)
- [ ] Confirm admin login works at `/admin/login` and the dashboard shows live counts
- [ ] Test DB failure behavior where safely possible (e.g. temporarily point at an invalid
      URI in a staging environment) — every form must show a retry/error state with **no**
      false success, never a fake reference ID
- [ ] Verify analytics fire only after cookie consent is accepted (test in an incognito window)
- [ ] Verify the canonical domain matches `NEXT_PUBLIC_SITE_URL` exactly
- [ ] Verify SSL is active (automatic on Vercel once DNS resolves)
- [ ] Verify `www` → apex (or apex → `www`) redirect resolves correctly
- [ ] Verify `/sitemap.xml` and `/robots.txt` resolve and contain production URLs
- [ ] Submit the sitemap in Google Search Console
- [ ] Test on a real mobile device, not just browser devtools
- [ ] Test on desktop (Chrome, Firefox, Safari if available)
- [ ] Check browser console and server logs for errors on first production traffic
- [ ] Run Lighthouse against the live production URL (Home, Book a Stand, Register to Visit at
      minimum) and confirm no regression from the pre-launch figures in
      [QA_REPORT.md](./QA_REPORT.md)
