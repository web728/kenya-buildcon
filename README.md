# Kenya Buildcon International Expo 2027 — Website

Production website for the **4th Kenya Buildcon International Expo 2027**, 9–11 June 2027,
The Sarit Expo Centre, Nairobi, Kenya. Jointly organised by Futurex Trade Fair &
Events Pvt. Ltd. and Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL).

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, MongoDB,
Google Sheets sync, Nodemailer and Auth.js. It shares its design system, components and lead
pipeline with the Tanzania Buildcon site; the Kenya brand uses the national red / green / black
palette (tokens in `src/app/globals.css`).

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) — production deployment steps
- [DEPLOYMENT-HANDOFF.md](./DEPLOYMENT-HANDOFF.md) — required production inputs and
  post-deployment verification checklist
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) — how organiser staff use `/admin`
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — where and how to update content
- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) — every env var explained
- [QA_REPORT.md](./QA_REPORT.md) — what was tested and known limitations

## Production services

- **MongoDB** — primary datastore and source of truth for all 5 lead forms. A form submission
  is only ever considered accepted after a successful MongoDB write; Google Sheets and email
  are secondary and never affect that outcome (see [DEPLOYMENT-HANDOFF.md](./DEPLOYMENT-HANDOFF.md)).
- **Google Sheets** — best-effort operational copy of each lead, synced via a service account.
- **Email (Nodemailer)** — best-effort organiser notification + visitor acknowledgement per
  submission; OAuth2 preferred, Gmail App Password as fallback.
- **Auth.js** — session-based admin authentication, credentials provider.
- **Analytics** (GA4 / Meta Pixel / LinkedIn Insight) — optional, only loaded after cookie
  consent is accepted.

## Production deployment

Primary target: **Vercel**. Full steps, environment variable setup, custom domain/SSL, MongoDB
Atlas network access, and rollback are in [DEPLOYMENT.md](./DEPLOYMENT.md). A Node-hosting
fallback path is documented there too — the app avoids Vercel-only APIs.

After deploying, work through [DEPLOYMENT-HANDOFF.md](./DEPLOYMENT-HANDOFF.md)'s checklist
before considering the site launched.

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` with real values (see [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)).
At minimum, for the site to render, no variables are required — pages relying on the
database (exhibitors, news, gallery, downloads, partners) gracefully render empty states
without `MONGODB_URI` configured.

### 3. Set up MongoDB

Use a local MongoDB instance or [MongoDB Atlas](https://www.mongodb.com/atlas) (recommended
for production). Set `MONGODB_URI` in `.env.local`.

### 4. Seed the initial admin user

```bash
npm run seed:admin
```

Requires `MONGODB_URI`, `ADMIN_INITIAL_EMAIL` and `ADMIN_INITIAL_PASSWORD` to be set in
`.env.local`. Re-running updates the password for an existing admin.

### 5. Configure Google Sheets (optional but recommended)

See the Google Sheets section of [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md), then run:

```bash
npm run setup:sheets
```

This creates the required tabs and header rows in your spreadsheet without touching any
existing data.

### 6. Configure email

See the Email section of [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md), then verify with:

```bash
npm run test:email -- you@example.com
```

### 7. Run the development server

```bash
npm run dev
```

Visit http://localhost:3000. Admin panel: http://localhost:3000/admin/login.

### 8. Run tests

```bash
npm run lint
npm run typecheck
npm run test:e2e
```

### 9. Production build

```bash
npm run build
npm run start
```

## Project structure

```text
src/
  app/            Next.js App Router routes ((public), admin, api)
  components/     brand, layout, sections, forms, ui, admin, icons, motion
  config/         event.ts (single source of truth for dates/venue/contacts), navigation.ts
  data/           market facts, exhibition sectors, visitor profile, countries
  lib/            db, email, google, validation, auth, utils, admin actions
  models/         Mongoose schemas
  hooks/          client hooks (form submission, etc.)
tests/e2e/        Playwright end-to-end tests
scripts/          seed-admin, setup-sheets, test-email
```

## Key architectural notes

- **`src/proxy.ts`** protects `/admin/*` — Next.js 16 renamed `middleware.ts` to `proxy.ts`;
  don't recreate a `middleware.ts` file, it will not run.
- **`src/config/event.ts`** is the single source of truth for the event name, dates, venue
  and contact details. Never hardcode these elsewhere.
- Dynamic sections (exhibitor directory, partners, news, gallery, downloads) query MongoDB
  and render an empty state or hide themselves when there's no data — this is intentional
  per the brief (no placeholder/fake content in production).
- All 5 lead forms (Book a Stand, Register to Visit, Contact, Partnership Enquiry,
  Newsletter) follow the same pattern: Zod validation → MongoDB save (blocking) → Google
  Sheets sync (best-effort) → email notification (best-effort) → success response with a
  reference ID. Sheets/email failures never lose the MongoDB submission.
