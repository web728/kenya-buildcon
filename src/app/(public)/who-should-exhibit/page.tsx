
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";

const PAGE_PATH = "/who-should-exhibit";

const PAGE_TITLE =
  "Who Should Exhibit at Kenya Buildcon 2027 | Exhibitor Profile";

const PAGE_DESCRIPTION =
  "Explore who should exhibit at Kenya Buildcon Expo 2027 in Nairobi: manufacturers, exporters, building materials, machinery, engineering and construction technology suppliers.";

const EXHIBITOR_TYPES = [
  "Manufacturers",
  "Exporters",
  "International Suppliers",
  "Kenyan Manufacturers",
  "Importers & Distributors",
  "Construction Machinery Companies",
  "Building Material Companies",
  "Engineering Product Manufacturers",
  "Equipment Suppliers",
  "Building Technology Companies",
  "Construction Product & System Providers",
];

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),
  keywords: [
    "Who should exhibit at Kenya Buildcon",
    "Kenya Buildcon 2027 exhibitor profile",
    "Construction exhibition exhibitors Kenya",
    "Building materials suppliers Nairobi",
    "Construction machinery trade show Kenya",
    "Engineering companies exhibition Kenya",
    "Construction technology exhibition East Africa",
    "Manufacturers exporters construction expo",
    "Kenya Buildcon stand booking",
  ],
};

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

  const homepage = new URL("/", website).toString();
  const pageUrl = new URL(PAGE_PATH, website).toString();
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "en",
        mainEntity: {
          "@id": `${pageUrl}#exhibitor-profiles`,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#exhibitor-profiles`,
        name: "Kenya Buildcon 2027 Exhibitor Profiles",
        numberOfItems: EXHIBITOR_TYPES.length,
        itemListElement: EXHIBITOR_TYPES.map(
          (name, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Thing",
              name,
            },
          })
        ),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "Who Should Exhibit",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function WhoShouldExhibitPage() {
  const structuredData = getStructuredData();

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
        title="Who Should Exhibit"
        highlightTitle="at Kenya Buildcon?"
        badgeText={`EXHIBITOR PROFILE · ${event.editionLabel}`}
        intro="From building materials and heavy machinery to engineering, architectural systems and construction technology — discover the businesses that belong at Kenya Buildcon 2027."
        image={{
          src: "/images/sectors/product-display.jpg",
          alt: "Building products and construction materials displayed at a Kenya Buildcon exhibitor stand in Nairobi",
        }}
      />

      <WhoShouldExhibitClientView />
    </main>
  );
}
