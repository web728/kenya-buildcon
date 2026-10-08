"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { event } from "@/config/event";
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

// Grouped from the "Exhibitor Profile" page of the 4th Kenya Buildcon brochure
const ICON = {
  building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  machine: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  steel: "M4 6h16M4 10h16M4 14h16M4 18h16",
  prefab: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  window: "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 12h16M12 4v16",
  tiles: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  brush: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  can: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  bath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  hvac: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  bolt: "M13 10V3L4 14h7v7l9-11h-7z",
  sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  chip: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
} as const;

const sectorTabs = [
  {
    id: "structural",
    label: "Materials & Machinery",
    sectors: [
      { title: "Building Materials", items: "Cement and Steel, Concrete Blocks & Machinery, Gypsum Boards, Lightweight Construction Materials", icon: ICON.building, color: "red" },
      { title: "Construction Machinery", items: "Earthmoving, Demolition, Quarrying & Mining Equipment, Construction Tools & Machinery", icon: ICON.machine, color: "green" },
      { title: "Structural Engineering & Steel", items: "Structural Engineering, Structural Steel Fabrication, Formwork and Scaffolding", icon: ICON.steel, color: "red" },
      { title: "Prefab & Modular", items: "Pre-fabricated Structures, Modular Construction Solutions, PVC/UPVC Machinery and Profiles", icon: ICON.prefab, color: "green" },
    ],
  },
  {
    id: "architectural",
    label: "Architecture & Interiors",
    sectors: [
      { title: "Doors, Windows & Glass", items: "Doors and Windows, Aluminium Extrusions, Architectural & Decorative Glass, Architectural Hardware", icon: ICON.window, color: "red" },
      { title: "Tiles, Marble & Flooring", items: "Tiles & Sanitary Ware, Marble & Stones, Flooring and Wall Coverings, Industrial Flooring", icon: ICON.tiles, color: "green" },
      { title: "Interiors & Landscaping", items: "Interior Decorating Products, Outdoor Furniture & Landscaping, Acoustics & Soundproofing", icon: ICON.brush, color: "red" },
      { title: "Chemicals, Paints & Roofing", items: "Construction Chemicals & Waterproofing, Adhesive & Sealants, Paints & Coatings, Roofing & Façade", icon: ICON.can, color: "green" },
    ],
  },
  {
    id: "mep",
    label: "MEP & Building Services",
    sectors: [
      { title: "Kitchen, Bathroom & Plumbing", items: "Kitchen & Bathroom Solutions, Plumbing Fittings and Accessories", icon: ICON.bath, color: "red" },
      { title: "HVAC, Lifts & Elevators", items: "Air Conditioning & HVAC, Lifts & Elevators", icon: ICON.hvac, color: "green" },
      { title: "Electrical, Lighting & Cables", items: "Electricals & Electronics, Lighting / LED, Switches & Switch Gear, Wires & Cables", icon: ICON.bolt, color: "red" },
      { title: "Fire, Safety & Security", items: "Fire Protection Systems, Passive Fire Protection, Safety & Security", icon: ICON.shield, color: "green" },
    ],
  },
  {
    id: "energy",
    label: "Green Energy & Technology",
    sectors: [
      { title: "Solar & Renewable Energy", items: "Renewable Energy Systems, Solar, Wind & Other Green Energy Products, Battery & Generators", icon: ICON.sun, color: "red" },
      { title: "Smart Building Technology", items: "Building Automation, Home Automation Systems, BIM Software, Infrastructure Software", icon: ICON.chip, color: "green" },
      { title: "Site Services & Sustainability", items: "Construction Waste Management, Noise Control Products, Surveying Equipment", icon: ICON.building, color: "red" },
    ],
  },
];
export function ExhibitionProfileSection() {
  const [activeTab, setActiveTab] = useState(sectorTabs[0].id);
  const currentGroup = sectorTabs.find((t) => t.id === activeTab) || sectorTabs[0];

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-16 sm:py-24 text-slate-900 border-b border-slate-200/80">
      
      {/* Dynamic Background Ambient Blur */}
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
                What&apos;s On Display • Industry Sectors
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Products, Machinery &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Materials on Display
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              Covering 50+ official exhibit categories across the entire building supply chain, from cement and steel to smart building technology.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/exhibition-profile"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm transition-all duration-300 hover:border-brand-red hover:text-brand-red hover:shadow-md active:scale-95"
            >
              All Sectors Page →
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Segment Filter Pills (Interactive Physics)               */}
        {/* ========================================================= */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {sectorTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "bg-white border border-slate-200/90 text-slate-600 hover:border-brand-red/40 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
             
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* Dynamic Animated Cards Grid                               */}
        {/* ========================================================= */}
        <div className="mt-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {currentGroup.sectors.map((sector, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header Icon + Number Tag */}
                    <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                          sector.color === "red"
                            ? "bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white"
                            : "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white"
                        }`}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={sector.icon} />
                        </svg>
                      </div>

                      <span className="text-xs font-mono font-bold tracking-wider text-slate-300 group-hover:text-slate-500 transition-colors">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Sector Title & Items */}
                    <h3 className="mt-5 text-base font-bold tracking-tight text-slate-900 group-hover:text-brand-red transition-colors">
                      {sector.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 font-normal">
                      {sector.items}
                    </p>
                  </div>

                  {/* Micro Footer Indicator */}
                  <Link
                    href="/exhibition-profile"
                    className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-red hover:underline"
                  >
                    <span>View all categories</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* Booking Banner Callout                                    */}
        {/* ========================================================= */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3.5 text-xs sm:text-sm font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-green animate-pulse shrink-0" />
            <span>
              Stand bookings for the {event.editionLabel.toLowerCase()} are open for manufacturers, suppliers &amp; service providers.
            </span>
          </div>

          <Link
            href={event.cta.bookStand}
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-brand-red-dark transition-colors whitespace-nowrap shrink-0"
          >
            <span>Reserve Your Space</span>
            <span>→</span>
          </Link>
        </div>

      </Container>
    </section>
  );
}