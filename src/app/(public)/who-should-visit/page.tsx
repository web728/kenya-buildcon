
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";
import { event } from "@/config/event";

const PAGE_PATH = "/who-should-visit";

const PAGE_TITLE =
  "Who Should Visit Kenya Buildcon 2027 | Trade Visitor Profile";

const PAGE_DESCRIPTION =
  "Discover who should visit Kenya Buildcon 2027: architects, engineers, contractors, developers, suppliers and trade buyers. 9–11 June, Nairobi.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),
  keywords: [
    "Who should visit Kenya Buildcon 2027",
    "Kenya Buildcon visitor profile",
    "Kenya Buildcon trade visitors",
    "Construction expo Nairobi visitors",
    "Building materials buyers Kenya",
    "Architects engineers contractors Nairobi expo",
    "Construction suppliers East Africa",
    "Kenya Buildcon registration",
    "Construction industry trade show Kenya",
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
              name: "Who Should Visit",
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

export default function WhoShouldVisitPage() {
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

      <PageHero
        title="The People Who Buy,"
        highlightTitle="Build, Specify & Source."
        badgeText={`TRADE VISITOR PROFILE · ${event.editionLabel}`}
        intro="Builders, developers, architects, engineers, contractors, project managers, government representatives and trade buyers exploring construction solutions in Nairobi."
        image={{
          src: "/images/sectors/trade-visitors.jpg",
          alt: "Construction industry trade visitors exploring exhibition stands at Kenya Buildcon in Nairobi",
        }}
      />

      <WhoShouldVisitClientView />
    </div>
  );
}
