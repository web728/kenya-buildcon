
"use client";

import Link from "next/link";

import {
  motion,
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
   REVEAL ANIMATIONS
========================================== */

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

/* ==========================================
   ICONS
========================================== */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px]"
      aria-hidden="true"
    >
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==========================================
   ANIMATED SVG BACKGROUND
========================================== */

function FinalCtaBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Technical grid: pure lines, no gradients */}
      <div
        className="absolute inset-0 opacity-[0.065]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />

      {/* Large architectural background typography */}
      <div className="absolute -bottom-5 right-[-2%] select-none whitespace-nowrap text-[150px] font-black leading-none tracking-[-0.09em] text-white/[0.025] sm:text-[220px] lg:-bottom-10 lg:text-[310px]">
        2027
      </div>

      <svg
        viewBox="0 0 1200 560"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Architectural circles */}
        <motion.g
          style={{
            transformOrigin: "1150px 65px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="1150"
            cy="65"
            r="155"
            stroke={BRAND.red}
            strokeWidth="1"
            strokeOpacity="0.28"
            strokeDasharray="8 15"
          />

          <circle
            cx="1150"
            cy="65"
            r="230"
            stroke={BRAND.white}
            strokeWidth="0.8"
            strokeOpacity="0.12"
          />

          <circle
            cx="1150"
            cy="65"
            r="305"
            stroke={BRAND.green}
            strokeWidth="0.8"
            strokeOpacity="0.19"
            strokeDasharray="10 20"
          />
        </motion.g>

        {/* Flowing construction linework */}
        {Array.from({ length: 7 }).map((_, index) => {
          const first =
            `M-100,${340 + index * 17} ` +
            `C200,${250 + index * 10} ` +
            `470,${470 - index * 7} ` +
            `750,${355 + index * 8} ` +
            `C960,${280 + index * 7} ` +
            `1150,${420 - index * 6} ` +
            `1300,${340 + index * 6}`;

          const second =
            `M-100,${360 + index * 17} ` +
            `C225,${290 + index * 10} ` +
            `500,${445 - index * 7} ` +
            `780,${375 + index * 8} ` +
            `C980,${310 + index * 7} ` +
            `1160,${400 - index * 6} ` +
            `1300,${360 + index * 6}`;

          return (
            <motion.path
              key={index}
              d={first}
              stroke={
                index % 3 === 0
                  ? BRAND.red
                  : index % 3 === 1
                    ? BRAND.green
                    : BRAND.white
              }
              strokeWidth={
                index % 3 === 0 ? 1.1 : 0.8
              }
              strokeOpacity={
                index % 3 === 0
                  ? 0.19
                  : index % 3 === 1
                    ? 0.12
                    : 0.07
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [first, second, first],
                    }
              }
              transition={{
                duration: 20 + index * 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Technical reference markers */}
        <g
          stroke={BRAND.white}
          strokeWidth="0.8"
          strokeOpacity="0.2"
        >
          <path d="M160 100v16M152 108h16" />
          <path d="M800 440v16M792 448h16" />
          <path d="M480 70v12M474 76h12" />
        </g>
      </svg>
    </div>
  );
}

/* ==========================================
   FINAL CTA SECTION
========================================== */

export function FinalCtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Event Participation and Registration"
      className="relative overflow-hidden border-b border-[#111111]/10 bg-white py-14 selection:bg-[#BE202B] selection:text-white sm:py-16 lg:py-[76px]"
    >
      <Container className="relative z-10">
        {/* MAIN PREMIUM CTA PANEL */}
        <motion.div
          variants={parentVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-50px",
          }}
          className="relative isolate overflow-hidden rounded-2xl bg-[#111111] px-6 py-9 text-white shadow-[0_18px_50px_rgba(17,17,17,0.14)] sm:px-9 sm:py-11 lg:px-12 lg:py-12"
        >
          <FinalCtaBackground />

          {/* Top brand accent — solid colors */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 flex h-[3px]"
          >
            <span className="w-[78%] bg-[#BE202B]" />
            <span className="w-[16%] bg-[#25B34B]" />
            <span className="flex-1 bg-white" />
          </div>

          {/* MAIN CONTENT */}
          <div className="relative z-10 grid items-center gap-9 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10">
            {/* LEFT CONTENT */}
            <div className="min-w-0">
              {/* Top micro-label */}
              <motion.div
                variants={revealVariants}
                className="flex items-center gap-3"
              >
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

                <span className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#F26B70] sm:text-[11px]">
                  {event.brandLines.main}
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h2
                variants={revealVariants}
                className="mt-5 max-w-[730px] text-[clamp(2rem,3.6vw,3.65rem)] font-black leading-[1.1] tracking-[-0.048em] text-white"
              >
                Shape East Africa&apos;s
                <span className="mt-1 block text-[#F26B70]">
                  Construction Future.
                </span>
              </motion.h2>

              {/* Animated editorial underline */}
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

              {/* Supporting description */}
              <motion.p
                variants={revealVariants}
                className="mt-5 max-w-[590px] text-[13px] leading-[1.8] text-white/65 sm:text-[14px]"
              >
                Join Kenya Buildcon 2027 to connect
                with industry buyers, contractors,
                developers and decision-makers
                across East Africa.
              </motion.p>

              {/* EVENT META */}
              <motion.div
                variants={revealVariants}
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-5"
              >
                <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold text-white/75">
                  <span className="text-[#F26B70]">
                    <CalendarIcon />
                  </span>

                  {event.dates.display}
                </span>

                <span
                  aria-hidden="true"
                  className="hidden h-4 w-px bg-white/20 sm:block"
                />

                <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold text-white/75">
                  <span className="text-[#25B34B]">
                    <PinIcon />
                  </span>

                  {event.venue.fullLocation}
                </span>
              </motion.div>
            </div>

            {/* RIGHT CTA AREA */}
            <motion.div
              variants={revealVariants}
              className="relative flex min-w-0 flex-col gap-3 border-t border-white/15 pt-7 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0"
            >
              <span className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.17em] text-white/50">
                Be Part of Buildcon 2027
              </span>

              {/* Primary button */}
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-[52px] w-full items-center justify-between gap-4 rounded-md border border-[#BE202B] bg-[#BE202B] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25] sm:px-6"
              >
                <span>Book a Stand</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              {/* Secondary button */}
              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-[52px] w-full items-center justify-between gap-4 rounded-md border border-white/25 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25B34B] hover:bg-[#25B34B] hover:text-white sm:px-6"
              >
                <span>Register to Visit</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>

              {/* Bottom microcopy */}
              <p className="mt-2 text-[11px] leading-[1.6] text-white/45">
                Connect. Discover. Build new business
                opportunities.
              </p>
            </motion.div>
          </div>

          {/* Bottom architectural signature */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-28 bg-[#BE202B]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-28 h-[3px] w-12 bg-[#25B34B]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
