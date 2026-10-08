"use client";

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
      delayChildren: 0.04,
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
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Target exhibitor profiles (Kenya Buildcon brochure exhibitor profile)
const EXHIBITOR_PROFILES = [
  {
    title: "Manufacturers",
    desc: "Producers of raw materials, fabricated parts, and architectural systems seeking direct distribution agreements.",
    badge: "Direct Production",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Exporters",
    desc: "Global trading houses and exporters supplying building products to Kenya and the wider East African region.",
    badge: "Global Logistics",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "International Suppliers",
    desc: "International companies introducing new building technologies and engineering solutions to Kenya.",
    badge: "Foreign Trade",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    title: "Kenyan Manufacturers",
    desc: "Local producers of cement, steel, building materials and finishing products serving Kenya's construction sector.",
    badge: "Domestic Industry",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Importers & Distributors",
    desc: "Wholesale network leaders supplying national hardware stores, contractors, and retail depots.",
    badge: "Supply Chain",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    title: "Construction Machinery Companies",
    desc: "Brands of earthmoving equipment, excavators, loaders, tower cranes, scaffolding, and site machinery.",
    badge: "Heavy Plant",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    title: "Building Material Companies",
    desc: "Suppliers of structural cement, blocks, gypsum, roofing, chemical waterproofing, and insulation products.",
    badge: "Materials",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Engineering Product Manufacturers",
    desc: "Producers of MEP components, structural steel profiles, high-pressure valves, and water pumping systems.",
    badge: "Engineering",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Equipment Suppliers",
    desc: "Distributors of power tools, workshop machinery, drilling equipment, and job-site safety gear.",
    badge: "Tools & Power",
    icon: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  },
  {
    title: "Building Technology Companies",
    desc: "Innovators delivering smart building automation, solar energy, HVAC controls, and BIM/CAD construction software.",
    badge: "PropTech & BIM",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Construction Product & System Providers",
    desc: "Providers of modular precast solutions, architectural glass facades, fire detection, and surface finishing.",
    badge: "Integrated Systems",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
];

export function WhoShouldExhibitClientView() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="who-exhibit-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#who-exhibit-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* Top Header: Balanced Titles & CTA */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Target Exhibitor Segments
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark">
              Exhibitor Profile &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Commercial Sectors
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
              Direct access to East Africa&apos;s decision-makers for manufacturers, international suppliers, and material producers across core profiles.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/exhibition-profile"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-700 transition-all hover:border-brand-red hover:text-brand-red hover:-translate-y-0.5"
            >
              Exhibit Sectors →
            </Link>
            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_22px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Exhibition Space
            </Link>
          </div>
        </div>

        {/* 11 Profiles Responsive Grid (Spacious, Zero-Chipku Layout) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {EXHIBITOR_PROFILES.map((item, idx) => {
            const isBlue = idx % 2 === 0;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 p-6 sm:p-7 shadow-[0_2px_12px_rgb(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5"
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                        isBlue
                          ? "bg-brand-red/[0.08] text-brand-red group-hover:bg-brand-red group-hover:text-white"
                          : "bg-brand-green/[0.08] text-brand-green group-hover:bg-brand-green group-hover:text-white"
                      }`}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                      </svg>
                    </div>

                    <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {item.badge}
                    </span>
                  </div>

                  {/* Profile Title */}
                  <h3 className="mt-5 text-base sm:text-lg font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>

                  {/* Profile Scope Description */}
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-[1.75] text-slate-600 font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Status Ribbon */}
                <Link
                  href={event.cta.bookStand}
                  className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-red hover:underline"
                >
                  <span>Apply to exhibit</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Booking Action Ribbon */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.04] via-white to-brand-green/[0.04] p-6 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-brand-dark">
                Does your business fall under these sectors?
              </h4>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Reserve your stand position early for Kenya Buildcon 2027 — allocation is on a first-come, first-served basis.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.bookStand}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
          >
            Apply to Exhibit Now
          </Link>
        </div>
      </Container>
    </div>
  );
}