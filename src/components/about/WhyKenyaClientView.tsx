"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { marketFacts, marketSources, opportunityCategories } from "@/data/marketFacts";

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
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Strategic growth pillars (Kenya Buildcon 2027 brochure; figures verified against KNBS)
const STRATEGIC_PILLARS = [
  {
    tag: "6.7% Growth · Q3 2025",
    title: "Construction Sector Rebound",
    body: "Kenya's construction sector grew 6.7% in the third quarter of 2025 (KNBS), driven by government investment in infrastructure and housing, higher cement consumption, and the resumption of road projects.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    tag: "East African Community",
    title: "Gateway to a Regional Market",
    body: "Positioned within the East African Community, Kenya offers direct access to the wider regional market — making Nairobi a strategic base for businesses expanding their footprint in East Africa's construction landscape.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    tag: "Vision 2030",
    title: "Flagship Infrastructure Projects",
    body: "Kenya's Vision 2030 blueprint includes ambitious projects like the Nairobi Expressway and Konza Technopolis, highlighting the country's commitment to modernising infrastructure and expanding urban development.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    tag: "Rapid Urbanisation",
    title: "Soaring Demand for New Space",
    body: "A rapidly urbanising population is driving demand for residential, commercial, and industrial spaces — and Nairobi brings together the contractors, developers, architects, and buyers who deliver them.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

export function WhyKenyaClientView() {
  return (
    <div className="relative overflow-hidden py-12 sm:py-16 text-brand-dark">
      {/* Background Subtle Architectural Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="market-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#market-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Header Block 1: Verified Market Facts                     */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Verified Economic Indicators
              </span>
            </div>

            <h2 className="mt-3.5 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.12] text-brand-dark">
              Key Market Data &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Growth Benchmarks
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
              Official macroeconomic data reflecting steady demand for building materials, earthmoving machinery, and specialized architectural technologies.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_22px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Stand Space →
            </Link>
          </div>
        </div>

        {/* Dynamic Facts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {marketFacts.map((fact) => (
            <motion.div key={fact.id} variants={itemVariants}>
              <StatCard fact={fact} />
            </motion.div>
          ))}
        </motion.div>

        {/* ========================================================= */}
        {/* Section 2: 4 Strategic Pillars (Brochure Match)           */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Commercial Foundation
              </span>
              <h3 className="mt-1.5 text-xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                Why Nairobi &amp; Kenya?
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md font-normal">
              Kenya is a dynamic hub for construction and infrastructure in East Africa — the ideal location for the Kenya Buildcon Expo.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {STRATEGIC_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-brand-red/40 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                      {pillar.tag}
                    </span>

                    <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-brand-red transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="mt-4 text-base font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm leading-[1.7] text-slate-600 font-normal">
                    {pillar.body}
                  </p>
                </div>


              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Section 3: Exact 9 Opportunity Categories from Brochure   */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Commercial Prospects
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
                Opportunities Across Active Sectors
              </h3>
            </div>
            <span className="text-xs text-slate-400">{opportunityCategories.length} Active Sectors</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {opportunityCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-brand-red/40 hover:bg-white hover:text-brand-dark hover:shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                {cat}
              </span>
            ))}
          </div>

          {/* Market Sources Strip */}
          <div className="mt-8 pt-5 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Verified Economic Reference Sources
            </span>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
              {marketSources.map((src) => (
                <span key={src.name} className="inline-flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  {src.url ? (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-brand-red hover:underline"
                    >
                      {src.name}
                    </a>
                  ) : (
                    <span className="font-medium text-slate-600">{src.name}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

      {/* ========================================================= */}
{/* High-Impact Expo Conversion Card (Replaces Weak Ribbon)    */}
{/* ========================================================= */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="relative mt-12 sm:mt-16 overflow-hidden rounded-3xl bg-[#071118] p-8 sm:p-12 text-white shadow-2xl shadow-black/25"
>
  {/* Ambient Mesh Glows */}
  <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-red/20 blur-[90px]" />
  <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-brand-green/20 blur-[90px]" />

  {/* Subtle Blueprint Wireframe Grid Background */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,#fff_30%,transparent_80%)]"
    style={{
      backgroundImage:
        "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }}
  />

  <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row text-center lg:text-left">
    {/* Left Column: Heading + Event Meta Pill */}
    <div className="max-w-2xl">
      {/* Event Date & Location Micro-Pill */}
      <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-brand-green animate-pulse" />
        <span className="text-white font-semibold">{event.dates.display}</span>
        <span className="text-white/30">•</span>
        <span>{event.venue.name}, {event.venue.city}</span>
      </div>

      <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
        Position Your Brand in{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green">
          Kenya&apos;s Construction
        </span>{" "}
        Revolution
      </h3>

      <p className="mt-3 text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-xl">
        Connect face-to-face with builders, developers, architects, government representatives, and regional distributors at Kenya&apos;s leading construction exhibition.
      </p>
    </div>

    {/* Right Column: High-Conversion Dual CTAs */}
    <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
      <Link
        href={event.cta.bookStand}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(200,38,45,0.4)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_0_32px_rgba(200,38,45,0.55)] hover:-translate-y-0.5 active:translate-y-0"
      >
        <span>Book Your Stand</span>
        <span>→</span>
      </Link>

      <Link
        href={event.cta.registerVisit}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.08] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0"
      >
        Register to Visit
      </Link>
    </div>
  </div>
</motion.div>
      </Container>
    </div>
  );
}