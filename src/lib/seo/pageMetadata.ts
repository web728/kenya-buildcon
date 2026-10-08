import type { Metadata } from "next";
import { event } from "@/config/event";

const DEFAULT_OG_IMAGE = "/images/og/og-default.jpg";

type PageMetadataInput = {
  /** Page title (the root layout appends " | Kenya Buildcon"). */
  title: string;
  description: string;
  /** Canonical path, e.g. "/about". */
  path: string;
  /** Optional page-specific share image (1200×630 recommended). */
  image?: string;
  noIndex?: boolean;
};

/**
 * Per-page metadata with its own canonical URL, Open Graph and Twitter card.
 * Without this, Next.js inherits the root layout's openGraph object verbatim,
 * so every page would share the homepage's share title and URL.
 */
export function pageMetadata({ title, description, path, image, noIndex }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${event.shortName}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: event.name,
      locale: "en_KE",
      title: fullTitle,
      description,
      url: path,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${event.name} — ${event.venue.fullLocation}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
