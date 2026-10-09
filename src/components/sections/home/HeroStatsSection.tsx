
"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { showStats } from "@/data/previousEdition";

/* ==========================================
   BRAND SETTINGS
========================================== */

const RED = "#BE202B";
const GREEN = "#25B34B";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================
   SMOOTH ANIMATED COUNTER
========================================== */


function AnimatedCounter({
  value,
  suffix = "",
  delay = 0,
  start,
}: {
  value: number;
  suffix?: string;
  delay?: number;
  start: boolean;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!start || !numberRef.current) return;

    const element = numberRef.current;
    const target = Number(value);

    if (!Number.isFinite(target)) return;

    let frameId = 0;
    let delayId: ReturnType<typeof setTimeout> | undefined;
    let startTime: number | null = null;

    const duration = 3000;

    // Start from zero
    element.textContent = "0";

    const updateCounter = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      // Smooth counting with visible progression
      const easedProgress =
        1 - Math.pow(1 - progress, 2);

      const currentValue = Math.floor(
        easedProgress * target
      );

      element.textContent =
        currentValue.toLocaleString("en-US");

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      } else {
        element.textContent =
          target.toLocaleString("en-US");
      }
    };

    delayId = setTimeout(() => {
      frameId = requestAnimationFrame(updateCounter);
    }, delay * 1000);

    return () => {
      if (delayId !== undefined) {
        clearTimeout(delayId);
      }

      cancelAnimationFrame(frameId);
    };
  }, [start, value, delay]);

  return (
    <span
      className="inline-flex items-baseline tabular-nums"
      aria-label={`${value.toLocaleString("en-US")}${suffix}`}
    >
      <span ref={numberRef} aria-hidden="true">
        0
      </span>

      {suffix && (
        <span aria-hidden="true">{suffix}</span>
      )}
    </span>
  );
}

/* ==========================================
   ANIMATED BACKGROUND
========================================== */

function StatsBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Animated wave lines */}
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: 4 }).map((_, index) => {
          const pathA = `M-100,${140 + index * 18} C270,${90 + index * 8} 580,${235 - index * 7} 900,${145 + index * 7} C1180,${95 + index * 8} 1410,${200 - index * 6} 1550,${145 + index * 6}`;

          const pathB = `M-100,${155 + index * 18} C290,${120 + index * 8} 610,${215 - index * 6} 930,${160 + index * 7} C1190,${120 + index * 8} 1410,${190 - index * 6} 1550,${160 + index * 6}`;

          return (
            <motion.path
              key={index}
              d={pathA}
              stroke={index % 2 === 0 ? RED : GREEN}
              strokeWidth="0.8"
              strokeOpacity="0.1"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [pathA, pathB, pathA],
                    }
              }
              transition={{
                duration: 18 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Top right decorative image */}
      <div
        className="absolute right-0 top-0 h-[85px] w-[85px] bg-contain bg-right-top bg-no-repeat opacity-80 sm:h-[115px] sm:w-[115px] lg:h-[155px] lg:w-[155px]"
        style={{
          backgroundImage:
            'url("/images/element/kb-rem.png")',
        }}
      />

      {/* Bottom left decorative image */}
      <div
        className="absolute bottom-0 left-0 h-[85px] w-[85px] bg-contain bg-left-bottom bg-no-repeat opacity-80 sm:h-[115px] sm:w-[115px] lg:h-[155px] lg:w-[155px]"
        style={{
          backgroundImage:
            'url("/images/element/bottom-left.png")',
        }}
      />
    </div>
  );
}

/* ==========================================
   MOTION VARIANTS
========================================== */

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

/* ==========================================
   SINGLE STAT ITEM
========================================== */

function StatItem({
  stat,
  index,
  start,
}: {
  stat: (typeof showStats)[number];
  index: number;
  start: boolean;
}) {
  return (
    <motion.div
      variants={statVariants}
      className="relative flex min-w-0 flex-col items-center justify-center px-3 py-5 text-center sm:px-5 sm:py-6"
    >
      {/* Divider */}
      {index > 0 && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-white/15 sm:block"
        />
      )}

      {/* Animated number */}
      <div className="text-[clamp(2.1rem,3.2vw,3.2rem)] font-black leading-none tracking-[-0.045em] text-white">
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          delay={index * 0.18}
          start={start}
        />
      </div>

      {/* Brand underline */}
      <span className="mt-3 h-[2px] w-7 bg-[#BE202B]" />

      {/* Stat label */}
      <p className="mt-3 max-w-[200px] text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.1em] text-white/65 sm:text-[11px]">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ==========================================
   MAIN HERO STATS SECTION
========================================== */

export function HeroStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Start counter as soon as 15% of section is visible.
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      aria-label="Previous edition exhibition statistics"
      className="relative isolate overflow-hidden border-y border-white/10 bg-[#111111] text-white"
    >
      <StatsBackground />

      {/* Top brand line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 flex h-[2px]"
      >
        <span className="w-[80%] bg-[#BE202B]" />
        <span className="w-[15%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
          className="flex flex-col items-center gap-1.5 pt-6 text-center sm:pt-7"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F26B70]">
            Previous Edition
          </span>

          <h2 className="text-[15px] font-bold tracking-[-0.015em] text-white sm:text-[17px]">
            Performance at a Glance
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={
            reduceMotion
              ? "visible"
              : isInView
                ? "visible"
                : "hidden"
          }
          className="mt-2 grid grid-cols-1 sm:grid-cols-3"
        >
          {showStats.map((stat, index) => (
            <StatItem
              key={`${stat.label}-${index}`}
              stat={stat}
              index={index}
              start={isInView}
            />
          ))}
        </motion.div>

        {/* Footer */}
        <div className="flex items-center justify-center border-t border-white/10 py-3.5">
          <span className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25B34B]" />
            Official Post Show Report
          </span>
        </div>
      </Container>

      {/* Bottom brand line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 flex h-[2px]"
      >
        <span className="w-[80%] bg-[#BE202B]" />
        <span className="w-[15%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>
    </section>
  );
}
