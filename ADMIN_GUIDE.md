# Admin Guide

## Signing in

Go to `/admin/login` (not linked from the public site) and sign in with the email/password
created by `npm run seed:admin`. Sessions last 8 hours.

## Dashboard

`/admin` shows submission counts for each lead type. If it shows all zeros with a yellow
warning, `MONGODB_URI` is not configured on this environment.

## Leads

Under **Leads** in the sidebar:

- **Exhibitor Enquiries**, **Visitor Registrations**, **Partner Enquiries**, **Contact
  Enquiries** — each has a table with company/contact info, a status dropdown (New →
  Contacted → Qualified → Follow-Up → Confirmed → Closed → Invalid), an internal notes
  thread, and Sheets/Email sync status badges.
  - If **Sheets: failed** appears, click **Retry sync** to attempt it again.
  - **Export CSV** downloads the full table for the given lead type.
- **Newsletter** — a read-only list of subscribers (no status workflow).

Leads are never deleted from this UI — use status **Invalid** or **Closed** to archive
without losing the record.

## Content

Under **Content** in the sidebar, each section has a table of existing items plus a form to
add new ones:

- **Exhibitors** — the public `/exhibitors` directory only appears once **6 or more**
  exhibitors are published (this threshold is configurable in `src/config/event.ts` →
  `exhibitorDirectoryMinimum`). Toggle **Published**/**Draft** to control visibility without
  deleting a record.
- **Partners** — grouped on the public Partners page by category. Toggle to show/hide.
- **News** — the Body field accepts plain text; separate paragraphs with a blank line.
- **Gallery** — add an image URL (upload the file to `/public/images/gallery/` first, or
  host it externally) and a category.
- **Downloads** — same pattern; file URL should point to a file in `/public/downloads/` or
  an external host.

Image/file fields currently take a URL rather than a file upload — see
[CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for how to add files to the repo before referencing
them here.

## Adding another admin user

There's no "invite" UI yet. To add a second admin, either:

1. Run `ADMIN_INITIAL_EMAIL=new@example.com ADMIN_INITIAL_PASSWORD=... npm run seed:admin`
   locally against the production `MONGODB_URI`, or
2. Insert a document into the `admins` collection directly with a bcrypt-hashed password
   (`bcrypt.hash(password, 12)`).

## Signing out

Use the **Sign Out** link at the bottom of the sidebar.
