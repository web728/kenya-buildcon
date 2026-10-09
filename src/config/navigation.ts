export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About the Expo", href: "/about", description: "Purpose, vision, and key facts." },
      { label: "Why Kenya", href: "/why-kenya", description: "Market growth and trade opportunities." },
      { label: "Venue & Location", href: "/venue", description: "The Sarit Expo Centre, Nairobi." },
      { label: "Organisers", href: "/organisers", description: "Organized by Futurex & ETSIPL." },
      { label: "Partners & Sponsors", href: "/partners", description: "Supporting industry partners." },
    ],
  },
  {
    label: "Exhibit",
    href: "/exhibit",
    children: [
      { label: "Why Exhibit", href: "/exhibit", description: "Key benefits for exhibitors." },
      { label: "Who Should Exhibit", href: "/who-should-exhibit", description: "Target profile for manufacturers & suppliers." },
      { label: "Exhibition Profile", href: "/exhibition-profile", description: "Sectors and product directory." },
      { label: "Exhibitor Directory", href: "/exhibitors", description: "Current list of participating brands." },
      { label: "Exhibitor Services", href: "/exhibitor-services", description: "Logistics, travel, and stand construction." },
      { label: "Book a Stand", href: "/book-a-stand", description: "Reserve your expo booth space." },
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    children: [
      { label: "Why Visit", href: "/visit", description: "Source products and meet suppliers." },
      { label: "Who Should Visit", href: "/who-should-visit", description: "Trade visitor qualifications." },
      { label: "Register to Visit", href: "/register-to-visit", description: "Get your free trade pass." },
      { label: "Plan Your Visit", href: "/plan-your-visit", description: "Hotel, travel, and local guide." },
    ],
  },
  {
  label: "Downloads",
  href: "/downloads/brochure",
  children: [
    {
      label: "Exhibition Brochure",
      href: "/downloads",
      description:
        "Download the official India Battery International Show brochure.",
    },
    {
      label: "Post Show Report",
      href: "/downloads/3rd-Kenya-Buildcon-International-Expo-2026-Post-Show-Report.pdf",
      description:
        "View the official post show report from the previous edition.",
    },
  ],
},
  {
    label: "Media & Resources",
    href: "/news",
    children: [
      { label: "Latest News", href: "/news", description: "Press releases and updates." },
      { label: "Gallery", href: "/gallery", description: "Event photos and video highlights." },
      // { label: "Downloads", href: "/downloads", description: "Brochures, floor plan, and forms." },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  event: [
    { label: "About Expo", href: "/about" },
    { label: "Why Kenya", href: "/why-kenya" },
    { label: "Exhibition Profile", href: "/exhibition-profile" },
    { label: "Venue Info", href: "/venue" },
    { label: "Organisers", href: "/organisers" },
  ],
  exhibit: [
    { label: "Why Exhibit", href: "/exhibit" },
    { label: "Who Should Exhibit", href: "/who-should-exhibit" },
    { label: "Exhibitor Directory", href: "/exhibitors" },
    { label: "Exhibitor Services", href: "/exhibitor-services" },
    { label: "Book a Stand", href: "/book-a-stand" },
  ],
  visit: [
    { label: "Why Visit", href: "/visit" },
    { label: "Who Should Visit", href: "/who-should-visit" },
    { label: "Free Registration", href: "/register-to-visit" },
    { label: "Plan Your Visit", href: "/plan-your-visit" },
  ],
  information: [
    { label: "Partners", href: "/partners" },
    { label: "News & Media", href: "/news" },
    { label: "Gallery", href: "/gallery" },
    { label: "Downloads", href: "/downloads" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};