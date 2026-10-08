import type { MetadataRoute } from "next";
import { event } from "@/config/event";
import { getPublishedExhibitors } from "@/lib/data/exhibitors";
import { getPublishedNews } from "@/lib/data/news";

export const dynamic = "force-dynamic";

// High-Priority Pages for Google Sitelinks (Priority 0.9 - 0.8)
const CORE_CONVERSION_ROUTES = [
  { path: "/exhibit", priority: 0.9, changeFrequency: "weekly" },
  { path: "/book-a-stand", priority: 0.9, changeFrequency: "weekly" },
  { path: "/register-to-visit", priority: 0.9, changeFrequency: "weekly" },
  { path: "/exhibition-profile", priority: 0.8, changeFrequency: "weekly" },
  { path: "/who-should-exhibit", priority: 0.8, changeFrequency: "weekly" },
  { path: "/who-should-visit", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/venue", priority: 0.8, changeFrequency: "monthly" },
];

// Secondary Informational Pages (Priority 0.6 - 0.7)
const SECONDARY_ROUTES = [
  { path: "/why-kenya", priority: 0.7, changeFrequency: "monthly" },
  { path: "/organisers", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exhibitor-services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/visit", priority: 0.7, changeFrequency: "weekly" },
  { path: "/plan-your-visit", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exhibitors", priority: 0.7, changeFrequency: "daily" },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/news", priority: 0.7, changeFrequency: "daily" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/downloads", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Ensures a valid absolute URL string with 'https://' protocol and no trailing slash
 */
function getAbsoluteBaseUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || event.website;
  let formatted = rawUrl.trim();

  if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
    formatted = `https://${formatted}`;
  }

  return formatted.replace(/\/$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getAbsoluteBaseUrl();

  const [exhibitors, news] = await Promise.all([
    getPublishedExhibitors().catch(() => []),
    getPublishedNews().catch(() => []),
  ]);

  // 1. Homepage (Top Priority for Sitelinks generation)
  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  };

  // 2. Core Navigation Routes
  const coreEntries: MetadataRoute.Sitemap = CORE_CONVERSION_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as "weekly" | "monthly",
    priority: route.priority,
  }));

  // 3. Secondary Routes
  const secondaryEntries: MetadataRoute.Sitemap = SECONDARY_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as "weekly" | "monthly" | "yearly" | "daily",
    priority: route.priority,
  }));

  // 4. Dynamic Exhibitors Pages
  const exhibitorEntries: MetadataRoute.Sitemap = exhibitors.map((e) => ({
    url: `${baseUrl}/exhibitors/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 5. Dynamic News Pages
  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date((n.publishedAt as unknown as string) || new Date()),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [homeEntry, ...coreEntries, ...secondaryEntries, ...exhibitorEntries, ...newsEntries];
}