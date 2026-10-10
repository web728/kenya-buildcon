
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

/* ==================================================
   DESIGN & MOTION SYSTEM
================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = {
  once: true,
  margin: "0px 0px -50px 0px",
} as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

/* ==================================================
   REUSABLE MOTION WRAPPER
================================================== */

function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={containerVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==================================================
   SHARED UI ELEMENTS
================================================== */

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

function LocationIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
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
          light ? "text-[#F26B70]" : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ==================================================
   ARCHITECTURAL BACKGROUND
================================================== */

function VenueBackground({
  dark = false,
}: {
  dark?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute inset-0 ${
          dark ? "opacity-[0.03]" : "opacity-[0.025]"
        }`}
        style={{
          backgroundImage: dark
            ? "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)"
            : "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "78px 78px",
        }}
      />

      <svg
        viewBox="0 0 1440 480"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M1030 480V130L1240 35L1450 130V480"
          stroke={dark ? "#FFFFFF" : "#111111"}
          strokeOpacity="0.08"
          strokeWidth="1"
        />

        <path
          d="M1100 480V180L1240 115L1380 180V480"
          stroke="#BE202B"
          strokeOpacity={dark ? 0.22 : 0.12}
          strokeWidth="1"
        />

        {Array.from({ length: 4 }).map((_, i) => {
          const a = `M-100 ${320 + i * 22} C250 ${
            250 + i * 12
          } 520 ${415 - i * 8} 830 ${
            325 + i * 10
          } S1170 ${250 + i * 8} 1540 ${
            325 + i * 10
          }`;

          const b = `M-100 ${335 + i * 22} C270 ${
            270 + i * 12
          } 540 ${395 - i * 8} 845 ${
            340 + i * 10
          } S1190 ${270 + i * 8} 1540 ${
            340 + i * 10
          }`;

          return (
            <motion.path
              key={i}
              d={a}
              stroke={i % 2 === 0 ? "#BE202B" : "#25B34B"}
              strokeWidth="0.8"
              strokeOpacity={dark ? 0.13 : 0.07}
              animate={
                reduceMotion
                  ? undefined
                  : { d: [a, b, a] }
              }
              transition={{
                duration: 25 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ==================================================
   VENUE INFORMATION
================================================== */

const VENUE_ADVANTAGES = [
  {
    number: "01",
    tag: "Previous Editions",
    title: "Established Exhibition Venue",
    description:
      "The Sarit Expo Centre has hosted previous editions of Kenya Buildcon, providing a familiar setting for exhibitors, industry visitors and professional networking.",
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4",
  },
  {
    number: "02",
    tag: "Business District",
    title: "Located in Westlands",
    description:
      "Situated in Westlands, Nairobi, the venue offers a convenient base for trade visitors meeting manufacturers, suppliers, contractors and construction professionals.",
    icon: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0ZM12 10h.01",
  },
  {
    number: "03",
    tag: "Exhibition Facilities",
    title: "Dedicated Trade Show Space",
    description:
      "The venue supports exhibition stands, product displays and professional event activities, helping businesses present their products and connect with prospective partners.",
    icon: "M3 21h18M5 21V5h14v16M9 9h2m2 0h2M9 13h2m2 0h2M10 21v-4h4v4",
  },
  {
    number: "04",
    tag: "City Connectivity",
    title: "Accessible Across Nairobi",
    description:
      "Visitors can plan journeys by taxi or ride-hailing services, while the wider Westlands area provides access to business accommodation and amenities.",
    icon: "M3 17l2-7h14l2 7M5 17v3m14-3v3M5 10l2-5h10l2 5M3 17h18M7 14h.01M17 14h.01",
  },
];

/* ==================================================
   SECTION 1 — VENUE & INTERACTIVE MAP
================================================== */

function VenueOverview() {
  return (
    <section
      aria-labelledby="venue-overview-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <VenueBackground />

      <Container className="relative z-10">
        <RevealGroup className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* VENUE INFORMATION */}
          <motion.div
            variants={revealVariants}
            className="flex min-w-0 flex-col justify-between rounded-xl border border-[#111111]/10 bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.035)] sm:p-8 lg:col-span-6"
          >
            <div>
              <Eyebrow>
                Official Exhibition Destination
              </Eyebrow>

              <h2
                id="venue-overview-heading"
                className="mt-4 text-[clamp(1.9rem,3vw,2.8rem)] font-extrabold leading-[1.16] tracking-[-0.045em] text-[#111111]"
              >
                The Sarit{" "}
                <span className="text-[#BE202B]">
                  Expo Centre.
                </span>
              </h2>

              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-[#555555]">
                <span className="text-[#BE202B]">
                  <LocationIcon className="h-4 w-4" />
                </span>

                {event.venue.district},{" "}
                {event.venue.city},{" "}
                {event.venue.country}
              </div>

              <p className="mt-5 max-w-[600px] text-[13px] leading-[1.85] text-[#666666] sm:text-[14px]">
                {event.name} takes place at{" "}
                <strong className="font-semibold text-[#111111]">
                  {event.venue.name}
                </strong>
                , located in Nairobi&apos;s Westlands
                district. The venue brings construction
                businesses, suppliers, industry
                professionals and trade visitors together
                in a dedicated exhibition environment.
              </p>

              {/* QUICK EVENT INFORMATION */}
              <div className="mt-6 grid gap-3 min-[420px]:grid-cols-2">
                <div className="rounded-lg border border-[#111111]/10 bg-[#FAFAFA] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[#BE202B]">
                    <CalendarIcon />
                  </span>

                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#777777]">
                    Exhibition Dates
                  </span>

                  <span className="mt-1 block text-[13px] font-extrabold text-[#111111]">
                    {event.dates.display}
                  </span>
                </div>

                <div className="rounded-lg border border-[#111111]/10 bg-[#FAFAFA] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#25B34B]/[0.08] text-[#1D9440]">
                    <ClockIcon />
                  </span>

                  <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.12em] text-[#777777]">
                    Opening Hours
                  </span>

                  <span className="mt-1 block text-[13px] font-extrabold text-[#111111]">
                    {event.dates.openingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-7 flex flex-wrap gap-3 border-t border-[#111111]/10 pt-5">
              <Link
                href="/plan-your-visit"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-[#A61B25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2"
              >
                Plan Your Visit

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              <a
                href={event.venue.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-md border border-[#111111]/20 bg-white px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#111111] transition-colors duration-300 hover:border-[#BE202B] hover:text-[#BE202B]"
              >
                Get Directions

                <ArrowIcon diagonal />
              </a>
            </div>
          </motion.div>

          {/* INTERACTIVE GOOGLE MAP */}
          <motion.div
            variants={revealVariants}
            className="relative min-w-0 rounded-xl border border-[#111111]/10 bg-white p-2 shadow-[0_12px_36px_rgba(17,17,17,0.035)] lg:col-span-6"
          >
            <div className="relative h-[340px] overflow-hidden rounded-lg bg-[#F1F1F1] sm:h-[420px] lg:h-full lg:min-h-[450px]">
              <iframe
                title={`Google Maps location of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />

              {/* NON-INTERACTIVE LOCATION LABEL */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto">
                <div className="flex items-start gap-3 rounded-lg border border-white/20 bg-[#111111]/95 px-4 py-3 text-white shadow-lg">
                  <span className="mt-0.5 text-[#25B34B]">
                    <LocationIcon />
                  </span>

                  <div>
                    <span className="block text-[12px] font-extrabold">
                      {event.venue.name}
                    </span>

                    <span className="mt-1 block text-[11px] text-white/65">
                      {event.venue.district},{" "}
                      {event.venue.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAP CAPTION */}
            <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
              <span className="text-[10px] font-semibold text-[#777777]">
                Official Venue Location
              </span>

              <a
                href={event.venue.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[10px] font-bold text-[#BE202B] transition-colors hover:text-[#111111]"
              >
                View Larger Map
                <ArrowIcon diagonal />
              </a>
            </div>
          </motion.div>
        </RevealGroup>
      </Container>
    </section>
  );
}

/* ==================================================
   SECTION 2 — VENUE ADVANTAGES
================================================== */

function VenueAdvantages() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="venue-advantages-heading"
      className="border-y border-[#111111]/[0.07] bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <RevealGroup className="flex flex-col gap-4 border-b border-[#111111]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={revealVariants}>
            <Eyebrow>
              Infrastructure &amp; Accessibility
            </Eyebrow>

            <h2
              id="venue-advantages-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.65rem)] font-extrabold leading-tight tracking-[-0.04em] text-[#111111]"
            >
              Why This{" "}
              <span className="text-[#BE202B]">
                Venue Works.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="max-w-[350px] text-[12px] leading-[1.75] text-[#777777] sm:text-[13px]"
          >
            A professional exhibition setting in
            Nairobi&apos;s commercial district,
            serving exhibitors and visitors alike.
          </motion.p>
        </RevealGroup>

        {/* ADVANTAGE CARDS */}
        <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VENUE_ADVANTAGES.map((advantage) => (
            <motion.article
              key={advantage.number}
              variants={revealVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      transition: {
                        duration: 0.32,
                        ease: EASE,
                      },
                    }
              }
              className="group relative flex min-h-[225px] flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_14px_32px_rgba(17,17,17,0.065)]"
            >
              <div className="flex items-center justify-between">
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
                    <path d={advantage.icon} />
                  </svg>
                </span>

                <span className="text-[11px] font-bold tabular-nums text-[#BBBBBB]">
                  {advantage.number}
                </span>
              </div>

              <span className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#BE202B]">
                {advantage.tag}
              </span>

              <h3 className="mt-1.5 text-[15px] font-extrabold leading-[1.45] tracking-[-0.02em] text-[#111111] transition-colors group-hover:text-[#BE202B]">
                {advantage.title}
              </h3>

              <p className="mt-2 text-[12px] leading-[1.75] text-[#6A6A6A]">
                {advantage.description}
              </p>

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#BE202B] transition-[width] duration-500 group-hover:w-full"
              />
            </motion.article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

/* ==================================================
   SECTION 3 — EVENT INFORMATION
================================================== */

const EVENT_DETAILS = [
  {
    label: "Official Dates",
    value: event.dates.display,
  },
  {
    label: "Opening Hours",
    value: event.dates.openingHours,
  },
  {
    label: "Exhibition Venue",
    value: event.venue.name,
  },
  {
    label: "Venue District",
    value: event.venue.district,
  },
  {
    label: "Host City",
    value: `${event.venue.city}, ${event.venue.country}`,
  },
  {
    label: "Exhibition Format",
    value: event.format,
  },
];

function VenueEventDetails() {
  return (
    <section
      aria-labelledby="venue-event-details-heading"
      className="relative isolate overflow-hidden bg-[#111111] py-12 text-white sm:py-14 lg:py-16"
    >
      <VenueBackground dark />

      <Container className="relative z-10">
        <RevealGroup className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={revealVariants}>
            <Eyebrow light>
              Official Exhibition Information
            </Eyebrow>

            <h2
              id="venue-event-details-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.65rem)] font-extrabold tracking-[-0.04em] text-white"
            >
              Your Visit,{" "}
              <span className="text-[#F26B70]">
                At a Glance.
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="flex flex-wrap gap-2"
          >
            <Link
              href="/plan-your-visit"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
            >
              Plan Your Visit
              <ArrowIcon diagonal />
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-[#BE202B] px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#A61B25]"
            >
              Register to Visit
              <ArrowIcon />
            </Link>
          </motion.div>
        </RevealGroup>

        {/* EVENT DETAILS MATRIX */}
        <RevealGroup className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_DETAILS.map((detail) => (
            <motion.div
              key={detail.label}
              variants={revealVariants}
              className="group relative min-w-0 bg-[#191919] px-5 py-5 transition-colors duration-300 hover:bg-[#242424]"
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-[#F26B70]">
                {detail.label}
              </span>

              <p className="mt-2 text-[15px] font-extrabold leading-[1.5] tracking-[-0.02em] text-white sm:text-[16px]">
                {detail.value}
              </p>

              <span className="mt-4 block h-[2px] w-7 bg-[#25B34B] transition-[width] duration-300 group-hover:w-12" />
            </motion.div>
          ))}
        </RevealGroup>

        {/* BOTTOM CTA */}
        <RevealGroup className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <motion.div variants={revealVariants}>
            <p className="text-[14px] font-extrabold text-white">
              Exhibit at {event.venue.name}
            </p>

            <p className="mt-1 text-[12px] leading-[1.75] text-white/60">
              Connect with Kenya&apos;s building and
              construction industry at{" "}
              {event.name}.
            </p>
          </motion.div>

          <motion.div variants={revealVariants}>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[44px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors duration-300 hover:bg-[#A61B25]"
            >
              Book a Stand

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </motion.div>
        </RevealGroup>
      </Container>

      {/* BRAND SIGNATURE */}
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

/* ==================================================
   MAIN VENUE CONTENT
   PageHero stays in page.tsx
================================================== */

export function VenueClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <VenueOverview />
      <VenueAdvantages />
      <VenueEventDetails />
    </div>
  );
}
