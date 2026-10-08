# QA Report — Kenya Buildcon International Expo 2027

Conversion of the Tanzania Buildcon codebase to Kenya Buildcon (4th edition, 9–11 June 2027,
The Sarit Expo Centre, Nairobi). Results below are actual command/test output from 8 October 2026.

## Build & static checks

| Check | Result |
|---|---|
| `npm run lint` (ESLint 9, `eslint-config-next`) | ✅ 0 errors, 0 warnings (Tanzania baseline: 8 errors, 14 warnings) |
| `npm run typecheck` (`tsc --noEmit`) | ✅ pass |
| `npm run build` (Next.js 16.3.1) | ✅ pass — 39 routes (21 static, remainder dynamic) |
| Built output (`.next/`) searched for Tanzania strings | ✅ none |

## Content sources

| Content | Source |
|---|---|
| Name, edition, dates, venue, descriptor, organisers, contacts | 4th Kenya Buildcon brochure (9–11 June 2027) |
| Opening hours (10:00 am – 6:00 pm), theme, social links, visitor profile, FAQs topics | kenyabuildcon.com |
| Exhibitor profile (52 categories → 15 sector groups) | Brochure "Exhibitor Profile" page, names verbatim |
| Previous-edition stats, feedback, participating brands, associations, photography | Post Show Report (2nd edition, 12–14 June 2025) |
| Market facts | Verified against primary sources: KNBS (6.7% construction growth, Q3 2025), Vision 2030, EAC (8 partner states) |

Brochure figures **not** published because they could not be verified: "3.8% construction growth"
(KNBS reports 6.7% for Q3 2025), "177 million EAC market" (a pre-2022 six-member figure),
"16 million urban residents / 3.81% urban growth" (no source given).

## Responsive audit

All 23 public routes + the 404 page loaded in a 320px and a 375px viewport (48 renders):
**0 horizontal-overflow cases, exactly one `<h1>` per page.** Desktop and mobile (menu open/close)
visually reviewed for the home page and key inner pages.

## Forms & API (production server, MongoDB unreachable from the QA machine)

| Test | Expected | Result |
|---|---|---|
| Book a Stand submitted empty | Inline field errors, no request | ✅ 8 field errors shown |
| Book a Stand submitted valid, DB unreachable | Friendly error, button re-enabled, input kept | ✅ "We couldn't save your enquiry right now…" |
| `POST /api/contact` invalid payload | 400 + issues | ✅ |
| `POST /api/contact` valid, DB unreachable | 503, no crash | ✅ |
| Submit faster than `MIN_SUBMIT_MS` | Silent fake success, nothing stored | ✅ `KBCN-…` returned |
| Honeypot filled | Silent fake success (after fix) | ✅ fixed — previously a 400 that named the hidden field |
| Malformed JSON | 400 | ✅ |
| reCAPTCHA keys unset | Widget hidden, submit allowed, server skips check | ✅ |
| Home page with DB unreachable | Renders with empty states quickly | ✅ ~10s first hit, <1s after (was 45–60s) |

**Not yet verified end-to-end** (needs production configuration — see DEPLOYMENT-HANDOFF.md):
MongoDB write (Atlas Network Access must allow the host), Google Sheets append (needs a Kenya
`GOOGLE_SHEET_ID`), email delivery (needs `MAIL_*` and `FORM_NOTIFICATION_EMAIL_1/2`).

## SEO

| Item | Status |
|---|---|
| Per-page titles / descriptions / canonicals | ✅ Kenya-specific; title template `%s \| Kenya Buildcon` |
| Open Graph / Twitter | ✅ new 1200×630 `public/images/og/og-default.jpg` (file was missing in Tanzania) |
| JSON-LD | ✅ Organization + WebSite + SiteNavigationElement + ExhibitionEvent (layout), BreadcrumbList (home) |
| `robots.txt` | ✅ `/_next/` no longer blocked (it prevented rendering/image indexing) |
| `sitemap.xml` | ✅ 23 URLs incl. `/why-kenya` |
| Legacy WordPress URLs | ✅ 7 permanent (308) redirects, e.g. `/visitors-registration` → `/register-to-visit` |
| Search Console verification | ✅ env-driven (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`); Tanzania token removed |

## Inherited defects fixed during conversion

1. Exhibitor enquiry emails omitted `referenceId` (hidden by an `as any` cast).
2. Honeypot fields failed validation, so bot submissions were rejected with a 400 naming the field.
3. Email templates interpolated user input into HTML unescaped.
4. Forms could not be submitted at all without a reCAPTCHA site key; failed submissions left a used
   (single-use) token, so every retry failed verification.
5. Newsletter reCAPTCHA was bypassable by omitting the token.
6. reCAPTCHA verification was copy-pasted in six routes and sent the token without URL-encoding.
7. MongoDB waited 30s per query when unreachable; now 8s connect timeout + 30s failure cooldown.
8. `robots.txt` disallowed `/_next/`.
9. Links to non-existent `/book-stand` (6 places) and `/register`; references to missing
   `architects-engineers.jpg`, OG images and `apple-touch-icon.png`.
10. Home exhibitor preview always showed three invented companies; sector icon keys never matched sector slugs.
11. `scripts/setup-sheets.mjs` used different env vars, tabs and headers from the app.
12. Hardcoded Tanzania Google Search Console token.

## Known limitations

- `src/components/motion/ScrollReveal.tsx` (the only GSAP consumer), `HeroWebGL`, `BrandMotif`,
  `SectionMotif`, `PageHeroMotif`, `SectorCard`, `VisitorGroupCard`, `Countdown` and
  `ExhibitorMotionWrapper` were already unused in the Tanzania codebase. They are tree-shaken out of
  the bundle and were kept as part of the shared Buildcon component library.
- Playwright e2e tests were updated for Kenya but not run (browsers not installed on the QA machine).
- Legal pages are generic templates — have them reviewed against Kenya's Data Protection Act, 2019.
