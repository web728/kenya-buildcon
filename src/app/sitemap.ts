
import type { MetadataRoute } from "next";

import { getPublishedNews } from "@/lib/data/news";

/**
 * Always use current published news data.
 */
export const dynamic = "force-dynamic";

/**
 * Production domain.
 *
 * Set NEXT_PUBLIC_SITE_URL to the exact
 * canonical website URL in production.
 */
const FALLBACK_SITE_URL = "https://www.kenyabuildcon.com";

function getBaseUrl(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return FALLBACK_SITE_URL;
  }

  try {
    const url = new URL(configuredUrl);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return FALLBACK_SITE_URL;
    }

    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

/**
 * Only include live, canonical,
 * indexable website pages.
 *
 * Google does not use the order below
 * to determine search ranking or sitelinks.
 */
const STATIC_ROUTES = [
  // About the exhibition
  "/about",
  "/why-kenya",
  "/venue",
  "/organisers",
  "/partners",

  // Exhibitor information
  "/exhibit",
  "/exhibition-profile",
  "/book-a-stand",

  // Visitor information
  "/visit",
  "/visitor-profile",
  "/register-to-visit",

  // Publications
  "/downloads",

  // Media
  "/news",
  "/gallery",

  // Contact
  "/contact",

  // Legal information
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
] as const;

function createUrl(
  baseUrl: string,
  path: string
): string {
  return new URL(path, `${baseUrl}/`).toString();
}

/**
 * Only use real publication or update dates.
 * Never create artificial lastModified values.
 */
function getValidDate(
  value: unknown
): Date | undefined {
  if (
    value === null ||
    value === undefined
  ) {
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

  if (date.getTime() > Date.now()) {
    return undefined;
  }

  return date;
}

function getContentLastModified(
  item: unknown
): Date | undefined {
  if (!item || typeof item !== "object") {
    return undefined;
  }

  const record = item as Record<
    string,
    unknown
  >;

  return (
    getValidDate(record.updatedAt) ??
    getValidDate(record.modifiedAt) ??
    getValidDate(record.publishedAt) ??
    getValidDate(record.createdAt)
  );
}

/**
 * Allow a single valid URL segment.
 */
function normalizeSlug(
  value: unknown
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const slug = value
    .trim()
    .replace(/^\/+|\/+$/g, "");

  if (!slug) {
    return null;
  }

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

/**
 * Prevent duplicate sitemap URLs.
 */
function removeDuplicates(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  const unique = new Map<
    string,
    MetadataRoute.Sitemap[number]
  >();

  for (const entry of entries) {
    const existing = unique.get(entry.url);

    if (!existing) {
      unique.set(entry.url, entry);
      continue;
    }

    const existingDate = getValidDate(
      existing.lastModified
    );

    const incomingDate = getValidDate(
      entry.lastModified
    );

    if (
      incomingDate &&
      (
        !existingDate ||
        incomingDate.getTime() >
          existingDate.getTime()
      )
    ) {
      unique.set(entry.url, entry);
    }
  }

  return Array.from(unique.values());
}

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const baseUrl = getBaseUrl();

  // 1. Homepage
  const homepage: MetadataRoute.Sitemap[number] = {
    url: createUrl(baseUrl, "/"),
  };

  // 2. Static pages
  const staticPages: MetadataRoute.Sitemap =
    STATIC_ROUTES.map((path) => ({
      url: createUrl(baseUrl, path),
    }));

  // 3. Published news articles
  let news: Awaited<
    ReturnType<typeof getPublishedNews>
  > = [];

  try {
    news = await getPublishedNews();
  } catch (error) {
    console.error(
      "[Sitemap] Unable to load published news:",
      error
    );
  }

  const newsPages: MetadataRoute.Sitemap =
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

  // 4. Return canonical URLs
  return removeDuplicates([
    homepage,
    ...staticPages,
    ...newsPages,
  ]);
}
