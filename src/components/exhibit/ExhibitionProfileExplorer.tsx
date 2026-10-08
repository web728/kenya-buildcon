"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { event } from "@/config/event";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { sectorIconMap } from "@/components/icons/SectorIcons";

export function ExhibitionProfileExplorer() {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      if (activeSlug) return exhibitionSectors.filter((s) => s.slug === activeSlug);
      return exhibitionSectors;
    }

    return exhibitionSectors
      .map((sector) => {
        const nameMatch = sector.name.toLowerCase().includes(q);
        const subMatches = sector.subcategories.filter((s) =>
          s.toLowerCase().includes(q)
        );
        if (nameMatch) return sector;
        if (subMatches.length > 0) return { ...sector, subcategories: subMatches };
        return null;
      })
      .filter((s): s is (typeof exhibitionSectors)[number] => s !== null);
  }, [query, activeSlug]);

  return (
    <div className="relative w-full">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-96 w-full max-w-7xl -translate-x-1/2 bg-gradient-to-tr from-brand-red/10 via-red-400/5 to-transparent blur-3xl opacity-70" />

      {/* ========================================================= */}
      {/* Premium Glass Control Panel                               */}
      {/* ========================================================= */}
      <div className="relative mb-12 rounded-3xl border border-slate-200/80 bg-white/70 p-5 sm:p-7 shadow-xl shadow-slate-900/5 backdrop-blur-2xl transition-all">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Futuristic Search Input */}
          <div className="relative w-full lg:max-w-xl">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              id="sector-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (activeSlug) setActiveSlug(null);
              }}
              placeholder="Search by machinery, materials, steel, or products..."
              className="w-full rounded-2xl border border-slate-200/90 bg-slate-50/60 py-3.5 pl-12 pr-10 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-red/10 transition-all duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dynamic Category Status */}
          <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-500 lg:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-3.5 py-1.5 border border-slate-200/60">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              Showing all Sectors
            </span>
            {(activeSlug || query) && (
              <button
                type="button"
                onClick={() => {
                  setActiveSlug(null);
                  setQuery("");
                }}
                className="text-brand-red hover:text-brand-red-dark transition-colors font-bold underline underline-offset-4"
              >
                Reset All
              </button>
            )}
          </div>
        </div>

        {/* Clean Horizon Scrollable Sector Chips */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 pt-3 border-t border-slate-100 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setActiveSlug(null);
              setQuery("");
            }}
            className={`shrink-0 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeSlug === null && !query
                ? "bg-brand-dark text-white shadow-lg shadow-brand-dark/20"
                : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            All Sectors
          </button>
          {exhibitionSectors.map((sector) => {
            const isSelected = activeSlug === sector.slug;
            return (
              <button
                key={sector.slug}
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveSlug(isSelected ? null : sector.slug);
                }}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/25 font-semibold"
                    : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                }`}
              >
                {sector.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* Premium Dynamic Grid Display                              */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="col-span-full rounded-3xl border border-dashed border-slate-200/90 bg-white/80 p-12 text-center backdrop-blur-xl shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">No matching exhibit profiles</h3>
              <p className="mt-1 text-xs text-slate-500">
                No sectors matched &quot;{query}&quot;. Try searching for broader terms like &quot;cement&quot;, &quot;pipes&quot;, or &quot;lighting&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveSlug(null);
                }}
                className="mt-6 inline-flex items-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-red/20 hover:bg-brand-red-dark transition-all"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          ) : (
            filtered.map((sector, index) => {
              const Icon = sectorIconMap[sector.slug];

              return (
                <motion.div
                  layout
                  key={sector.slug}
                  id={sector.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: index * 0.02 }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-red/40 hover:shadow-2xl hover:shadow-brand-red/10 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header Icon + Sector Index */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                        {Icon ? (
                          <Icon className="h-6 w-6" />
                        ) : (
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                      </div>

                  
                    </div>

                    {/* Sector Title */}
                    <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 group-hover:text-brand-red transition-colors">
                      {sector.name}
                    </h3>

                    {/* Subcategories */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {sector.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center rounded-xl border border-slate-200/60 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-all hover:bg-white hover:text-slate-900 hover:border-slate-300"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Direct Action */}
                {/* Card Bottom CTA Button */}
<div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
  <Link
    href={event.cta.bookStand}
    className="group/btn relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-red/20 transition-all duration-300 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 active:scale-[0.98]"
  >
    <span>Book Stand</span>
    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
      →
    </span>
  </Link>
</div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}