"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { marketFacts, opportunityCategories, type MarketFact } from "@/data/marketFacts";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const numericMatch = value.match(/[\d,.]+/);
  const rawNumber = numericMatch ? numericMatch[0] : "0";
  const cleanNumber = parseFloat(rawNumber.replace(/,/g, ""));
  // Keep the source's precision and grouping ("6.7%" -> 1 dp, "2030" -> no comma, "9,500" -> grouped)
  const decimals = (rawNumber.split(".")[1] ?? "").length;
  const useGrouping = rawNumber.includes(",");

  const prefix = value.split(/[\d,.]+/)[0] || "";
  const suffix = value.split(/[\d,.]+/)[1] || "";

  const spring = useSpring(0, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.01,
  });

  const displayValue = useTransform(spring, (latest) => {
    const formatted = latest.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    });
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(cleanNumber);
    }
  }, [isInView, spring, cleanNumber]);

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? <motion.span>{displayValue}</motion.span> : `${prefix}0${suffix}`}
    </span>
  );
}

export function WhyKenyaSection() {
  return (
    <section className="relative overflow-hidden bg-[#071118] py-14 sm:py-18 text-white selection:bg-brand-red selection:text-white border-b border-white/10">
      
      {/* ========================================================================= */}
      {/* OFFICIAL BUILDCON THEME VECTOR (EXACT MATCH TO GUIDELINE IMAGE)           */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute -right-[15%] md:-right-[8%] lg:-right-[4%] top-1/2 -translate-y-1/2 z-0 h-[650px] w-[650px] sm:h-[780px] sm:w-[780px] select-none opacity-30 md:opacity-45">
        <svg
          viewBox="0 0 800 800"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Backlit Glow */}
          <circle cx="400" cy="400" r="260" fill="#c8262d" opacity="0.08" filter="blur(60px)" />
          <circle cx="400" cy="400" r="190" fill="#25b34b" opacity="0.06" filter="blur(50px)" />

          {/* Outer Curved Orbit Tracking Lines & Nodes (Slow Linear Rotation) */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "400px 400px" }}
          >
            {/* Outer Orbit Line 1 */}
            <path
              d="M180,210 A320,320 0 0,1 620,210"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.2"
              strokeWidth="1.2"
            />
            {/* Orbit Node Dot 1 */}
            <circle cx="280" cy="140" r="6" fill="#c8262d" />
            <circle cx="580" cy="170" r="8" fill="#ffffff" />

            {/* Orbit Line 2 */}
            <path
              d="M130,340 A320,320 0 0,1 360,90"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <circle cx="160" cy="270" r="9" fill="#ffffff" />
            <circle cx="165" cy="400" r="8" fill="#c8262d" />

            {/* Bottom-Right Orbit Lines & Nodes */}
            <path
              d="M480,680 A320,320 0 0,0 710,510"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
            <circle cx="560" cy="620" r="8" fill="#25b34b" />
          </motion.g>

          {/* Top Primary Fan Wedge Sector (Official Brand Red) */}
          <motion.path
            d="M400,400 L275,100 A340,340 0 0,1 525,100 Z"
            fill="#c8262d"
            opacity="0.9"
            animate={{ scale: [1, 1.018, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "400px 400px" }}
          />

          {/* Right Sharp Vertical Triangle Sector (Official Brand Green) */}
          <motion.polygon
            points="465,370 655,80 655,470"
            fill="#25b34b"
            opacity="0.95"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            style={{ transformOrigin: "400px 400px" }}
          />

          {/* Bottom-Left Main Fan Wedge Sector (Official Brand Green) */}
          <motion.path
            d="M400,400 L95,475 A330,330 0 0,0 270,710 Z"
            fill="#25b34b"
            opacity="0.88"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: "400px 400px" }}
          />

          {/* Inner Nested Concentric Sector: Left (Secondary Emerald Green) */}
          <path
            d="M400,400 L210,340 A205,205 0 0,0 280,560 Z"
            fill="#1d9440"
            opacity="0.8"
          />

          {/* Inner Nested Concentric Sector: Right */}
          <path
            d="M400,400 L510,480 A205,205 0 0,1 465,565 Z"
            fill="#25b34b"
            opacity="0.85"
          />

          {/* Central Target Concentric White & Blue Track Rings */}
          <circle
            cx="400"
            cy="400"
            r="140"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <circle
            cx="400"
            cy="400"
            r="125"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
          />

          {/* Solid Center Core Circle Node (Pulsing Glow) */}
          <motion.circle
            cx="400"
            cy="400"
            r="105"
            fill="#c8262d"
            animate={{
              r: [105, 109, 105],
              fill: ["#c8262d", "#a51e24", "#c8262d"],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Blueprint Grid Texture Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* Balanced Top Header: Left (Titles) & Right (CTA Button)   */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-7 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            {/* Live Context Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200">
                Strategic Market Overview
              </span>
            </div>

            {/* Section Main Title */}
            <h2 className="mt-3.5 text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-[-0.03em] leading-[1.12] text-white">
              Kenya — East Africa&apos;s Construction{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green">
                Hub
              </span>
            </h2>

            {/* Crisp Description */}
            <p className="mt-2.5 text-xs sm:text-sm leading-[1.65] tracking-wide text-slate-300 font-normal">
              Government investment in infrastructure, a rapidly urbanising population and Vision 2030 flagship projects are driving demand for building materials, machinery, and construction technology.
            </p>
          </div>

          {/* Top-Right Action Button */}
          <div className="shrink-0">
            <Button
              href="/why-kenya"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-brand-red/60 hover:bg-white/[0.12] hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/20"
            >
              Explore Full Market Report →
            </Button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Compact Market Facts Grid                                 */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {marketFacts.map((fact: MarketFact) => (
            <motion.div
              key={fact.id}
              variants={itemVariants}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#071118]/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-brand-red/40 hover:bg-[#071118]/90 hover:shadow-xl hover:shadow-black/30"
            >
              <div>
                {/* Header Period Pill & Line Icon */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-red-light">
                    {fact.period || "Official Metric"}
                  </span>
                  
                  <svg
                    className="h-4 w-4 text-slate-400 transition-colors duration-300 group-hover:text-brand-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                {/* Animated Dynamic Metric */}
                <div className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
                  <AnimatedCounter value={fact.value} />
                </div>

                {/* Metric Title Label */}
                <h3 className="mt-1 text-xs sm:text-sm font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-red-light to-red-200">
                  {fact.label}
                </h3>

                {/* Brief Narrative Detail */}
                {fact.detail && (
                  <p className="mt-2 text-[11px] sm:text-xs leading-[1.55] tracking-normal text-slate-300 font-normal line-clamp-2">
                    {fact.detail}
                  </p>
                )}
              </div>

              {/* Verified Source Line */}
              <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate pr-2 font-medium">
                  {fact.sourceUrl ? (
                    <a
                      href={fact.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brand-red-light underline decoration-white/20 underline-offset-2"
                    >
                      {fact.sourceName}
                    </a>
                  ) : (
                    fact.sourceName
                  )}
                </span>
                <span className="shrink-0 text-[9px] text-slate-400 font-medium">
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      {/* ========================================================= */}
{/* High-Growth Sectors Smooth Marquee Strip                   */}
{/* ========================================================= */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="relative mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] py-3.5 backdrop-blur-xl"
>
  {/* Side Fade Masks for ultra-clean edge fade */}
  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#071118] to-transparent sm:w-28" />
  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#071118] to-transparent sm:w-28" />

  <div className="flex items-center">
    {/* Left Fixed Label */}
    <div className="relative z-20 flex shrink-0 items-center gap-2 border-r border-white/10 bg-[#071118]/90 py-1 pl-4 pr-5 shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
      </span>
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-300 sm:text-[11px]">
        Key Focus Areas
      </span>
    </div>

    {/* Seamless Infinite Looping Track */}
    <div className="flex select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
        className="flex shrink-0 items-center gap-6 pr-6"
      >
        {/* Array duplicate kiya hai infinite continuous loop ke liye */}
        {[...opportunityCategories, ...opportunityCategories].map((cat: string, index: number) => (
          <div
            key={`${cat}-${index}`}
            className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-300/90 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green/80" />
            <span>{cat}</span>
            <span className="ml-4 text-white/20">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
</motion.div>
      </Container>
    </section>
  );
}