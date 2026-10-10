
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

/* ==========================================
   ADVANCED VENUE SEO
========================================== */

const PAGE_PATH = "/venue";

const PAGE_TITLE =
  "Kenya Buildcon 2027 Venue & Location | Sarit Expo Centre Nairobi";

const PAGE_DESCRIPTION =
  "Find Kenya Buildcon International Expo 2027 at The Sarit Expo Centre, Westlands, Nairobi, on 9–11 June 2027. Explore the venue map, directions, opening hours and visitor information.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Kenya Buildcon 2027 venue",
    "Kenya Buildcon Expo location",
    "The Sarit Expo Centre Nairobi",
    "Sarit Expo Centre Westlands",
    "Construction exhibition Nairobi venue",
    "Kenya Buildcon directions",
    "Kenya Buildcon opening hours",
    "Nairobi building and construction expo",
    "Kenya Buildcon 9–11 June 2027",
  ],
};

/* ==========================================
   PAGE STRUCTURED DATA
========================================== */

function getVenueStructuredData() {
  let siteUrl: URL;

  try {
    siteUrl = new URL(event.website);

    if (
      siteUrl.protocol !== "https:" &&
      siteUrl.protocol !== "http:"
    ) {
      return null;
    }
  } catch {
    return null;
  }

  const homeUrl = new URL("/", siteUrl).toString();
  const pageUrl = new URL(PAGE_PATH, siteUrl).toString();

  const venueId = `${pageUrl}#venue`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "en",

        about: {
          "@id": venueId,
        },

        breadcrumb: {
          "@id": breadcrumbId,
        },
      },

      {
        "@type": "Place",
        "@id": venueId,
        name: event.venue.name,

        description:
          `The official exhibition venue for ${event.name}, located in ${event.venue.district}, ${event.venue.city}, ${event.venue.country}.`,

        address: {
          "@type": "PostalAddress",
          addressLocality: event.venue.city,
          addressRegion: event.venue.district,
          addressCountry: event.venue.country,
        },

        hasMap: event.venue.mapLinkUrl,
      },

      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homeUrl,
          },

          {
            "@type": "ListItem",
            position: 2,
            name: "Venue & Location",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/* ==========================================
   VENUE PAGE
========================================== */

export default function VenuePage() {
  const structuredData = getVenueStructuredData();

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData
            ).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {/* SHARED PAGE HERO */}
      <PageHero
        title="Official Exhibition"
        highlightTitle="Venue & Location."
        badgeText={`KENYA BUILDCON · ${event.editionLabel}`}
        intro={`Visit ${event.name} at ${event.venue.name}, ${event.venue.district}, ${event.venue.city}. Discover venue information, directions and everything you need to plan your visit.`}
        image={{
          src: "/images/home/kenya-buildcon-exhibition-hall.jpg",
          alt: `Exhibition hall at a previous ${event.name} exhibition in ${event.venue.city}, Kenya`,
        }}
      />

      <VenueClientView />
    </div>
  );
}
