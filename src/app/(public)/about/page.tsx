
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

/* ==========================================
   ABOUT PAGE SEO
========================================== */

const PAGE_PATH = "/about";

const PAGE_TITLE =
  "About Kenya Buildcon International Expo 2027";

const PAGE_DESCRIPTION =
  "Learn about Kenya Buildcon International Expo 2027, a building and construction trade exhibition connecting manufacturers, suppliers, contractors and industry professionals in Nairobi on 9–11 June 2027.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Kenya Buildcon 2027",
    "Kenya Buildcon International Expo",
    "Kenya construction exhibition",
    "Nairobi building and construction expo",
    "Building materials exhibition Kenya",
    "Construction trade show Nairobi",
    "Kenya construction industry",
    "East Africa construction exhibition",
    "Kenya Buildcon Expo dates",
    "Sarit Expo Centre Nairobi",
  ],
};

/* ==========================================
   STRUCTURED DATA
========================================== */

function getAboutStructuredData() {
  // Use the website URL from the existing
  // event configuration, not a hardcoded domain.
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

  const homepage = new URL("/", siteUrl).toString();
  const aboutUrl = new URL(PAGE_PATH, siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "en",
        isPartOf: {
          "@id": `${homepage}#website`,
        },
        breadcrumb: {
          "@id": `${aboutUrl}#breadcrumb`,
        },
        mainEntity: {
          "@type": "Event",
          name: event.name,
          description:
            "An international building and construction trade exhibition connecting industry professionals, manufacturers and suppliers in Kenya.",
          location: {
            "@type": "Place",
            name: event.venue.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: event.venue.city,
              addressCountry: event.venue.country,
            },
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homepage,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About the Expo",
            item: aboutUrl,
          },
        ],
      },
    ],
  };
}

/* ==========================================
   ABOUT PAGE
========================================== */

export default function AboutPage() {
  const structuredData = getAboutStructuredData();

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
      {/* SEO structured data */}
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

      {/* COMMON HERO — USED ACROSS INNER PAGES */}
      <PageHero
        title="Building the Future,"
        highlightTitle="Together."
        badgeText={`ABOUT THE EXPO · ${event.editionLabel}`}
        intro={`${event.name} brings together manufacturers, suppliers, construction professionals and industry decision-makers to discover innovations, exchange expertise and build business partnerships across Kenya and East Africa.`}
        image={{
          src: "/images/home/kenya-buildcon-inauguration.jpg",
          alt: "Opening ceremony at a previous Kenya Buildcon International Expo trade exhibition in Nairobi, Kenya",
        }}
      />

      {/* ABOUT PAGE CONTENT */}
      <AboutClientView />
    </div>
  );
}
