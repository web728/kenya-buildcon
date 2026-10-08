"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
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

// Official 5 Core Buyer Groups
const VISITOR_PILLARS = [
  {
    num: "01",
    title: "Architects & Engineers",
    subtitle: "Specifiers & Consultants",
    tags: ["Architects and Planners", "Structural & Civil Engineers", "Consulting Engineers", "Interior Designers"],
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    num: "02",
    title: "Contractors & Builders",
    subtitle: "Execution Specialists",
    tags: ["Building Contractors", "Subcontractors", "Builders and Developers", "Project Managers"],
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    num: "03",
    title: "Importers & Distributors",
    subtitle: "Supply Chain & Wholesalers",
    tags: ["Importers", "Dealers and Distributors", "Material Suppliers", "Retailers"],
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    num: "04",
    title: "Developers & Investors",
    subtitle: "Property & Hospitality",
    tags: ["Property Investors", "Investors and Financiers", "Hoteliers", "Facility Managers"],
    icon: "M3 21h18M3 7v14m18-14v14M8 3h8v4H8V3zM9 11h2m-2 4h2m4-4h2m-4 4h2",
  },
  {
    num: "05",
    title: "Government & Institutional",
    subtitle: "Public Sector & Academia",
    tags: ["Building Authorities", "Government Agencies", "Universities & Research Institutes"],
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
];

export function WhoWillYouMeetSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-16 sm:py-24 text-slate-900 border-b border-slate-200/80">
      
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-brand-red/10 via-red-400/5 to-transparent blur-3xl opacity-60" />

      {/* Modern Grid Blueprint Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* Header Bar Layout                                         */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-3.5 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red">
                Visitor Demographics • 5 Trade Buyer Groups
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              The Decision-Makers Who{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Buy, Build, Specify &amp; Source
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              B2B and B2C professionals — builders, developers, architects, project managers, government representatives, and key trade visitors seeking the latest innovations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/who-should-visit"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm transition-all duration-300 hover:border-brand-red hover:text-brand-red hover:shadow-md active:scale-95"
            >
              Visitor Guide →
            </Link>
            <Link
              href="/register-to-visit"
              className="inline-flex items-center justify-center rounded-xl bg-brand-red px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all duration-300 hover:bg-brand-red-dark hover:shadow-brand-red/30 active:scale-95"
            >
              Register to Visit
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Spacious Wide Grid Cards (3 Columns Max for Optimal Width) */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {VISITOR_PILLARS.map((pillar, idx) => {
            const isBlue = idx % 2 === 0;

            return (
              <motion.div
                key={pillar.num}
                variants={cardVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5 hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Card Header: Icon & Index */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isBlue
                            ? "bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white"
                            : "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white"
                        }`}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={pillar.icon} />
                        </svg>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          {pillar.subtitle}
                        </span>
                        <h3 className="text-base font-bold tracking-tight text-slate-900 group-hover:text-brand-red transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-sm font-mono font-bold tracking-wider text-slate-300 group-hover:text-slate-500 transition-colors shrink-0">
                      {pillar.num}
                    </span>
                  </div>

                  {/* Horizontal Badges */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg border border-slate-200/70 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition-all duration-200 group-hover:border-brand-red/30 group-hover:bg-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer Link */}
                <Link
                  href="/who-should-visit"
                  className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-red hover:underline"
                >
                  <span>View visitor profile</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ========================================================= */}
        {/* Bottom Callout Banner                                     */}
        {/* ========================================================= */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3.5 text-xs sm:text-sm font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-green animate-pulse shrink-0" />
            <span>
              Visitor registration for Kenya Buildcon is free — register online to secure your spot and receive event updates.
            </span>
          </div>

          <Link
            href="/register-to-visit"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-brand-red-dark transition-colors whitespace-nowrap shrink-0"
          >
            <span>Get Free Visitor Badge</span>
            <span>→</span>
          </Link>
        </div>

      </Container>
    </section>
  );
}