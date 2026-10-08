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

export function VenueSection() {
  

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fafbfd] via-white to-[#fafbfd] py-12 sm:py-16 lg:py-20 text-brand-dark border-b border-slate-200/80">
      
      {/* Background Architectural Vector Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="venue-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#venue-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8"
        >
          {/* ========================================================= */}
          {/* Left Column: Official Venue Briefing Glass Card           */}
          {/* ========================================================= */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.03)] backdrop-blur-xl lg:col-span-6"
          >
            <div>
              {/* Context Live Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3.5 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                  Official Event Location
                </span>
              </div>

              {/* Venue Name Heading */}
              <h2 className="mt-4 text-2xl sm:text-4xl lg:text-[2.4rem] font-extrabold tracking-[-0.03em] leading-[1.14] text-brand-dark">
                {event.venue.name}
              </h2>

              {/* Sub-Header / City Context */}
              <div className="mt-2 text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-green">
                {event.venue.district}, {event.venue.city}, {event.venue.country}
              </div>

              {/* Concise Venue Narrative */}
              <p className="mt-3.5 text-xs sm:text-sm leading-[1.7] tracking-normal text-slate-600 font-normal">
                Kenya Buildcon returns to The Sarit Expo Centre in Nairobi — host of previous editions — with exhibitor stands across the venue&apos;s exhibition halls.
              </p>

              {/* Compact Key Parameters Grid */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {/* Date Capsule */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Dates
                    </span>
                    <span className="text-xs font-bold text-brand-dark">
                      {event.dates.display}
                    </span>
                  </div>
                </div>

                {/* Hub Capsule */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Opening Hours
                    </span>
                    <span className="text-xs font-bold text-brand-dark">
                      {event.dates.openingHours} daily
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Pill Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100">
              <Link
                href="/plan-your-visit"
                className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_22px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Plan Your Visit →
              </Link>
              <a
                href={event.venue.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold tracking-wide text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:-translate-y-0.5"
              >
                Open in Maps ↗
              </a>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* Right Column: Google Maps Interactive Glass Container     */}
          {/* ========================================================= */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2.5 shadow-[0_4px_24px_rgb(0,0,0,0.03)] lg:col-span-6"
          >
            <div className="relative h-[320px] sm:h-[380px] lg:h-full min-h-[320px] w-full overflow-hidden rounded-2xl bg-slate-100">
              <iframe
                title={`Map of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                className="h-full w-full border-0 transition-opacity duration-300 group-hover:opacity-95"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Frosted Floating Overlay Tag */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-white/60 bg-white/85 px-4 py-2.5 backdrop-blur-md shadow-lg shadow-black/5">
                <p className="text-xs font-bold text-brand-dark">
                  {event.venue.name}
                </p>
                <p className="text-[10px] font-medium text-slate-500">
                  {event.venue.city}, {event.venue.country}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}