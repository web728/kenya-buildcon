
import type { MetadataRoute } from "next";

import { event } from "@/config/event";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";
import { getPublishedNews } from "@/lib/data/news";

/* ==========================================
   SITEMAP CONFIGURATION
========================================== */

// Always generate sitemap using current published data.
export const dynamic = "force-dynamic";

// Official production website.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  event.website ||
  "https://www.kenyabuildcon.com/";

/* ==========================================
   VALID BASE URL
========================================== */

function getBaseUrl(): string {
  const raw = SITE_URL.trim();

  const formatted = /^https?:\/\//i.test(raw)
    ? raw
    : `https://${raw}`;

  const url = new URL(formatted);

  return url.origin;
}

/* ==========================================
   STATIC WEBSITE ROUTES

   Only include published, indexable pages.
========================================== */

const STATIC_ROUTES = [
  // Main conversion pages
  "/exhibit",
  "/book-a-stand",
  "/register-to-visit",
  "/exhibition-profile",
  "/who-should-exhibit",
  "/who-should-visit",

  // Event information
  "/about",
  "/venue",
  "/why-kenya",
  "/organisers",

  // Exhibitor information
  "/exhibitor-services",
  "/exhibitors",

  // Visitor information
  "/visit",
  "/plan-your-visit",

  // Supporting pages
  "/partners",
  "/news",
  "/gallery",
  "/downloads",
  "/contact",

  // Legal pages
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
] as const;

/* ==========================================
   SAFE URL GENERATOR
========================================== */

function createUrl(
  baseUrl: string,
  path: string
): string {
  if (path === "/") {
    return `${baseUrl}/`;
  }

  const normalizedPath = `/${path}`
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");

  return `${baseUrl}${normalizedPath}`;
}

/* ==========================================
   VALID DATE HELPER

   Do not generate fake modification dates.
========================================== */

function getValidDate(
  value: unknown
): Date | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (
    !(value instanceof Date) &&
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return undefined;
  }

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return undefined;
  }

  // Avoid future modification timestamps.
  if (date.getTime() > Date.now()) {
    return undefined;
  }

  return date;
}

/* ==========================================
   DYNAMIC CONTENT DATE HELPER
========================================== */

function getContentLastModified(
  item: unknown
): Date | undefined {
  if (!item || typeof item !== "object") {
    return undefined;
  }

  const record = item as Record<string, unknown>;

  return (
    getValidDate(record.updatedAt) ||
    getValidDate(record.modifiedAt) ||
    getValidDate(record.publishedAt) ||
    getValidDate(record.createdAt)
  );
}

/* ==========================================
   VALID SLUG HELPER
========================================== */

function normalizeSlug(
  value: unknown
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const slug = value.trim().replace(/^\/+|\/+$/g, "");

  if (!slug) {
    return null;
  }

  // Slugs must represent one URL segment.
  if (
    slug === "." ||
    slug === ".." ||
    slug.includes("/") ||
    slug.includes("\\") ||
    slug.includes("?") ||
    slug.includes("#")
  ) {
    return null;
  }

  return encodeURIComponent(slug);
}

/* ==========================================
   REMOVE DUPLICATE URLS
========================================== */

function removeDuplicates(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const uniqueEntries = new Map<
    string,
    MetadataRoute.Sitemap[number]
  >();

  for (const entry of entries) {
    const existing = uniqueEntries.get(entry.url);

    if (!existing) {
      uniqueEntries.set(entry.url, entry);
      continue;
    }

    // Preserve the latest valid lastModified.
    const existingDate = getValidDate(
      existing.lastModified
    );

    const incomingDate = getValidDate(
      entry.lastModified
    );

    if (
      incomingDate &&
      (!existingDate ||
        incomingDate.getTime() >
          existingDate.getTime())
    ) {
      uniqueEntries.set(entry.url, entry);
    }
  }

  return Array.from(uniqueEntries.values());
}

/* ==========================================
   MAIN SITEMAP GENERATOR
========================================== */

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const baseUrl = getBaseUrl();

  /* ----------------------------------------
     FETCH PUBLISHED CONTENT
  ---------------------------------------- */

  const [exhibitors, news] = await Promise.all([
    getPublishedExhibitors().catch((error) => {
      console.error(
        "[Sitemap] Failed to load exhibitors:",
        error
      );

      return [];
    }),

    getPublishedNews().catch((error) => {
      console.error(
        "[Sitemap] Failed to load news:",
        error
      );

      return [];
    }),
  ]);

  /* ----------------------------------------
     1. HOMEPAGE
  ---------------------------------------- */

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: createUrl(baseUrl, "/"),
  };

  /* ----------------------------------------
     2. STATIC WEBSITE PAGES
  ---------------------------------------- */

  const staticEntries: MetadataRoute.Sitemap =
    STATIC_ROUTES.map((path) => ({
      url: createUrl(baseUrl, path),
    }));

  /* ----------------------------------------
     3. PUBLISHED EXHIBITOR PROFILES
  ---------------------------------------- */

  const exhibitorEntries: MetadataRoute.Sitemap =
    exhibitors.flatMap((exhibitor) => {
      const slug = normalizeSlug(exhibitor.slug);

      if (!slug) {
        return [];
      }

      const lastModified =
        getContentLastModified(exhibitor);

      return [
        {
          url: createUrl(
            baseUrl,
            `/exhibitors/${slug}`
          ),

          ...(lastModified
            ? { lastModified }
            : {}),
        },
      ];
    });

  /* ----------------------------------------
     4. PUBLISHED NEWS ARTICLES
  ---------------------------------------- */

  const newsEntries: MetadataRoute.Sitemap =
    news.flatMap((article) => {
      const slug = normalizeSlug(article.slug);

      if (!slug) {
        return [];
      }

      const lastModified =
        getContentLastModified(article);

      return [
        {
          url: createUrl(
            baseUrl,
            `/news/${slug}`
          ),

          ...(lastModified
            ? { lastModified }
            : {}),
        },
      ];
    });

  /* ----------------------------------------
     5. COMBINE ALL SITEMAP URLS
  ---------------------------------------- */

  const allEntries: MetadataRoute.Sitemap = [
    homeEntry,
    ...staticEntries,
    ...exhibitorEntries,
    ...newsEntries,
  ];

  /* ----------------------------------------
     6. RETURN CLEAN SITEMAP
  ---------------------------------------- */

  return removeDuplicates(allEntries);
}
