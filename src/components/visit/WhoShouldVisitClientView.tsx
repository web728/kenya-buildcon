"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { visitorGroupIconMap } from "@/components/icons/MiscIcons";
import { visitorGroups } from "@/data/visitorProfile";

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

// Visitor objectives from the 4th Kenya Buildcon brochure ("Why Visit")
const WHY_VISIT_OBJECTIVES = [
  {
    title: "Explore Solutions",
    desc: "See a wide range of building materials, machinery, equipment and construction technologies — all under one roof.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Gain Insights",
    desc: "Interactive sessions with industry leaders on construction technology, eco-friendly materials, and infrastructure development.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Discover Innovations",
    desc: "Attend workshops and seminars led by industry experts, learning about emerging trends and best practices.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Network with Industry Leaders",
    desc: "Connect with professionals and decision-makers to discuss opportunities and challenges.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Discover New Suppliers",
    desc: "Meet new suppliers and explore dealership opportunities — key reasons visitors gave for attending the previous edition.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Open Doors to Opportunities",
    desc: "Meet potential clients and partners, enabling growth in the East African market.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

export function WhoShouldVisitClientView() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="visitors-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#visitors-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Header Block 1: Balanced Titles & Direct CTA              */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Trade Visitor Profile
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark">
              Core Buying Groups &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Specifier Categories
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
              Designed specifically for professionals responsible for procurement, design, project execution, and regional distribution.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.registerVisit}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_22px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Visitor Pass →
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Section 1: 5 Core Buyer Groups (Spacious Layout)          */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visitorGroups.map((group, index) => {
            const Icon = visitorGroupIconMap[group.slug];
            const isBlue = index % 2 === 0;

            return (
              <motion.div
                key={group.slug}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 p-6 sm:p-7 shadow-[0_2px_12px_rgb(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                        isBlue
                          ? "bg-brand-red/[0.08] text-brand-red group-hover:bg-brand-red group-hover:text-white"
                          : "bg-brand-green/[0.08] text-brand-green group-hover:bg-brand-green group-hover:text-white"
                      }`}
                    >
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                        </svg>
                      )}
                    </div>

                    <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Group Name */}
                  <h3 className="mt-5 text-base sm:text-lg font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {group.name}
                  </h3>

                  {/* Clean Role Pill Grid */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.roles.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/70 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors group-hover:border-slate-300"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-green shrink-0" />
                        <span>{role}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={event.cta.registerVisit}
                  className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-red hover:underline"
                >
                  <span>Register free to visit</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ========================================================= */}
        {/* Section 2: Why Visit? (Exact 6 Objectives from Brochure)  */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Strategic Sourcing
              </span>
              <h3 className="mt-1.5 text-xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                Why Visit Kenya Buildcon?
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md font-normal leading-relaxed">
              Meeting manufacturers, suppliers and industry experts face-to-face in Nairobi.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {WHY_VISIT_OBJECTIVES.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-brand-red/40 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/[0.08] text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                      </svg>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="mt-5 text-base font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-[13px] leading-[1.75] text-slate-600 font-normal">
                    {item.desc}
                  </p>
                </div>


              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Registration Action Ribbon                         */}
        {/* ========================================================= */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.04] via-white to-brand-green/[0.04] p-6 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-brand-dark">
                Trade visitor badge registration is now active
              </h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Join industry peers from {event.dates.display} at {event.venue.fullLocation}.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
          >
            Register for Free Pass
          </Link>
        </div>
      </Container>
    </div>
  );
}