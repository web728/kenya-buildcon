
export type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About the Expo",
        href: "/about",
        description: "Overview of the exhibition.",
      },
      {
        label: "Why Kenya",
        href: "/why-kenya",
        description: "Building, construction and market opportunities.",
      },
      {
        label: "Venue & Location",
        href: "/venue",
        description: "The Sarit Expo Centre, Nairobi.",
      },
      {
        label: "Organisers",
        href: "/organisers",
        description: "Meet the official organisers.",
      },
      // {
      //   label: "Partners & Sponsors",
      //   href: "/partners",
      //   description: "Exhibition partners and sponsors.",
      // },
    ],
  },
  {
    label: "Exhibit",
    href: "/exhibit",
    children: [
      {
        label: "Why Exhibit",
        href: "/exhibit",
        description: "Exhibitor benefits, participation and support.",
      },
      {
        label: "Exhibition Profile",
        href: "/exhibition-profile",
        description: "Industry sectors and product categories.",
      },
      {
        label: "Book a Stand",
        href: "/book-a-stand",
        description: "Exhibition space and stand enquiries.",
      },
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    children: [
      {
        label: "Why Visit",
        href: "/visit",
        description: "Products, suppliers and visitor benefits.",
      },
      {
        label: "Visitor Profile",
        href: "/visitor-profile",
        description: "Professional visitor categories.",
      },
      {
        label: "Register to Visit",
        href: "/register-to-visit",
        description: "Visitor registration information.",
      },
    ],
  },
  {
    label: "Downloads",
    href: "/downloads",
    children: [
      {
        label: "Exhibition Brochure",
        href: "/downloads",
        description: "Kenya Buildcon International Expo 2027 brochure.",
      },
      {
        label: "Post Show Report 2026",
        href: "/downloads/3rd-Kenya-Buildcon-International-Expo-2026-Post-Show-Report.pdf",
        description: "Report from the 3rd edition.",
      },
    ],
  },
  {
    label: "Media & Resources",
    href: "/gallery",
    children: [
      // {
      //   label: "Latest News",
      //   href: "/news",
      //   description: "Exhibition news and announcements.",
      // },
      {
        label: "Photo Gallery",
        href: "/gallery",
        description: "Photographs from previous editions.",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNav = {
  event: [
    { label: "About the Expo", href: "/about" },
    { label: "Why Kenya", href: "/why-kenya" },
    { label: "Venue & Location", href: "/venue" },
    { label: "Organisers", href: "/organisers" },
    // { label: "Partners & Sponsors", href: "/partners" },
  ],

  exhibit: [
    { label: "Why Exhibit", href: "/exhibit" },
    { label: "Exhibition Profile", href: "/exhibition-profile" },
    { label: "Book a Stand", href: "/book-a-stand" },
  ],

  visit: [
    { label: "Why Visit", href: "/visit" },
    { label: "Visitor Profile", href: "/visitor-profile" },
    { label: "Register to Visit", href: "/register-to-visit" },
  ],

  information: [
    // { label: "Latest News", href: "/news" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "Exhibition Brochure", href: "/downloads" },
    { label: "Post Show Report 2027", href: "/downloads/3rd-Kenya-Buildcon-International-Expo-2026-Post-Show-Report.pdf" },
    { label: "Contact Us", href: "/contact" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};
