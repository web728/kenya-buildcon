
import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/pageMetadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

import { GalleryGrid } from "@/components/sections/GalleryGrid";

import { getPublishedGalleryItems } from "@/lib/data/gallery";
import { getLocalExpoGalleryItems } from "@/data/localExpoGallery";

/* ==========================================
   RENDERING CONFIGURATION
========================================== */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* ==========================================
   SEO
========================================== */

const PAGE_PATH = "/gallery";

const PAGE_TITLE =
  "Photo Gallery | Kenya Buildcon International Expo";

const PAGE_DESCRIPTION =
  "Explore photos from Kenya Buildcon International Expo in Nairobi, including exhibition stands, building products, trade visitors and event highlights.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  }),

  keywords: [
    "Kenya Buildcon gallery",
    "Kenya Buildcon International Expo photos",
    "Kenya Buildcon exhibition images",
    "Construction expo Nairobi gallery",
    "Building exhibition Kenya photos",
    "The Sarit Expo Centre exhibition gallery",
    "Kenya Buildcon previous edition photos",
    "Construction trade fair Nairobi images",
  ],
};

/* ==========================================
   GALLERY DISPLAY TYPE
========================================== */

type GalleryDisplayItem = {
  _id: string;
  imageUrl: string;
  title: string;
};

/* ==========================================
   SCHEMA.ORG STRUCTURED DATA
========================================== */

function getStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return null;
  }

  try {
    const base = new URL(siteUrl);

    if (
      base.protocol !== "https:" &&
      base.protocol !== "http:"
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
          "@type": "ImageGallery",

          "@id": `${pageUrl}#gallery`,

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
              name: "Gallery",
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
   GALLERY PAGE
========================================== */

export default async function GalleryPage() {
  // Load both sources.
  const [publishedItems, localItems] =
    await Promise.all([
      getPublishedGalleryItems(),
      getLocalExpoGalleryItems(),
    ]);

  /* ========================================
     CONVERT MONGODB ITEMS

     Do not depend on item._id existing
     in GallerySummary.
  ======================================== */

 const publishedGalleryItems: GalleryDisplayItem[] =
  (Array.isArray(publishedItems) ? publishedItems : [])
    .filter(
      (item) =>
        item &&
        typeof item.imageUrl === "string" &&
        item.imageUrl.length > 0
    )
    .map((item) => ({
      _id: `published:${item.imageUrl}`,
      imageUrl: item.imageUrl,
      title:
        typeof item.title === "string" && item.title
          ? item.title
          : "Kenya Buildcon exhibition photo",
    }));

  /* ========================================
     COMBINE LOCAL + PUBLISHED IMAGES
  ======================================== */

  const combinedItems: GalleryDisplayItem[] = [
    ...localItems,
    ...publishedGalleryItems,
  ];

  /* ========================================
     REMOVE DUPLICATE IMAGE URLS
  ======================================== */

  const seenUrls = new Set<string>();

  const items = combinedItems.filter((item) => {
    if (!item.imageUrl) {
      return false;
    }

    const normalizedUrl = item.imageUrl.trim();

    if (seenUrls.has(normalizedUrl)) {
      return false;
    }

    seenUrls.add(normalizedUrl);

    return true;
  });

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

      {/* EXISTING PREMIUM PAGE HERO */}
      <PageHero
        title="Exhibition"
        highlightTitle="Gallery."
        intro="Explore moments from Kenya Buildcon International Expo in Nairobi through photographs of exhibition stands, products and industry participation."
        image={{
          src: "/images/sectors/trade-visitors.jpg",
          alt: "Trade visitors exploring exhibition stands at Kenya Buildcon in Nairobi",
        }}
      />

      {/* GALLERY CONTENT */}
      <section
        aria-labelledby="gallery-heading"
        className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
      >
        {/* Subtle architectural background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <Container className="relative z-10">
          {/* SECTION HEADING */}
          <div className="mb-7 border-b border-[#111111]/10 pb-6 sm:mb-9">
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#BE202B]">
                Kenya Buildcon Photo Gallery
              </span>
            </div>

            <h2
              id="gallery-heading"
              className="mt-3 text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#111111]"
            >
              Moments From{" "}
              <span className="text-[#BE202B]">
                the Exhibition.
              </span>
            </h2>

            <p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
              Browse photographs from the
              exhibition. Select any photo
              to view it in a larger format.
            </p>
          </div>

          {/* PHOTO GRID OR EMPTY STATE */}
          {items.length > 0 ? (
            <GalleryGrid items={items} />
          ) : (
            <div className="rounded-lg border border-[#111111]/10 bg-[#F8F8F8] px-6 py-12 text-center">
              <p className="text-[15px] font-bold text-[#111111]">
                No gallery photos are currently available.
              </p>

              <p className="mx-auto mt-2 max-w-md text-[12px] leading-[1.8] text-[#777777]">
                Photos added to the exhibition
                gallery will appear here automatically.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
