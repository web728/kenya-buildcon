# Deployment

Target platform: **Vercel** (primary), with a fallback path for any standard Node.js host —
the app avoids proprietary Vercel-only APIs.

## Vercel deployment

1. **Push the repository** to GitHub/GitLab/Bitbucket and import it in the Vercel dashboard
   (or run `vercel` from the project root).
2. **Environment variables** — add every variable from
   [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) that applies to production in
   Vercel → Project → Settings → Environment Variables. At minimum for a real launch:
   `NEXT_PUBLIC_SITE_URL`, `MONGODB_URI`, `AUTH_SECRET`.
3. **Custom domain** — add `kenyabuildcon.com` (and `www.kenyabuildcon.com`) under
   Settings → Domains. Point DNS per Vercel's instructions (A/CNAME records). Choose one of
   `www` or the apex as canonical and redirect the other — Vercel does this automatically
   once both domains are added and one is marked primary.
4. **SSL** is issued automatically by Vercel once DNS resolves — no action needed.
5. **Build command**: `next build` (default). **Output**: `.next` (default). No custom
   install/build overrides are required.
6. **Deploy.** Vercel builds and deploys automatically on every push to the production
   branch.

## MongoDB Atlas network access

If using MongoDB Atlas, add `0.0.0.0/0` to the cluster's Network Access list (Vercel
functions run from a dynamic IP range), or use Atlas's Vercel integration for scoped access.
Create a database user with read/write access to the `kenya_buildcon` database and use
its connection string as `MONGODB_URI`.

## Post-deploy checklist

- [ ] Run `npm run seed:admin` **once**, pointed at the production `MONGODB_URI`, to create
      the first admin account (run it locally with production env vars, or via a one-off
      script execution — do not expose a public seeding endpoint).
- [ ] Run `npm run setup:sheets` once against the production Google Sheet.
- [ ] Send a real test submission through each of the 5 forms and confirm: MongoDB record
      created, Sheets row appended, organiser notification email received, user
      acknowledgement email received.
- [ ] Sign in to `/admin/login` and confirm the dashboard shows live counts.
- [ ] Verify `https://kenyabuildcon.com/sitemap.xml` and `/robots.txt` resolve correctly.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` matches the final domain exactly (affects canonical URLs
      and Open Graph tags).
- [ ] Add a real Open Graph image at `public/images/og/og-default.jpg` (1200×630) — currently
      referenced but not supplied.
- [ ] Favicon already uses the Kenya Buildcon brand motif (`src/app/favicon.ico`, 7.4 KB) —
      no action needed unless a different mark is preferred.
- [ ] If using GA4/Meta Pixel/LinkedIn Insight, set the corresponding `NEXT_PUBLIC_*` IDs and
      confirm events fire only after accepting cookies (test in an incognito window).
- [ ] Confirm `AUTH_SECRET` is set in production (login will error without it).
- [ ] Review `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy` with legal counsel.

## Self-hosted Node deployment (fallback)

```bash
npm ci
npm run build
npm run start -- --port 3000
```

Put a reverse proxy (nginx/Caddy) in front for TLS termination, and set all the same
environment variables in the host's process environment (or an `.env.local` file loaded by
your process manager).

## Rollback

Vercel keeps every deployment — use "Promote to Production" on a previous deployment in the
dashboard to roll back instantly. No database migration is required for a rollback since the
schema is additive (Mongoose model changes are backward-compatible field additions).
