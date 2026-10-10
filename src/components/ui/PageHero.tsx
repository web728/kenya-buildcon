
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const BRAND = {
  red: "#BE202B",
  green: "#25B34B",
  black: "#111111",
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  title: string;
  highlightTitle?: string;
  intro?: string;
  badgeText?: string;
  image?: {
    src: string;
    alt: string;
  };
  children?: ReactNode;
}

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.095,
      delayChildren: 0.08,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: EASE,
    },
  },
};

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0116 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==========================================
   PREMIUM ARCHITECTURAL WIREFRAME
========================================== */

function ArchitecturalWireframe() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {/* Fine structural grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
          backgroundSize: "84px 84px",
        }}
      />

      <svg
        viewBox="0 0 1440 540"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Architectural perspective guides */}
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={`guide-${i}`}
            d={`M${130 + i * 210} 540 L${700 + i * 55} 0`}
            stroke={BRAND.white}
            strokeWidth="0.65"
            strokeOpacity="0.045"
          />
        ))}

        {/* Right side structural arcs */}
        <motion.g
          style={{
            transformOrigin: "1330px 260px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, 8, 0] }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[145, 210, 285, 365].map((r, index) => (
            <circle
              key={r}
              cx="1330"
              cy="260"
              r={r}
              stroke={
                index % 2 === 0
                  ? BRAND.red
                  : BRAND.white
              }
              strokeOpacity={
                index === 0 ? 0.3 : 0.11
              }
              strokeWidth="0.85"
              strokeDasharray={
                index % 2 === 0
                  ? "8 15"
                  : undefined
              }
            />
          ))}
        </motion.g>

        {/* Main architectural contour ribbons */}
        {Array.from({ length: 7 }).map((_, i) => {
          const a = `M-100 ${320 + i * 17} C220 ${
            255 + i * 10
          } 495 ${430 - i * 6} 785 ${
            320 + i * 8
          } S1140 ${250 + i * 8} 1540 ${
            320 + i * 8
          }`;

          const b = `M-100 ${333 + i * 17} C245 ${
            275 + i * 10
          } 510 ${410 - i * 6} 805 ${
            333 + i * 8
          } S1170 ${275 + i * 8} 1540 ${
            333 + i * 8
          }`;

          return (
            <motion.path
              key={`ribbon-${i}`}
              d={a}
              stroke={
                i % 3 === 0
                  ? BRAND.red
                  : i % 3 === 1
                    ? BRAND.green
                    : BRAND.white
              }
              strokeOpacity={
                i % 3 === 2 ? 0.085 : 0.18
              }
              strokeWidth={i % 3 === 0 ? 1.1 : 0.75}
              animate={
                reduceMotion
                  ? undefined
                  : { d: [a, b, a] }
              }
              transition={{
                duration: 24 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Technical node details */}
        <circle
          cx="1230"
          cy="145"
          r="4"
          fill={BRAND.green}
          fillOpacity="0.75"
        />
        <circle
          cx="1230"
          cy="145"
          r="13"
          stroke={BRAND.green}
          strokeOpacity="0.35"
        />
        <path
          d="M1230 145H1295M1230 145V80"
          stroke={BRAND.white}
          strokeOpacity="0.18"
          strokeDasharray="4 7"
        />
      </svg>

      {/* Structural edge markers */}
      <div className="absolute bottom-8 left-6 hidden h-9 w-9 border-b border-l border-[#BE202B]/70 sm:block lg:left-10" />
      <div className="absolute right-9 top-12 hidden h-2 w-2 rotate-45 bg-[#25B34B] lg:block" />
    </div>
  );
}

/* ==========================================
   MAIN PAGE HERO
========================================== */

export function PageHero({
  title,
  highlightTitle,
  intro,
  badgeText = `${event.shortName} ${event.edition} · ${event.dates.display}`,
  image,
  children,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  const imageSrc =
    image?.src ??
    "/images/home/kenya-buildcon-exhibition-hall.jpg";

  const imageAlt =
    image?.alt ??
    `${event.name} exhibition hall`;

  return (
    <section
      aria-label={title}
      className="relative isolate w-full overflow-hidden bg-[#111111] text-white selection:bg-[#BE202B] selection:text-white"
    >
      {/* PHOTOGRAPHIC FOUNDATION */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark cinematic treatment */}
        <div className="absolute inset-0 bg-[#111111]/75" />

        {/* Left contrast layer */}
        <div className="absolute inset-y-0 left-0 w-full bg-[#111111]/10 lg:w-[60%]" />
      </div>

      {/* ANIMATED WIREFRAME */}
      <ArchitecturalWireframe />

      <Container className="relative z-10">
        <motion.div
          variants={parentVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="grid min-h-[340px] items-center gap-7 pb-11 pt-[125px] sm:min-h-[390px] sm:pb-12 sm:pt-[140px] lg:min-h-[420px] lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 lg:pb-14 lg:pt-[145px]"
        >
          {/* LEFT TEXT */}
          <div className="max-w-[840px]">
            <motion.div
              variants={revealVariants}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-[#BE202B]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">
                {badgeText}
              </span>
            </motion.div>

            {/* STRONG HEADING */}
            <motion.h1
              variants={revealVariants}
              className="mt-5 max-w-[810px] text-[clamp(2.15rem,4.2vw,3.85rem)] font-extrabold leading-[1.12] tracking-[-0.042em] text-white"
            >
              <span className="block text-white">
                {title}
              </span>

              {highlightTitle && (
                <span className="mt-1 block text-[#E6E6E6]">
                  {highlightTitle}
                </span>
              )}
            </motion.h1>

            {/* BRAND RULE */}
            <motion.div
              variants={revealVariants}
              aria-hidden="true"
              className="mt-5 flex items-center gap-1.5"
            >
              <span className="h-[3px] w-12 bg-[#BE202B]" />
              <span className="h-[3px] w-5 bg-[#25B34B]" />
              <span className="h-[3px] w-3 bg-white/60" />
            </motion.div>

            {/* DESCRIPTION */}
            {intro && (
              <motion.p
                variants={revealVariants}
                className="mt-5 max-w-[650px] text-[13px] leading-[1.85] text-[#D5D5D5] sm:text-[14px] lg:text-[15px]"
              >
                {intro}
              </motion.p>
            )}

            {/* OPTIONAL CTAS */}
            {children && (
              <motion.div
                variants={revealVariants}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                {children}
              </motion.div>
            )}
          </div>

          {/* RIGHT EVENT INFO */}
          <motion.div
            variants={revealVariants}
            className="hidden self-end lg:block"
          >
            <div className="border-l-2 border-[#BE202B] pl-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#D7D7D7]">
                Kenya Buildcon
              </span>

              <span className="mt-2 block text-[16px] font-extrabold leading-[1.4] text-white">
                {event.dates.display}
              </span>

              <div className="mt-3 flex items-start gap-2 text-[#D4D4D4]">
                <span className="mt-0.5 text-[#25B34B]">
                  <LocationIcon />
                </span>

                <span className="text-[12px] leading-[1.7]">
                  {event.venue.name}
                  <span className="block">
                    {event.venue.city},{" "}
                    {event.venue.country}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* BOTTOM BRAND LINE */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 flex h-[3px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>
    </section>
  );
}
