"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { event } from "@/config/event";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { sectorIconMap } from "@/components/icons/SectorIcons";

const EASE = [0.16, 1, 0.3, 1] as const;
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const industries = [
  {
    title: "Building Materials & Products",
    description:
      "Cement, steel, roofing, flooring, glass, gypsum, insulation, waterproofing and other building materials.",
  },
  {
    title: "Construction Machinery & Equipment",
    description:
      "Earthmoving machinery, construction tools, heavy equipment, scaffolding and site equipment.",
  },
  {
    title: "Architecture & Interior Solutions",
    description:
      "Doors, windows, architectural glass, interior finishes, modular building products, and kitchen and bathroom solutions.",
  },
  {
    title: "Engineering & Building Systems",
    description:
      "Structural engineering, electrical systems, HVAC, plumbing, lifts, fire protection and related building services.",
  },
  {
    title: "Sustainable Building & Energy",
    description:
      "Solar energy, renewable energy systems, energy-efficient building products and waste management solutions.",
  },
  {
    title: "Smart Building & Construction Technology",
    description:
      "Building automation, smart building systems, BIM software and digital solutions for building and construction projects.",
  },
];

const audience = [
  "Builders & Developers",
  "Architects & Designers",
  "Contractors & Engineers",
  "Dealers & Distributors",
  "Importers & Buyers",
  "Government & Industry Representatives",
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7.5" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}
function DefaultSectorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4" />
    </svg>
  );
}

export function ExhibitionProfileExplorer() {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return exhibitionSectors
      .filter((sector) => activeSlug === null || sector.slug === activeSlug)
      .map((sector) => {
        if (!term || sector.name.toLowerCase().includes(term)) return sector;
        const matching = sector.subcategories.filter((item) =>
          item.toLowerCase().includes(term),
        );
        return matching.length ? { ...sector, subcategories: matching } : null;
      })
      .filter(
        (sector): sector is (typeof exhibitionSectors)[number] =>
          sector !== null,
      );
  }, [query, activeSlug]);

  const hasFilters = query.trim().length > 0 || activeSlug !== null;
  const resetFilters = () => {
    setQuery("");
    setActiveSlug(null);
  };
  const chooseSector = (slug: string | null) => {
    setActiveSlug(slug);
    setQuery("");
  };

  return (
    <div className="bg-white text-[#111111]">
      {/* Broad industry coverage */}
      <section
        className="py-12 sm:py-14 lg:py-16"
        aria-labelledby="industry-coverage-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-[730px]"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#BE202B]">
              Industry Coverage
            </p>
            <h2
              id="industry-coverage-heading"
              className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.04em]"
            >
              Industries at{" "}
              <span className="text-[#BE202B]">Kenya Buildcon International Expo 2027.</span>
            </h2>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
              The exhibition covers a wide range of products, equipment and
              services used in building projects, construction work and
              infrastructure development.
            </p>
          </motion.div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <motion.article
                key={industry.title}
                variants={revealVariants}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  delay: reduceMotion ? 0 : Math.min(index, 5) * 0.045,
                }}
                className="rounded-lg border border-[#111111]/10 bg-white p-5 sm:p-6"
              >
                <h3 className="text-[16px] font-extrabold tracking-[-0.02em]">
                  {industry.title}
                </h3>
                <p className="mt-3 text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
                  {industry.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Searchable sector directory */}
      <section
        id="exhibition-sectors"
        className="border-y border-[#111111]/10 bg-[#FAFAFA] py-12 sm:py-14 lg:py-16"
        aria-labelledby="exhibition-explorer-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-6 flex flex-col gap-4 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-[730px]">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#BE202B]">
                Exhibition Sector Directory
              </p>
              <h2
                id="exhibition-explorer-heading"
                className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.17] tracking-[-0.04em]"
              >
                Explore Products &{" "}
                <span className="text-[#BE202B]">Industry Sectors.</span>
              </h2>
              <p className="mt-3 max-w-[640px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
                Browse the building and construction sectors covered at Kenya
                Buildcon International Expo 2027. Search by product or select a sector to explore its
                categories.
              </p>
            </div>
            <Link
              href={event.cta.bookStand}
              className="inline-flex min-h-[43px] shrink-0 items-center justify-center gap-2 self-start rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Book Exhibition Space <ArrowIcon />
            </Link>
          </motion.div>

          <div className="overflow-hidden rounded-xl border border-[#111111]/10 bg-white shadow-[0_10px_32px_rgba(17,17,17,0.035)]">
            <div className="p-4 sm:p-5">
              <label
                htmlFor="sector-search"
                className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#777777]"
              >
                Search Product Categories
              </label>
              <div className="relative max-w-[590px]">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]">
                  <SearchIcon />
                </span>
                <input
                  id="sector-search"
                  type="search"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cement, steel, machinery, lighting..."
                  className="h-[46px] w-full rounded-md border border-[#111111]/15 bg-[#FAFAFA] pl-11 pr-10 text-[12px] text-[#111111] outline-none placeholder:text-[#999999] focus:border-[#BE202B] focus:ring-[3px] focus:ring-[#BE202B]/10 sm:text-[13px]"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#777777] hover:text-[#111111]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <div className="border-t border-[#111111]/10 bg-[#FAFAFA] px-4 py-4 sm:px-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                
                {hasFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] font-bold text-[#BE202B] hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                aria-label="Exhibition sector filters"
              >
                <button
                  type="button"
                  onClick={() => chooseSector(null)}
                  aria-pressed={activeSlug === null && !query}
                  className={`shrink-0 rounded-md border px-3.5 py-2.5 text-[11px] font-bold ${activeSlug === null && !query ? "border-[#111111] bg-[#111111] text-white" : "border-[#111111]/10 bg-white text-[#555555]"}`}
                >
                  All Sectors
                </button>
                {exhibitionSectors.map((sector) => (
                  <button
                    type="button"
                    key={sector.slug}
                    onClick={() =>
                      chooseSector(
                        activeSlug === sector.slug ? null : sector.slug,
                      )
                    }
                    aria-pressed={activeSlug === sector.slug}
                    className={`shrink-0 rounded-md border px-3.5 py-2.5 text-[11px] font-semibold ${activeSlug === sector.slug ? "border-[#BE202B] bg-[#BE202B] text-white" : "border-[#111111]/10 bg-white text-[#555555] hover:border-[#BE202B]/35 hover:text-[#BE202B]"}`}
                  >
                    {sector.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          
          <motion.div
            layout={!reduceMotion}
            className="mt-4 grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  className="col-span-full rounded-xl border border-dashed border-[#111111]/20 bg-white px-6 py-12 text-center"
                >
                  <h3 className="text-[17px] font-extrabold">
                    No Matching Categories
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.75] text-[#777777]">
                    Try another product name or browse all exhibition sectors.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-md bg-[#BE202B] px-5 py-2.5 text-[11px] font-bold text-white"
                  >
                    Clear Search & Filters
                  </button>
                </motion.div>
              ) : (
                filtered.map((sector, index) => {
                  const Icon = sectorIconMap[sector.slug];
                  return (
                    <motion.article
                      layout={!reduceMotion}
                      key={sector.slug}
                      id={sector.slug}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.4,
                        delay: reduceMotion ? 0 : Math.min(index, 8) * 0.03,
                        ease: EASE,
                      }}
                      className="group flex flex-col rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] hover:border-[#BE202B]/30 hover:shadow-[0_12px_30px_rgba(17,17,17,0.055)] sm:p-6"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[#BE202B]">
                        {Icon ? (
                          <Icon className="h-5 w-5" />
                        ) : (
                          <DefaultSectorIcon />
                        )}
                      </span>
                      <h3 className="mt-4 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em]">
                        {sector.name}
                      </h3>
                      <ul className="mt-4 flex flex-wrap content-start gap-1.5">
                        {sector.subcategories.map((item) => (
                          <li
                            key={item}
                            className="rounded-md border border-[#111111]/[0.07] bg-[#F8F8F8] px-2.5 py-1.5 text-[11px] font-medium leading-[1.5] text-[#555555]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>
         
        </div>
      </section>

      {/* Short audience context – full visitor detail lives on its own page */}
      <section
        className="py-12 sm:py-14 lg:py-16"
        aria-labelledby="audience-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#BE202B]">
                Exhibitors & Industry Buyers
              </p>
              <h2
                id="audience-heading"
                className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.04em]"
              >
                Connecting Businesses with{" "}
                <span className="text-[#BE202B]">Industry Professionals.</span>
              </h2>
              <p className="mt-3 max-w-[690px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
                Kenya Buildcon International Expo 2027 provides a meeting platform for manufacturers,
                suppliers and service providers to connect with builders,
                developers, contractors, architects, engineers, distributors and
                buyers involved in building and construction projects.
              </p>
              <Link
                href="/visitor-profile"
                className="mt-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#BE202B] hover:text-[#111111]"
              >
                Explore Visitor Profile <ArrowIcon />
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {audience.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-[#111111]/10 bg-[#FAFAFA] px-4 py-3 text-[12px] font-semibold text-[#444444]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-12 sm:pb-14 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#111111] p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[700px]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#F26B70]">
                  Exhibit at Kenya Buildcon 2027
                </p>
                <h2 className="mt-3 text-[clamp(1.65rem,2.65vw,2.4rem)] font-extrabold leading-[1.2] tracking-[-0.04em]">
                  Present Your Products.{" "}
                  <span className="text-white/75">Connect with Buyers.</span>
                </h2>
                <p className="mt-3 max-w-[620px] text-[12px] leading-[1.8] text-white/70 sm:text-[13px]">
                  Showcase your products and services to building and
                  construction professionals and explore business opportunities
                  in Kenya and East Africa.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href={event.cta.bookStand}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white hover:bg-[#A51B25]"
                >
                  Book a Stand <ArrowIcon />
                </Link>
                <Link
                  href="/exhibit"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white hover:border-white hover:bg-white hover:text-[#111111]"
                >
                  Why Exhibit?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
