
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

const PAGE_PATH = "/exhibitor-services";

const PAGE_TITLE =
  "Exhibitor Services & Logistics | Kenya Buildcon 2027";

const PAGE_DESCRIPTION =
  "Plan your Kenya Buildcon 2027 participation with exhibitor guidance on travel, invitation letters, stand options, freight, accommodation and on-site logistics in Nairobi.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Kenya Buildcon 2027 exhibitor services",
    "Kenya Buildcon logistics",
    "Exhibitor services Nairobi",
    "Kenya exhibition invitation letter",
    "Kenya Buildcon stand construction",
    "Exhibition freight logistics Kenya",
    "Sarit Expo Centre exhibitor information",
    "Construction expo Kenya travel guidance",
    "Kenya Buildcon exhibitor manual",
  ],
};

function getStructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.kenyabuildcon.com";

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
          about: {
            "@type": "Thing",
            name: "Exhibitor services and logistics for Kenya Buildcon International Expo 2027",
          },
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
              name: "Exhibitor Services",
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

export default function ExhibitorServicesPage() {
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
        title="Exhibitor Services"
        highlightTitle="& Logistics."
        badgeText={`EXHIBITOR SUPPORT · ${event.editionLabel}`}
        intro="Essential guidance for planning your participation at Kenya Buildcon 2027, from travel and exhibition space to freight coordination and on-site arrangements."
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Engineer reviewing technical drawings and construction specifications for exhibition planning",
        }}
      />

      <ExhibitorServicesClientView />
    </main>
  );
}
