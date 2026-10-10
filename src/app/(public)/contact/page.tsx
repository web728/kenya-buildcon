
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

const PAGE_PATH = "/contact";

const PAGE_TITLE =
  "Contact Kenya Buildcon 2027 | Exhibition Enquiries";

const PAGE_DESCRIPTION =
  "Contact the Kenya Buildcon 2027 organising team for exhibition stand bookings, sponsorship, partnerships, visitor enquiries and international participation in Nairobi.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Kenya Buildcon 2027 contact",
    "Kenya Buildcon organisers",
    "Kenya Buildcon exhibition enquiries",
    "Kenya Buildcon stand booking contact",
    "Construction exhibition Nairobi contact",
    "Kenya Buildcon sponsorship enquiry",
    "Kenya Buildcon international participation",
    "Kenya Buildcon visitor support",
    "Futurex Trade Fair Kenya Buildcon",
    "Sarit Expo Centre exhibition contact",
  ],
};

function getStructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.kenyabuildcon.com";

  try {
    const base = new URL(siteUrl);

    if (!["https:", "http:"].includes(base.protocol)) {
      return null;
    }

    const homeUrl = new URL("/", base).toString();
    const pageUrl = new URL(PAGE_PATH, base).toString();
    const breadcrumbId = `${pageUrl}#breadcrumb`;

    return {
      "@context": "https://schema.org",

      "@graph": [
        {
          "@type": "ContactPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          inLanguage: "en",
          breadcrumb: {
            "@id": breadcrumbId,
          },
          about: {
            "@type": "Event",
            name: event.name,
            startDate: "2027-06-09",
            endDate: "2027-06-11",
            location: {
              "@type": "Place",
              name: event.venue.name,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
            },
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
              name: "Contact Us",
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

export default function ContactPage() {
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

      <PageHero
        title="Let's Connect"
        highlightTitle="& Build Together."
        badgeText={`CONTACT THE ORGANISERS · ${event.editionLabel}`}
        intro="Speak with the Kenya Buildcon organising team about exhibition stands, sponsorships, partnerships, international participation and visitor enquiries."
        image={{
          src: "/images/home/kenya-buildcon-exhibition-hall.jpg",
          alt: "Building and construction exhibition stands at Kenya Buildcon International Expo in Nairobi",
        }}
      />

      <ContactClientView />
    </div>
  );
}
