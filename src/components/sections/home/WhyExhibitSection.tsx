"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const EXHIBIT_PILLARS = [
  {
    num: "01",
    title: "Lead Generation",
    desc: "Engage with thousands of targeted trade visitors and unlock new business opportunities.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    num: "02",
    title: "Market Insights",
    desc: "Gather direct feedback from industry leaders, helping you stay competitive with up-to-date market insights.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "03",
    title: "Enter the Kenyan Market",
    desc: "Connect with the East African construction market from its leading commercial hub, Nairobi.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    num: "04",
    title: "Long-Term Partnerships",
    desc: "Build connections with government officials, investors, and industry leaders, fostering long-term partnerships.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: "05",
    title: "Brand Visibility",
    desc: "Gain premium exposure in Kenya's largest construction-focused tradeshow, supported by extensive media coverage.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

const EXHIBITOR_PROFILES = [
  "Building Materials & Construction",
  "Engineering Services",
  "Heavy Machinery",
  "Architectural & Interior Design",
  "Green Building Solutions",
  "Advanced Infrastructure Technology",
];

export function WhyExhibitSection() {
  const [activeTab, setActiveTab] = useState<"reasons" | "who">("reasons");

  return (
    <section className="relative overflow-hidden bg-[#071118] py-16 sm:py-24 text-white border-b border-white/10 selection:bg-brand-red selection:text-white">
      {/* Dynamic Ambient Background Blur */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-brand-red/15 via-red-400/5 to-transparent blur-3xl opacity-60" />

      {/* Blueprint Grid Texture Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_50%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Clean & Spacious Header: Title (Left) + Actions (Right)    */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between pb-8 border-b border-white/[0.08]">
          
          {/* Left Column */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                Exhibitor Intelligence
              </span>
            </div>

            <h2 className="mt-3.5 text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Expand Your Reach in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green">
                East Africa&apos;s Construction Hub
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
              Exhibiting at Kenya Buildcon is a strategic opportunity to connect with builders, developers, architects, project managers, and government representatives from across East Africa.
            </p>
          </div>

          {/* Right Column: Toggle + CTA Button with Proper Breathing Room */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            {/* Segment Tab Switch */}
            <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-lg">
              <button
                type="button"
                onClick={() => setActiveTab("reasons")}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "reasons"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Core Pillars
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("who")}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "who"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Who Should Exhibit?
              </button>
            </div>

            {/* Standout Primary Action */}
            <Link
              href={event.cta.bookStand}
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(200,38,45,0.35)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_0_28px_rgba(200,38,45,0.5)] active:scale-95"
            >
              <span>Book Stand</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Dynamic Pillar Grid Display                               */}
        {/* ========================================================= */}
        {activeTab === "reasons" ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            {EXHIBIT_PILLARS.map((item, idx) => {
              const isAccent = idx % 2 === 0;

              return (
                <motion.div
                  key={item.num}
                  variants={itemVariants}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-brand-red/50 hover:bg-white/[0.05] hover:-translate-y-1.5 shadow-lg shadow-black/20"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isAccent
                            ? "bg-brand-red/15 text-brand-red group-hover:bg-brand-red group-hover:text-white"
                            : "bg-brand-green/15 text-brand-green group-hover:bg-brand-green group-hover:text-white"
                        }`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                        </svg>
                      </div>

                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
                        PILLAR {item.num}
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-red-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-normal leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-semibold text-brand-red-light">
                    <Link href="/exhibit" className="hover:underline">
                      Read Guide
                    </Link>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {EXHIBITOR_PROFILES.map((profile, i) => (
              <div
                key={profile}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-brand-red/50 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/15 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <span className="text-xs font-mono font-bold">0{i + 1}</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                    {profile}
                  </h4>
                  <p className="mt-0.5 text-[11px] font-normal text-slate-400">
                    Showcase to Kenya&apos;s builders, developers, specifiers and buyers.
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* Bottom Market Context Bar (Natural & Non-cluttered)        */}
        {/* ========================================================= */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-brand-green" />
            <span className="text-xs font-medium text-slate-300">
              Kenya Market &amp; Show Metrics
            </span>
          </div>

          <div className="flex items-center gap-6 sm:gap-8">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-extrabold text-brand-green">+6.7%</span>
              <span className="text-[11px] text-slate-400">Construction Growth, Q3 2025 (KNBS)</span>
            </div>
            <div className="h-3.5 w-px bg-white/10" aria-hidden="true" />
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-extrabold text-red-400">9,500+</span>
              <span className="text-[11px] text-slate-400">Trade Visitors, Previous Edition</span>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}