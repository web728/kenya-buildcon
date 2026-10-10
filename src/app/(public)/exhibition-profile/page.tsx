
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/exhibit/ExhibitionProfileExplorer";
import { exhibitionSectors } from "@/data/exhibitionProfile";

const PAGE_PATH = "/exhibition-profile";

const PAGE_TITLE =
  "Exhibition Profile & Product Categories | Kenya Buildcon 2027";

const PAGE_DESCRIPTION =
  "Explore 15 construction sectors and 50+ product categories at Kenya Buildcon International Expo 2027 in Nairobi, from building materials and machinery to MEP, interiors and technology.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Kenya Buildcon 2027 exhibition profile",
    "Kenya Buildcon product categories",
    "Construction exhibition sectors Kenya",
    "Building materials exhibition Nairobi",
    "Construction machinery expo Kenya",
    "Construction technology exhibition East Africa",
    "MEP and HVAC exhibition Kenya",
    "Kenya Buildcon exhibitors",
    "Construction products trade show Nairobi",
  ],
};

function getExhibitionStructuredData() {
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
  const listId = `${pageUrl}#sector-list`;

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
          "@id": listId,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
      },
      {
        "@type": "ItemList",
        "@id": listId,
        name: "Kenya Buildcon Exhibition Sectors",
        numberOfItems: exhibitionSectors.length,
        itemListElement: exhibitionSectors.map(
          (sector, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Thing",
              name: sector.name,
              description: `Product categories: ${sector.subcategories.join(", ")}`,
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
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Exhibition Profile",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function ExhibitionProfilePage() {
  const structuredData = getExhibitionStructuredData();

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
        title="Explore Our"
        highlightTitle="Exhibition Profile."
        badgeText={`PRODUCT CATEGORIES · ${event.editionLabel}`}
        intro="Discover the building materials, construction machinery, engineering systems and innovative technologies represented across the Kenya Buildcon exhibition profile."
        image={{
          src: "/images/sectors/product-display.jpg",
          alt: "Construction products and bathroom fittings showcased at a Kenya Buildcon exhibitor stand",
        }}
      />

      <section
        aria-labelledby="exhibition-explorer-heading"
        className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
            backgroundSize: "78px 78px",
          }}
        />

        <Container className="relative z-10">
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </main>
  );
}
