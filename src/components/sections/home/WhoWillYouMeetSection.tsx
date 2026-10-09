
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

/* ==========================================
   BRAND COLORS
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
   ANIMATION VARIANTS
========================================== */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

/* ==========================================
   VISITOR GROUPS — ORIGINAL CONTENT
========================================== */

const VISITOR_PILLARS = [
  {
    num: "01",
    title: "Architects & Engineers",
    subtitle: "Specifiers & Consultants",
    tags: [
      "Architects and Planners",
      "Structural & Civil Engineers",
      "Consulting Engineers",
      "Interior Designers",
    ],
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    num: "02",
    title: "Contractors & Builders",
    subtitle: "Execution Specialists",
    tags: [
      "Building Contractors",
      "Subcontractors",
      "Builders and Developers",
      "Project Managers",
    ],
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    num: "03",
    title: "Importers & Distributors",
    subtitle: "Supply Chain & Wholesalers",
    tags: [
      "Importers",
      "Dealers and Distributors",
      "Material Suppliers",
      "Retailers",
    ],
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "04",
    title: "Developers & Investors",
    subtitle: "Property & Hospitality",
    tags: [
      "Property Investors",
      "Investors and Financiers",
      "Hoteliers",
      "Facility Managers",
    ],
    icon: "M3 21h18M3 7v14m18-14v14M8 3h8v4H8V3zM9 11h2m-2 4h2m4-4h2m-4 4h2",
  },
  {
    num: "05",
    title: "Government & Institutional",
    subtitle: "Public Sector & Academia",
    tags: [
      "Building Authorities",
      "Government Agencies",
      "Universities & Research Institutes",
    ],
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
];

/* ==========================================
   ANIMATED ARCHITECTURAL BACKGROUND
========================================== */

function VisitorBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Fine blueprint dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Architectural linework */}
      <svg
        viewBox="0 0 1440 950"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Top-right rotating technical rings */}
        <motion.g
          style={{
            transformOrigin: "1390px 100px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 110,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="1390"
            cy="100"
            r="200"
            stroke={BRAND.red}
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeDasharray="8 16"
          />

          <circle
            cx="1390"
            cy="100"
            r="290"
            stroke={BRAND.black}
            strokeOpacity="0.08"
            strokeWidth="1"
          />

          <circle
            cx="1390"
            cy="100"
            r="370"
            stroke={BRAND.green}
            strokeOpacity="0.14"
            strokeWidth="1"
            strokeDasharray="12 20"
          />
        </motion.g>

        {/* Bottom-left technical circles */}
        <motion.g
          style={{
            transformOrigin: "50px 870px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: -360 }
          }
          transition={{
            duration: 135,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="50"
            cy="870"
            r="210"
            stroke={BRAND.red}
            strokeOpacity="0.13"
            strokeDasharray="6 14"
          />

          <circle
            cx="50"
            cy="870"
            r="295"
            stroke={BRAND.black}
            strokeOpacity="0.07"
          />
        </motion.g>

        {/* Smooth architectural waves */}
        {Array.from({ length: 7 }).map((_, i) => {
          const pathA =
            `M-120,${535 + i * 20} ` +
            `C245,${410 + i * 11} ` +
            `570,${700 - i * 7} ` +
            `920,${530 + i * 9} ` +
            `C1200,${435 + i * 8} ` +
            `1410,${630 - i * 6} ` +
            `1570,${530 + i * 7}`;

          const pathB =
            `M-120,${560 + i * 20} ` +
            `C270,${455 + i * 10} ` +
            `600,${660 - i * 6} ` +
            `945,${560 + i * 8} ` +
            `C1190,${470 + i * 8} ` +
            `1415,${600 - i * 6} ` +
            `1570,${555 + i * 7}`;

          return (
            <motion.path
              key={i}
              d={pathA}
              stroke={
                i % 3 === 0
                  ? BRAND.red
                  : i % 3 === 1
                    ? BRAND.green
                    : BRAND.black
              }
              strokeWidth="0.85"
              strokeOpacity={
                i % 3 === 0
                  ? 0.12
                  : i % 3 === 1
                    ? 0.08
                    : 0.045
              }
              animate={
                reduceMotion
                  ? undefined
                  : { d: [pathA, pathB, pathA] }
              }
              transition={{
                duration: 19 + i * 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Technical registration points */}
        <g
          stroke={BRAND.black}
          strokeOpacity="0.13"
          strokeWidth="0.8"
        >
          <path d="M185 155v18M176 164h18" />
          <path d="M1160 735v18M1151 744h18" />
          <path d="M860 110v14M853 117h14" />
        </g>
      </svg>
    </div>
  );
}

/* ==========================================
   PREMIUM VISITOR CARD
========================================== */

function VisitorCard({
  pillar,
  index,
}: {
  pillar: (typeof VISITOR_PILLARS)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const redAccent = index % 2 === 0;

  return (
    <motion.article
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
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-6 shadow-[0_10px_32px_rgba(17,17,17,0.045)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/35 hover:shadow-[0_20px_45px_rgba(17,17,17,0.09)] sm:p-7 ${
        index < 3 ? "lg:col-span-2" : "lg:col-span-3"
      }`}
    >
      {/* Animated top brand line */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-[3px] w-16 transition-all duration-500 group-hover:w-full ${
          redAccent
            ? "bg-[#BE202B]"
            : "bg-[#25B34B]"
        }`}
      />

      {/* Card heading */}
      <div className="flex items-start justify-between gap-4 border-b border-[#111111]/10 pb-5">
        <div className="flex min-w-0 items-start gap-3.5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
              redAccent
                ? "border-[#BE202B]/15 bg-[#BE202B]/[0.07] text-[#BE202B] group-hover:border-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white"
                : "border-[#25B34B]/20 bg-[#25B34B]/[0.08] text-[#1D9440] group-hover:border-[#1D9440] group-hover:bg-[#1D9440] group-hover:text-white"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[22px] w-[22px]"
              aria-hidden="true"
            >
              <path d={pillar.icon} />
            </svg>
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] font-bold uppercase leading-[1.4] tracking-[0.12em] text-[#777777]">
              {pillar.subtitle}
            </span>

            <h3 className="mt-1 text-[16px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] sm:text-[18px]">
              {pillar.title}
            </h3>
          </div>
        </div>

        <span className="shrink-0 text-[12px] font-black tracking-[0.1em] text-[#111111]/25">
          {pillar.num}
        </span>
      </div>

      {/* Audience tags */}
      <div className="mt-5 flex flex-1 flex-wrap content-start gap-2">
        {pillar.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-md border border-[#111111]/[0.09] bg-[#F8F8F8] px-3 py-2 text-[11px] font-medium leading-[1.45] text-[#555555] transition-colors duration-300 group-hover:border-[#BE202B]/20 group-hover:bg-white sm:text-[12px]"
          >
            <span
              aria-hidden="true"
              className={`mr-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                redAccent
                  ? "bg-[#BE202B]"
                  : "bg-[#25B34B]"
              }`}
            />

            {tag}
          </span>
        ))}
      </div>

      {/* Card footer */}
      <Link
        href="/who-should-visit"
        className="mt-7 flex items-center justify-between gap-3 border-t border-[#111111]/[0.08] pt-4 text-[11px] font-bold uppercase tracking-[0.07em] text-[#BE202B] transition-colors duration-300 hover:text-[#111111]"
      >
        <span>Explore Visitor Profile</span>

        <span
          aria-hidden="true"
          className="text-[18px] font-normal transition-transform duration-300 group-hover:translate-x-1"
        >
          ↗
        </span>
      </Link>
    </motion.article>
  );
}

/* ==========================================
   WHO WILL YOU MEET SECTION
========================================== */

export function WhoWillYouMeetSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="visitor-profile-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/10 bg-white py-16 text-[#111111] selection:bg-[#BE202B] selection:text-white sm:py-20 lg:py-[88px]"
    >
      <VisitorBackground />

      <Container className="relative z-10 w-full">
        {/* SECTION HEADER */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          className="flex flex-col gap-7 border-b border-[#111111]/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          {/* Left side */}
          <motion.div
            variants={revealVariants}
            className="max-w-[800px]"
          >
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="h-[2px] w-8 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#BE202B] sm:text-[11px]">
                Visitor Demographics
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-[#111111]/25 sm:block" />

              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#777777] sm:block">
                5 Trade Buyer Groups
              </span>
            </div>

            <h2
              id="visitor-profile-heading"
              className="text-[clamp(2.1rem,3.8vw,3.75rem)] font-black leading-[1.1] tracking-[-0.045em] text-[#111111]"
            >
              The Decision-Makers Who
              <span className="mt-1.5 block text-[#BE202B]">
                Buy, Build, Specify &amp; Source.
              </span>
            </h2>

            {/* Animated heading underline */}
            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-28 origin-left overflow-hidden"
              initial={
                reduceMotion ? false : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: EASE,
              }}
            >
              <span className="h-full w-[75%] bg-[#BE202B]" />
              <span className="h-full flex-1 bg-[#25B34B]" />
            </motion.div>

            <p className="mt-5 max-w-[690px] text-[14px] font-normal leading-[1.8] text-[#666666] sm:text-[15px]">
              Connect with B2B and B2C professionals,
              builders, developers, architects, project
              managers, government representatives and
              trade visitors exploring the latest
              innovations in construction.
            </p>
          </motion.div>

          {/* Header actions */}
          <motion.div
            variants={revealVariants}
            className="flex shrink-0 flex-wrap items-center gap-3"
          >
            <Link
              href="/who-should-visit"
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#111111]/20 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#111111] sm:text-[12px]"
            >
              Visitor Guide

              <span
                aria-hidden="true"
                className="text-[16px] transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>

            <Link
              href="/register-to-visit"
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#BE202B] bg-[#BE202B] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25] sm:text-[12px]"
            >
              Register to Visit

              <span
                aria-hidden="true"
                className="text-[16px] transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* GRID LABEL */}
        <div className="mb-5 mt-9 flex items-center justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#777777]">
            Meet Your Target Audience
          </span>

          <span className="text-[10px] font-bold tracking-[0.11em] text-[#BE202B]">
            01 — 05
          </span>
        </div>

        {/* VISITOR CARDS — BALANCED 3+2 GRID */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-6"
        >
          {VISITOR_PILLARS.map((pillar, index) => (
            <VisitorCard
              key={pillar.num}
              pillar={pillar}
              index={index}
            />
          ))}
        </motion.div>

        {/* PREMIUM REGISTRATION STRIP */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="relative mt-10 overflow-hidden rounded-xl border border-[#111111]/10 bg-[#111111] px-6 py-7 text-white sm:px-8 lg:px-9"
        >
          {/* Technical grid inside CTA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-[740px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#25B34B]/40"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 2, 1],
                            opacity: [0.8, 0, 0.8],
                          }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative h-2 w-2 rounded-full bg-[#25B34B]" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F26B70]">
                  Visitor Registration
                </span>
              </div>

              <h3 className="text-[20px] font-extrabold leading-[1.3] tracking-[-0.03em] text-white sm:text-[23px]">
                Meet the Industry. Discover New Opportunities.
              </h3>

              <p className="mt-3 max-w-[650px] text-[13px] leading-[1.75] text-white/65">
                Visitor registration for Kenya Buildcon
                is free. Register online to plan your
                visit, explore industry innovations and
                receive event updates.
              </p>
            </div>

            <Link
              href="/register-to-visit"
              className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-4 self-start rounded-md border border-[#BE202B] bg-[#BE202B] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25]"
            >
              Get Free Visitor Badge

              <span
                aria-hidden="true"
                className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Red / green bottom accent */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-32 bg-[#BE202B]"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-32 h-[3px] w-12 bg-[#25B34B]"
          />
        </motion.div>

        {/* SECTION FOOTER */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/[0.07] pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#888888]">
            Kenya Buildcon / Visitor Profiles
          </span>

          <span className="text-[10px] font-bold tracking-[0.1em] text-[#BE202B]">
            2027 / 04
          </span>
        </div>
      </Container>
    </section>
  );
}
