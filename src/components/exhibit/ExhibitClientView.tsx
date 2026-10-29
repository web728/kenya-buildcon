
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { exhibitionSectors } from "@/data/exhibitionProfile";
/* ==========================================
   DESIGN & MOTION
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 17,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

type Service = {
  id: string;
  number: string;
  title: string;
  tag: string;
  body: string;
  icon: string;
  actionLabel: string;
  actionHref: string;
  external?: boolean;
  note?: string;
};


function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={parentVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================
   SHARED COMPONENTS
========================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M8 6h10v10" />
      ) : (
        <path d="M4 12h16m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-[#BE202B]" />
      <span
        className={`text-[10px] font-extrabold uppercase tracking-[0.15em] ${
          light
            ? "text-white/75"
            : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function ArchitecturalPattern({
  dark = false,
}: {
  dark?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute inset-0 ${
          dark
            ? "opacity-[0.035]"
            : "opacity-[0.025]"
        }`}
        style={{
          backgroundImage: dark
            ? "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)"
            : "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <svg
        viewBox="0 0 1400 480"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M880 480V140L1120 40L1360 140V480"
          stroke="#BE202B"
          strokeOpacity={dark ? 0.18 : 0.09}
          strokeWidth="1"
        />
        <path
          d="M960 480V190L1120 125L1280 190V480"
          stroke="#25B34B"
          strokeOpacity={dark ? 0.13 : 0.07}
          strokeWidth="1"
        />
        <path
          d="M-70 370C280 250 480 415 810 310S1180 270 1480 350"
          stroke={dark ? "#FFFFFF" : "#111111"}
          strokeOpacity="0.07"
        />
      </svg>
    </div>
  );
}

/* ==========================================
   EXHIBITOR DATA
========================================== */


const BENEFITS = [
  {
    number: "01",
    title: "Lead Generation",
    badge: "Business Enquiries",
    description:
      "Meet potential buyers, discuss their requirements and generate enquiries for your products and services.",
    icon: "M3 17l6-6 4 4 8-9M15 6h6v6",
  },
  {
    number: "02",
    title: "Market Insights",
    badge: "Industry Feedback",
    description:
      "Speak directly with industry professionals to understand customer needs, product preferences and market demand.",
    icon: "M3 3v18h18M7 15l4-4 3 3 6-7",
  },
  {
    number: "03",
    title: "Explore New Markets",
    badge: "Market Opportunities",
    description:
      "Explore business opportunities in Kenya and East Africa by connecting with local buyers, suppliers and distributors.",
    icon: "M12 21s8-4 8-11a8 8 0 10-16 0c0 7 8 11ZM4 10h16M12 2c-3 4-3 12 0 17M12 2c3 4 3 12 0 17",
  },
  {
    number: "04",
    title: "Business Partnerships",
    badge: "Industry Connections",
    description:
      "Connect with distributors, developers, contractors and other industry professionals to explore potential business partnerships.",
    icon: "M7 11l4 4 6-6M2 12l4-4 5 5M22 12l-4-4-5 5M3 18h5m8 0h5",
  },
  {
    number: "05",
    title: "Brand Visibility",
    badge: "Industry Exposure",
    description:
      "Increase awareness of your brand by presenting your products and services to professionals from the building and construction industry.",
    icon: "M3 11l18-7-7 18-3-8-8-3ZM11 14l3 8",
  },
  {
    number: "06",
    title: "Product Showcase",
    badge: "Products & Solutions",
    description:
      "Display your latest building materials, construction equipment, technologies and related products to potential customers.",
    icon: "M3 7l9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10",
  },
];


const EXHIBITOR_TYPES = [
  {
    title: "Manufacturers",
    description:
      "Local and international manufacturers of building materials, components and construction products.",
  },
  {
    title: "Exporters & International Suppliers",
    description:
      "Companies looking to introduce their products and services to buyers in Kenya and East Africa.",
  },
  {
    title: "Importers & Distributors",
    description:
      "Businesses involved in sourcing, importing and distributing building and construction products.",
  },
  {
    title: "Construction Machinery Companies",
    description:
      "Manufacturers and suppliers of construction machinery, heavy equipment and related systems.",
  },
  {
    title: "Building Material Suppliers",
    description:
      "Suppliers of cement, steel, roofing, flooring, glass, insulation and finishing products.",
  },
  {
    title: "Engineering & Building Systems",
    description:
      "Companies offering structural, electrical, mechanical, plumbing and other building systems.",
  },
  {
    title: "Architectural & Interior Product Companies",
    description:
      "Suppliers of doors, windows, architectural products, interior finishes and related solutions.",
  },
  {
    title: "Technology & Equipment Providers",
    description:
      "Companies offering building automation, construction software, tools, equipment and related technologies.",
  },
];



const EXHIBITOR_CATEGORIES = [
  "Building Materials & Construction",
  "Engineering Services",
  "Heavy Machinery",
  "Architectural & Interior Design",
  "Green Building Solutions",
  "Advanced Infrastructure Technology",
  "Manufacturers & Exporters",
  "Importers & Distributors",
];


const STAND_OPTIONS = [
  {
    number: "01",
    title: "Shell Scheme Stand",
    tag: "Standard Stand",
    description:
      "A ready-to-use exhibition stand suitable for displaying products, presenting services and meeting visitors. Stand fittings and facilities depend on the selected package.",
  },
  {
    number: "02",
    title: "Bare Space",
    tag: "Custom Stand",
    description:
      "Open exhibition space for exhibitors who want to design and build their own stands according to their display and branding requirements.",
  },
  {
    number: "03",
    title: "International Pavilions",
    tag: "Group Participation",
    description:
      "Exhibition space for international companies participating together through trade associations, export promotion organisations or country pavilions.",
  },
  {
    number: "04",
    title: "Machinery & Equipment Displays",
    tag: "Equipment Display",
    description:
      "Display options for construction machinery and large equipment, subject to available space, technical requirements and venue approval.",
  },
];


function ArchitecturalBackground({
  dark = false,
}: {
  dark?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute inset-0 ${
          dark ? "opacity-[0.035]" : "opacity-[0.025]"
        }`}
        style={{
          backgroundImage: dark
            ? "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)"
            : "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <svg
        viewBox="0 0 1400 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M850 500V155L1100 45L1350 155V500"
          stroke="#BE202B"
          strokeOpacity={dark ? 0.18 : 0.09}
          strokeWidth="1"
        />
        <path
          d="M940 500V205L1100 135L1260 205V500"
          stroke="#25B34B"
          strokeOpacity={dark ? 0.14 : 0.075}
          strokeWidth="1"
        />
        <path
          d="M-100 385C290 265 475 430 810 325S1190 270 1510 365"
          stroke={dark ? "#FFFFFF" : "#111111"}
          strokeOpacity="0.075"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

/* ==========================================
   EXHIBITOR PROFILES
   Original 11 categories preserved
========================================== */


const EXHIBITOR_PROFILES = [
  {
    title: "Manufacturers",
    desc: "Local and international manufacturers producing building materials, components, architectural products and construction-related equipment.",
    badge: "Manufacturing",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Exporters & International Suppliers",
    desc: "Companies supplying building and construction products to buyers, distributors and businesses in Kenya and East Africa.",
    badge: "International Trade",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Importers & Distributors",
    desc: "Businesses involved in importing, sourcing and distributing building materials, equipment and related products.",
    badge: "Distribution",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    title: "Construction Machinery Companies",
    desc: "Manufacturers and suppliers of earthmoving machinery, cranes, loaders, excavators and other construction equipment.",
    badge: "Machinery",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    title: "Building Material Suppliers",
    desc: "Suppliers of cement, steel, roofing, flooring, glass, gypsum, insulation and other building and finishing materials.",
    badge: "Building Materials",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Engineering & Building Systems",
    desc: "Companies offering structural engineering products, electrical systems, plumbing, HVAC, fire protection and related building services.",
    badge: "Engineering",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Architectural & Interior Product Companies",
    desc: "Suppliers of doors, windows, architectural glass, interior finishes, bathroom products and other building design solutions.",
    badge: "Architecture & Interiors",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    title: "Technology & Equipment Providers",
    desc: "Companies supplying construction tools, building automation, renewable energy systems, BIM software and related technologies.",
    badge: "Technology & Equipment",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];



const SERVICES: Service[] = [
  {
    id: "travel-documentation",
    number: "01",
    title: "Travel & Invitation Letters",
    tag: "Travel Documentation",
    body:
      "International exhibitors should check Kenya's current entry requirements before travelling. Exhibitors who need an invitation letter can contact the organising team with their company and participation details.",
    icon:
      "M12 3a9 9 0 100 18 9 9 0 000-18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18",
    actionLabel: "Contact Organisers",
    actionHref: "/contact",
    note:
      "Entry requirements vary. Invitation letters are subject to verification and do not guarantee entry.",
  },
  {
    id: "freight-logistics",
    number: "02",
    title: "Freight & Customs",
    tag: "Shipping & Logistics",
    body:
      "Exhibitors bringing machinery, product samples or display materials should confirm shipping, customs clearance and delivery arrangements with their logistics providers and the organising team.",
    icon:
      "M3 7h11v10H3V7Zm11 3h4l3 4v3h-7v-7ZM7 20a2 2 0 100-4 2 2 0 000 4Zm11 0a2 2 0 100-4 2 2 0 000 4Z",
    actionLabel: "Discuss Logistics",
    actionHref: "/contact",
    note:
      "Customs documents and import requirements should be checked before shipping.",
  },
  {
    id: "technical-guidance",
    number: "03",
    title: "Stand Setup & Technical Guidance",
    tag: "Exhibition Operations",
    body:
      "Contact the organising team for stand setup instructions, construction requirements, venue access, safety rules and exhibition schedules.",
    icon:
      "M6 3h9l4 4v14H6a2 2 0 01-2-2V5a2 2 0 012-2Zm9 0v5h5M8 12h8M8 16h8",
    actionLabel: "Request Technical Details",
    actionHref: "/contact",
    note:
      "Stand specifications and setup schedules must be confirmed with the organisers.",
  },
  {
    id: "on-site-services",
    number: "04",
    title: "On-Site Services & Utilities",
    tag: "Venue Services",
    body:
      "Exhibitors can enquire about electricity, internet access, material handling and other services needed for their stands. Requirements should be discussed before finalising stand arrangements.",
    icon:
      "M13 2 5 13h6l-1 9 9-12h-6l1-8Z",
    actionLabel: "Enquire About Services",
    actionHref: "/contact",
    note:
      "Service availability, technical limits and additional charges require confirmation.",
  },
];


/* ==========================================
   EXHIBITOR CARD
========================================== */

function ExhibitorProfileCard({
  profile,
  index,
}: {
  profile: (typeof EXHIBITOR_PROFILES)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const isGreen = index % 4 === 1;

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: 0.3,
                ease: EASE,
              },
            }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_12px_30px_rgba(17,17,17,0.06)] sm:p-6"
    >
      {/* Icon, badge and index */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${
            isGreen
              ? "bg-[#25B34B]/[0.08] text-[#1D9440] group-hover:bg-[#25B34B] group-hover:text-white"
              : "bg-[#BE202B]/[0.07] text-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d={profile.icon} />
          </svg>
        </span>
 
      </div>

      <span className="mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#BE202B]">
        {profile.badge}
      </span>

      <h3 className="mt-2 text-[16px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] sm:text-[17px]">
        {profile.title}
      </h3>

      <p className="mt-2 flex-1 text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
        {profile.desc}
      </p>



    </motion.article>
  );
}



/* ==========================================
   SECTION 1 — EXHIBITOR BENEFITS
========================================== */

function ExhibitBenefits() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="exhibit-benefits-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <ArchitecturalPattern />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[730px]"
          >
          
<Eyebrow>
  Benefits of Exhibiting
</Eyebrow>

<h2
  id="exhibit-benefits-heading"
  className="mt-3 text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.17] tracking-[-0.04em] text-[#111111]"
>
  More Than an{" "}
  <span className="text-[#BE202B]">
    Exhibition Stand.
  </span>
</h2>

<p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
  Exhibiting at Kenya Buildcon International Expo
   2027 gives businesses an opportunity to showcase 
   their products, meet potential buyers and develop connections
  across the building and construction industry.
</p>

          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[43px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors duration-300 hover:bg-[#A51B25]"
            >
              Enquire About Stand Space
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <motion.article
              key={benefit.number}
              variants={itemVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      transition: {
                        duration: 0.3,
                        ease: EASE,
                      },
                    }
              }
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_12px_30px_rgba(17,17,17,0.06)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[#BE202B] transition-colors duration-300 group-hover:bg-[#BE202B] group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d={benefit.icon} />
                  </svg>
                </span>

               
              </div>

              <span className="mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#BE202B]">
                {benefit.badge}
              </span>

              <h3 className="mt-2 text-[17px] font-extrabold tracking-[-0.025em] text-[#111111]">
                {benefit.title}
              </h3>

              <p className="mt-2 flex-1 text-[12px] leading-[1.85] text-[#686868] sm:text-[13px]">
                {benefit.description}
              </p>

            
            
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#25B34B] transition-[width] duration-500 group-hover:w-full"
              />
            </motion.article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}


/* ==========================================
   SECTION 2 — WHO SHOULD EXHIBIT
========================================== */

function ExhibitorDirectory() {
  return (
    <section
      aria-labelledby="exhibitor-directory-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <ArchitecturalBackground />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[740px]"
          >
         
<Eyebrow>
  Exhibitor Participation
</Eyebrow>

<h2
  id="exhibitor-directory-heading"
  className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-[#111111]"
>
  Who Should{" "}
  <span className="text-[#BE202B]">
    Exhibit?
  </span>
</h2>

<p className="mt-3 max-w-[670px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
  From building material manufacturers to
  machinery suppliers and technology providers,
  Kenya Buildcon International Expo 2027 welcomes businesses offering
  products and services across the building
  and construction industry.
</p>

          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2.5"
          >
            <Link
              href="/exhibition-profile"
              className="inline-flex min-h-[43px] items-center gap-2 rounded-md border border-[#111111]/20 bg-white px-4 py-2.5 text-[11px] font-bold text-[#111111] transition-colors hover:border-[#BE202B] hover:text-[#BE202B]"
            >
              Exhibition Profile
              <ArrowIcon />
            </Link>

            <Link
              href={event.cta.bookStand}
              className="inline-flex min-h-[43px] items-center gap-2 rounded-md bg-[#BE202B] px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#A51B25]"
            >
              Book a Stand
              <ArrowIcon diagonal />
            </Link>
          </motion.div>
        </Reveal>

        {/* All 11 original exhibitor profiles */}
        <Reveal className="mt-6 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXHIBITOR_PROFILES.map((profile, index) => (
            <ExhibitorProfileCard
              key={profile.title}
              profile={profile}
              index={index}
            />
          ))}
        </Reveal>

     
      </Container>
    </section>
  );
}



/* ==========================================
   SECTION 3 — EXHIBITION SPACE
========================================== */

function ParticipationOptions() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="stand-options-heading"
      className="relative isolate overflow-hidden bg-[#111111] py-12 text-white sm:py-14 lg:py-16"
    >
      <ArchitecturalPattern dark />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-white/15 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[720px]"
          >
          
<Eyebrow light>
  Exhibition Stand Options
</Eyebrow>

<h2
  id="stand-options-heading"
  className="mt-3 text-[clamp(1.85rem,3vw,2.7rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white"
>
  Choose the Right{" "}
  <span className="text-[#ff303e]">
    Exhibition Space.
  </span>
</h2>

<p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-white/65 sm:text-[14px]">
  Explore exhibition space options suited to
  different products, display requirements
  and business needs.
</p>

          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[43px] items-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Request Stand Details
              <ArrowIcon diagonal />
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAND_OPTIONS.map((option) => (
            <motion.article
              key={option.number}
              variants={itemVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      transition: {
                        duration: 0.3,
                        ease: EASE,
                      },
                    }
              }
              className="group relative flex min-h-[225px] flex-col rounded-lg border border-white/15 bg-[#1C1C1C] p-5 transition-[background-color,border-color] duration-300 hover:border-[#BE202B]/60 hover:bg-[#232323]"
            >
             

              <h3 className="mt-5 text-[17px] font-extrabold leading-[1.3] tracking-[-0.02em] text-white">
                {option.title}
              </h3>

              <p className="mt-3 flex-1 text-[12px] leading-[1.85] text-white/65">
                {option.description}
              </p>

            </motion.article>
          ))}
        </Reveal>
 
      </Container>
    </section>
  );
}

/* ==========================================
   SECTION 4 — CLOSING CONVERSION
========================================== */

function ExhibitClosing() {
  return (
    <section
      aria-labelledby="exhibit-cta-heading"
      className="bg-white py-11 sm:py-14"
    >
      <Container>
        <Reveal className="flex flex-col gap-6 rounded-xl border border-[#111111]/10 bg-[#F8F8F8] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[700px]"
          >
            <Eyebrow>
              Kenya Buildcon 2027
            </Eyebrow>

            <h2
              id="exhibit-cta-heading"
              className="mt-3 text-[clamp(1.7rem,2.6vw,2.45rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#111111]"
            >
              Ready to Exhibit{" "}
              <span className="text-[#BE202B]">
                in Nairobi?
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.8] text-[#666666]">
              Enquire about exhibiting at{" "}
              {event.name}, taking place at{" "}
              {event.venue.name} on{" "}
              {event.dates.display}.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold text-[#777777]">
              <span>{event.venue.city}, {event.venue.country}</span>
              <span className="hidden h-3 w-px bg-[#111111]/20 sm:block" />
              <span>{event.dates.openingHours}</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex shrink-0 flex-wrap gap-3"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[45px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Book a Stand
              <ArrowIcon diagonal />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-[45px] items-center justify-center rounded-md border border-[#111111]/20 bg-white px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#111111] transition-colors hover:border-[#111111]"
            >
              Contact Organisers
            </Link>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   SERVICE CARD
========================================== */

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reducedMotion = useReducedMotion();

  const isGreen = index % 4 === 1;

  return (
    <motion.article
      id={service.id}
      variants={itemVariants}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: 0.3,
                ease: EASE,
              },
            }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_14px_34px_rgba(17,17,17,0.06)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${
            isGreen
              ? "bg-[#25B34B]/[0.08] text-[#1D9440] group-hover:bg-[#25B34B] group-hover:text-white"
              : "bg-[#BE202B]/[0.07] text-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[21px] w-[21px]"
            aria-hidden="true"
          >
            <path d={service.icon} />
          </svg>
        </span>

        
      </div>

      <div className="mt-5">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#BE202B]">
          {service.tag}
        </span>

        <h3 className="mt-2 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111]">
          {service.title}
        </h3>
      </div>

      <p className="mt-3 flex-1 text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
        {service.body}
      </p>

     

     
    </motion.article>
  );
}

function ServicesDirectory() {
  return (
    <section
      aria-labelledby="exhibitor-services-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
          
<Eyebrow>
  Exhibitor Services & Support
</Eyebrow>

<h2
  id="exhibitor-services-heading"
  className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.17] tracking-[-0.04em] text-[#111111]"
>
  Plan Your Exhibition{" "}
  <span className="text-[#BE202B]">
    Participation.
  </span>
</h2>

<p className="mt-3 max-w-[690px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
  Find useful information on travel
  documentation, shipping, stand setup
  and on-site services to help you
  prepare for Kenya Buildcon International Expo 2027.
</p>

          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[43px] items-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Book Exhibition Space

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </Reveal>

     
      </Container>
    </section>
  );
}


/* ==========================================
   MAIN COMPONENT
========================================== */

export function ExhibitClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <ExhibitBenefits />
      <ExhibitorDirectory />
      <ParticipationOptions />
       <ServicesDirectory />
    </div>
  );
}
