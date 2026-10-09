
"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/* ==========================================
   BRAND SETTINGS
========================================== */

const RED = "#BE202B";
const GREEN = "#25B34B";
const BLACK = "#111111";

const HERO_IMAGE = "/images/gallery/hero.jpg";

const ARCHITECTURE_IMAGE =
  "/images/home/hero-architecture.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================
   ENTRANCE ANIMATIONS
========================================== */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

/* ==========================================
   SUBTLE ANIMATED BACKGROUND
========================================== */

function HeroBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Subtle architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Soft radial accents */}
      <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#BE202B]/[0.035] blur-[85px]" />

      <div className="absolute -right-32 top-0 h-[350px] w-[350px] rounded-full bg-[#25B34B]/[0.035] blur-[90px]" />

      {/* Architectural rings */}
      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <circle
          cx="40"
          cy="640"
          r="210"
          stroke={RED}
          strokeWidth="0.8"
          strokeOpacity="0.12"
          strokeDasharray="6 12"
        />

        <circle
          cx="40"
          cy="640"
          r="315"
          stroke={GREEN}
          strokeWidth="0.8"
          strokeOpacity="0.09"
        />

        <circle
          cx="1390"
          cy="60"
          r="260"
          stroke={RED}
          strokeWidth="0.8"
          strokeOpacity="0.1"
        />

        {/* Moving architectural waves */}
        {Array.from({ length: 5 }).map((_, i) => {
          const pathA = `M-100,${420 + i * 24} C250,${310 + i * 12} 600,${560 - i * 9} 940,${430 + i * 8} C1200,${320 + i * 10} 1420,${490 - i * 8} 1550,${420 + i * 8}`;

          const pathB = `M-100,${440 + i * 24} C270,${370 + i * 12} 580,${510 - i * 8} 950,${460 + i * 7} C1200,${380 + i * 9} 1420,${460 - i * 7} 1550,${450 + i * 8}`;

          return (
            <motion.path
              key={i}
              d={pathA}
              stroke={
                i % 2 === 0 ? RED : GREEN
              }
              strokeWidth="0.8"
              strokeOpacity="0.075"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [pathA, pathB, pathA],
                    }
              }
              transition={{
                duration: 18 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Bottom left decoration */}
      <motion.div
        className="absolute -bottom-6 -left-8 h-[180px] w-[240px] bg-contain bg-bottom bg-no-repeat opacity-[0.08] sm:h-[260px] sm:w-[340px] lg:h-[300px] lg:w-[400px]"
        style={{
          backgroundImage: `url("${ARCHITECTURE_IMAGE}")`,
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -8, 0],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* ==========================================
   COMPACT EVENT DETAIL
========================================== */

function DetailItem({
  type,
  label,
  title,
  subtitle,
}: {
  type: "date" | "venue";
  label: string;
  title: string;
  subtitle: string;
}) {
  const isDate = type === "date";

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isDate
            ? "bg-[#BE202B]/[0.07] text-[#BE202B]"
            : "bg-[#25B34B]/[0.08] text-[#1D9440]"
        }`}
      >
        {isDate ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="16"
              rx="2"
            />
            <path d="M7 3v4M17 3v4M3 10h18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        )}
      </div>

      <div className="min-w-0">
        <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-[#888888]">
          {label}
        </span>

        <span className="mt-0.5 block text-[12px] font-extrabold leading-[1.3] text-[#111111]">
          {title}
        </span>

        <span className="mt-0.5 block text-[10px] font-medium text-[#777777]">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

/* ==========================================
   COMPACT PREMIUM HERO SECTION
========================================== */

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-white text-[#111111] selection:bg-[#BE202B] selection:text-white"
    >
      <HeroBackground />

      {/* Side red accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-[25%] left-0 hidden h-24 w-[3px] bg-[#BE202B] lg:block"
      />

      <Container className="relative z-10 w-full pb-7 pt-[calc(92px+env(safe-area-inset-top))] sm:pb-9 sm:pt-[calc(105px+env(safe-area-inset-top))] lg:pb-5 lg:pt-[calc(112px+env(safe-area-inset-top))]">
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="mx-auto grid w-full max-w-[1200px] items-center gap-7 lg:grid-cols-[1.06fr_0.94fr] lg:gap-9 xl:gap-12"
        >
          {/* ==================================
              LEFT CONTENT
          ================================== */}

          <div className="relative flex min-w-0 flex-col items-start">
            {/* Edition eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-3 flex flex-wrap items-center gap-2.5"
            >
              <span className="h-[2px] w-6 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#BE202B]">
                {event.editionLabel}
              </span>

              <span className="h-1 w-1 rounded-full bg-[#111111]/25" />

              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777777]">
                {event.venue.city}, {event.venue.country}
              </span>
            </motion.div>

            {/* Main SEO heading */}
            <motion.div
              variants={itemVariants}
              className="w-full min-w-0"
            >
              <h1
                id="hero-title"
                className="flex flex-col items-start"
              >
                <span className="block text-[clamp(2.15rem,3.65vw,3.9rem)] font-black leading-[1.06] tracking-[-0.055em] text-[#111111]">
                  {event.shortName}
                </span>

                <span className="mt-1.5 block text-[clamp(1.5rem,2.45vw,2.65rem)] font-bold leading-[1.13] tracking-[-0.035em] text-[#272727]">
                  International Expo
                </span>

                {/* Compact year */}
                <span className="mt-1.5 flex items-end gap-5">
                  <span className="block text-[clamp(4rem,6.4vw,6.5rem)] font-black leading-[0.95] tracking-[-0.08em] text-[#BE202B]">
                    {event.edition}
                  </span>

                  <span
                    aria-hidden="true"
                    className="mb-2 hidden items-center gap-2.5 sm:flex"
                  >
                    <span className="h-10 w-[2px] bg-[#25B34B]" />

                    <span className="text-[9px] font-extrabold uppercase leading-[1.5] tracking-[0.09em] text-[#888888]">
                      Building
                      <br />
                      Construction
                      <br />
                      Innovation
                    </span>
                  </span>
                </span>
              </h1>

              {/* Brand underline */}
              <div
                aria-hidden="true"
                className="mt-3 flex h-[3px] w-32 overflow-hidden"
              >
                <span className="w-[75%] bg-[#BE202B]" />
                <span className="w-[18%] bg-[#25B34B]" />
                <span className="flex-1 bg-[#111111]" />
              </div>
            </motion.div>

            {/* Theme */}
            <motion.p
              variants={itemVariants}
              className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#BE202B] sm:text-[11px]"
            >
              {event.theme}
            </motion.p>

            {/* Compact description */}
            <motion.p
              variants={itemVariants}
              className="mt-2.5 max-w-[490px] text-[13px] font-medium leading-[1.65] text-[#666666] sm:text-[14px]"
            >
              Explore building materials, construction
              technology and industry innovations at{" "}
              <strong className="font-semibold text-[#222222]">
                {event.name}
              </strong>
              . Connect with leading professionals
              and decision-makers in East Africa.
            </motion.p>

            {/* Compact date and venue card */}
            <motion.div
              variants={itemVariants}
              className="mt-4 grid w-full max-w-[520px] grid-cols-1 gap-3 rounded-xl border border-[#111111]/[0.08] bg-white/95 px-4 py-3.5 shadow-[0_8px_30px_rgba(17,17,17,0.04)] min-[420px]:grid-cols-2"
            >
              <DetailItem
                type="date"
                label="Event Dates"
                title={event.dates.display}
                subtitle={event.dates.openingHours}
              />

              <DetailItem
                type="venue"
                label="Event Venue"
                title={event.venue.name}
                subtitle={`${event.venue.district}, ${event.venue.city}`}
              />
            </motion.div>

            {/* Compact CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-4 flex w-full flex-wrap items-center gap-3"
            >
              <Button
                href={event.cta.bookStand}
                className="group inline-flex min-h-[44px] items-center justify-center gap-4 rounded-md border border-[#BE202B] !bg-[#BE202B] px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.07em] !text-white shadow-[0_7px_18px_rgba(190,32,43,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:!bg-[#991B24] hover:shadow-[0_11px_25px_rgba(190,32,43,0.22)]"
              >
                Book a Stand

                <span
                  aria-hidden="true"
                  className="text-[16px] transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </Button>

              <Button
                href={event.cta.registerVisit}
                variant="secondary"
                className="group inline-flex min-h-[44px] items-center justify-center gap-4 rounded-md border border-[#111111]/20 !bg-white px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.07em] !text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#111111] hover:!bg-[#111111] hover:!text-white"
              >
                Register to Visit

                <span
                  aria-hidden="true"
                  className="text-[16px] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Button>
            </motion.div>

            {/* Small branding */}
            <motion.div
              variants={itemVariants}
              className="mt-3 flex flex-wrap items-center gap-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#25B34B]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#888888]">
                {event.format}
              </span>

              <span className="h-px w-5 bg-[#111111]/15" />

              <span className="text-[9px] font-bold tracking-[0.12em] text-[#BE202B]">
                KE / {event.edition}
              </span>
            </motion.div>
          </div>

          {/* ==================================
              RIGHT IMAGE - PREMIUM PRESERVED
          ================================== */}

          <motion.div
            variants={itemVariants}
            className="relative min-w-0"
          >
            <div className="relative mx-auto w-full max-w-[530px] lg:max-w-none">
              {/* Floating image label */}
              <div className="absolute -top-4 right-4 z-20 flex items-center gap-2 border border-[#111111]/10 bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(17,17,17,0.08)] sm:right-6">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-[#25B34B]/35"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.8, 1],
                            opacity: [0.7, 0, 0.7],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  />

                  <span className="relative h-2 w-2 rounded-full bg-[#25B34B]" />
                </span>

                <span className="text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#111111] sm:text-[10px]">
                  {event.industry}
                </span>
              </div>

              {/* Photo frame */}
              <div className="relative aspect-[1.45/1] overflow-hidden rounded-lg bg-[#111111] shadow-[0_18px_50px_rgba(17,17,17,0.15)] lg:aspect-auto lg:h-[min(61svh,540px)] lg:min-h-[350px]">
                <motion.div
                  className="absolute inset-0"
                  initial={
                    reduceMotion
                      ? false
                      : { scale: 1.045 }
                  }
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 1.7,
                    ease: EASE,
                  }}
                >
                  <Image
                    src={HERO_IMAGE}
                    alt={`${event.name} building and construction exhibition at ${event.venue.name}, ${event.venue.city}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                    style={{
                      objectPosition: "center 45%",
                    }}
                  />
                </motion.div>

                {/* Image tint */}
                <div className="pointer-events-none absolute inset-0 bg-[#111111]/[0.08]" />

                {/* Top image index */}
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-white" />

                  <span className="text-[10px] font-bold tracking-[0.18em] text-white drop-shadow-md">
                    EXPO / {event.edition.slice(-2)}
                  </span>
                </div>

                {/* Bottom photo caption */}
                <div className="absolute inset-x-0 bottom-0 bg-[#111111]/95 px-5 py-3.5 backdrop-blur-sm sm:px-6 sm:py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">
                        The Industry Meets Here
                      </p>

                      <p className="mt-1 text-[15px] font-bold tracking-[-0.025em] text-white sm:text-[17px]">
                        {event.venue.city}, {event.venue.country}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="h-8 w-px bg-white/20" />

                      <span className="text-[22px] font-black tracking-[-0.06em] text-white">
                        {event.edition.slice(-2)}
                        <span className="text-[#F26B70]">
                          .
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom decorative lines */}
              <div
                aria-hidden="true"
                className="absolute -bottom-[8px] left-6 h-[3px] w-24 bg-[#BE202B]"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-[8px] left-[120px] h-[3px] w-10 bg-[#25B34B]"
              />

              {/* Vertical branding */}
              <div
                aria-hidden="true"
                className="absolute -left-7 bottom-8 hidden flex-col items-center gap-2 xl:flex"
              >
                <span className="h-9 w-px bg-[#BE202B]" />

                <span className="text-[9px] font-black tracking-[0.12em] text-[#111111]/40 [writing-mode:vertical-rl]">
                  BUILDCON / {event.edition}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom brand line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 flex h-[3px]"
      >
        <div className="w-[82%] bg-[#BE202B]" />
        <div className="w-[13%] bg-[#25B34B]" />
        <div className="flex-1 bg-[#111111]" />
      </div>
    </section>
  );
}
