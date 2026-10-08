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
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Venue & connectivity highlights
const VENUE_ADVANTAGES = [
  {
    num: "01",
    tag: "Proven Show Venue",
    title: "Home of Previous Editions",
    desc: "The Sarit Expo Centre has hosted previous editions of Kenya Buildcon, welcoming 9,500+ trade visitors over three days at the last edition.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
  {
    num: "02",
    tag: "Commercial Capital",
    title: "In the Heart of Nairobi",
    desc: "Located in Westlands, Nairobi — Kenya's commercial capital and home to the country's leading contractors, developers, architects and trade headquarters.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    num: "03",
    tag: "Exhibition Ready",
    title: "Dedicated Exhibition Halls",
    desc: "Exhibition halls with stands in a range of sizes, a registration desk at the main entrance, and conference space for seminars and the inaugural ceremony.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    num: "04",
    tag: "Visitor Convenience",
    title: "Easy City Access",
    desc: "Reachable by taxi and ride-hailing services from across Nairobi and from Jomo Kenyatta International Airport, with business hotels nearby.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
];

const VENUE_METRICS = [
  { label: "Official Dates", value: event.dates.display, badge: event.editionLabel },
  { label: "Venue Complex", value: event.venue.name, badge: "Established Center" },
  { label: "City / Country", value: `${event.venue.city}, ${event.venue.country}`, badge: event.venue.district },
  { label: "Event Format", value: event.format, badge: "3-Day Trade Show" },
  { label: "Primary Industry", value: event.industry, badge: "50+ Categories" },
  { label: "Opening Hours", value: event.dates.openingHours, badge: "Daily" },
];

export function VenueClientView() {
  return (
    <div className="relative overflow-hidden py-12 sm:py-16 text-brand-dark">
      {/* Background Architectural Vector Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="venue-client-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#venue-client-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Section 1: Split Architecture (Briefing + Interactive Map)*/}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8 pb-14 border-b border-slate-200/80"
        >
          {/* Left Column: Venue Briefing Card */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgb(0,0,0,0.02)] lg:col-span-6"
          >
            <div>
              {/* Context Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3.5 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                  Official Trade Fair Complex
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.14] text-brand-dark">
                {event.venue.name}
              </h2>

              <div className="mt-2 text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-green">
                {event.venue.district}, {event.venue.city} · {event.venue.country}
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-[1.7] text-slate-600 font-normal">
                {event.name} will be hosted at {event.venue.name} in Nairobi, Kenya&apos;s commercial capital. The venue offers a professional setting for product showcases, machinery displays, seminars, and B2B networking.
              </p>

              {/* Quick Metadata Capsule */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Show Dates
                  </span>
                  <p className="mt-0.5 text-xs sm:text-sm font-bold text-brand-dark">
                    {event.dates.display}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Location Center
                  </span>
                  <p className="mt-0.5 text-xs sm:text-sm font-bold text-brand-dark">
                    {event.venue.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
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
                Open in Google Maps ↗
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Map Display */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2.5 shadow-[0_4px_24px_rgb(0,0,0,0.02)] lg:col-span-6"
          >
            <div className="relative h-[340px] sm:h-[400px] lg:h-full min-h-[340px] w-full overflow-hidden rounded-2xl bg-slate-100">
              <iframe
                title={`Map of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                className="h-full w-full border-0 transition-opacity duration-300 group-hover:opacity-95"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Frosted Floating Overlay Tag */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-white/60 bg-white/90 px-4 py-2.5 backdrop-blur-md shadow-lg shadow-black/5">
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

        {/* ========================================================= */}
        {/* Section 2: 4 Venue & Logistics Pillars                    */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Infrastructure &amp; Access
              </span>
              <h3 className="mt-1.5 text-xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                Strategic Advantages of the Venue
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md font-normal">
              A proven venue in Kenya&apos;s commercial capital, convenient for exhibitors and trade visitors alike.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VENUE_ADVANTAGES.map((adv) => (
              <motion.div
                key={adv.num}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-brand-red/40 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/[0.08] text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={adv.icon} />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                      {adv.num}
                    </span>
                  </div>

                  <span className="mt-3.5 inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {adv.tag}
                  </span>

                  <h4 className="mt-1 text-sm font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {adv.title}
                  </h4>

                  <p className="mt-1.5 text-[11px] leading-[1.6] text-slate-500 font-normal">
                    {adv.desc}
                  </p>
                </div>


              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Section 3: Event Facts Matrix (Compact Grid)              */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Verified Event Details
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
                Location &amp; Event Reference
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/exhibit"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold text-brand-dark transition-all hover:border-brand-red hover:text-brand-red"
              >
                Why Exhibit →
              </Link>
              <Link
                href={event.cta.bookStand}
                className="inline-flex items-center justify-center rounded-full bg-brand-red px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-brand-red-dark transition-all"
              >
                Book a Stand
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VENUE_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {metric.label}
                  </span>
                  <p className="mt-0.5 text-xs sm:text-sm font-bold text-brand-dark">
                    {metric.value}
                  </p>
                </div>
                <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                  {metric.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking Action Ribbon */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.04] via-white to-brand-green/[0.04] p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Reserve your stand at {event.venue.name}
              </h4>
              <p className="text-[11px] text-slate-500 font-normal">
                Dates: {event.dates.display} · Allocation on a first-come, first-served basis.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.bookStand}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
          >
            Book Stand Space
          </Link>
        </div>
      </Container>
    </div>
  );
}