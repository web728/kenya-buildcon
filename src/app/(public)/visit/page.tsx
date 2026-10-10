
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";
import { event } from "@/config/event";

const PAGE_PATH = "/visit";

const PAGE_TITLE =
  "Why Visit Kenya Buildcon 2027 | Visitor Guide";

const PAGE_DESCRIPTION =
  "Discover why trade professionals visit Kenya Buildcon 2027. Explore construction products, industry networking and seminars in Nairobi, 9–11 June.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),
  keywords: [
    "Why visit Kenya Buildcon 2027",
    "Kenya Buildcon visitor registration",
    "Kenya Buildcon International Expo",
    "Construction trade exhibition Nairobi",
    "Building materials expo Kenya",
    "Construction technology exhibition East Africa",
    "Kenya Buildcon seminars",
    "Sarit Expo Centre Nairobi exhibition",
    "Construction industry networking Kenya",
    "Kenya Buildcon visitor profile",
  ],
};

function getStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) return null;

  try {
    const base = new URL(siteUrl);

    if (
      base.protocol !== "https:" &&
      base.protocol !== "http:"
    ) {
      return null;
    }

    const homeUrl = new URL("/", base).toString();
    const pageUrl = new URL(PAGE_PATH, base).toString();

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
              name: "Why Visit",
              item: pageUrl,
            },
          ],
        },
      ],
    };
  } catch {
    return null;
  }
}

export default function VisitPage() {
  const structuredData = getStructuredData();

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}

      {/* Existing dark cinematic PageHero */}
      <PageHero
        title="Gain Insights."
        highlightTitle="Discover Innovations."
        badgeText={`WHY VISIT · ${event.editionLabel}`}
        intro="Explore building and construction products, discover new solutions, connect with industry professionals and engage with the East African construction market."
        image={{
          src: "/images/sectors/trade-visitors.jpg",
          alt: "Trade visitors exploring building and construction exhibition stands at Kenya Buildcon in Nairobi",
        }}
      />

      <VisitClientView />
    </div>
  );
}
