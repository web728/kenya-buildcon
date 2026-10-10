
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

/* ==========================================
   BRAND & MOTION
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.04,
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
      duration: 0.68,
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
   SHARED UI
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
          light ? "text-white/75" : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

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
    desc: "Producers of raw materials, fabricated parts, and architectural systems seeking direct distribution agreements.",
    badge: "Direct Production",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Exporters",
    desc: "Global trading houses and exporters supplying building products to Kenya and the wider East African region.",
    badge: "Global Logistics",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "International Suppliers",
    desc: "International companies introducing new building technologies and engineering solutions to Kenya.",
    badge: "Foreign Trade",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    title: "Kenyan Manufacturers",
    desc: "Local producers of cement, steel, building materials and finishing products serving Kenya's construction sector.",
    badge: "Domestic Industry",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Importers & Distributors",
    desc: "Wholesale network leaders supplying national hardware stores, contractors, and retail depots.",
    badge: "Supply Chain",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    title: "Construction Machinery Companies",
    desc: "Brands of earthmoving equipment, excavators, loaders, tower cranes, scaffolding, and site machinery.",
    badge: "Heavy Plant",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    title: "Building Material Companies",
    desc: "Suppliers of structural cement, blocks, gypsum, roofing, chemical waterproofing, and insulation products.",
    badge: "Materials",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Engineering Product Manufacturers",
    desc: "Producers of MEP components, structural steel profiles, high-pressure valves, and water pumping systems.",
    badge: "Engineering",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Equipment Suppliers",
    desc: "Distributors of power tools, workshop machinery, drilling equipment, and job-site safety gear.",
    badge: "Tools & Power",
    icon: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  },
  {
    title: "Building Technology Companies",
    desc: "Innovators delivering smart building automation, solar energy, HVAC controls, and BIM/CAD construction software.",
    badge: "PropTech & BIM",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Construction Product & System Providers",
    desc: "Providers of modular precast solutions, architectural glass facades, fire detection, and surface finishing.",
    badge: "Integrated Systems",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
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

        <span className="text-[11px] font-bold tabular-nums text-[#AAAAAA]">
          {String(index + 1).padStart(2, "0")}
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

      <div className="mt-5 border-t border-[#111111]/10 pt-3.5">
        <Link
          href={event.cta.bookStand}
          className="group/link inline-flex items-center gap-2 text-[11px] font-extrabold text-[#BE202B] transition-colors hover:text-[#111111]"
          aria-label={`Enquire about exhibiting as ${profile.title.toLowerCase()}`}
        >
          Enquire About Exhibiting

          <span className="transition-transform duration-300 group-hover/link:translate-x-1">
            <ArrowIcon diagonal />
          </span>
        </Link>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#25B34B] transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* ==========================================
   MAIN EXHIBITOR DIRECTORY
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
              Industry &amp; Exhibitor Profiles
            </Eyebrow>

            <h2
              id="exhibitor-directory-heading"
              className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-[#111111]"
            >
              The Businesses That{" "}
              <span className="text-[#BE202B]">
                Belong Here.
              </span>
            </h2>

            <p className="mt-3 max-w-[670px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
              Discover the manufacturer, supplier,
              technology and distribution profiles
              relevant to {event.name}. Connect
              your products and services with a
              construction-focused trade audience.
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

        <Reveal className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/10 pt-5">
          <motion.p
            variants={itemVariants}
            className="text-[11px] leading-[1.75] text-[#777777]"
          >
            The profiles above describe relevant
            exhibitor categories, not a list of
            confirmed participating companies.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              href="/exhibit"
              className="group inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B] hover:text-[#111111]"
            >
              Explore Exhibitor Benefits

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   CLOSING CTA
========================================== */

function ExhibitorCta() {
  return (
    <section
      aria-labelledby="exhibitor-cta-heading"
      className="relative isolate overflow-hidden bg-[#111111] py-12 text-white sm:py-14"
    >
      <ArchitecturalBackground dark />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
            <Eyebrow light>
              Exhibit at Kenya Buildcon 2027
            </Eyebrow>

            <h2
              id="exhibitor-cta-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.65rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white"
            >
              Put Your Products in{" "}
              <span className="text-white/75">
                Front of the Industry.
              </span>
            </h2>

            <p className="mt-3 max-w-[670px] text-[13px] leading-[1.8] text-white/65 sm:text-[14px]">
              Connect with construction buyers,
              distributors, contractors and industry
              professionals at {event.name}, hosted
              at {event.venue.name} in{" "}
              {event.venue.city}.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold text-white/55">
              <span>{event.dates.display}</span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span>
                {event.venue.city},{" "}
                {event.venue.country}
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex shrink-0 flex-wrap gap-3"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[45px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Book Exhibition Space

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-[45px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
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
   MAIN CLIENT VIEW
========================================== */

export function WhoShouldExhibitClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <ExhibitorDirectory />
      <ExhibitorCta />
    </div>
  );
}
