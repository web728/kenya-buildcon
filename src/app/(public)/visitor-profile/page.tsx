import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { VisitorProfileClientView } from "@/components/visit/VisitorProfileClientView";

const PAGE_PATH = "/visitor-profile";
const PAGE_TITLE = "Visitor Profile | Kenya Buildcon International Expo 2027";
const PAGE_DESCRIPTION =
  "Explore the visitor profile for Kenya Buildcon International Expo 2027, including builders, architects, engineers, developers, contractors, buyers and industry professionals.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),
  keywords: [
    "Kenya Buildcon International Expo 2027 visitor profile",
    "building and construction expo Kenya",
    "building materials trade visitors Nairobi",
    "architects engineers contractors Kenya expo",
    "developers and building product buyers East Africa",
    "Kenya Buildcon visitor registration",
  ],
};

function getStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return null;

  try {
    const base = new URL(siteUrl);
    if (base.protocol !== "https:" && base.protocol !== "http:") return null;

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
          breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
            { "@type": "ListItem", position: 2, name: "Visitor Profile", item: pageUrl },
          ],
        },
      ],
    };
  } catch {
    return null;
  }
}

export default function VisitorProfilePage() {
  const structuredData = getStructuredData();

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <PageHero
        title="Visitor Profile for"
        highlightTitle="Kenya Buildcon International Expo 2027."
        badgeText="PROFESSIONAL VISITOR PROFILE"
        intro="Find out which professionals and organisations can benefit from visiting the exhibition, from architects and builders to suppliers, buyers and project teams."
        image={{
          src: "/images/sectors/trade-visitors.jpg",
          alt: "Trade visitors exploring building and construction products at an exhibition in Nairobi",
        }}
      />

      <VisitorProfileClientView />
    </div>
  );
}
