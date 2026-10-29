
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

const PAGE_PATH = "/exhibit";

const PAGE_TITLE =
  "Why Exhibit at Kenya Buildcon 2027 | Book Exhibition Space";

const PAGE_DESCRIPTION =
  "Exhibit at Kenya Buildcon International Expo 2027 in Nairobi, 9–11 June. Connect with building & construction buyers, explore stand options and showcase building products across East Africa.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Exhibit at Kenya Buildcon 2027",
    "Kenya Buildcon exhibition stand",
    "Book exhibition stand Nairobi",
    "Kenya Building & construction trade show exhibitors",
    "Building & Construction exhibition Kenya 2027",
    "Building materials expo Nairobi",
    "East Africa Building & construction exhibition",
    "Sarit Expo Centre Building & construction expo",
    "Kenya Buildcon exhibitor benefits",
    "Kenya Buildcon stand booking",
  ],
};

function getExhibitStructuredData() {
  let site: URL;

  try {
    site = new URL(event.website);

    if (
      site.protocol !== "https:" &&
      site.protocol !== "http:"
    ) {
      return null;
    }
  } catch {
    return null;
  }

  const homeUrl = new URL("/", site).toString();
  const pageUrl = new URL(PAGE_PATH, site).toString();

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
        breadcrumb: {
          "@id": breadcrumbId,
        },
        about: [
          {
            "@type": "Thing",
            name: "Building & Construction exhibition participation",
          },
          {
            "@type": "Thing",
            name: "Building and construction trade shows in Kenya",
          },
        ],
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
            name: "Why Exhibit",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function ExhibitPage() {
  const structuredData = getExhibitStructuredData();

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
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

      <PageHero
       
title="Why Exhibit at"
highlightTitle="Kenya Buildcon International Expo 2027?"
badgeText="WHY EXHIBIT"
intro="Showcase your products and services, meet potential buyers and build business connections with professionals from the building and construction industry across Kenya and East Africa."

        image={{
          src: "/images/sectors/exhibitor-stand.jpg",
          alt: "Trade visitors meeting exhibitors and exploring building & construction products at a Kenya Buildcon exhibition stand",
        }}
      />

      <ExhibitClientView />
    </main>
  );
}
