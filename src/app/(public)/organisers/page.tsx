
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

const PAGE_PATH = "/organisers";

const PAGE_TITLE =
  "Official Organisers | Futurex & ETSIPL | Kenya Buildcon 2027";

const PAGE_DESCRIPTION =
  "Meet Futurex Trade Fair & Events and Exhibitions & Trade Services India (ETSIPL), the joint organisers of Kenya Buildcon International Expo 2027 in Nairobi, Kenya.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),
  keywords: [
    "Kenya Buildcon 2027 organisers",
    "Kenya Buildcon official organisers",
    "Futurex Trade Fair & Events",
    "Exhibitions & Trade Services India",
    "ETSIPL Kenya Buildcon",
    "Construction exhibition organisers Kenya",
    "Kenya Buildcon contact details",
    "Futurex ETSIPL",
  ],
};

function getOrganisersStructuredData() {
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

  const organisations = [
    {
      "@type": "Organization",
      "@id": `${pageUrl}#futurex`,
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      url: "https://www.futurextrade.com/",
      logo: new URL("/logos/futurex-logo.png", website).toString(),
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressCountry: "IN",
      },
    },
    {
      "@type": "Organization",
      "@id": `${pageUrl}#etsipl`,
      name: "Exhibitions & Trade Services India Pvt. Ltd.",
      alternateName: "ETSIPL",
      url: "https://www.etsipl.in/",
      logo: new URL("/logos/etsipl-logo.png", website).toString(),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Navi Mumbai",
        addressCountry: "IN",
      },
    },
  ];

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
        about: organisations.map((organisation) => ({
          "@id": organisation["@id"],
        })),
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },
      ...organisations,
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
            name: "Organisers",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function OrganisersPage() {
  const structuredData = getOrganisersStructuredData();

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
        title="The People Behind"
        highlightTitle="Kenya Buildcon."
        badgeText={`OFFICIAL ORGANISERS · ${event.editionLabel}`}
        intro={`${event.name} is jointly organised by Futurex Trade Fair & Events and Exhibitions & Trade Services India (ETSIPL), connecting international businesses with opportunities in Kenya and East Africa.`}
        image={{
          src: "/images/home/kenya-buildcon-inauguration.jpg",
          alt: "Organisers and invited dignitaries at a previous Kenya Buildcon International Expo inaugural ceremony in Nairobi",
        }}
      />

      <OrganisersClientView />
    </div>
  );
}
