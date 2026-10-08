import type { Metadata } from "next";
import { event } from "@/config/event";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhyKenyaSection } from "@/components/sections/home/WhyKenyaSection";
import { ExhibitionProfileSection } from "@/components/sections/home/ExhibitionProfileSection";
import { WhyExhibitSection } from "@/components/sections/home/WhyExhibitSection";
import { WhoWillYouMeetSection } from "@/components/sections/home/WhoWillYouMeetSection";
import { ExhibitorDirectoryPreviewSection } from "@/components/sections/home/ExhibitorDirectoryPreviewSection";
import { VenueSection } from "@/components/sections/home/VenueSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { NewsSection } from "@/components/sections/home/NewsSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";
import { HeroStatsSection } from "@/components/sections/home/HeroStatsSection";
import { getFeaturedExhibitors } from "@/lib/data/exhibitors";

export const dynamic = "force-dynamic";

const pageTitle = `${event.shortName} ${event.edition} | Construction Expo, Nairobi`;
const pageDescription = `${event.editionLabel} ${event.name}, ${event.dates.display} at ${event.venue.name}, ${event.venue.city} — Kenya's leading building & construction trade show.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "Kenya Buildcon 2027",
    "Kenya Buildcon International Expo 2027",
    "construction expo Kenya 2027",
    "building materials exhibition Nairobi",
    "construction exhibition Sarit Expo Centre",
    "East Africa construction trade show",
    "construction machinery exhibition Kenya",
    "exhibit at Kenya construction expo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
    siteName: event.name,
    images: [{ url: "/images/og/og-default.jpg", width: 1200, height: 630, alt: `${event.name} — ${event.venue.fullLocation}` }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/og/og-default.jpg"],
  },
};

export default async function HomePage() {
  const exhibitors = await getFeaturedExhibitors(3);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || event.website).replace(/\/$/, "");

  // Event + Organization schema are emitted sitewide by the root layout.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <HeroStatsSection />
        <IntroSection />
        <WhyKenyaSection />
        <ExhibitionProfileSection />
        <WhyExhibitSection />
        <WhoWillYouMeetSection />
        <ExhibitorDirectoryPreviewSection
          exhibitors={exhibitors.map((e) => ({
            _id: e._id,
            slug: e.slug,
            name: e.companyName,
            sector: e.category,
            country: e.country,
            tagline: e.shortDescription ?? undefined,
          }))}
        />
        <VenueSection />
        <PartnersSection />
        <NewsSection />
        <FinalCtaSection />
      </div>
    </>
  );
}
