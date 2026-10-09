
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

const HERO_IMAGE = "/images/gallery/hero.jpg";

const ARCHITECTURE_IMAGE =
  "/images/home/hero-architecture.svg";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================
   PREMIUM ENTRANCE ANIMATIONS
========================================== */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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
      {/* Architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Soft accents */}
      <div className="absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-[#BE202B]/[0.035] blur-[85px]" />

      <div className="absolute -right-32 top-0 h-[320px] w-[320px] rounded-full bg-[#25B34B]/[0.035] blur-[90px]" />

      {/* Animated architectural elements */}
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

        {Array.from({ length: 5 }).map((_, i) => {
          const pathA = `M-100,${420 + i * 24} C250,${310 + i * 12} 600,${560 - i * 9} 940,${430 + i * 8} C1200,${320 + i * 10} 1420,${490 - i * 8} 1550,${420 + i * 8}`;

          const pathB = `M-100,${440 + i * 24} C270,${370 + i * 12} 580,${510 - i * 8} 950,${460 + i * 7} C1200,${380 + i * 9} 1420,${460 - i * 7} 1550,${450 + i * 8}`;

          return (
            <motion.path
              key={i}
              d={pathA}
              stroke={i % 2 === 0 ? RED : GREEN}
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
        className="absolute -bottom-6 -left-8 h-[180px] w-[240px] bg-contain bg-bottom bg-no-repeat opacity-[0.08] sm:h-[240px] sm:w-[320px] lg:h-[280px] lg:w-[380px]"
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
   COMPACT EVENT DETAILS
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

        <span className="mt-0.5 block text-[12px] font-extrabold leading-[1.35] tracking-[-0.01em] text-[#111111]">
          {title}
        </span>

        <span className="mt-0.5 block text-[10px] font-medium leading-[1.4] text-[#777777]">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

/* ==========================================
   COMPLETE PREMIUM HERO SECTION
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

      <Container className="relative z-10 w-full pb-7 pt-[calc(88px+env(safe-area-inset-top))] sm:pb-8 sm:pt-[calc(100px+env(safe-area-inset-top))] lg:pb-5 lg:pt-[calc(108px+env(safe-area-inset-top))]">
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="mx-auto grid w-full max-w-[1200px] items-center gap-7 lg:grid-cols-[1.06fr_0.94fr] lg:gap-9 xl:gap-12"
        >
          {/* ==================================
              LEFT PREMIUM CONTENT
          ================================== */}

          <div className="relative flex min-w-0 flex-col items-start">
            {/* Edition eyebrow */}
            <motion.div
              variants={itemVariants}
              className="mb-3 flex flex-wrap items-center gap-2.5"
            >
              <span className="h-[2px] w-6 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#BE202B]">
                {event.editionLabel}
              </span>

              <span className="h-1 w-1 rounded-full bg-[#111111]/25" />

              <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#777777]">
                {event.venue.city}, {event.venue.country}
              </span>
            </motion.div>

            {/* SEO-friendly heading */}
            <motion.div
              variants={itemVariants}
              className="w-full min-w-0"
            >
              <h1
                id="hero-title"
                className="flex w-full min-w-0 flex-col items-start text-left"
              >
                {/* Kenya Buildcon */}
                <span className="block max-w-full text-[clamp(1.9rem,3.15vw,3.35rem)] font-black leading-[1.1] tracking-[-0.045em] text-[#111111]">
                  {event.shortName}
                </span>

                {/* International Expo */}
                <span className="mt-1 block text-[clamp(1.45rem,2.25vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.025em] text-[#262626]">
                  International Expo
                </span>

                

              
{/* Premium compact event dates */}
<span className="mt-3 flex w-full flex-wrap items-center gap-4 sm:gap-5">
  {/* Event Dates */}
  <span
    className="
      inline-flex items-center
      text-[clamp(1.25rem,2vw,1.75rem)]
      font-extrabold
      leading-[1.25]
      tracking-[-0.025em]
      text-[#BE202B]
    "
  >
    {event.dates.display}
  </span>

  {/* Premium technical annotation */}
  <span
    aria-hidden="true"
    className="hidden items-center gap-3 sm:flex"
  >
    <span className="h-8 w-[2px] bg-[#25B34B]" />

    <span className="text-[9px] font-bold uppercase leading-[1.5] tracking-[0.08em] text-[#888888]">
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
                className="mt-3 flex h-[3px] w-28 overflow-hidden"
              >
                <span className="w-[74%] bg-[#BE202B]" />
                <span className="w-[18%] bg-[#25B34B]" />
                <span className="flex-1 bg-[#111111]" />
              </div>
            </motion.div>

            {/* Theme */}
            <motion.p
              variants={itemVariants}
              className="mt-2.5 text-[10px] font-extrabold uppercase leading-[1.5] tracking-[0.12em] text-[#BE202B] sm:text-[11px]"
            >
              {event.theme}
            </motion.p>

            {/* SEO-friendly description */}
            <motion.p
              variants={itemVariants}
              className="mt-2 max-w-[490px] text-[13px] font-medium leading-[1.65] tracking-[-0.005em] text-[#666666] sm:text-[14px]"
            >
              Explore building materials, construction
              technology and industry innovations at{" "}
              <strong className="font-semibold text-[#222222]">
                {event.name}
              </strong>
              . Connect with leading professionals
              and decision-makers in East Africa.
            </motion.p>

            {/* Event date and venue */}
            <motion.div
              variants={itemVariants}
              className="mt-3.5 grid w-full max-w-[520px] grid-cols-1 gap-3 rounded-xl border border-[#111111]/[0.08] bg-white/95 px-4 py-3.5 shadow-[0_8px_30px_rgba(17,17,17,0.04)] min-[420px]:grid-cols-2"
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

            {/* CTA buttons */}
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

            {/* Small bottom branding */}
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
              RIGHT PREMIUM IMAGE
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

              {/* Main image */}
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

                {/* Image index */}
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-white" />

                  <span className="text-[10px] font-bold tracking-[0.18em] text-white drop-shadow-md">
                    EXPO / {event.edition.slice(-2)}
                  </span>
                </div>

                {/* Image footer */}
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

              {/* Bottom accent lines */}
              <div
                aria-hidden="true"
                className="absolute -bottom-[8px] left-6 h-[3px] w-24 bg-[#BE202B]"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-[8px] left-[120px] h-[3px] w-10 bg-[#25B34B]"
              />

              {/* Side branding */}
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
