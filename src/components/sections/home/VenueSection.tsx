
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
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================
   SCROLL ANIMATIONS
========================================== */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

/* ==========================================
   ICONS
========================================== */

function PinIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

/* ==========================================
   SUBTLE ANIMATED BACKGROUND
========================================== */

function VenueBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Very light architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <svg
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Right-side architectural rings */}
        <motion.g
          style={{
            transformOrigin: "1390px 120px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: 360 }
          }
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="1390"
            cy="120"
            r="180"
            stroke={BRAND.red}
            strokeOpacity="0.12"
            strokeDasharray="8 16"
          />
          <circle
            cx="1390"
            cy="120"
            r="260"
            stroke={BRAND.green}
            strokeOpacity="0.08"
          />
        </motion.g>

        {/* Gently moving linework */}
        {Array.from({ length: 5 }).map((_, i) => {
          const a = `M-100,${355 + i * 20} C270,${275 + i * 12} 570,${490 - i * 8} 920,${365 + i * 8} C1200,${290 + i * 8} 1420,${435 - i * 6} 1550,${355 + i * 6}`;

          const b = `M-100,${375 + i * 20} C290,${305 + i * 12} 600,${460 - i * 8} 940,${385 + i * 8} C1190,${315 + i * 8} 1420,${410 - i * 6} 1550,${375 + i * 6}`;

          return (
            <motion.path
              key={i}
              d={a}
              stroke={
                i % 3 === 0
                  ? BRAND.red
                  : i % 3 === 1
                    ? BRAND.green
                    : BRAND.black
              }
              strokeWidth="0.8"
              strokeOpacity="0.07"
              animate={
                reduceMotion
                  ? undefined
                  : { d: [a, b, a] }
              }
              transition={{
                duration: 19 + i * 2,
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
   VENUE SECTION
========================================== */

export function VenueSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="venue-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/10 bg-white py-12 text-[#111111] selection:bg-[#BE202B] selection:text-white sm:py-16 lg:py-[72px]"
    >
      <VenueBackground />

      <Container className="relative z-10">
        {/* SECTION LABEL */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 10 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            ease: EASE,
          }}
          className="mb-7 flex items-center justify-between gap-4 border-b border-[#111111]/10 pb-5"
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#BE202B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#BE202B]">
              Official Event Location
            </span>
          </div>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-[#777777] sm:block">
            Nairobi, Kenya / 2027
          </span>
        </motion.div>

        {/* MAIN GRID */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-50px",
          }}
          className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-7"
        >
          {/* LEFT SIDE */}
          <motion.div
            variants={itemVariants}
            className="flex min-w-0 flex-col justify-between rounded-xl border border-[#111111]/10 bg-white p-6 shadow-[0_10px_32px_rgba(17,17,17,0.035)] sm:p-7 lg:p-8"
          >
            <div>
              {/* Small label */}
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25B34B]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#777777]">
                  Nairobi&apos;s Exhibition Destination
                </span>
              </div>

              {/* Main heading */}
              <h2
                id="venue-heading"
                className="mt-4 text-[clamp(1.9rem,2.8vw,2.9rem)] font-black leading-[1.12] tracking-[-0.04em] text-[#111111]"
              >
                {event.venue.name}
              </h2>

              {/* Venue location */}
              <div className="mt-4 flex items-start gap-2 text-[#BE202B]">
                <PinIcon className="mt-0.5 h-[17px] w-[17px] shrink-0" />

                <span className="text-[13px] font-semibold leading-[1.55]">
                  {event.venue.district},{" "}
                  {event.venue.city},{" "}
                  {event.venue.country}
                </span>
              </div>

              {/* Subtle accent line */}
              <motion.div
                className="mt-5 flex h-[3px] w-24 origin-left overflow-hidden"
                initial={
                  reduceMotion
                    ? false
                    : { scaleX: 0 }
                }
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                }}
              >
                <span className="h-full w-[76%] bg-[#BE202B]" />
                <span className="h-full flex-1 bg-[#25B34B]" />
              </motion.div>

              {/* Short description */}
              <p className="mt-5 max-w-[460px] text-[13px] leading-[1.75] text-[#666666] sm:text-[14px]">
                Join the construction industry at{" "}
                <strong className="font-semibold text-[#111111]">
                  {event.venue.name}
                </strong>
                , Nairobi. Explore innovations, connect
                with suppliers and discover new
                business opportunities.
              </p>

              {/* Event info: two balanced rows */}
              <div className="mt-6 overflow-hidden rounded-lg border border-[#111111]/10 bg-[#FAFAFA]">
                <div className="flex items-center gap-3 border-b border-[#111111]/10 px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[#BE202B]">
                    <CalendarIcon />
                  </span>

                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888]">
                      Exhibition Dates
                    </span>

                    <span className="mt-0.5 block text-[13px] font-bold leading-[1.4] text-[#111111]">
                      {event.dates.display}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#25B34B]/[0.08] text-[#1D9440]">
                    <ClockIcon />
                  </span>

                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888]">
                      Opening Hours
                    </span>

                    <span className="mt-0.5 block text-[13px] font-bold leading-[1.4] text-[#111111]">
                      {event.dates.openingHours} daily
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/plan-your-visit"
                className="group inline-flex min-h-[44px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25]"
              >
                Plan Your Visit

                <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <a
                href={event.venue.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-[#111111]/15 bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#111111] transition-all duration-300 hover:border-[#BE202B] hover:text-[#BE202B]"
              >
                Directions

                <span className="text-[15px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: MAP */}
          <motion.div
            variants={itemVariants}
            className="relative min-w-0 overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-2 shadow-[0_10px_32px_rgba(17,17,17,0.04)]"
          >
            <div className="relative h-[330px] w-full overflow-hidden rounded-lg bg-[#F5F5F5] sm:h-[400px] lg:h-full lg:min-h-[420px]">
              <iframe
                title={`Map of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            {/* Actual map interaction is unobstructed */}
          </motion.div>
        </motion.div>

        {/* BOTTOM DETAIL */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/10 pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#888888]">
            Kenya Buildcon / Event Venue
          </span>

          <span className="text-[10px] font-bold tracking-[0.08em] text-[#BE202B]">
            09–11 JUNE 2027
          </span>
        </div>
      </Container>
    </section>
  );
}
