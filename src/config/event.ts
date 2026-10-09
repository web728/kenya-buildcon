
/**
 * KENYA BUILDCON INTERNATIONAL EXPO 2027
 *
 * Central event configuration.
 *
 * Official Website:
 * https://www.kenyabuildcon.com/
 *
 * All components should import event facts from here.
 *
 * Event:
 * 4th Edition
 * 9–11 June 2027
 * The Sarit Expo Centre, Nairobi, Kenya
 */

/* ==========================================
   OFFICIAL WEBSITE
========================================== */

const SITE_URL = "https://www.kenyabuildcon.com";

/* ==========================================
   EVENT CONFIGURATION
========================================== */

export const event = {
  /* ----------------------------------------
     EVENT IDENTITY
  ---------------------------------------- */

  name: "Kenya Buildcon International Expo 2027",

  shortName: "Kenya Buildcon",

  brandWord: "Buildcon",

  descriptor:
    "Kenya's Leading Trade Exhibition on the Building & Construction Industry",

  edition: "2027",

  editionLabel: "4th Edition",

  theme: "Building the Future, Together",

  /* ----------------------------------------
     DATES AND OPENING HOURS
  ---------------------------------------- */

  dates: {
    start: "2027-06-09",

    end: "2027-06-11",

    display: "9–11 June 2027",

    displayShort: "09–11 JUN 2027",

    openingTimeConfirmed: true,

    openingHours: "10:00 am – 6:00 pm",

    countdownTargetIso:
      "2027-06-09T10:00:00+03:00",

    timezone: "Africa/Nairobi",
  },

  /* ----------------------------------------
     OFFICIAL VENUE
  ---------------------------------------- */

  venue: {
    name: "The Sarit Expo Centre",

    district: "Westlands",

    city: "Nairobi",

    country: "Kenya",

    countryCode: "KE",

    fullLocation:
      "The Sarit Expo Centre, Nairobi, Kenya",

    fullAddress:
      "The Sarit Expo Centre, Westlands, Nairobi, Kenya",

    mapEmbedUrl:
      "https://www.google.com/maps?q=Sarit+Expo+Centre+Westlands+Nairobi+Kenya&output=embed",

    mapLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Sarit+Expo+Centre+Westlands+Nairobi+Kenya",
  },

  /* ----------------------------------------
     EVENT FORMAT AND INDUSTRY
  ---------------------------------------- */

  format: "B2B Trade Exhibition",

  industry: "Building & Construction",

  website: `${SITE_URL}/`,

  websiteDisplay: "www.kenyabuildcon.com",

  /* ----------------------------------------
     BRAND MESSAGING
  ---------------------------------------- */

  brandLines: {
    main: "BUILDING THE FUTURE, TOGETHER.",

    supporting:
      "Where Innovation Meets Opportunity in the Heart of Nairobi.",

    exhibitor:
      "Connect with the East African Construction Market.",

    visitor:
      "Gain Insights. Discover Innovations. Explore Solutions.",
  },

  /* ----------------------------------------
     SEO CONFIGURATION
  ---------------------------------------- */

  seo: {
    title:
      "Kenya Buildcon International Expo 2027 | Construction Exhibition Nairobi",

    description:
      "Join Kenya Buildcon International Expo 2027, the 4th edition of Kenya's building and construction trade exhibition, from 9–11 June 2027 at The Sarit Expo Centre, Nairobi. Explore building materials, construction machinery, technology and industry networking opportunities.",

    keywords: [
      "Kenya Buildcon 2027",
      "Kenya Buildcon International Expo",
      "Construction Expo Kenya 2027",
      "Building Exhibition Nairobi",
      "Construction Exhibition Kenya",
      "Building and Construction Expo",
      "Nairobi Construction Expo",
      "East Africa Construction Exhibition",
      "Construction Machinery Exhibition",
      "Building Materials Exhibition",
      "Construction Trade Show Kenya",
      "The Sarit Expo Centre",
      "Kenya Trade Exhibition 2027",
    ],

    canonical: `${SITE_URL}/`,

    ogTitle:
      "Kenya Buildcon International Expo 2027",

    ogDescription:
      "9–11 June 2027 | The Sarit Expo Centre, Nairobi, Kenya. Connect with the building and construction industry at Kenya Buildcon's 4th edition.",

    ogImage: "/images/gallery/hero.jpg",

    robots: {
      index: true,
      follow: true,
    },
  },

  /* ----------------------------------------
     OFFICIAL ORGANISERS
  ---------------------------------------- */

  organisers: [
    {
      name: "Futurex Trade Fair & Events Pvt. Ltd.",

      logo: "/logos/futurex-logo.png",

      url: "https://www.futurextrade.com/",
    },
    {
      name:
        "Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL)",

      logo: "/logos/etsipl-logo.png",

      url: "https://www.etsipl.in/",
    },
  ],

  /* ----------------------------------------
     OFFICIAL CONTACT DETAILS
  ---------------------------------------- */

  contact: {
    futurex: {
      company: "Futurex Group",

      name: "Mr. Namit Gupta",

      email: "namit@futurextrade.com",

      phone: "(+91) 9810855697",
    },

    etsipl: {
      company: "ETSIPL",

      name: "Mr. Vijayanka Brighuvanshi",

      email: "vijayanka@etsipl.in",

      phone: "(+91) 9324232529",
    },

    sales: {
      company: "Futurex Group",

      name: "Mr. Vaibhav Srivastava",

      email: "vaibhav@futurextrade.com",

      phone: "(+91) 9807169880",
    },

    exhibitorEnquiries: {
      company: "Futurex Group",

      name: "Mr. Namit Gupta",

      email: "namit@futurextrade.com",

      phone: "(+91) 9810855697",
    },

    internationalParticipation: {
      company: "ETSIPL",

      name: "Mr. Vijayanka Brighuvanshi",

      email: "vijayanka@etsipl.in",

      phone: "(+91) 9324232529",
    },

    general: {
      company: "Futurex Group",

      name: "Mr. Vaibhav Srivastava",

      email: "vaibhav@futurextrade.com",

      phone: "(+91) 9807169880",
    },
  },

  /* ----------------------------------------
     CONTACT LIST
  ---------------------------------------- */

  contactList: [
    {
      company: "Futurex Group",

      location: "New Delhi",

      name: "Mr. Namit Gupta",

      email: "namit@futurextrade.com",

      phone: "(+91) 9810855697",
    },

    {
      company: "ETSIPL",

      location: "Navi Mumbai",

      name: "Mr. Vijayanka Brighuvanshi",

      email: "vijayanka@etsipl.in",

      phone: "(+91) 9324232529",
    },

    {
      company: "Futurex Group",

      location: "New Delhi",

      name: "Mr. Vaibhav Srivastava",

      email: "vaibhav@futurextrade.com",

      phone: "(+91) 9807169880",
    },
  ],

  /* ----------------------------------------
     SOCIAL MEDIA
  ---------------------------------------- */

  social: {
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ||
      "https://www.linkedin.com/company/kenyabuildconexpo",

    facebook:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ||
      "https://www.facebook.com/kenyabuildconexpo/",

    instagram:
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
      "https://www.instagram.com/kenyabuildconexpo/",

    twitter:
      process.env.NEXT_PUBLIC_SOCIAL_TWITTER ||
      "https://twitter.com/kenyabuildcon",

    youtube:
      process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },

  /* ----------------------------------------
     CALL TO ACTION ROUTES
  ---------------------------------------- */

  cta: {
    bookStand: "/book-a-stand",

    registerVisit: "/register-to-visit",
  },

  /* ----------------------------------------
     EXHIBITOR DIRECTORY
  ---------------------------------------- */

  exhibitorDirectoryMinimum: 6,
} as const;

/* ==========================================
   TYPES
========================================== */

export type EventConfig = typeof event;
