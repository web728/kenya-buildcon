
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhyKenyaClientView } from "@/components/about/WhyKenyaClientView";

/* ==========================================
   PAGE SEO
========================================== */

const PAGE_PATH = "/why-kenya";

const PAGE_TITLE =
  "Why Kenya? Construction Market & Business Opportunities";

const PAGE_DESCRIPTION =
  "Explore Kenya's construction market, Vision 2030 infrastructure, urban development and East African trade opportunities. Discover why businesses exhibit at Kenya Buildcon International Expo 2027 in Nairobi.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Why invest in Kenya construction",
    "Kenya construction market 2027",
    "Kenya Buildcon International Expo 2027",
    "Construction opportunities in Kenya",
    "Kenya Vision 2030 infrastructure",
    "East Africa construction market",
    "Building materials market Kenya",
    "Nairobi construction trade exhibition",
    "Kenya building industry",
    "Construction business opportunities Nairobi",
  ],
};

/* ==========================================
   STRUCTURED DATA
========================================== */

function getStructuredData() {
  let website: URL;

  try {
    website = new URL(event.website);

    if (
      website.protocol !== "https:" &&
      website.protocol !== "http:"
    ) {
      return null;
    }
  } catch {
    return null;
  }

  const homeUrl = new URL("/", website).toString();
  const pageUrl = new URL(PAGE_PATH, website).toString();

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
        about: [
          {
            "@type": "Thing",
            name: "Construction industry in Kenya",
          },
          {
            "@type": "Thing",
            name: "Infrastructure development in Kenya",
          },
          {
            "@type": "Thing",
            name: "East African construction market",
          },
        ],
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            name: "Why Kenya",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/* ==========================================
   PAGE
========================================== */

export default function WhyKenyaPage() {
  const structuredData = getStructuredData();

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

      {/* Shared PageHero */}

<PageHero
  title="Why Kenya?"
  highlightTitle="The Gateway to East Africa."
  badgeText={`KENYA BUILDCON · ${event.editionLabel}`}
  intro="Discover Kenya's construction market, infrastructure investment, urban development and commercial opportunities across East Africa."
  image={{
    src: "/images/home/kenya-buildcon-exhibition-hall.jpg",
    alt: "Building and construction industry exhibition at Kenya Buildcon in Nairobi, Kenya",
  }}
/>



      {/* Market-focused page content */}
      <WhyKenyaClientView />
    </div>
  );
}
