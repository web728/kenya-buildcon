
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* =========================================
   BRAND SYSTEM
========================================= */

const BRAND = {
  red: "#BE202B",
  black: "#111111",
  green: "#25B34B",
  darkGreen: "#1D9440",
  coral: "#F26B70",
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================================
   ANIMATION VARIANTS
========================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.095,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
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

/* =========================================
   EXHIBITOR BENEFITS
========================================= */

const EXHIBIT_PILLARS = [
  {
    num: "01",
    title: "Lead Generation",
    desc: "Engage with thousands of targeted trade visitors and unlock new business opportunities.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    num: "02",
    title: "Market Insights",
    desc: "Gather direct feedback from industry leaders, helping you stay competitive with up-to-date market insights.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "03",
    title: "Enter the Kenyan Market",
    desc: "Connect with the East African construction market from its leading commercial hub, Nairobi.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    num: "04",
    title: "Long-Term Partnerships",
    desc: "Build connections with government officials, investors, and industry leaders, fostering long-term partnerships.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: "05",
    title: "Brand Visibility",
    desc: "Gain premium exposure in Kenya's construction-focused tradeshow, supported by extensive media coverage.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

const EXHIBITOR_PROFILES = [
  "Building Materials & Construction",
  "Engineering Services",
  "Heavy Machinery",
  "Architectural & Interior Design",
  "Green Building Solutions",
  "Advanced Infrastructure Technology",
];

/* =========================================
   CONTINUOUS ARCHITECTURAL BACKGROUND
========================================= */

function ExhibitBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Fine blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      {/* Animated structural drawing */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* Top-right rotating construction rings */}
        <motion.g
          style={{
            transformOrigin: "1380px 160px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 100,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <circle
            cx="1380"
            cy="160"
            r="210"
            stroke={BRAND.red}
            strokeOpacity="0.24"
            strokeWidth="1"
            strokeDasharray="8 16"
          />

          <circle
            cx="1380"
            cy="160"
            r="300"
            stroke={BRAND.white}
            strokeOpacity="0.12"
            strokeWidth="0.8"
          />

          <circle
            cx="1380"
            cy="160"
            r="385"
            stroke={BRAND.green}
            strokeOpacity="0.21"
            strokeDasharray="10 22"
            strokeWidth="1"
          />
        </motion.g>

        {/* Bottom-left technical rings */}
        <motion.g
          style={{
            transformOrigin: "60px 810px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: -360 }
          }
          transition={{
            duration: 130,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <circle
            cx="60"
            cy="810"
            r="180"
            stroke={BRAND.red}
            strokeOpacity="0.17"
            strokeDasharray="6 14"
          />

          <circle
            cx="60"
            cy="810"
            r="275"
            stroke={BRAND.white}
            strokeOpacity="0.1"
          />
        </motion.g>

        {/* Moving architectural waves */}
        {Array.from({ length: 9 }).map((_, i) => {
          const first = `M-120,${480 + i * 19} C260,${345 + i * 10} 570,${655 - i * 7} 930,${495 + i * 8} C1200,${395 + i * 9} 1400,${570 - i * 6} 1570,${480 + i * 7}`;

          const second = `M-120,${510 + i * 19} C285,${405 + i * 9} 600,${615 - i * 6} 955,${525 + i * 7} C1180,${445 + i * 8} 1420,${545 - i * 6} 1570,${505 + i * 6}`;

          const stroke =
            i % 3 === 0
              ? BRAND.red
              : i % 3 === 1
                ? BRAND.green
                : BRAND.white;

          return (
            <motion.path
              key={i}
              d={first}
              fill="none"
              stroke={stroke}
              strokeWidth={i % 3 === 0 ? 1.15 : 0.8}
              strokeOpacity={
                i % 3 === 0
                  ? 0.2
                  : i % 3 === 1
                    ? 0.12
                    : 0.055
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [first, second, first],
                    }
              }
              transition={{
                duration: 19 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Registration marks */}
        <g
          stroke={BRAND.white}
          strokeWidth="0.8"
          strokeOpacity="0.12"
        >
          <path d="M170 170v20M160 180h20" />
          <path d="M1190 710v20M1180 720h20" />
          <path d="M860 110v16M852 118h16" />
        </g>
      </svg>
    </div>
  );
}

/* =========================================
   PREMIUM BENEFIT CARD
========================================= */

function BenefitCard({
  item,
  index,
}: {
  item: (typeof EXHIBIT_PILLARS)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const isRed = index % 2 === 0;

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              transition: {
                duration: 0.35,
                ease: EASE,
              },
            }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.12] bg-[#1B1B1B]/95 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/55 hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] sm:p-6"
    >
      {/* Animated top border */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-0 bg-[#BE202B] transition-all duration-500 group-hover:w-full"
      />

      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-5">
        {/* Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
            isRed
              ? "border-[#BE202B]/25 bg-[#BE202B]/10 text-[#F26B70] group-hover:border-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white"
              : "border-[#25B34B]/25 bg-[#25B34B]/10 text-[#25B34B] group-hover:border-[#1D9440] group-hover:bg-[#1D9440] group-hover:text-white"
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
            <path d={item.icon} />
          </svg>
        </div>

        <span className="text-[11px] font-black tracking-[0.15em] text-white/30">
          {item.num} / 05
        </span>
      </div>

      <div className="flex-1">
        <h3 className="mt-5 text-[16px] font-extrabold leading-[1.3] tracking-[-0.025em] text-white sm:text-[17px]">
          {item.title}
        </h3>

        <p className="mt-3 text-[12px] font-normal leading-[1.75] tracking-[-0.005em] text-white/60 sm:text-[13px]">
          {item.desc}
        </p>
      </div>

      {/* Card footer */}
      <Link
        href="/exhibit"
        className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#F26B70] transition-colors hover:text-white"
      >
        <span>Exhibitor Guide</span>

        <span
          aria-hidden="true"
          className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
        >
          ↗
        </span>
      </Link>
    </motion.article>
  );
}

/* =========================================
   EXHIBITOR PROFILE CARD
========================================= */

function ProfileCard({
  profile,
  index,
}: {
  profile: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={itemVariants}
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
      className="group relative flex min-w-0 items-start gap-4 rounded-xl border border-white/[0.12] bg-[#1B1B1B]/95 p-5 transition-colors duration-300 hover:border-[#BE202B]/50 hover:bg-[#222222] sm:p-6"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#BE202B]/20 bg-[#BE202B]/10 text-[12px] font-black tracking-[0.05em] text-[#F26B70] transition-colors group-hover:bg-[#BE202B] group-hover:text-white">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h3 className="text-[15px] font-bold leading-[1.4] tracking-[-0.02em] text-white sm:text-[16px]">
          {profile}
        </h3>

        <p className="mt-2 text-[12px] leading-[1.7] text-white/55">
          Showcase your solutions to builders,
          developers, industry buyers and
          decision-makers across East Africa.
        </p>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#BE202B] transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  );
}

/* =========================================
   WHY EXHIBIT SECTION
========================================= */

export function WhyExhibitSection() {
  const [activeTab, setActiveTab] = useState<
    "reasons" | "who"
  >("reasons");

  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-exhibit-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#111111] py-16 text-white selection:bg-[#BE202B] selection:text-white sm:py-20 lg:py-24"
    >
      <ExhibitBackground />

      {/* Top brand line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 flex h-[3px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>

      <Container className="relative z-10 w-full">

        {/* =====================================
            HEADER
        ===================================== */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-70px",
          }}
          className="flex flex-col gap-7 border-b border-white/15 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-[820px]"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#F26B70] sm:text-[11px]">
                Exhibitor Intelligence
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />

              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45 sm:block">
                Kenya Buildcon 2027
              </span>
            </div>

            <h2
              id="why-exhibit-heading"
              className="text-[clamp(2rem,3.7vw,3.8rem)] font-black leading-[1.1] tracking-[-0.045em] text-white"
            >
              Expand Your Reach in
              <span className="mt-1 block">
                East Africa&apos;s{" "}
                <span className="text-[#F26B70]">
                  Construction Hub.
                </span>
              </span>
            </h2>

            {/* Animated underline */}
            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-28 origin-left overflow-hidden"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.95,
                delay: 0.2,
                ease: EASE,
              }}
            >
              <span className="h-full w-[75%] bg-[#BE202B]" />
              <span className="h-full flex-1 bg-[#25B34B]" />
            </motion.div>

            <p className="mt-5 max-w-[700px] text-[14px] font-normal leading-[1.8] tracking-[-0.006em] text-white/65 sm:text-[15px]">
              Exhibiting at Kenya Buildcon is a
              strategic opportunity to connect with
              builders, developers, architects,
              project managers and government
              representatives from across East Africa.
            </p>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            variants={itemVariants}
            className="shrink-0"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[48px] items-center justify-center gap-4 rounded-md border border-[#BE202B] bg-[#BE202B] px-7 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_8px_25px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25]"
            >
              Book Your Stand

              <span
                aria-hidden="true"
                className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* =====================================
            TABS
        ===================================== */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F26B70]">
              Exhibitor Opportunities
            </span>

            <h3 className="mt-1 text-[18px] font-extrabold leading-[1.3] tracking-[-0.025em] text-white sm:text-[20px]">
              {activeTab === "reasons"
                ? "Five Reasons to Exhibit"
                : "Who Should Exhibit?"}
            </h3>
          </div>

          {/* Animated segmented tabs */}
          <div
            role="tablist"
            aria-label="Exhibitor information"
            className="inline-flex w-fit max-w-full items-center gap-1 rounded-lg border border-white/15 bg-[#1B1B1B] p-1"
          >
            {[
              {
                id: "reasons" as const,
                label: "Core Pillars",
              },
              {
                id: "who" as const,
                label: "Who Should Exhibit?",
              },
            ].map((tab) => {
              const selected = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`exhibit-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="exhibit-tab-panel"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative isolate min-h-[42px] cursor-pointer rounded-md px-3 py-2.5 text-[11px] font-bold tracking-[0.02em] transition-colors duration-300 sm:px-4 sm:text-[12px] ${
                    selected
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="exhibitActiveTab"
                      className="absolute inset-0 -z-10 rounded-md bg-[#BE202B]"
                      transition={{
                        type: "spring",
                        stiffness: 370,
                        damping: 32,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================
            ANIMATED TAB CONTENT
        ===================================== */}
        <div
          id="exhibit-tab-panel"
          role="tabpanel"
          aria-labelledby={`exhibit-tab-${activeTab}`}
          className="mt-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "reasons" ? (
              <motion.div
                key="exhibit-reasons"
                variants={containerVariants}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
              >
                {EXHIBIT_PILLARS.map((item, index) => (
                  <div
                    key={item.num}
                    className={
                      index < 3
                        ? "lg:col-span-2"
                        : "lg:col-span-3"
                    }
                  >
                    <BenefitCard
                      item={item}
                      index={index}
                    />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="exhibitor-profiles"
                variants={containerVariants}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {EXHIBITOR_PROFILES.map(
                  (profile, index) => (
                    <ProfileCard
                      key={profile}
                      profile={profile}
                      index={index}
                    />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =====================================
            PREMIUM BOTTOM CTA PANEL
        ===================================== */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="relative mt-10 overflow-hidden rounded-xl border border-white/15 bg-[#1C1C1C] px-6 py-7 sm:px-8 lg:px-10"
        >
          {/* Technical texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-[720px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#25B34B]/50"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 2, 1],
                            opacity: [0.7, 0, 0.7],
                          }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                    }}
                  />
                  <span className="relative h-2 w-2 rounded-full bg-[#25B34B]" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F26B70]">
                  Your Gateway to East Africa
                </span>
              </div>

              <h3 className="text-[20px] font-extrabold leading-[1.25] tracking-[-0.03em] text-white sm:text-[23px]">
                Build Connections. Create Opportunities.
              </h3>

              <p className="mt-2 max-w-[640px] text-[13px] leading-[1.75] text-white/60">
                Showcase your products, meet key
                industry professionals and explore
                new business opportunities at
                Kenya Buildcon International Expo 2027.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-4 self-start rounded-md border border-[#BE202B] bg-[#BE202B] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25]"
            >
              Reserve Your Space

              <span
                aria-hidden="true"
                className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Bottom branding accent */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-32 bg-[#BE202B]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-32 h-[3px] w-12 bg-[#25B34B]"
          />
        </motion.div>

        {/* Section footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
            Kenya Buildcon / Exhibitor Opportunities
          </span>

          <span className="text-[10px] font-bold tracking-[0.1em] text-[#F26B70]">
            2027 / 04
          </span>
        </div>
      </Container>

      {/* Bottom brand line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 flex h-[2px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>
    </section>
  );
}
