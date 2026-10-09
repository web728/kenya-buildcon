"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

import {
  marketFacts,
  opportunityCategories,
  type MarketFact,
} from "@/data/marketFacts";

/* ==========================================
   KENYA BUILDCON BRAND
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
      staggerChildren: 0.1,
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

/* ==========================================
   SCROLL ANIMATED COUNTER
========================================== */

function AnimatedCounter({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -5% 0px",
  });

  const reduceMotion = useReducedMotion();

  const match = value.match(/-?\d[\d,]*(?:\.\d+)?/);
  const numberText = match?.[0] ?? "";
  const numericValue = Number(numberText.replace(/,/g, ""));

  const validNumber = numberText !== "" && Number.isFinite(numericValue);

  const decimals = numberText.split(".")[1]?.length ?? 0;

  const grouping = numberText.includes(",");

  const prefix = match ? value.slice(0, match.index ?? 0) : "";

  const suffix = match
    ? value.slice((match.index ?? 0) + numberText.length)
    : "";

  const formatNumber = (number: number) => {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouping,
    });
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !validNumber) return;

    if (reduceMotion) {
      setCount(numericValue);
      return;
    }

    const controls = animate(0, numericValue, {
      duration: 2.1,
      delay,
      ease: EASE,

      onUpdate(latest) {
        setCount(latest);
      },

      onComplete() {
        setCount(numericValue);
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue, validNumber, delay, reduceMotion]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {validNumber ? `${prefix}${formatNumber(count)}${suffix}` : value}
    </span>
  );
}

/* ==========================================
   ANIMATED ARCHITECTURAL BACKGROUND
========================================== */

function MarketBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Fine architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      {/* Background vector */}
      <div className="absolute -right-[230px] top-[2%] h-[540px] w-[540px] opacity-[0.22] sm:-right-[160px] sm:h-[650px] sm:w-[650px] lg:-right-[170px] lg:top-[8%] lg:h-[760px] lg:w-[760px] lg:opacity-[0.3]">
        <svg viewBox="0 0 800 800" fill="none" className="h-full w-full">
          {/* Outer rotating tracking rings */}
          <motion.g
            style={{
              transformOrigin: "400px 400px",
            }}
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 95,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <circle
              cx="400"
              cy="400"
              r="345"
              stroke={BRAND.white}
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="8 16"
            />

            <circle
              cx="400"
              cy="400"
              r="312"
              stroke={BRAND.red}
              strokeOpacity="0.6"
              strokeWidth="1.2"
              strokeDasharray="70 24 15 30"
            />

            <circle cx="400" cy="55" r="6" fill={BRAND.red} />

            <circle cx="710" cy="400" r="5" fill={BRAND.green} />
          </motion.g>

          {/* Reverse rotation */}
          <motion.g
            style={{
              transformOrigin: "400px 400px",
            }}
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{
              duration: 125,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <circle
              cx="400"
              cy="400"
              r="270"
              stroke={BRAND.white}
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="5 13"
            />

            <circle cx="400" cy="130" r="7" fill={BRAND.white} />

            <circle cx="400" cy="670" r="5" fill={BRAND.green} />
          </motion.g>

          {/* Original construction-inspired sectors */}
          <motion.g
            style={{
              transformOrigin: "400px 400px",
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: [1, 1.018, 1],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M400 400L275 100A340 340 0 0 1 525 100Z"
              fill={BRAND.red}
              fillOpacity="0.85"
            />

            <path
              d="M465 370L655 80L655 470Z"
              fill={BRAND.green}
              fillOpacity="0.9"
            />

            <path
              d="M400 400L95 475A330 330 0 0 0 270 710Z"
              fill={BRAND.green}
              fillOpacity="0.78"
            />

            <path
              d="M400 400L210 340A205 205 0 0 0 280 560Z"
              fill={BRAND.darkGreen}
              fillOpacity="0.9"
            />

            <path
              d="M400 400L510 480A205 205 0 0 1 465 565Z"
              fill={BRAND.green}
              fillOpacity="0.85"
            />
          </motion.g>

          {/* Centre rings */}
          <circle
            cx="400"
            cy="400"
            r="148"
            stroke={BRAND.white}
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />

          <circle
            cx="400"
            cy="400"
            r="127"
            stroke={BRAND.white}
            strokeOpacity="0.8"
            strokeWidth="2.5"
          />

          {/* Animated centre */}
          <motion.circle
            cx="400"
            cy="400"
            r="104"
            fill={BRAND.red}
            animate={
              reduceMotion
                ? undefined
                : {
                    r: [104, 109, 104],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Centre detailing */}
          <circle
            cx="400"
            cy="400"
            r="78"
            stroke={BRAND.white}
            strokeOpacity="0.25"
          />

          <circle cx="400" cy="400" r="5" fill={BRAND.white} />
        </svg>
      </div>

      {/* Continuous fine flowing lines */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: 7 }).map((_, i) => {
          const pathA = `M-100,${610 + i * 18} C250,${500 + i * 12} 560,${750 - i * 7} 900,${590 + i * 8} C1180,${480 + i * 9} 1400,${680 - i * 7} 1550,${590 + i * 7}`;

          const pathB = `M-100,${630 + i * 18} C280,${540 + i * 10} 580,${710 - i * 6} 930,${615 + i * 7} C1200,${520 + i * 7} 1410,${650 - i * 6} 1550,${610 + i * 6}`;

          return (
            <motion.path
              key={i}
              d={pathA}
              stroke={
                i % 3 === 0
                  ? BRAND.red
                  : i % 3 === 1
                    ? BRAND.green
                    : BRAND.white
              }
              strokeWidth="0.8"
              strokeOpacity={i % 3 === 2 ? 0.05 : 0.12}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [pathA, pathB, pathA],
                    }
              }
              transition={{
                duration: 19 + i * 1.7,
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
   PREMIUM MARKET FACT CARD
========================================== */

function MarketFactCard({ fact, index }: { fact: MarketFact; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={itemVariants}
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
      className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-white/[0.12] bg-[#1B1B1B]/95 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:border-[#BE202B]/55 hover:bg-[#202020] sm:p-6"
    >
      {/* Small top accent */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-14 bg-[#BE202B]"
      />

      <div>
        {/* CARD TOP */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div className="min-w-0">
            <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#F26B70]">
              Market Indicator
            </span>

            <span className="mt-1 block text-[11px] font-semibold leading-[1.45] tracking-[0.02em] text-white/55">
              {fact.period || "Official Metric"}
            </span>
          </div>

          <span className="text-[11px] font-bold tracking-[0.1em] text-white/35">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ANIMATED METRIC */}
        <div className="mt-5 text-[clamp(2rem,3vw,3.35rem)] font-black leading-[1.05] tracking-[-0.052em] text-white">
          <AnimatedCounter value={fact.value} delay={index * 0.1} />
        </div>

        {/* METRIC HEADING */}
        <h3 className="mt-3 text-[14px] font-bold leading-[1.4] tracking-[-0.015em] text-[#F26B70] sm:text-[15px]">
          {fact.label}
        </h3>

        {/* DESCRIPTION */}
        {fact.detail && (
          <p className="mt-3 text-[12px] font-normal leading-[1.75] tracking-[-0.005em] text-white/65 sm:text-[13px]">
            {fact.detail}
          </p>
        )}
      </div>

      {/* SOURCE FOOTER */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="min-w-0">
          <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
            Data Source
          </span>

          {fact.sourceUrl ? (
            <a
              href={fact.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate text-[11px] font-semibold text-white/75 underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:text-[#F26B70]"
              title={fact.sourceName}
            >
              {fact.sourceName}
            </a>
          ) : (
            <span
              className="block truncate text-[11px] font-semibold text-white/75"
              title={fact.sourceName}
            >
              {fact.sourceName}
            </span>
          )}
        </div>

        {/* SOURCE MARKER */}
        <span className="flex shrink-0 items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25B34B]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.07em] text-white/45">
            Source
          </span>
        </span>
      </div>

      {/* Bottom hover line */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#25B34B] transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  );
}

/* ==========================================
   INFINITE FOCUS SECTORS MARQUEE
========================================== */

function FocusSectorsMarquee() {
  const reduceMotion = useReducedMotion();

  const categories = opportunityCategories;

  return (
    <div className="relative mt-9 overflow-hidden rounded-lg border border-white/[0.12] bg-[#1B1B1B]">
      <div className="flex flex-col sm:flex-row sm:items-center">
        {/* FIXED LABEL */}
     
        {/* MARQUEE VIEWPORT */}
        <div className="min-w-0 flex-1 overflow-hidden py-4 sm:py-5">
          {categories.length > 0 && (
            <motion.div
              className="flex w-max items-center"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: ["0%", "-50%"],
                    }
              }
              transition={{
                duration: 32,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center"
                  aria-hidden={copy === 1}
                >
                  {categories.map((category, index) => (
                    <div
                      key={`${copy}-${index}`}
                      className="flex shrink-0 items-center gap-4 pl-7"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#25B34B]" />

                      <span className="whitespace-nowrap text-[12px] font-semibold tracking-[0.025em] text-white/75">
                        {category}
                      </span>

                      <span className="text-white/25">/</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   WHY KENYA SECTION
========================================== */

export function WhyKenyaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-kenya-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#111111] py-16 text-white selection:bg-[#BE202B] selection:text-white sm:py-20 lg:py-24"
    >
      <MarketBackground />

      {/* TOP BRAND DETAIL */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 flex h-[3px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>

      <Container className="relative z-10 w-full">
        {/* ==================================
            SECTION HEADER
        ================================== */}

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-70px",
          }}
          className="flex flex-col justify-between gap-7 border-b border-white/15 pb-9 lg:flex-row lg:items-end"
        >
          {/* HEADING */}
          <motion.div variants={itemVariants} className="max-w-[780px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#BE202B]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F26B70] sm:text-[11px]">
                Strategic Market Overview
              </span>
            </div>

            <h2
              id="why-kenya-heading"
              className="text-[clamp(2rem,3.8vw,3.8rem)] font-black leading-[1.1] tracking-[-0.045em] text-white"
            >
              Kenya — East Africa&apos;s
              <span className="mt-1 block">
                Construction <span className="text-[#F26B70]">Hub.</span>
              </span>
            </h2>

            {/* Small brand line */}
            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-28 origin-left overflow-hidden"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: EASE,
              }}
            >
              <span className="h-full w-[75%] bg-[#BE202B]" />
              <span className="h-full flex-1 bg-[#25B34B]" />
            </motion.div>

            <p className="mt-6 max-w-[680px] text-[14px] font-normal leading-[1.8] tracking-[-0.006em] text-white/65 sm:text-[15px]">
              Government investment in infrastructure, a rapidly urbanising
              population and Vision 2030 flagship projects are driving demand
              for building materials, machinery, and construction technology.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="shrink-0">
            <Button
              href="/why-kenya"
              className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-md border border-white/25 !bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] !text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BE202B] hover:!bg-[#BE202B] hover:!text-white"
            >
              Explore Full Market Report
              <span
                aria-hidden="true"
                className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* ==================================
            SECTION MICRO LABEL
        ================================== */}

        <div className="mb-5 mt-8 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
            Market Intelligence
          </span>

          <span className="text-[10px] font-semibold tracking-[0.1em] text-[#F26B70]">
            KE / CONSTRUCTION
          </span>
        </div>

        {/* ==================================
            MARKET FACTS GRID
        ================================== */}

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {marketFacts.map((fact: MarketFact, index: number) => (
            <MarketFactCard key={fact.id} fact={fact} index={index} />
          ))}
        </motion.div>

        {/* ==================================
            ANIMATED FOCUS SECTOR MARQUEE
        ================================== */}

        {/* <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
        >
          <FocusSectorsMarquee />
        </motion.div> */}

        {/* BOTTOM MICRO BRANDING */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/40">
            Kenya Buildcon International Expo
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25B34B]" />

            <span className="text-[10px] font-bold tracking-[0.1em] text-white/60">
              Nairobi, Kenya · 2027
            </span>
          </span>
        </div>
      </Container>

      {/* BOTTOM BRAND LINE */}
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
