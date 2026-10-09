
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";

/* ==========================================
   FONTS
========================================== */

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* ==========================================
   WEBSITE CONFIGURATION
========================================== */

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || event.website;

const siteUrl = (
  /^https?:\/\//i.test(rawSiteUrl)
    ? rawSiteUrl
    : `https://${rawSiteUrl}`
).replace(/\/$/, "");

/* ==========================================
   GOOGLE SEARCH CONSOLE VERIFICATION
========================================== */

const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "9DJARkVtcIJI4V8V9exuXNVnTw_tp8iiPQ7NebAmVDQ";

/* ==========================================
   GLOBAL SEO METADATA
========================================== */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  /* Google Search Console */
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },

  /* Canonical URL */
  alternates: {
    canonical: "/",
  },

  /* SEO Title */
  title: {
    default: `${event.name} | ${event.dates.display}, ${event.venue.fullLocation}`,
    template: `%s | ${event.shortName}`,
  },

  /* SEO Description */
  description: `${event.editionLabel} of ${event.name}: ${event.descriptor}. ${event.dates.display} at ${event.venue.fullLocation}.`,

  applicationName: event.shortName,

  category: "Trade Exhibition",

  /* Google Indexing */
  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* SEO Keywords */
  keywords: [
    "Kenya Buildcon",
    "Kenya Buildcon International Expo",
    "Kenya Buildcon 2027",
    "Kenya construction exhibition",
    "construction expo Kenya",
    "building materials exhibition Kenya",
    "building exhibition Nairobi",
    "construction technology Kenya",
    "Sarit Expo Centre exhibition",
    "East Africa construction trade show",
  ],

  /* Open Graph */
  openGraph: {
    type: "website",
    siteName: event.name,
    title: event.name,

    description: `${event.descriptor}. ${event.dates.display}, ${event.venue.fullLocation}.`,

    url: siteUrl,
    locale: "en_KE",

    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${event.name} Banner`,
      },
    ],
  },

  /* Twitter / X */
  twitter: {
    card: "summary_large_image",
    title: event.name,

    description: `${event.descriptor}. ${event.dates.display}, ${event.venue.fullLocation}.`,

    images: ["/images/og/og-default.jpg"],
  },

  /* Favicons */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* ==========================================
   SAFE JSON-LD SERIALIZATION
========================================== */

function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/* ==========================================
   ROOT LAYOUT
========================================== */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ----------------------------------------
     OFFICIAL SOCIAL PROFILES
  ---------------------------------------- */

  const sameAs = [
    event.social.linkedin,
    event.social.facebook,
    event.social.instagram,
    event.social.twitter,
    event.social.youtube,
  ].filter(Boolean);

  /* ==========================================
     MASTER STRUCTURED DATA
     Organization + Website + Navigation
  ========================================== */

  const masterGraphSchema = {
    "@context": "https://schema.org",

    "@graph": [
      /* Organization */
      {
        "@type": "Organization",

        "@id": `${siteUrl}/#organization`,

        name: event.name,

        alternateName: event.shortName,

        url: siteUrl,

        logo: `${siteUrl}/logos/kenya-buildcon-logo.png`,

        sameAs,
      },

      /* Website */
      {
        "@type": "WebSite",

        "@id": `${siteUrl}/#website`,

        url: siteUrl,

        name: event.name,

        inLanguage: "en",

        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },

      /* Site Navigation */
      {
        "@type": "SiteNavigationElement",

        "@id": `${siteUrl}/#header-nav`,

        name: [
          "Exhibition Profile",
          "Book A Stand",
          "Who Should Exhibit",
          "Register To Visit",
          "Why Visit",
          "About Expo",
        ],

        url: [
          `${siteUrl}/exhibition-profile`,
          `${siteUrl}/book-a-stand`,
          `${siteUrl}/who-should-exhibit`,
          `${siteUrl}/register-to-visit`,
          `${siteUrl}/visit`,
          `${siteUrl}/about`,
        ],
      },
    ],
  };

  /* ==========================================
     EVENT STRUCTURED DATA
  ========================================== */

  const eventJsonLd = {
    "@context": "https://schema.org",

    "@type": "ExhibitionEvent",

    "@id": `${siteUrl}/#event`,

    name: event.name,

    alternateName: [
      event.shortName,
      `${event.editionLabel} ${event.name}`,
    ],

    description: `${event.descriptor}. ${event.brandLines.supporting}`,

    startDate: `${event.dates.start}T10:00:00+03:00`,

    endDate: `${event.dates.end}T18:00:00+03:00`,

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    eventStatus:
      "https://schema.org/EventScheduled",

    url: siteUrl,

    image: [
      `${siteUrl}/images/og/og-default.jpg`,
    ],

    location: {
      "@type": "Place",

      name: event.venue.name,

      address: {
        "@type": "PostalAddress",

        streetAddress: event.venue.name,

        addressLocality: event.venue.city,

        addressRegion: event.venue.district,

        addressCountry: event.venue.countryCode,
      },
    },

    organizer: event.organisers.map((organizer) => ({
      "@type": "Organization",

      name: organizer.name,

      url: organizer.url,
    })),

    offers: {
      "@type": "Offer",

      name: "Free Trade Visitor Registration",

      price: "0",

      priceCurrency: "KES",

      availability: "https://schema.org/InStock",

      url: `${siteUrl}${event.cta.registerVisit}`,
    },
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-white font-sans text-brand-dark"
        suppressHydrationWarning
      >
        {/* Organization + Website + Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(masterGraphSchema),
          }}
        />

        {/* Official Event Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(eventJsonLd),
          }}
        />

        {/* Initial Website Loader */}
        <InitialSiteLoader />

        {/* Website Pages */}
        {children}

        {/* Cookie Consent */}
        <CookieConsent />

        {/* Website Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
