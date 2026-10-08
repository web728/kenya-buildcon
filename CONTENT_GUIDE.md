# Content Guide

## Event facts (dates, venue, contacts)

Everything about the event itself — name, dates, venue, brand lines, organiser names,
contact emails/phones, social links — comes from **`src/config/event.ts`**. Contact and
social values are read from environment variables (see
[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)) so they can differ between
environments without a code change. Never hardcode the date or venue name in a component —
import from `event` instead, so a future date change only happens in one place.

## Market statistics

`src/data/marketFacts.ts` holds every statistic shown in the "Why Kenya" sections, each
with a `sourceName`, `sourceUrl` and `lastVerified` date. **Never add a statistic without a
verifiable source** — if a number can't be sourced, remove it rather than publish it
unsourced.

## Exhibition sectors / visitor profile

`src/data/exhibitionProfile.ts` and `src/data/visitorProfile.ts` hold the static category
lists (15 product sectors, 6 visitor groups) used across the homepage, Exhibition Profile
page and Who Should Visit page. Editing these lists updates every page that references them.

## Dynamic content (exhibitors, partners, news, gallery, downloads)

Managed entirely through `/admin` — see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md). These are
MongoDB-backed and render empty states on the public site until real data is published, by
design (no placeholder/fake exhibitors, partners or news).

## Images

```text
public/
  brand/     the official circular motif artwork (do not overwrite)
  logos/     Kenya Buildcon (Kenya-Logo.png for dark backgrounds), Futurex, ETSIPL logos
  images/
    home/        homepage-only imagery
    venue/       The Sarit Expo Centre imagery
    sectors/     exhibition-profile / sector imagery
    exhibitors/  exhibitor logos (uploaded via admin)
    news/        news featured images
    gallery/     gallery images
  downloads/     brochure, floor plan, exhibitor manual, etc.
```

To add a new image: drop the optimized file (JPEG/WebP, ideally under 500KB) into the
relevant folder, then reference it as `/images/<folder>/<file>.jpg` from the admin panel or
component. The four stock photographs currently in `public/images/` (skyline, engineer
blueprint, building exterior, crane) are licensed stock sourced via Magnific/Freepik with AI
generation excluded — replace them with real event/venue photography once available, using
the same file paths so no code changes are needed.

The brand motif (`public/brand/buildcon-motif-original.png`) is used throughout via the
`BrandMotif`, `SectionMotif` and `PageHeroMotif` components (`src/components/brand/`) —
never duplicate the source file; crop/position it via component props instead.

## Legal pages

`/privacy-policy`, `/terms-and-conditions`, `/cookie-policy` are generic templates. **Have
them reviewed by legal counsel before launch** — they were written to be accurate to this
site's actual data practices (forms → MongoDB → Sheets/email) but are not a substitute for
legal review, especially regarding Kenya's Data Protection Act, 2019 and ODPC requirements.
