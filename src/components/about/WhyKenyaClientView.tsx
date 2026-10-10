
"use client";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";

import {
  marketFacts,
  marketSources,
  opportunityCategories,
} from "@/data/marketFacts";

/* ==================================================
   ANIMATION SETTINGS
================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = {
  once: true,
  margin: "0px 0px -55px 0px",
} as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.05,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 19,
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
   SHARED ELEMENTS
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
        className={`text-[10px] font-extrabold uppercase tracking-[0.16em] ${
          light ? "text-[#F26B70]" : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function RevealGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
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
   ARCHITECTURAL BACKGROUND
================================================== */

function MarketBackground({
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
      {/* Fine grid */}
      <div
        className={`absolute inset-0 ${
          dark ? "opacity-[0.035]" : "opacity-[0.027]"
        }`}
        style={{
          backgroundImage: dark
            ? "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)"
            : "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "78px 78px",
        }}
      />

      {/* Architectural line motion */}
      <svg
        viewBox="0 0 1400 520"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const a = `M-100 ${190 + index * 23} C250 ${
            125 + index * 12
          } 520 ${350 - index * 7} 820 ${
            195 + index * 10
          } S1160 ${285 + index * 9} 1500 ${
            195 + index * 11
          }`;

          const b = `M-100 ${205 + index * 23} C260 ${
            145 + index * 12
          } 540 ${330 - index * 7} 840 ${
            210 + index * 10
          } S1180 ${265 + index * 9} 1500 ${
            210 + index * 11
          }`;

          return (
            <motion.path
              key={index}
              d={a}
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
              strokeOpacity={dark ? 0.13 : 0.07}
              animate={
                reduceMotion
                  ? undefined
                  : { d: [a, b, a] }
              }
              transition={{
                duration: 25 + index * 2,
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
   STRATEGIC PILLAR DATA

   Existing market context preserved.
================================================== */

const STRATEGIC_PILLARS = [
  {
    number: "01",
    category: "Construction Growth",
    title: "Construction Sector Rebound",
    description:
      "Kenya's construction sector recorded 6.7% growth in Q3 2025, according to KNBS. Infrastructure activity, housing investment and renewed project execution contribute to opportunities across construction supply chains.",
    highlight: "6.7% · Q3 2025",
    icon: "M3 17l6-6 4 4 8-9M15 6h6v6",
  },
  {
    number: "02",
    category: "Regional Connectivity",
    title: "Gateway to East Africa",
    description:
      "Kenya's position within the East African Community supports regional business connections. Nairobi provides a strategic meeting point for manufacturers, distributors, contractors and buyers exploring nearby markets.",
    highlight: "East African Community",
    icon: "M12 22s8-4 8-11a8 8 0 10-16 0c0 7 8 11 8 11zM4 11h16M12 3c-3 4-3 12 0 16M12 3c3 4 3 12 0 16",
  },
  {
    number: "03",
    category: "Infrastructure Investment",
    title: "Vision 2030 & Development",
    description:
      "Kenya's Vision 2030 development agenda provides long-term context for transport, infrastructure and urban development. Projects associated with this agenda illustrate demand for construction expertise and technology.",
    highlight: "Vision 2030",
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4",
  },
  {
    number: "04",
    category: "Urban Development",
    title: "Growing Demand for Space",
    description:
      "Urbanisation and changing business needs create opportunities in residential, commercial and industrial construction. These segments connect developers, designers, engineers and building-material suppliers.",
    highlight: "Residential · Commercial",
    icon: "M3 21h18M5 21V9l7-5 7 5v12M9 12h.01M15 12h.01M9 16h.01M15 16h.01M10 21v-3h4v3",
  },
];

/* ==================================================
   SECTION 1 — MARKET DATA
================================================== */

function MarketOverview() {
  return (
    <section
      aria-labelledby="kenya-market-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <MarketBackground />

      <Container className="relative z-10">
        <RevealGroup className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={revealVariants}
            className="max-w-[740px]"
          >
            <Eyebrow>
              Kenya Construction Market
            </Eyebrow>

            <h2
              id="kenya-market-heading"
              className="mt-3 text-[clamp(1.85rem,3vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#111111]"
            >
              A Market Driven by{" "}
              <span className="text-[#BE202B]">
                Development.
              </span>
            </h2>

            <p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
              Explore economic indicators and market
              information relevant to construction,
              infrastructure investment and building
              materials in Kenya.
            </p>
          </motion.div>

          <motion.div variants={revealVariants}>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[43px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A51B25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2"
            >
              Book Stand Space

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </motion.div>
        </RevealGroup>

        {/* Existing market statistics component */}
        <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {marketFacts.map((fact) => (
            <motion.div
              key={fact.id}
              variants={revealVariants}
              className="min-w-0 [&>*]:h-full"
            >
              <StatCard fact={fact} />
            </motion.div>
          ))}
        </RevealGroup>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[#111111]/10 pt-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25B34B]" />

          <p className="text-[11px] leading-[1.7] text-[#777777]">
            Market indicators are based on the
            referenced source publications.
            Figures should be read with their
            stated reporting periods.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ==================================================
   SECTION 2 — STRATEGIC ADVANTAGES
================================================== */

function StrategicAdvantages() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="kenya-advantages-heading"
      className="relative overflow-hidden border-y border-[#111111]/[0.07] bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <RevealGroup className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={revealVariants}>
            <Eyebrow>
              Strategic Advantages
            </Eyebrow>

            <h2
              id="kenya-advantages-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.65rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
            >
              Why Businesses{" "}
              <span className="text-[#BE202B]">
                Choose Kenya.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="max-w-[355px] text-[12px] leading-[1.75] text-[#777777] sm:text-[13px]"
          >
            Four factors shaping Kenya&apos;s
            construction landscape and its
            relevance to regional suppliers.
          </motion.p>
        </RevealGroup>

        {/* 4 premium editorial cards */}
        <RevealGroup className="mt-6 grid gap-3 md:grid-cols-2">
          {STRATEGIC_PILLARS.map((pillar) => (
            <motion.article
              key={pillar.title}
              variants={revealVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      transition: {
                        duration: 0.35,
                        ease: EASE,
                      },
                    }
              }
              className="group relative overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_12px_32px_rgba(17,17,17,0.055)] sm:p-6"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#BE202B]/10 bg-[#BE202B]/[0.055] text-[#BE202B] transition-colors duration-300 group-hover:bg-[#BE202B] group-hover:text-white">
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
                      <path d={pillar.icon} />
                    </svg>
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#BE202B]">
                    {pillar.category}
                  </span>
                </div>

                <span className="text-[11px] font-bold tabular-nums text-[#BBBBBB]">
                  {pillar.number}
                </span>
              </div>

              <h3 className="mt-5 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] transition-colors duration-300 group-hover:text-[#BE202B] sm:text-[18px]">
                {pillar.title}
              </h3>

              <p className="mt-2 max-w-[590px] text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
                {pillar.description}
              </p>

              <div className="mt-5 flex items-center gap-2.5 border-t border-[#111111]/10 pt-4">
                <span className="h-1.5 w-1.5 bg-[#25B34B]" />

                <span className="text-[11px] font-bold text-[#333333]">
                  {pillar.highlight}
                </span>
              </div>

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
   SECTION 3 — COMMERCIAL OPPORTUNITIES
================================================== */

function OpportunitySectors() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="kenya-opportunities-heading"
      className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <RevealGroup className="flex flex-col gap-4 border-b border-[#111111]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={revealVariants}>
            <Eyebrow>
              Commercial Opportunities
            </Eyebrow>

            <h2
              id="kenya-opportunities-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
            >
              Opportunities Across{" "}
              <span className="text-[#BE202B]">
                Key Sectors.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={revealVariants}
            className="max-w-[350px] text-[12px] leading-[1.75] text-[#777777] sm:text-[13px]"
          >
            Sectors relevant to construction
            investment, development and the
            building-material supply chain.
          </motion.p>
        </RevealGroup>

        {/* Sector grid */}
        <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {opportunityCategories.map((category, index) => (
            <motion.div
              key={category}
              variants={revealVariants}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -3,
                      transition: {
                        duration: 0.3,
                        ease: EASE,
                      },
                    }
              }
              className="group relative flex min-h-[76px] items-center gap-4 overflow-hidden rounded-lg border border-[#111111]/10 bg-[#FBFBFB] px-4 py-4 transition-[background-color,border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:bg-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.045)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-[11px] font-bold tabular-nums text-[#BE202B] ring-1 ring-[#111111]/10 transition-colors duration-300 group-hover:bg-[#BE202B] group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="min-w-0 flex-1 text-[13px] font-bold leading-[1.55] text-[#252525]">
                {category}
              </h3>

              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#25B34B]" />
            </motion.div>
          ))}
        </RevealGroup>

        {/* Source references */}
        <RevealGroup className="mt-8 border-t border-[#111111]/10 pt-5">
          <motion.div variants={revealVariants}>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 bg-[#25B34B]" />

              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#444444]">
                Economic Data Sources
              </h3>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {marketSources.map((source) => (
                <div
                  key={source.name}
                  className="inline-flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#BE202B]" />

                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-semibold text-[#666666] underline-offset-4 transition-colors duration-200 hover:text-[#BE202B] hover:underline"
                    >
                      {source.name}
                    </a>
                  ) : (
                    <span className="text-[12px] font-semibold text-[#666666]">
                      {source.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-4 max-w-[850px] text-[11px] leading-[1.75] text-[#888888]">
              Market information is provided for
              industry context. Consult the
              original publications for complete
              methodology, reporting dates and
              the latest revisions.
            </p>
          </motion.div>
        </RevealGroup>
      </Container>
    </section>
  );
}

/* ==================================================
   SECTION 4 — EXHIBITOR CTA
================================================== */

function MarketCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="kenya-market-cta"
      className="relative isolate overflow-hidden bg-[#111111] py-12 text-white sm:py-14 lg:py-16"
    >
      <MarketBackground dark />

      <Container className="relative z-10">
        <RevealGroup className="grid items-center gap-7 lg:grid-cols-[1fr_auto] lg:gap-10">
          <motion.div
            variants={revealVariants}
            className="max-w-[740px]"
          >
            <Eyebrow light>
              Expand Your Market Reach
            </Eyebrow>

            <h2
              id="kenya-market-cta"
              className="mt-4 text-[clamp(1.9rem,3vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.045em] text-white"
            >
              Make Your Next Business{" "}
              <span className="text-[#F26B70]">
                Connection in Nairobi.
              </span>
            </h2>

            <p className="mt-4 max-w-[650px] text-[13px] leading-[1.85] text-white/65 sm:text-[14px]">
              Meet construction professionals,
              suppliers, distributors and project
              stakeholders at {event.name}.
              Explore opportunities to introduce
              your products and build business
              relationships in Kenya.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold text-white/55">
              <span>{event.dates.display}</span>

              <span className="hidden h-3 w-px bg-white/20 sm:block" />

              <span>
                {event.venue.name},{" "}
                {event.venue.city}
              </span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={revealVariants}
            className="flex flex-col gap-3 sm:flex-row lg:flex-col"
          >
            <motion.div
              whileHover={
                reduceMotion ? undefined : { y: -3 }
              }
              transition={{
                duration: 0.25,
                ease: EASE,
              }}
            >
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-[46px] w-full items-center justify-between gap-5 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-[#A51B25] sm:min-w-[200px]"
              >
                Book a Stand

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon diagonal />
                </span>
              </Link>
            </motion.div>

            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-[46px] items-center justify-between gap-5 rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#111111]"
            >
              Register to Visit

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </RevealGroup>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="text-[11px] text-white/45">
            {event.editionLabel} · {event.venue.fullLocation}
          </span>

          <Link
            href="/exhibition-profile"
            className="group inline-flex items-center gap-2 text-[11px] font-bold text-white transition-colors hover:text-[#F26B70]"
          >
            Explore Exhibition Profile

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </Container>

      {/* Brand signature */}
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

/* ==================================================
   MAIN WHY KENYA VIEW
================================================== */

export function WhyKenyaClientView() {
  return (
    <div className="bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white">
      <MarketOverview />
      <StrategicAdvantages />
      <OpportunitySectors />
      <MarketCta />
    </div>
  );
}
