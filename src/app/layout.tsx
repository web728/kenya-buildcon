import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";

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

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || event.website;
const siteUrl = rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
  ? rawSiteUrl.replace(/\/$/, "")
  : `https://${rawSiteUrl.replace(/\/$/, "")}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // Google Search Console verification for the Kenya property (set per environment)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),

  // Canonical Tag for Search Engines
  alternates: {
    canonical: "/",
  },

  title: {
    default: `${event.name} | ${event.dates.display}, ${event.venue.fullLocation}`,
    template: `%s | ${event.shortName}`,
  },
  description: `${event.editionLabel} of ${event.name}: ${event.descriptor}. ${event.dates.display} at ${event.venue.fullLocation}.`,
  applicationName: event.shortName,
  category: "Trade Exhibition",

  // Indexing rules for Google
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

  keywords: [
    "Kenya Buildcon",
    "Kenya Buildcon International Expo",
    "Kenya construction exhibition",
    "construction expo Kenya",
    "building materials exhibition Kenya",
    "building exhibition Nairobi",
    "construction technology Kenya",
    "Sarit Expo Centre exhibition",
    "East Africa construction trade show",
  ],

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

  twitter: {
    card: "summary_large_image",
    title: event.name,
    description: `${event.descriptor}. ${event.dates.display}, ${event.venue.fullLocation}.`,
    images: ["/images/og/og-default.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sameAs = [
    event.social.linkedin,
    event.social.facebook,
    event.social.instagram,
    event.social.twitter,
    event.social.youtube,
  ].filter(Boolean);

  // 1. Combined Master Schema (Organization + WebSite + SiteNavigationElement)
  const masterGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": event.name,
        "alternateName": event.shortName,
        "url": siteUrl,
        "logo": `${siteUrl}/logos/kenya-buildcon-logo.png`,
        "sameAs": sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": event.name,
        "inLanguage": "en",
        "publisher": { "@id": `${siteUrl}/#organization` },
      },
      // Navigation Schema for Google Sitelinks (Sub-headings in search)
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#header-nav`,
        "name": [
          "Exhibition Profile",
          "Book A Stand",
          "Who Should Exhibit",
          "Register To Visit",
          "Why Visit",
          "About Expo"
        ],
        "url": [
          `${siteUrl}/exhibition-profile`,
          `${siteUrl}/book-a-stand`,
          `${siteUrl}/who-should-exhibit`,
          `${siteUrl}/register-to-visit`,
          `${siteUrl}/visit`,
          `${siteUrl}/about`
        ]
      }
    ],
  };

  // 2. Event Schema — only facts published in the official brochure / website
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "@id": `${siteUrl}/#event`,
    "name": event.name,
    "alternateName": [event.shortName, `${event.editionLabel} ${event.name}`],
    "description": `${event.descriptor}. ${event.brandLines.supporting}`,
    "startDate": `${event.dates.start}T10:00:00+03:00`,
    "endDate": `${event.dates.end}T18:00:00+03:00`,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "url": siteUrl,
    "image": [`${siteUrl}/images/og/og-default.jpg`],
    "location": {
      "@type": "Place",
      "name": event.venue.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.venue.name,
        "addressLocality": event.venue.city,
        "addressRegion": event.venue.district,
        "addressCountry": event.venue.countryCode,
      },
    },
    "organizer": event.organisers.map((o) => ({
      "@type": "Organization",
      "name": o.name,
      "url": o.url,
    })),
    "offers": {
      "@type": "Offer",
      "name": "Free Trade Visitor Registration",
      "price": "0",
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}${event.cta.registerVisit}`,
    },
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-brand-dark font-sans"
        suppressHydrationWarning
      >
        {/* Master Schema: Organization + Website + Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(masterGraphSchema) }}
        />
        {/* Event Schema (sitewide, single source) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />

        {/* Initial First-Load Experience Preloader */}
        <InitialSiteLoader />

        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
