
"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* ==========================================
   KENYA BUILDCON — BRAND COLORS
========================================== */

const BRAND = {
  red: "#BE202B",
  black: "#111111",
  green: "#25B34B",
  darkGreen: "#1D9440",
  coral: "#F26B70",
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================
   SCROLL ANIMATION VARIANTS
========================================== */

const sectionVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.08,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

const featureVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

/* ==========================================
   CONTINUOUS ARCHITECTURAL SVG BACKGROUND
========================================== */

function IntroBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Technical dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* TOP RIGHT ARCHITECTURAL CIRCLES */}
        <motion.g
          style={{
            transformOrigin: "1350px 100px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, 8, 0] }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle
            cx="1350"
            cy="100"
            r="170"
            stroke={BRAND.red}
            strokeWidth="1"
            strokeOpacity="0.16"
            strokeDasharray="6 12"
          />

          <circle
            cx="1350"
            cy="100"
            r="245"
            stroke={BRAND.black}
            strokeWidth="0.8"
            strokeOpacity="0.09"
          />

          <circle
            cx="1350"
            cy="100"
            r="315"
            stroke={BRAND.green}
            strokeWidth="0.8"
            strokeOpacity="0.12"
            strokeDasharray="10 16"
          />
        </motion.g>

        {/* BOTTOM LEFT ARCHITECTURAL CIRCLES */}
        <motion.g
          style={{
            transformOrigin: "80px 720px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, -7, 0] }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle
            cx="80"
            cy="720"
            r="160"
            stroke={BRAND.red}
            strokeWidth="0.8"
            strokeOpacity="0.12"
            strokeDasharray="5 12"
          />

          <circle
            cx="80"
            cy="720"
            r="245"
            stroke={BRAND.black}
            strokeWidth="0.8"
            strokeOpacity="0.07"
          />
        </motion.g>

        {/* CONTINUOUS FLOWING SVG WAVES */}
        {Array.from({ length: 9 }).map((_, i) => {
          const pathA = `M-120,${435 + i * 17} C230,${335 + i * 12} 550,${615 - i * 8} 900,${460 + i * 9} C1180,${345 + i * 9} 1410,${555 - i * 7} 1560,${455 + i * 7}`;

          const pathB = `M-120,${460 + i * 17} C275,${375 + i * 10} 585,${580 - i * 6} 930,${485 + i * 7} C1200,${395 + i * 8} 1380,${520 - i * 6} 1560,${475 + i * 6}`;

          const pathC = `M-120,${445 + i * 17} C245,${360 + i * 10} 560,${640 - i * 7} 915,${450 + i * 8} C1170,${375 + i * 7} 1400,${570 - i * 6} 1560,${450 + i * 7}`;

          const stroke =
            i % 4 === 0
              ? BRAND.red
              : i % 4 === 1
                ? BRAND.green
                : BRAND.black;

          return (
            <motion.path
              key={i}
              d={pathA}
              fill="none"
              stroke={stroke}
              strokeWidth={i % 4 === 0 ? 1.2 : 0.75}
              strokeOpacity={
                i % 4 === 0
                  ? 0.13
                  : i % 4 === 1
                    ? 0.085
                    : 0.045
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [
                        pathA,
                        pathB,
                        pathC,
                        pathA,
                      ],
                    }
              }
              transition={{
                duration: 22 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Architectural crosshair markers */}
        <g
          stroke={BRAND.black}
          strokeWidth="0.8"
          strokeOpacity="0.12"
        >
          <path d="M200 150v18M191 159h18" />
          <path d="M1120 650v18M1111 659h18" />
          <path d="M880 135v14M873 142h14" />
          <path d="M350 705v14M343 712h14" />
        </g>
      </svg>
    </div>
  );
}

/* ==========================================
   FEATURE ICONS
========================================== */

function NetworkingIcon() {
  return (
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
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function GrowthIcon() {
  return (
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
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

/* ==========================================
   INTRO SECTION
========================================== */

export function IntroSection() {
  const reduceMotion = useReducedMotion();

  const scrollProps = {
    initial: reduceMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      margin: "-60px",
    },
  };

  return (
    <section
      aria-labelledby="intro-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/[0.07] bg-white py-16 text-[#111111] selection:bg-[#BE202B] selection:text-white sm:py-20 lg:py-24"
    >
      <IntroBackground />

      <Container className="relative z-10">

        {/* SECTION TOP BAR */}
        <motion.div
          variants={sectionVariants}
          {...scrollProps}
          className="mb-10 flex flex-col justify-between gap-5 border-b border-[#111111]/10 pb-8 lg:mb-12 lg:flex-row lg:items-end"
        >
          <motion.div
            variants={revealVariants}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-8 bg-[#BE202B]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#BE202B]">
              About the Exhibition
            </span>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="flex items-center gap-3"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#777777]">
              Kenya Buildcon
            </span>

            <span className="h-px w-8 bg-[#111111]/20" />

            <span className="text-[10px] font-bold tracking-[0.12em] text-[#BE202B]">
              2027 / 04
            </span>
          </motion.div>
        </motion.div>

        {/* MAIN EDITORIAL GRID */}
        <motion.div
          variants={sectionVariants}
          {...scrollProps}
          className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20"
        >

          {/* LEFT COLUMN */}
          <motion.div
            variants={revealVariants}
            className="relative min-w-0"
          >
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">
              The Industry Meets Here
            </span>

            <h2
              id="intro-heading"
              className="max-w-[560px] text-[clamp(2.25rem,3.9vw,4.2rem)] font-black leading-[1.09] tracking-[-0.046em] text-[#111111]"
            >
              Where Kenya&apos;s

              <span className="mt-2 block text-[#BE202B]">
                Building &
                <br />
                Construction
              </span>

              <span className="mt-2 block">
                Industry Meets.
              </span>
            </h2>

            {/* Animated editorial underline */}
            <motion.div
              aria-hidden="true"
              className="mt-7 flex h-[3px] w-32 origin-left overflow-hidden"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: EASE,
              }}
            >
              <span className="h-full w-[75%] bg-[#BE202B]" />
              <span className="h-full flex-1 bg-[#25B34B]" />
            </motion.div>

            {/* STRATEGIC MESSAGE */}
            <motion.div
              variants={revealVariants}
              className="relative mt-9 max-w-[520px] border-l-[3px] border-[#BE202B] pl-5 sm:pl-6"
            >
              <p className="text-[14px] font-medium leading-[1.8] tracking-[-0.01em] text-[#4B4B4B] sm:text-[15px]">
                &ldquo;{event.theme}&rdquo; — a
                collaborative environment where
                innovation meets opportunity,
                benefiting exhibitors, attendees,
                and the industry as a whole.
              </p>

              <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#777777]">
                {event.venue.city},{" "}
                {event.venue.country}
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={revealVariants}
            className="min-w-0"
          >
            <div className="border-l border-[#111111]/10 lg:pl-9 xl:pl-12">

              {/* EDITION LABEL */}
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#BE202B] text-[10px] font-black text-white">
                  04
                </span>

                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111111]">
                  4th International Edition
                </span>
              </div>

              {/* INTRO COPY */}
              <div className="mt-6 space-y-5">
                <p className="text-[14px] leading-[1.85] tracking-[-0.005em] text-[#555555] sm:text-[15px]">
                  <strong className="font-bold text-[#111111]">
                    {event.name}
                  </strong>{" "}
                  is the premier international trade
                  exhibition for the building and
                  construction industry in Kenya,
                  showcasing machinery, tools, materials,
                  architecture, interiors, engineering,
                  manufacturing, and allied products
                  and services.
                </p>

                <p className="text-[14px] leading-[1.85] tracking-[-0.005em] text-[#555555] sm:text-[15px]">
                  Taking place from{" "}
                  <strong className="font-semibold text-[#111111]">
                    {event.dates.display}
                  </strong>{" "}
                  at{" "}
                  <strong className="font-semibold text-[#111111]">
                    {event.venue.fullLocation}
                  </strong>
                  , the{" "}
                  {event.editionLabel.toLowerCase()} brings
                  together key stakeholders, architects
                  and policymakers — a launchpad for
                  companies eager to tap into East
                  Africa&apos;s construction market.
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href="/about"
                  className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#BE202B] !bg-[#BE202B] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] !text-white transition-all duration-300 hover:-translate-y-0.5 hover:!bg-[#A71B25]"
                >
                  Explore Event Details

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </Button>

                <Button
                  href={event.cta.bookStand}
                  variant="secondary"
                  className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#111111]/20 !bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] !text-[#111111] transition-all duration-300 hover:border-[#111111] hover:!bg-[#111111] hover:!text-white"
                >
                  Book a Stand

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* INTEGRATED FEATURE STRIP */}
        <motion.div
          variants={sectionVariants}
          {...scrollProps}
          className="mt-12 grid overflow-hidden rounded-xl border border-[#111111]/10 bg-white shadow-[0_12px_35px_rgba(17,17,17,0.04)] sm:mt-14 md:grid-cols-2"
        >
          {/* TARGETED NETWORKING */}
          <motion.div
            variants={featureVariants}
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
            className="group relative flex gap-4 border-b border-[#111111]/10 p-6 transition-colors duration-300 hover:bg-[#FAFAFA] sm:p-7 md:border-b-0 md:border-r"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#BE202B]/15 bg-[#BE202B]/[0.06] text-[#BE202B] transition-colors duration-300 group-hover:border-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white">
              <NetworkingIcon />
            </div>

            <div className="min-w-0">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#BE202B]">
                01 / Connections
              </span>

              <h3 className="text-[16px] font-extrabold tracking-[-0.025em] text-[#111111]">
                Targeted Networking
              </h3>

              <p className="mt-2 text-[13px] leading-[1.7] text-[#666666]">
                Connect with trade visitors,
                industry leaders and decision-makers
                across the construction sector.
              </p>
            </div>
          </motion.div>

          {/* MARKET EXPANSION */}
          <motion.div
            variants={featureVariants}
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
            className="group relative flex gap-4 p-6 transition-colors duration-300 hover:bg-[#FAFAFA] sm:p-7"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#25B34B]/15 bg-[#25B34B]/[0.07] text-[#1D9440] transition-colors duration-300 group-hover:border-[#1D9440] group-hover:bg-[#1D9440] group-hover:text-white">
              <GrowthIcon />
            </div>

            <div className="min-w-0">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#1D9440]">
                02 / Opportunities
              </span>

              <h3 className="text-[16px] font-extrabold tracking-[-0.025em] text-[#111111]">
                Market Expansion
              </h3>

              <p className="mt-2 text-[13px] leading-[1.7] text-[#666666]">
                Explore Kenya&apos;s growing
                construction market and build
                partnerships across the wider
                East African region.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM EDITORIAL DETAIL */}
        <div
          aria-hidden="true"
          className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/[0.07] pt-5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#888888]">
            Kenya Buildcon / International Expo
          </span>

          <span className="text-[10px] font-bold tracking-[0.1em] text-[#BE202B]">
            2027
          </span>
        </div>

      </Container>
    </section>
  );
}
