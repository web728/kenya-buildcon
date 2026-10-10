
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";
import { keyFeatures } from "@/data/previousEdition";

/* ==========================================
   MOTION SYSTEM
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
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
      duration: 0.8,
      ease: EASE,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

const VIEWPORT = {
  once: true,
  margin: "0px 0px -65px 0px",
} as const;

/* ==========================================
   SHARED ELEMENTS
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
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-6 bg-[#BE202B]" />

      <span
        className={`text-[10px] font-bold uppercase tracking-[0.17em] ${
          light ? "text-[#F26B70]" : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={sectionVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================
   SUBTLE ARCHITECTURAL BACKGROUND
========================================== */

function ArchitecturalBackground({
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
          dark ? "opacity-[0.025]" : "opacity-[0.024]"
        }`}
        style={{
          backgroundImage: dark
            ? "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)"
            : "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <svg
        viewBox="0 0 1200 440"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const pathA = `M-100 ${170 + index * 24} C250 ${
            110 + index * 13
          } 520 ${270 - index * 8} 820 ${
            175 + index * 10
          } S1120 ${250 - index * 7} 1300 ${
            185 + index * 10
          }`;

          const pathB = `M-100 ${185 + index * 24} C260 ${
            135 + index * 13
          } 535 ${250 - index * 8} 835 ${
            190 + index * 10
          } S1125 ${225 - index * 7} 1300 ${
            200 + index * 10
          }`;

          return (
            <motion.path
              key={index}
              d={pathA}
              stroke={
                index % 3 === 0
                  ? "#BE202B"
                  : index % 3 === 1
                    ? "#25B34B"
                    : dark
                      ? "#FFFFFF"
                      : "#111111"
              }
              strokeWidth="0.85"
              strokeOpacity={dark ? 0.13 : 0.075}
              animate={
                reduceMotion
                  ? undefined
                  : { d: [pathA, pathB, pathA] }
              }
              transition={{
                duration: 24 + index * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        <motion.g
          style={{ transformOrigin: "1100px 100px" }}
          animate={
            reduceMotion ? undefined : { rotate: 360 }
          }
          transition={{
            duration: 150,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="1100"
            cy="100"
            r="160"
            stroke="#BE202B"
            strokeOpacity={dark ? 0.22 : 0.11}
            strokeDasharray="8 16"
          />
          <circle
            cx="1100"
            cy="100"
            r="230"
            stroke="#25B34B"
            strokeOpacity={dark ? 0.12 : 0.07}
          />
        </motion.g>
      </svg>
    </div>
  );
}

/* ==========================================
   FEATURE ICONS
========================================== */

const FEATURE_ICONS = [
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253",
  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 01-2 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3",
  "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  "M13 10V3L4 14h7v7l9-11h-7z",
];

/* ==========================================
   SECTION 1 — ABOUT OVERVIEW
========================================== */

function AboutOverview() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-overview-title"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <ArchitecturalBackground />

      <Container className="relative z-10">
        <SectionReveal className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.div variants={revealVariants}>
            <Eyebrow>About the Exhibition</Eyebrow>

            <h2
              id="about-overview-title"
              className="mt-4 max-w-[670px] text-[clamp(1.85rem,3vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-[#111111]"
            >
              Where Construction Meets{" "}
              <span className="text-[#BE202B]">
                Opportunity.
              </span>
            </h2>

            <p className="mt-5 max-w-[700px] text-[13px] leading-[1.9] text-[#626262] sm:text-[14px]">
              {event.name} is an international trade
              exhibition for the building and construction
              industry, connecting manufacturers,
              suppliers, contractors, architects,
              engineers and decision-makers with products,
              technologies and commercial opportunities.
            </p>

            <p className="mt-3 max-w-[700px] text-[13px] leading-[1.9] text-[#626262] sm:text-[14px]">
              The exhibition supports knowledge exchange,
              collaboration and long-term partnerships
              contributing to construction-sector growth
              in Kenya and the wider East African region.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#111111]/10 pt-5">
              <Link
                href="/exhibition-profile"
                className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.05em] text-[#BE202B] transition-colors hover:text-[#111111]"
              >
                Exhibition Profile

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon diagonal />
                </span>
              </Link>

              <Link
                href="/who-should-exhibit"
                className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.05em] text-[#444444] transition-colors hover:text-[#BE202B]"
              >
                Who Should Exhibit

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* NAIROBI CARD */}
          <motion.aside
            variants={revealVariants}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -4,
                    transition: {
                      duration: 0.45,
                      ease: EASE,
                    },
                  }
            }
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#111111] p-6 text-white shadow-[0_14px_36px_rgba(17,17,17,0.09)] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#BE202B]/30"
            />
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#25B34B]/20"
            />

            <div className="relative z-10">
              <Eyebrow light>
                Strategic Gateway
              </Eyebrow>

              <h3 className="mt-5 text-[24px] font-extrabold leading-[1.2] tracking-[-0.035em] sm:text-[28px]">
                Nairobi.
                <span className="block text-[#F26B70]">
                  Connected to East Africa.
                </span>
              </h3>

              <p className="mt-4 text-[13px] leading-[1.85] text-white/65">
                Nairobi connects businesses with
                Kenya&apos;s construction ecosystem
                and provides opportunities to develop
                relationships across regional markets
                and supply chains.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">
                    Venue
                  </span>

                  <span className="mt-1.5 block text-[12px] font-semibold leading-[1.6]">
                    {event.venue.name}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">
                    Location
                  </span>

                  <span className="mt-1.5 block text-[12px] font-semibold leading-[1.6]">
                    {event.venue.city},{" "}
                    {event.venue.country}
                  </span>
                </div>
              </div>

              <Link
                href="/why-kenya"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:text-[#F26B70]"
              >
                Explore Why Kenya

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon diagonal />
                </span>
              </Link>
            </div>
          </motion.aside>
        </SectionReveal>
      </Container>
    </section>
  );
}

/* ==========================================
   SECTION 2 — FEATURES
========================================== */

function FeaturesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-features-title"
      className="border-y border-[#111111]/[0.07] bg-[#FAFAFA] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <SectionReveal className="flex flex-col gap-4 border-b border-[#111111]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={revealVariants}>
            <Eyebrow>
              {event.editionLabel} Experience
            </Eyebrow>

            <h2
              id="about-features-title"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.55rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
            >
              What Defines{" "}
              <span className="text-[#BE202B]">
                the Expo.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="max-w-[370px] text-[12px] leading-[1.8] text-[#777777] sm:text-[13px]"
          >
            A focused environment for product discovery,
            industry connections and new commercial
            opportunities.
          </motion.p>
        </SectionReveal>

        <SectionReveal className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {keyFeatures.map((feature, index) => (
            <motion.article
              key={`${feature.title}-${index}`}
              variants={cardVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                      transition: {
                        duration: 0.35,
                        ease: EASE,
                      },
                    }
              }
              className="group relative flex min-h-[180px] flex-col overflow-hidden rounded-lg border border-[#111111]/[0.08] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_14px_30px_rgba(17,17,17,0.06)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#BE202B]/10 bg-[#BE202B]/[0.05] text-[#BE202B] transition-colors duration-300 group-hover:bg-[#BE202B] group-hover:text-white">
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
                    <path
                      d={
                        FEATURE_ICONS[
                          index % FEATURE_ICONS.length
                        ]
                      }
                    />
                  </svg>
                </div>

                <span className="text-[10px] font-bold tabular-nums text-[#B8B8B8]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-4 text-[14px] font-extrabold leading-[1.45] tracking-[-0.02em] text-[#111111] transition-colors duration-300 group-hover:text-[#BE202B]">
                {feature.title}
              </h3>

              <p className="mt-2 text-[12px] leading-[1.7] text-[#707070]">
                {feature.desc}
              </p>

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#BE202B] transition-[width] duration-500 group-hover:w-full"
              />
            </motion.article>
          ))}
        </SectionReveal>

        <div className="mt-6 flex justify-end">
          <Link
            href="/who-should-visit"
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.05em] text-[#BE202B] hover:text-[#111111]"
          >
            Explore Visitor Profile

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ==========================================
   SECTION 3 — EVENT DETAILS
========================================== */

const EVENT_FACTS = [
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
    label: "Host City",
    value: `${event.venue.city}, ${event.venue.country}`,
  },
  {
    label: "Exhibitor Profile",
    value: "50+ Product Categories",
  },
  {
    label: "Previous Edition",
    value: "250+ Brands · 9,500+ Visitors",
  },
];

function EventFactsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-facts-title"
      className="relative isolate overflow-hidden bg-[#111111] py-12 text-white sm:py-14 lg:py-16"
    >
      <ArchitecturalBackground dark />

      <Container className="relative z-10">
        <SectionReveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={revealVariants}>
            <Eyebrow light>
              Official Event Details
            </Eyebrow>

            <h2
              id="about-facts-title"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.55rem)] font-extrabold tracking-[-0.04em] text-white"
            >
              Kenya Buildcon{" "}
              <span className="text-[#F26B70]">
                at a Glance.
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="flex flex-wrap gap-2"
          >
            <Link
              href="/exhibition-profile"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-[11px] font-bold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#111111]"
            >
              Exhibition Profile
              <ArrowIcon diagonal />
            </Link>

            <Link
              href={event.cta.bookStand}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-[#BE202B] px-4 py-2 text-[11px] font-bold text-white transition-colors duration-300 hover:bg-[#A61B25]"
            >
              Book a Stand
              <ArrowIcon />
            </Link>
          </motion.div>
        </SectionReveal>

        <SectionReveal className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_FACTS.map((fact) => (
            <motion.div
              key={fact.label}
              variants={cardVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      backgroundColor: "#222222",
                      transition: {
                        duration: 0.3,
                      },
                    }
              }
              className="group relative min-w-0 bg-[#181818] px-5 py-5"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#25B34B]" />

                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                    {fact.label}
                  </span>

                  <p className="mt-2 text-[14px] font-extrabold leading-[1.55] tracking-[-0.02em] text-white sm:text-[15px]">
                    {fact.value}
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#BE202B] transition-[width] duration-500 group-hover:w-full"
              />
            </motion.div>
          ))}
        </SectionReveal>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="text-[11px] leading-relaxed text-white/45">
            {event.editionLabel} · {event.venue.fullLocation}
          </p>

          <Link
            href={event.cta.registerVisit}
            className="group inline-flex items-center gap-2 text-[11px] font-bold text-white transition-colors hover:text-[#F26B70]"
          >
            Register to Visit

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex h-[2px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>
    </section>
  );
}

/* ==========================================
   MAIN ABOUT CONTENT
   PageHero stays in page.tsx
========================================== */

export function AboutClientView() {
  return (
    <div className="bg-white">
      <AboutOverview />
      <FeaturesSection />
      <EventFactsSection />
    </div>
  );
}
