
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
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

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={parentVariants}
      initial={reducedMotion ? false : "hidden"}
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

function ArrowIcon() {
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
      <path d="M5 12h14m-6-6 6 6-6 6" />
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
        className={`text-[10px] font-extrabold uppercase tracking-[0.14em] ${
          light ? "text-white/75" : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   BROCHURE PRODUCT CATEGORIES
   From official brochure, page 6
========================================== */

const BROCHURE_PRODUCTS = [
  "Acoustics & Soundproofing Solutions",
  "Adhesive & Sealants",
  "Air Conditioning & HVAC",
  "Aluminium Extrusions",
  "Architectural Glass",
  "Architectural Hardware",
  "Battery & Generators",
  "Building Automation",
  "Building Information Modeling (BIM) Software",
  "Cement and Steel",
  "Concrete Blocks & Machinery",
  "Construction Chemicals & Waterproofing",
  "Construction Tools, Machinery and Tapes",
  "Construction Waste Management",
  "Decorative Glass and Mirrors",
  "Demolition Equipment",
  "Doors and Windows",
  "Earthmoving Equipment",
  "Electricals & Electronics",
  "Fire Protection Systems",
  "Flooring and Wall Coverings",
  "Formwork and Scaffolding",
  "Gypsum Boards",
  "Home Automation Systems",
  "Industrial Flooring Solutions",
  "Infrastructure Software",
  "Interior Decorating Products",
  "Kitchen & Bathroom Solutions",
  "Lightweight Construction Materials",
  "Lifts & Elevators",
  "Lighting / LED",
  "Marble & Stones",
  "Modular Construction Solutions",
  "Noise Control Products",
  "Outdoor Furniture & Landscaping",
  "Paints & Coatings",
  "Passive Fire Protection",
  "Plumbing Fittings and Accessories",
  "Pre-fabricated Structures",
  "PVC/UPVC Machinery and Profiles",
  "Quarrying & Mining Equipment",
  "Renewable Energy Systems",
  "Roofing & Façade",
  "Safety & Security",
  "Solar, Wind & Other Green Energy Products",
  "Structural Engineering",
  "Structural Steel Fabrication",
  "Surveying Equipment",
  "Switches & Switch Gear",
  "Tiles & Sanitary Ware",
  "Timber & Timber Products",
  "Wires & Cables",
];

const PARTICIPATION_GROUPS = [
  {
    title: "Building & Construction Materials",
    description:
      "Cement, steel, roofing, flooring, gypsum, glass, waterproofing and finishing products.",
    number: "01",
  },
  {
    title: "Construction Machinery & Equipment",
    description:
      "Earthmoving machinery, demolition equipment, construction tools, scaffolding and equipment systems.",
    number: "02",
  },
  {
    title: "Architecture & Interior Solutions",
    description:
      "Architectural hardware, doors, windows, interior products, modular construction and sanitary ware.",
    number: "03",
  },
  {
    title: "Engineering & Building Systems",
    description:
      "Structural engineering, electrical systems, fire protection, HVAC, lifts and plumbing solutions.",
    number: "04",
  },
  {
    title: "Green Building & Energy",
    description:
      "Renewable energy systems, solar and wind products, energy-related equipment and sustainable solutions.",
    number: "05",
  },
  {
    title: "Construction Technology",
    description:
      "Building automation, BIM software, infrastructure software and technology-driven construction systems.",
    number: "06",
  },
];

const BUYER_PROFILES = [
  "Builders & Developers",
  "Architects & Planners",
  "Building Contractors",
  "Consulting Engineers",
  "Structural & Civil Engineers",
  "Project Managers & Consultants",
  "Dealers & Distributors",
  "Importers",
  "Investors & Financiers",
  "Government Agencies & Building Authorities",
  "Interior Design Professionals",
  "Sourcing Professionals",
];

/* ==========================================
   SECTOR OVERVIEW
========================================== */

function SectorOverview() {
  return (
    <section
      aria-labelledby="exhibitor-sectors-heading"
      className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "78px 78px",
        }}
      />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[780px]"
          >
            <Eyebrow>
              Official Exhibitor Profile
            </Eyebrow>

            <h2
              id="exhibitor-sectors-heading"
              className="mt-3 text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#111111]"
            >
              Industries &{" "}
              <span className="text-[#BE202B]">
                Exhibitor Sectors.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
              The Kenya Buildcon exhibition profile
              covers businesses supplying products,
              services, equipment and technologies
              to the building and construction industry.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-[43px] items-center gap-2 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase text-white transition-colors hover:bg-[#A51B25]"
            >
              Explore All Sectors
              <ArrowIcon />
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PARTICIPATION_GROUPS.map((group) => (
            <motion.article
              key={group.number}
              variants={itemVariants}
              className="group relative flex min-h-[170px] flex-col rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_12px_30px_rgba(17,17,17,0.06)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[12px] font-extrabold text-[#BE202B]">
                  {group.number}
                </span>

                <span className="h-[2px] w-7 bg-[#25B34B]" />
              </div>

              <h3 className="mt-4 text-[16px] font-extrabold leading-[1.4] text-[#111111]">
                {group.title}
              </h3>

              <p className="mt-2 text-[12px] leading-[1.75] text-[#666666]">
                {group.description}
              </p>
            </motion.article>
          ))}
        </Reveal>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/10 pt-5">
          <span className="text-[12px] text-[#777777]">
            Browse the complete category directory.
          </span>

          <Link
            href="/who-should-exhibit"
            className="inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B] hover:text-[#111111]"
          >
            Who Should Exhibit
            <ArrowIcon />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ==========================================
   BROCHURE PRODUCT DIRECTORY
========================================== */

function ProductShowcase() {
  return (
    <section
      aria-labelledby="products-heading"
      className="border-y border-[#111111]/10 bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={itemVariants}>
            <Eyebrow>
              Construction Product Directory
            </Eyebrow>

            <h2
              id="products-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
            >
              Products &{" "}
              <span className="text-[#BE202B]">
                Technologies on Display.
              </span>
            </h2>

            <p className="mt-3 max-w-[720px] text-[13px] leading-[1.8] text-[#666666]">
              The following product categories are
              listed in the official 2027 exhibitor
              profile. They describe exhibition scope,
              not guaranteed products from confirmed
              companies.
            </p>
          </motion.div>
 
        </Reveal>

        <Reveal className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BROCHURE_PRODUCTS.map((product, index) => (
            <motion.div
              key={product}
              variants={itemVariants}
              className="group flex min-h-[52px] items-center gap-3 rounded-md border border-[#111111]/[0.08] bg-white px-3.5 py-3 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_6px_18px_rgba(17,17,17,0.04)]"
            >
              <span className="text-[10px] font-extrabold tabular-nums text-[#BE202B]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-[11px] font-semibold leading-[1.5] text-[#444444]">
                {product}
              </span>
            </motion.div>
          ))}
        </Reveal>

        <p className="mt-5 text-[11px] leading-[1.7] text-[#888888]">
          Product entries are consolidated from the
          official Kenya Buildcon 2027 brochure;
          repeated items in the brochure appear once.
        </p>
      </Container>
    </section>
  );
}

/* ==========================================
   BUSINESS AUDIENCE & BUYERS
========================================== */

function IndustryAudience() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="bg-white py-12 sm:py-14"
    >
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div variants={itemVariants}>
            <Eyebrow>
              Exhibitors & Attendees
            </Eyebrow>

            <h2
              id="audience-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#111111]"
            >
              Meet the People{" "}
              <span className="text-[#BE202B]">
                Behind the Projects.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.85] text-[#666666]">
              According to the event brochure,
              Kenya Buildcon brings together companies
              specialising in building materials,
              engineering services, heavy machinery,
              architectural and interior design,
              green building solutions and advanced
              infrastructure technology.
            </p>

            <p className="mt-3 text-[13px] leading-[1.85] text-[#666666]">
              The intended visitor audience includes
              construction professionals, developers,
              architects, project managers, buyers
              and representatives from public-sector
              and commercial organisations.
            </p>

            <Link
              href="/who-should-visit"
              className="mt-5 inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B] hover:text-[#111111]"
            >
              Explore Visitor Profile
              <ArrowIcon />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-[#111111]/10 bg-[#F8F8F8] p-5 sm:p-6"
          >
            <h3 className="text-[14px] font-extrabold text-[#111111]">
              Target Professional Audience
            </h3>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {BUYER_PROFILES.map((profile) => (
                <div
                  key={profile}
                  className="flex items-center gap-2.5 rounded-md border border-[#111111]/[0.07] bg-white px-3 py-2.5"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#25B34B]" />

                  <span className="text-[11px] font-semibold text-[#555555]">
                    {profile}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   PREVIOUS EDITION BRANDS
========================================== */

function PreviousParticipants({
  names,
}: {
  names: string[];
}) {
  if (names.length === 0) return null;

  return (
    <section
      aria-labelledby="previous-participants-heading"
      className="border-t border-[#111111]/10 bg-[#F8F8F8] py-12 sm:py-14"
    >
      <Container>
        <Reveal>
          <motion.div variants={itemVariants}>
            <Eyebrow>
              Historical Exhibition Participation
            </Eyebrow>

            <h2
              id="previous-participants-heading"
              className="mt-3 text-[clamp(1.7rem,2.7vw,2.5rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
            >
              Previous Edition{" "}
              <span className="text-[#BE202B]">
                Participants.
              </span>
            </h2>

            <p className="mt-3 max-w-[740px] text-[12px] leading-[1.8] text-[#666666] sm:text-[13px]">
              The companies below are drawn from the
              existing previous-edition participant
              records. Historical participation does
              not imply confirmed participation in
              the 2027 edition.
            </p>
          </motion.div>

          <motion.ul
            variants={parentVariants}
            className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
          >
            {names.map((name, index) => (
              <motion.li
                key={`${name}-${index}`}
                variants={itemVariants}
                className="flex min-h-[48px] items-center gap-2.5 rounded-md border border-[#111111]/[0.08] bg-white px-3.5 py-3 text-[11px] font-semibold leading-[1.55] text-[#555555]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#BE202B]" />
                {name}
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   BOOKING CTA
========================================== */

function ExhibitorBookingCta() {
  return (
    <section
      aria-labelledby="exhibitor-booking-heading"
      className="relative isolate overflow-hidden bg-[#111111] py-12 text-white sm:py-14"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 600 300"
        fill="none"
        className="pointer-events-none absolute bottom-0 right-0 h-full w-auto opacity-35"
      >
        <path
          d="M110 300V110L310 25L510 110V300M180 300V150L310 95L440 150V300"
          stroke="#BE202B"
          strokeWidth="1.2"
          strokeOpacity="0.65"
        />
        <path
          d="M250 300V200H370V300M110 180H510"
          stroke="#25B34B"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      </svg>

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
            <Eyebrow light>
              Exhibit at Kenya Buildcon
            </Eyebrow>

            <h2
              id="exhibitor-booking-heading"
              className="mt-3 text-[clamp(1.85rem,2.9vw,2.7rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white"
            >
              Bring Your Products{" "}
              <span className="text-white/75">
                to Nairobi.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.85] text-white/65">
              Explore exhibition participation at{" "}
              {event.name}, taking place at{" "}
              {event.venue.name},{" "}
              {event.venue.city}, on{" "}
              {event.dates.display}.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3"
          >
            <Link
              href={event.cta.bookStand}
              className="inline-flex min-h-[44px] items-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase text-white transition-colors hover:bg-[#A51B25]"
            >
              Book a Stand
              <ArrowIcon />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase text-white transition-colors hover:bg-white hover:text-[#111111]"
            >
              Contact Organisers
            </Link>
          </motion.div>
        </Reveal>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex h-[3px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>
    </section>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function ExhibitorsBrochureView({
  pastParticipants,
}: {
  pastParticipants: string[];
}) {
  return (
    <div className="bg-white text-[#111111]">
      <SectorOverview />
      <ProductShowcase />
      <IndustryAudience />
      {/* <PreviousParticipants names={pastParticipants} /> */}
      <ExhibitorBookingCta />
    </div>
  );
}