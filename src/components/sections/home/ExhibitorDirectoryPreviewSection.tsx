
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { pastParticipants } from "@/data/previousEdition";

/* =========================================
   BRAND + MOTION
========================================= */

const RED = "#BE202B";
const GREEN = "#25B34B";
const BLACK = "#111111";
const EASE = [0.16, 1, 0.3, 1] as const;

type Exhibitor = {
  _id?: string;
  slug?: string;
  name: string;
  sector: string;
  country: string;
  tagline?: string;
};

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.07,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

/* =========================================
   SMOOTH ARCHITECTURAL BACKGROUND
========================================= */

function DirectoryBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Subtle blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "82px 82px",
        }}
      />

      <svg
        viewBox="0 0 1440 850"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Top-right technical rings */}
        <motion.g
          style={{
            transformOrigin: "1450px 65px",
          }}
          animate={
            reduceMotion ? undefined : { rotate: 360 }
          }
          transition={{
            duration: 125,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="1450"
            cy="65"
            r="215"
            stroke={RED}
            strokeWidth="1"
            strokeOpacity="0.16"
            strokeDasharray="8 15"
          />

          <circle
            cx="1450"
            cy="65"
            r="305"
            stroke={BLACK}
            strokeWidth="0.8"
            strokeOpacity="0.09"
          />

          <circle
            cx="1450"
            cy="65"
            r="390"
            stroke={GREEN}
            strokeWidth="0.8"
            strokeOpacity="0.12"
            strokeDasharray="10 18"
          />
        </motion.g>

        {/* Bottom-left linework */}
        <circle
          cx="-50"
          cy="820"
          r="250"
          stroke={RED}
          strokeWidth="0.8"
          strokeOpacity="0.1"
        />

        <circle
          cx="-50"
          cy="820"
          r="340"
          stroke={BLACK}
          strokeWidth="0.8"
          strokeOpacity="0.06"
          strokeDasharray="7 15"
        />

        {/* Continuously moving fine waves */}
        {Array.from({ length: 7 }).map((_, i) => {
          const first =
            `M-120,${465 + i * 19} ` +
            `C270,${345 + i * 11} ` +
            `570,${630 - i * 8} ` +
            `930,${470 + i * 8} ` +
            `C1190,${370 + i * 8} ` +
            `1430,${560 - i * 7} ` +
            `1560,${465 + i * 7}`;

          const second =
            `M-120,${488 + i * 19} ` +
            `C295,${390 + i * 10} ` +
            `600,${590 - i * 7} ` +
            `950,${495 + i * 7} ` +
            `C1210,${410 + i * 8} ` +
            `1430,${530 - i * 6} ` +
            `1560,${490 + i * 6}`;

          return (
            <motion.path
              key={i}
              d={first}
              stroke={
                i % 3 === 0
                  ? RED
                  : i % 3 === 1
                    ? GREEN
                    : BLACK
              }
              strokeWidth="0.85"
              strokeOpacity={
                i % 3 === 0
                  ? 0.11
                  : i % 3 === 1
                    ? 0.07
                    : 0.045
              }
              animate={
                reduceMotion
                  ? undefined
                  : { d: [first, second, first] }
              }
              transition={{
                duration: 20 + i * 1.8,
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

/* =========================================
   PREVIOUS EDITION BRAND CARD
========================================= */

function PastParticipantCard({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      variants={cardVariants}
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
      className="group relative flex h-full min-h-[144px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-5 shadow-[0_8px_28px_rgba(17,17,17,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/35 hover:shadow-[0_18px_42px_rgba(17,17,17,0.085)] sm:p-6"
    >
      {/* Small, permanent corner accent */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-[3px] w-16 transition-[width] duration-500 group-hover:w-full ${
          index % 2 === 0
            ? "bg-[#BE202B]"
            : "bg-[#25B34B]"
        }`}
      />

      {/* Editorial number */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A8A8A]">
          Participating Brand
        </span>

        <span className="text-[11px] font-black tabular-nums tracking-[0.08em] text-[#111111]/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Company name: actual information gets focus */}
      <h3 className="mt-5 break-words text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] transition-colors duration-300 group-hover:text-[#BE202B] sm:text-[18px]">
        {name}
      </h3>

      {/* Quiet editorial footer, no meaningless symbols */}
      <div className="mt-5 flex items-center gap-3 border-t border-[#111111]/[0.08] pt-3.5">
        <span className="h-[2px] w-5 bg-[#BE202B]" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#777777]">
          Previous Edition
        </span>
      </div>
    </motion.li>
  );
}

/* =========================================
   CURRENT EXHIBITOR CARD
========================================= */

function CurrentExhibitorCard({
  exhibitor,
  index,
}: {
  exhibitor: Exhibitor;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

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
      className="group h-full min-w-0"
    >
      <Link
        href={
          exhibitor.slug
            ? `/exhibitors/${exhibitor.slug}`
            : "/exhibitors"
        }
        className="relative flex h-full min-h-[270px] min-w-0 flex-col overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-6 shadow-[0_10px_30px_rgba(17,17,17,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/40 hover:shadow-[0_20px_45px_rgba(17,17,17,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B] sm:p-7"
      >
        {/* Permanent top accent */}
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 h-[3px] w-20 transition-[width] duration-500 group-hover:w-full ${
            index % 2 === 0
              ? "bg-[#BE202B]"
              : "bg-[#25B34B]"
          }`}
        />

        {/* Top metadata */}
        <div className="flex items-start justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#BE202B]">
            Featured Exhibitor
          </span>

          <span className="text-[11px] font-black tabular-nums text-[#111111]/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Company content */}
        <div className="mt-7 flex-1">
          <h3 className="break-words text-[23px] font-black leading-[1.2] tracking-[-0.04em] text-[#111111] transition-colors duration-300 group-hover:text-[#BE202B]">
            {exhibitor.name}
          </h3>

          {exhibitor.tagline && (
            <p className="mt-3 text-[13px] leading-[1.75] text-[#666666]">
              {exhibitor.tagline}
            </p>
          )}
        </div>

        {/* Sector and location */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="rounded-md border border-[#111111]/10 bg-[#F7F7F7] px-3 py-1.5 text-[11px] font-semibold text-[#555555]">
            {exhibitor.sector}
          </span>

          <span className="rounded-md border border-[#25B34B]/20 bg-[#25B34B]/[0.07] px-3 py-1.5 text-[11px] font-semibold text-[#1D9440]">
            {exhibitor.country}
          </span>
        </div>

        {/* Functional profile link indicator */}
        <div className="mt-6 flex items-center justify-between border-t border-[#111111]/10 pt-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#BE202B]">
            View Company Profile
          </span>

          <span
            aria-hidden="true"
            className="text-[19px] font-medium text-[#BE202B] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

/* =========================================
   MAIN SECTION
========================================= */

export function ExhibitorDirectoryPreviewSection({
  exhibitors = [],
}: {
  exhibitors?: Exhibitor[];
}) {
  const reduceMotion = useReducedMotion();

  const hasCurrentExhibitors = exhibitors.length > 0;
  const featuredExhibitors = exhibitors.slice(0, 3);

  return (
    <section
      aria-labelledby="directory-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/10 bg-white py-16 text-[#111111] selection:bg-[#BE202B] selection:text-white sm:py-20 lg:py-[88px]"
    >
      <DirectoryBackground />

      <Container className="relative z-10">
        {/* ==================================
            SECTION HEADER
        ================================== */}

        <motion.div
          variants={parentVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-70px",
          }}
          className="flex flex-col justify-between gap-7 border-b border-[#111111]/10 pb-9 lg:flex-row lg:items-end"
        >
          <motion.div
            variants={revealVariants}
            className="max-w-[790px]"
          >
            {/* Section kicker */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="h-[2px] w-8 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#BE202B] sm:text-[11px]">
                {hasCurrentExhibitors
                  ? "2027 Exhibitor Directory"
                  : "Previous Edition Participants"}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-[#111111]/25 sm:block" />

              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#777777] sm:block">
                Industry Connections
              </span>
            </div>

            {/* Headline */}
            <h2
              id="directory-heading"
              className="text-[clamp(2.1rem,3.8vw,3.75rem)] font-black leading-[1.09] tracking-[-0.045em] text-[#111111]"
            >
              {hasCurrentExhibitors
                ? "Discover the Companies"
                : "The Brands Behind"}

              <span className="mt-1.5 block text-[#BE202B]">
                {hasCurrentExhibitors
                  ? "Shaping Construction."
                  : "Industry Connections."}
              </span>
            </h2>

            {/* Animated title underline */}
            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-32 origin-left overflow-hidden"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: EASE,
              }}
            >
              <span className="h-full w-[77%] bg-[#BE202B]" />
              <span className="h-full flex-1 bg-[#25B34B]" />
            </motion.div>

            <p className="mt-5 max-w-[680px] text-[14px] leading-[1.8] text-[#626262] sm:text-[15px]">
              {hasCurrentExhibitors
                ? "Explore featured manufacturers, material suppliers and construction businesses participating in Kenya Buildcon."
                : "A selection of participating companies featured in the previous edition's official Post Show Report, representing the international business connections made in Nairobi."}
            </p>
          </motion.div>

          {/* Header actions */}
          <motion.div
            variants={revealVariants}
            className="flex shrink-0 flex-wrap gap-3"
          >
            <Link
              href="/exhibitors"
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#111111]/20 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#111111] sm:text-[12px]"
            >
              Full Directory

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25] sm:text-[12px]"
            >
              Book Stand Space

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ==================================
            EDITORIAL DIRECTORY SUBHEADER
        ================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="mb-6 mt-9 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#BE202B]">
              {hasCurrentExhibitors
                ? "Featured Companies"
                : "Exhibition Heritage"}
            </span>

            <h3 className="mt-1.5 text-[19px] font-extrabold tracking-[-0.025em] text-[#111111] sm:text-[21px]">
              {hasCurrentExhibitors
                ? "Meet the Exhibitors"
                : "Previous Edition Showcase"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#BE202B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777777]">
              {hasCurrentExhibitors
                ? `${featuredExhibitors.length} Featured Companies`
                : `${pastParticipants.length} Companies Listed`}
            </span>
          </div>
        </motion.div>

        {/* ==================================
            COMPANY LISTING
        ================================== */}

        {hasCurrentExhibitors ? (
          <motion.div
            variants={parentVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredExhibitors.map((exhibitor, index) => (
              <CurrentExhibitorCard
                key={
                  exhibitor._id ||
                  exhibitor.slug ||
                  `${exhibitor.name}-${index}`
                }
                exhibitor={exhibitor}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.ul
            variants={parentVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            aria-label="Previous edition participating companies"
            className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pastParticipants.map((name, index) => (
              <PastParticipantCard
                key={`${name}-${index}`}
                name={name}
                index={index}
              />
            ))}
          </motion.ul>
        )}

        {/* ==================================
            PREMIUM BOOKING STRIP
        ================================== */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="relative mt-11 overflow-hidden rounded-xl border border-[#111111]/10 bg-[#111111] px-6 py-7 text-white sm:px-8 lg:px-9"
        >
          {/* Inside technical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-[710px]">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#25B34B]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F26B70]">
                  Exhibitor Opportunities
                </span>
              </div>

              <h3 className="text-[21px] font-extrabold leading-[1.3] tracking-[-0.03em] text-white sm:text-[24px]">
                Your Business. A Wider Market.
              </h3>

              <p className="mt-3 text-[13px] leading-[1.75] text-white/65">
                Join the exhibition, present your
                products and connect with potential
                buyers, distributors and industry
                professionals at Kenya Buildcon 2027.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-3 self-start rounded-md bg-[#BE202B] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25]"
            >
              Become an Exhibitor

              <span
                aria-hidden="true"
                className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Bottom brand accent */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-36 bg-[#BE202B]"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-36 h-[3px] w-14 bg-[#25B34B]"
          />
        </motion.div>

        {/* Bottom editorial footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/10 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#888888]">
            Kenya Buildcon / Exhibitor Network
          </span>

          <span className="text-[10px] font-bold tracking-[0.1em] text-[#BE202B]">
            2027 / 04
          </span>
        </div>
      </Container>
    </section>
  );
}
