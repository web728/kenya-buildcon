
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   BRAND SYSTEM
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
   MOTION VARIANTS
========================================== */

const sectionVariants: Variants = {
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
      duration: 0.85,
      ease: EASE,
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

/* ==========================================
   SECTOR ICON PATHS
========================================== */

const ICON = {
  building:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  machine:
    "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  steel:
    "M4 6h16M4 10h16M4 14h16M4 18h16",
  prefab:
    "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  window:
    "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 12h16M12 4v16",
  tiles:
    "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  brush:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  can:
    "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  bath:
    "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  hvac:
    "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  bolt:
    "M13 10V3L4 14h7v7l9-11h-7z",
  sun:
    "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  chip:
    "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
} as const;

/* ==========================================
   EXHIBITION SECTOR DATA
========================================== */

const sectorTabs = [
  {
    id: "structural",
    label: "Materials & Machinery",
    sectors: [
      {
        title: "Building Materials",
        items:
          "Cement and Steel, Concrete Blocks & Machinery, Gypsum Boards, Lightweight Construction Materials",
        icon: ICON.building,
        color: "red",
      },
      {
        title: "Construction Machinery",
        items:
          "Earthmoving, Demolition, Quarrying & Mining Equipment, Construction Tools & Machinery",
        icon: ICON.machine,
        color: "green",
      },
      {
        title: "Structural Engineering & Steel",
        items:
          "Structural Engineering, Structural Steel Fabrication, Formwork and Scaffolding",
        icon: ICON.steel,
        color: "red",
      },
      {
        title: "Prefab & Modular",
        items:
          "Pre-fabricated Structures, Modular Construction Solutions, PVC/UPVC Machinery and Profiles",
        icon: ICON.prefab,
        color: "green",
      },
    ],
  },
  {
    id: "architectural",
    label: "Architecture & Interiors",
    sectors: [
      {
        title: "Doors, Windows & Glass",
        items:
          "Doors and Windows, Aluminium Extrusions, Architectural & Decorative Glass, Architectural Hardware",
        icon: ICON.window,
        color: "red",
      },
      {
        title: "Tiles, Marble & Flooring",
        items:
          "Tiles & Sanitary Ware, Marble & Stones, Flooring and Wall Coverings, Industrial Flooring",
        icon: ICON.tiles,
        color: "green",
      },
      {
        title: "Interiors & Landscaping",
        items:
          "Interior Decorating Products, Outdoor Furniture & Landscaping, Acoustics & Soundproofing",
        icon: ICON.brush,
        color: "red",
      },
      {
        title: "Chemicals, Paints & Roofing",
        items:
          "Construction Chemicals & Waterproofing, Adhesive & Sealants, Paints & Coatings, Roofing & Façade",
        icon: ICON.can,
        color: "green",
      },
    ],
  },
  {
    id: "mep",
    label: "MEP & Building Services",
    sectors: [
      {
        title: "Kitchen, Bathroom & Plumbing",
        items:
          "Kitchen & Bathroom Solutions, Plumbing Fittings and Accessories",
        icon: ICON.bath,
        color: "red",
      },
      {
        title: "HVAC, Lifts & Elevators",
        items:
          "Air Conditioning & HVAC, Lifts & Elevators",
        icon: ICON.hvac,
        color: "green",
      },
      {
        title: "Electrical, Lighting & Cables",
        items:
          "Electricals & Electronics, Lighting / LED, Switches & Switch Gear, Wires & Cables",
        icon: ICON.bolt,
        color: "red",
      },
      {
        title: "Fire, Safety & Security",
        items:
          "Fire Protection Systems, Passive Fire Protection, Safety & Security",
        icon: ICON.shield,
        color: "green",
      },
    ],
  },
  {
    id: "energy",
    label: "Green Energy & Technology",
    sectors: [
      {
        title: "Solar & Renewable Energy",
        items:
          "Renewable Energy Systems, Solar, Wind & Other Green Energy Products, Battery & Generators",
        icon: ICON.sun,
        color: "red",
      },
      {
        title: "Smart Building Technology",
        items:
          "Building Automation, Home Automation Systems, BIM Software, Infrastructure Software",
        icon: ICON.chip,
        color: "green",
      },
      {
        title: "Site Services & Sustainability",
        items:
          "Construction Waste Management, Noise Control Products, Surveying Equipment",
        icon: ICON.building,
        color: "red",
      },
    ],
  },
] as const;

/* ==========================================
   CONTINUOUS ARCHITECTURAL BACKGROUND
========================================== */

function ExhibitionBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Blueprint dot texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <svg
        viewBox="0 0 1440 850"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Upper-right technical rings */}
        <motion.g
          style={{ transformOrigin: "1360px 110px" }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, 8, 0] }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle
            cx="1360"
            cy="110"
            r="180"
            stroke={BRAND.red}
            strokeWidth="1"
            strokeOpacity="0.14"
            strokeDasharray="6 12"
          />

          <circle
            cx="1360"
            cy="110"
            r="265"
            stroke={BRAND.black}
            strokeWidth="0.8"
            strokeOpacity="0.08"
          />

          <circle
            cx="1360"
            cy="110"
            r="350"
            stroke={BRAND.green}
            strokeWidth="0.8"
            strokeOpacity="0.11"
            strokeDasharray="9 16"
          />
        </motion.g>

        {/* Lower-left structural rings */}
        <circle
          cx="50"
          cy="800"
          r="230"
          stroke={BRAND.red}
          strokeWidth="0.8"
          strokeOpacity="0.1"
        />

        <circle
          cx="50"
          cy="800"
          r="315"
          stroke={BRAND.black}
          strokeWidth="0.8"
          strokeOpacity="0.07"
          strokeDasharray="8 14"
        />

        {/* Animated flowing construction lines */}
        {Array.from({ length: 8 }).map((_, i) => {
          const pathA = `M-120,${480 + i * 18} C250,${355 + i * 13} 590,${640 - i * 8} 930,${475 + i * 9} C1200,${380 + i * 10} 1400,${570 - i * 7} 1560,${470 + i * 8}`;

          const pathB = `M-120,${505 + i * 18} C280,${405 + i * 11} 610,${610 - i * 7} 960,${505 + i * 8} C1180,${415 + i * 8} 1410,${535 - i * 6} 1560,${495 + i * 7}`;

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
              strokeWidth="0.8"
              strokeOpacity={
                i % 3 === 0
                  ? 0.1
                  : i % 3 === 1
                    ? 0.07
                    : 0.045
              }
              animate={
                reduceMotion
                  ? undefined
                  : { d: [pathA, pathB, pathA] }
              }
              transition={{
                duration: 20 + i * 1.6,
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

/* ==========================================
   PREMIUM SECTOR CARD
========================================== */

type Sector = (typeof sectorTabs)[number]["sectors"][number];

function SectorCard({
  sector,
  index,
}: {
  sector: Sector;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const isRed = sector.color === "red";

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
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-5 shadow-[0_8px_30px_rgba(17,17,17,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_18px_42px_rgba(17,17,17,0.09)] sm:p-6"
    >
      {/* Animated top-line on hover */}
      <span
        className="absolute left-0 top-0 h-[2px] w-0 bg-[#BE202B] transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between border-b border-[#111111]/[0.08] pb-4">
        {/* Sector icon */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-300 ${
            isRed
              ? "border-[#BE202B]/15 bg-[#BE202B]/[0.06] text-[#BE202B] group-hover:border-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white"
              : "border-[#25B34B]/15 bg-[#25B34B]/[0.07] text-[#1D9440] group-hover:border-[#1D9440] group-hover:bg-[#1D9440] group-hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.7}
              d={sector.icon}
            />
          </svg>
        </div>

        {/* Editorial card index */}
        <span className="text-[11px] font-black tracking-[0.12em] text-[#111111]/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card content */}
      <div className="flex-1">
        <h3 className="mt-5 text-[16px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] sm:text-[17px]">
          {sector.title}
        </h3>

        <p className="mt-3 text-[12px] font-normal leading-[1.75] tracking-[-0.005em] text-[#666666] sm:text-[13px]">
          {sector.items}
        </p>
      </div>

      {/* Card footer */}
      <Link
        href="/exhibition-profile"
        className="mt-6 flex items-center justify-between gap-3 border-t border-[#111111]/[0.08] pt-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#BE202B] transition-colors hover:text-[#111111]"
      >
        <span>Explore Categories</span>

        <span
          aria-hidden="true"
          className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
        >
          ↗
        </span>
      </Link>
    </motion.article>
  );
}

/* ==========================================
   EXHIBITION PROFILE SECTION
========================================== */

export function ExhibitionProfileSection() {
  const [activeTab, setActiveTab] =
    useState<string>(sectorTabs[0].id);

  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const sectionVisible = useInView(sectionRef, {
    once: true,
    margin: "-60px",
  });

  const currentGroup =
    sectorTabs.find((tab) => tab.id === activeTab) ??
    sectorTabs[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="exhibition-profile-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/10 bg-white py-16 text-[#111111] selection:bg-[#BE202B] selection:text-white sm:py-20 lg:py-24"
    >
      <ExhibitionBackground />

      <Container className="relative z-10 w-full">
        {/* ==================================
            SECTION INTRO
        ================================== */}
        <motion.div
          variants={sectionVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={sectionVisible ? "visible" : "hidden"}
          className="flex flex-col gap-6 border-b border-[#111111]/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div
            variants={revealVariants}
            className="max-w-[850px]"
          >
            {/* Editorial section label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#BE202B] sm:text-[11px]">
                What&apos;s On Display
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-[#111111]/25 sm:block" />

              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#777777] sm:block">
                Industry Sectors
              </span>
            </div>

            {/* Main heading */}
            <h2
              id="exhibition-profile-heading"
              className="text-[clamp(2rem,3.7vw,3.8rem)] font-black leading-[1.1] tracking-[-0.045em] text-[#111111]"
            >
              Products, Machinery
              <span className="mt-1 block">
                &amp;{" "}
                <span className="text-[#BE202B]">
                  Materials on Display.
                </span>
              </span>
            </h2>

            {/* Animated heading underline */}
            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-28 origin-left overflow-hidden"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              animate={
                sectionVisible
                  ? { scaleX: 1 }
                  : { scaleX: 0 }
              }
              transition={{
                duration: 1,
                delay: 0.25,
                ease: EASE,
              }}
            >
              <span className="h-full w-[75%] bg-[#BE202B]" />
              <span className="h-full flex-1 bg-[#25B34B]" />
            </motion.div>

            <p className="mt-5 max-w-[690px] text-[14px] font-normal leading-[1.75] tracking-[-0.005em] text-[#666666] sm:text-[15px]">
              Covering 50+ exhibit categories across
              the building and construction supply
              chain — from essential materials and
              heavy machinery to architecture,
              interiors and smart building technology.
            </p>
          </motion.div>

          {/* Top action */}
          <motion.div
            variants={revealVariants}
            className="shrink-0"
          >
            <Link
              href="/exhibition-profile"
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#111111]/20 bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BE202B] hover:bg-[#BE202B] hover:text-white"
            >
              Explore All Sectors

              <span
                aria-hidden="true"
                className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ==================================
            INTERACTIVE INDUSTRY TABS
        ================================== */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="mt-8"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#777777]">
              Explore by Industry
            </span>

            <span className="text-[10px] font-bold tracking-[0.1em] text-[#BE202B]">
              04 / SECTOR GROUPS
            </span>
          </div>

          {/* Scrollable tabs on mobile */}
          <div
            role="tablist"
            aria-label="Exhibition sector groups"
            className="flex w-full gap-2 overflow-x-auto border-b border-[#111111]/10 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3"
          >
            {sectorTabs.map((tab, index) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  id={`sector-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="exhibition-sector-panel"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex min-h-[45px] shrink-0 cursor-pointer items-center gap-2.5 rounded-md border px-4 py-2.5 text-[11px] font-bold tracking-[0.015em] transition-colors duration-300 sm:px-5 sm:text-[12px] ${
                    isActive
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-[#111111]/10 bg-white text-[#555555] hover:border-[#BE202B]/40 hover:text-[#BE202B]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold ${
                      isActive
                        ? "text-[#F26B70]"
                        : "text-[#111111]/35"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{tab.label}</span>

                  {isActive && (
                    <motion.span
                      layoutId="activeSectorIndicator"
                      className="absolute inset-x-3 -bottom-[4px] h-[3px] rounded-full bg-[#BE202B]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ==================================
            ACTIVE CATEGORY HEADER
        ================================== */}
        <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#BE202B]">
              Selected Category
            </span>

            <h3 className="mt-1 text-[18px] font-extrabold leading-[1.3] tracking-[-0.025em] text-[#111111] sm:text-[20px]">
              {currentGroup.label}
            </h3>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#777777]">
            {String(currentGroup.sectors.length).padStart(2, "0")} Sectors
          </span>
        </div>

        {/* ==================================
            ANIMATED SECTOR GRID
        ================================== */}
        <div
          id="exhibition-sector-panel"
          role="tabpanel"
          aria-labelledby={`sector-tab-${activeTab}`}
          className="mt-5"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              variants={gridVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              exit={{
                opacity: 0,
                y: -10,
                transition: {
                  duration: 0.2,
                },
              }}
              className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {currentGroup.sectors.map((sector, index) => (
                <SectorCard
                  key={`${activeTab}-${sector.title}`}
                  sector={sector}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ==================================
            PREMIUM BOOKING CTA
        ================================== */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            ease: EASE,
          }}
          className="relative mt-11 overflow-hidden rounded-xl border border-[#111111]/10 bg-[#111111] px-6 py-7 text-white sm:px-8 lg:px-10"
        >
          {/* Fine background structure */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-[720px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#25B34B]/50"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.8, 1],
                            opacity: [0.8, 0, 0.8],
                          }
                    }
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                    }}
                  />

                  <span className="relative h-2 w-2 rounded-full bg-[#25B34B]" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F26B70]">
                  Exhibitor Opportunities
                </span>
              </div>

              <h3 className="text-[20px] font-extrabold leading-[1.25] tracking-[-0.03em] text-white sm:text-[23px]">
                Showcase Your Business at Kenya Buildcon 2027
              </h3>

              <p className="mt-2 text-[13px] leading-[1.7] text-white/65">
                Stand bookings for the{" "}
                {event.editionLabel.toLowerCase()} are open
                for manufacturers, suppliers and service
                providers.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-4 rounded-md border border-[#BE202B] bg-[#BE202B] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25]"
            >
              Reserve Your Space

              <span
                aria-hidden="true"
                className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Bottom edge */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-36 bg-[#BE202B]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-36 h-[3px] w-12 bg-[#25B34B]"
          />
        </motion.div>

        {/* SECTION FOOTER DETAIL */}
        <div
          aria-hidden="true"
          className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/[0.07] pt-5"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#888888]">
            Kenya Buildcon / Exhibition Profile
          </span>

          <span className="text-[10px] font-bold tracking-[0.1em] text-[#BE202B]">
            2027 / 04
          </span>
        </div>
      </Container>
    </section>
  );
}
