
import type { Metadata } from "next";
import Link from "next/link";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

import { getPublishedExhibitors } from "@/lib/data/exhibitors";
import { ExhibitorDirectory } from "@/components/sections/ExhibitorDirectory";
import { ExhibitorDirectoryWrapper } from "@/components/exhibit/ExhibitorDirectoryWrapper";
import { ExhibitorsBrochureView } from "@/components/exhibit/ExhibitorsBrochureView";

import { pastParticipants } from "@/data/previousEdition";

export const dynamic = "force-dynamic";

const PAGE_PATH = "/exhibitors";

const PAGE_TITLE =
  "Exhibitors & Exhibition Profile | Kenya Buildcon 2027";

const PAGE_DESCRIPTION =
  "Explore Kenya Buildcon 2027 exhibitors, building materials, construction machinery, engineering products and trade sectors at The Sarit Expo Centre, Nairobi, 9–11 June.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Kenya Buildcon 2027 exhibitors",
    "Kenya Buildcon exhibitor directory",
    "Kenya Buildcon exhibition profile",
    "Construction exhibitors Nairobi",
    "Building materials suppliers Kenya",
    "Construction machinery exhibition Kenya",
    "Building technology exhibition East Africa",
    "Engineering products trade show Nairobi",
    "Kenya Buildcon previous participants",
    "The Sarit Expo Centre exhibitors",
  ],
};

/* ==========================================
   STRUCTURED DATA
========================================== */

function getStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!baseUrl) return null;

  try {
    const base = new URL(baseUrl);

    if (
      !["https:", "http:"].includes(base.protocol)
    ) {
      return null;
    }

    const pageUrl = new URL(
      PAGE_PATH,
      base
    ).toString();

    const homeUrl = new URL(
      "/",
      base
    ).toString();

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
              name: "Exhibitors",
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

/* ==========================================
   EXHIBITORS PAGE
========================================== */

export default async function ExhibitorsPage() {
  const exhibitors = await getPublishedExhibitors();

  const structuredData = getStructuredData();

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
      {/* SEO STRUCTURED DATA */}
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

      {/* SHARED PAGE HERO */}
      <PageHero
        title="Exhibitors &"
        highlightTitle="Industry Showcase."
        badgeText={`KENYA BUILDCON · ${event.editionLabel}`}
        intro="Explore the building materials, machinery, engineering systems, architectural products and construction technologies represented across Kenya Buildcon's exhibition profile."
        image={{
          src: "/images/sectors/exhibitor-stand.jpg",
          alt: "Exhibition stand featuring building and construction products at Kenya Buildcon",
        }}
      />

      {/* PUBLISHED COMPANY DIRECTORY */}
      {exhibitors.length > 0 && (
        <section
          aria-labelledby="published-exhibitors-heading"
          className="border-b border-[#111111]/10 bg-white py-12 sm:py-14"
        >
          <Container>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#BE202B]">
                  Published Company Profiles
                </p>

                <h2
                  id="published-exhibitors-heading"
                  className="mt-2 text-[clamp(1.75rem,2.8vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
                >
                  Meet Our{" "}
                  <span className="text-[#BE202B]">
                    Exhibitors.
                  </span>
                </h2>

                <p className="mt-2 max-w-[640px] text-[13px] leading-[1.8] text-[#666666]">
                  Search published company profiles by
                  name, country, category or products.
                </p>
              </div>

              <Link
                href={event.cta.bookStand}
                className="inline-flex min-h-[42px] items-center justify-center rounded-md bg-[#BE202B] px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
              >
                Book a Stand
              </Link>
            </div>

            <ExhibitorDirectoryWrapper>
              <ExhibitorDirectory
                exhibitors={exhibitors}
              />
            </ExhibitorDirectoryWrapper>
          </Container>
        </section>
      )}

      {/* OFFICIAL 2027 BROCHURE CONTENT */}
      <ExhibitorsBrochureView
        pastParticipants={pastParticipants}
      />
    </main>
  );
}
