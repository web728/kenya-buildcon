
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
    badge: "Targeted Leads",
    description:
      "Engage with targeted trade visitors, present your solutions and develop new business enquiries.",
    icon: "M3 17l6-6 4 4 8-9M15 6h6v6",
  },
  {
    number: "02",
    title: "Market Insights",
    badge: "Industry Feedback",
    description:
      "Speak with industry professionals to better understand product demand, customer preferences and emerging market needs.",
    icon: "M3 3v18h18M7 15l4-4 3 3 6-7",
  },
  {
    number: "03",
    title: "Enter the Kenyan Market",
    badge: "Market Entry",
    description:
      "Build connections in Nairobi and explore distribution, sourcing and business opportunities in Kenya and East Africa.",
    icon: "M12 21s8-4 8-11a8 8 0 10-16 0c0 7 8 11 8 11ZM4 10h16M12 2c-3 4-3 12 0 17M12 2c3 4 3 12 0 17",
  },
  {
    number: "04",
    title: "Long-Term Partnerships",
    badge: "Business Networks",
    description:
      "Meet potential distributors, developers, contractors and other stakeholders to establish lasting commercial relationships.",
    icon: "M7 11l4 4 6-6M2 12l4-4 5 5M22 12l-4-4-5 5M3 18h5m8 0h5",
  },
  {
    number: "05",
    title: "Brand Visibility",
    badge: "Industry Exposure",
    description:
      "Strengthen brand recognition by presenting your products and capabilities to a focused construction industry audience.",
    icon: "M3 11l18-7-7 18-3-8-8-3ZM11 14l3 8",
  },
  {
    number: "06",
    title: "Showcase New Products",
    badge: "Product Showcase",
    description:
      "Introduce materials, equipment and technologies directly to professionals evaluating construction solutions.",
    icon: "M3 7l9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10",
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
    title: "Shell Scheme Space",
    tag: "Standard Turnkey",
    description:
      "A conventional exhibition stand arrangement suitable for product displays, meetings and brand presentations. Confirm the included fittings with the organising team.",
  },
  {
    number: "02",
    title: "Raw Bare Space",
    tag: "Custom Build",
    description:
      "Unfurnished exhibition space for customised stand concepts, larger displays and individually designed brand environments.",
  },
  {
    number: "03",
    title: "International Pavilions",
    tag: "Country Groups",
    description:
      "Coordinated exhibition participation for trade associations, export promotion bodies, international delegations and country groups.",
  },
  {
    number: "04",
    title: "Machinery & Heavy Displays",
    tag: "Equipment Exhibits",
    description:
      "Participation enquiries for machinery and large equipment displays, subject to technical, floor-loading and venue approvals.",
  },
];

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
              Exhibitor Advantages
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
              Put your business in front of
              construction industry professionals.
              Discover six reasons to participate
              in {event.name}.
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

                <span className="text-[11px] font-bold tabular-nums text-[#BBBBBB]">
                  {benefit.number}
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

              <div className="mt-5 flex items-center justify-between border-t border-[#111111]/10 pt-3.5">
                <span className="text-[10px] font-semibold text-[#777777]">
                  Kenya Buildcon 2027
                </span>

                <Link
                  href={event.cta.bookStand}
                  aria-label={`Enquire about exhibiting for ${benefit.title.toLowerCase()}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#F6F6F6] text-[#BE202B] transition-colors hover:bg-[#BE202B] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B]"
                >
                  <ArrowIcon diagonal />
                </Link>
              </div>

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

function ExhibitorProfiles() {
  return (
    <section
      aria-labelledby="exhibitor-profiles-heading"
      className="border-y border-[#111111]/[0.07] bg-[#F8F8F8] py-12 sm:py-14"
    >
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={itemVariants}>
            <Eyebrow>
              Industry Participation
            </Eyebrow>

            <h2
              id="exhibitor-profiles-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
            >
              Who Should{" "}
              <span className="text-[#BE202B]">
                Exhibit?
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-[350px]"
          >
            <p className="text-[12px] leading-[1.8] text-[#777777] sm:text-[13px]">
              Relevant business profiles across
              building materials, equipment,
              engineering and construction technology.
            </p>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {EXHIBITOR_CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="group flex min-h-[80px] items-center gap-3 rounded-lg border border-[#111111]/10 bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_8px_24px_rgba(17,17,17,0.045)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#BE202B]/[0.06] text-[11px] font-extrabold tabular-nums text-[#BE202B] transition-colors group-hover:bg-[#BE202B] group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-[12px] font-bold leading-[1.6] text-[#333333] sm:text-[13px]">
                {category}
              </h3>
            </motion.div>
          ))}
        </Reveal>

        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/10 pt-5">
          <motion.p
            variants={itemVariants}
            className="text-[12px] leading-[1.7] text-[#777777]"
          >
            Explore the complete industry and product profile.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              href="/who-should-exhibit"
              className="group inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B] hover:text-[#111111]"
            >
              View Exhibitor Profile
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
              Participation Formats
            </Eyebrow>

            <h2
              id="stand-options-heading"
              className="mt-3 text-[clamp(1.85rem,3vw,2.7rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white"
            >
              Choose the Right{" "}
              <span className="text-white/75">
                Exhibition Space.
              </span>
            </h2>

            <p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-white/65 sm:text-[14px]">
              Explore stand formats for product
              showcases, customised displays,
              international participation and
              machinery exhibits.
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
              className="group relative flex min-h-[265px] flex-col rounded-lg border border-white/15 bg-[#1C1C1C] p-5 transition-[background-color,border-color] duration-300 hover:border-[#BE202B]/60 hover:bg-[#232323]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/55">
                  {option.tag}
                </span>

                <span className="text-[12px] font-bold tabular-nums text-[#25B34B]">
                  {option.number}
                </span>
              </div>

              <h3 className="mt-5 text-[17px] font-extrabold leading-[1.3] tracking-[-0.02em] text-white">
                {option.title}
              </h3>

              <p className="mt-3 flex-1 text-[12px] leading-[1.85] text-white/65">
                {option.description}
              </p>

              <Link
                href={event.cta.bookStand}
                className="group/link mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-[11px] font-bold text-white transition-colors hover:text-[#F26B70]"
              >
                Enquire About This Space
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                  <ArrowIcon diagonal />
                </span>
              </Link>

              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-10 bg-[#BE202B] transition-[width] duration-500 group-hover:w-full"
              />
            </motion.article>
          ))}
        </Reveal>

        <p className="mt-5 text-[11px] leading-[1.7] text-white/45">
          Stand configurations, inclusions and
          technical requirements are subject to
          organiser confirmation and venue approval.
        </p>
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
   MAIN COMPONENT
========================================== */

export function ExhibitClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <ExhibitBenefits />
      <ExhibitorProfiles />
      <ParticipationOptions />
      <ExhibitClosing />
    </div>
  );
}
