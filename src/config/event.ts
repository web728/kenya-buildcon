/**
 * Single source of truth for all event facts, contact details and CTA
 * destinations. Every component must import from here rather than
 * hardcoding dates, venue names or contact details.
 *
 * Sources: 4th Kenya Buildcon brochure (9–11 June 2027), kenyabuildcon.com.
 */

export const event = {
  name: "Kenya Buildcon International Expo 2027",
  shortName: "Kenya Buildcon",
  brandWord: "Buildcon",
  descriptor: "Kenya's Leading Trade Exhibition on the Building & Construction Industry",
  edition: "2027",
  editionLabel: "4th Edition",
  theme: "Building the Future, Together",

  dates: {
    start: "2027-06-09",
    end: "2027-06-11",
    display: "9–11 June 2027",
    displayShort: "09–11 JUN 2027",
    openingTimeConfirmed: true,
    openingHours: "10:00 am – 6:00 pm",
    countdownTargetIso: "2027-06-09T10:00:00+03:00", // Africa/Nairobi (EAT, UTC+3)
    timezone: "Africa/Nairobi",
  },

  venue: {
    name: "The Sarit Expo Centre",
    district: "Westlands",
    city: "Nairobi",
    country: "Kenya",
    countryCode: "KE",
    fullLocation: "The Sarit Expo Centre, Nairobi, Kenya",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Sarit+Expo+Centre+Westlands+Nairobi+Kenya&output=embed",
    mapLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=Sarit+Expo+Centre+Westlands+Nairobi+Kenya",
  },

  format: "B2B Trade Exhibition",
  industry: "Building & Construction",
  website: "https://kenyabuildcon.com",
  websiteDisplay: "www.kenyabuildcon.com",

  brandLines: {
    main: "BUILDING THE FUTURE, TOGETHER.",
    supporting: "Where Innovation Meets Opportunity in the Heart of Nairobi.",
    exhibitor: "Connect with the East African Construction Market.",
    visitor: "Gain Insights. Discover Innovations. Explore Solutions.",
  },

  organisers: [
    {
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      logo: "/logos/futurex-logo.png",
      url: "https://www.futurextrade.com/",
    },
    {
      name: "Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL)",
      logo: "/logos/etsipl-logo.png",
      url: "https://www.etsipl.in/",
    },
  ],

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
    // Role-based aliases used by the Contact page and forms
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

  // Official Kenya Buildcon profiles (kenyabuildcon.com); env vars override per environment.
  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "https://www.linkedin.com/company/kenyabuildconexpo",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "https://www.facebook.com/kenyabuildconexpo/",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "https://www.instagram.com/kenyabuildconexpo/",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "https://twitter.com/kenyabuildcon",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },

  cta: {
    bookStand: "/book-a-stand",
    registerVisit: "/register-to-visit",
  },

  exhibitorDirectoryMinimum: 6,
} as const;

export type EventConfig = typeof event;
