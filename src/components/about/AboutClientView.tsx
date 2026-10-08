"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { keyFeatures } from "@/data/previousEdition";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
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

// Key features of the 4th edition (Kenya Buildcon 2027 brochure)
const ICONS = [
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3",
  "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  "M13 10V3L4 14h7v7l9-11h-7z",
];

const CORE_DELIVERABLES = keyFeatures.map((f, i) => ({ ...f, icon: ICONS[i % ICONS.length] }));

const EVENT_METRICS = [
  { label: "Official Dates", value: event.dates.display, badge: event.editionLabel },
  { label: "Opening Hours", value: event.dates.openingHours, badge: "Daily" },
  { label: "Exhibition Venue", value: event.venue.name, badge: event.venue.district },
  { label: "Host City", value: `${event.venue.city}, ${event.venue.country}`, badge: "East Africa" },
  { label: "Exhibitor Profile", value: "50+ Product Categories", badge: "Full Supply Chain" },
  { label: "Previous Edition", value: "250+ Brands · 9,500+ Visitors", badge: "Post Show Report" },
];

export function AboutClientView() {
  return (
    <div className="relative overflow-hidden py-12 sm:py-16 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Section 1: Split Architecture Narrative                   */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-12 lg:items-center pb-12 border-b border-slate-200/80"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                {event.theme}
              </span>
            </div>

            <h2 className="mt-3.5 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.14] text-brand-dark">
              Kenya&apos;s Leading Platform for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Building &amp; Construction
              </span>
            </h2>

            <p className="mt-3.5 text-xs sm:text-sm leading-[1.7] text-slate-600 font-normal">
              {event.name} stands as the foremost international trade exhibition in Kenya dedicated to the building and construction industry. It is a pivotal platform for industry professionals, businesses, and stakeholders to converge and explore the latest trends, innovations, and opportunities in the construction sector.
            </p>

            <p className="mt-3 text-xs sm:text-sm leading-[1.7] text-slate-600 font-normal">
              Our mission is to drive growth and innovation through sustainable development and collaboration — fostering knowledge exchange, showcasing innovative products and solutions, and building partnerships that shape the future of construction in Kenya and beyond. The {event.editionLabel.toLowerCase()} takes place from {event.dates.display} at {event.venue.fullLocation}.
            </p>
          </div>

          {/* Strategic Context Pill Card */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgb(0,0,0,0.03)]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Strategic Gateway
            </span>
            <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
              Why Nairobi?
            </h3>
            <p className="mt-2 text-xs leading-[1.65] text-slate-500 font-normal">
              Kenya&apos;s construction sector grew 6.7% in Q3 2025 (KNBS), driven by public infrastructure and housing investment — and as a member of the East African Community, Kenya offers exhibitors direct access to the wider regional market.
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/why-kenya"
                className="text-xs font-bold text-brand-red hover:underline"
              >
                Explore Market Report →
              </Link>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                East Africa Hub
              </span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* Section 2: 8 Strategic Mandates (Brochure Deliverables)    */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                The 4th Edition Experience
              </span>
              <h3 className="mt-1.5 text-xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                Key Features of the Expo
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md font-normal">
              A collaborative environment where innovation meets opportunity, benefiting exhibitors, attendees, and the industry as a whole.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CORE_DELIVERABLES.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-brand-red/40 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/[0.08] text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="mt-3.5 text-xs sm:text-sm font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[11px] leading-[1.6] text-slate-500 font-normal">
                    {item.desc}
                  </p>
                </div>


              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Section 3: Event Facts Matrix (Compact Single-View Strip) */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Quick Facts &bull; Official Parameters
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
                Kenya Buildcon at a Glance
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/exhibition-profile"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold text-brand-dark transition-all hover:border-brand-red hover:text-brand-red"
              >
                Exhibition Profile →
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
            {EVENT_METRICS.map((fact) => (
              <div
                key={fact.label}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {fact.label}
                  </span>
                  <p className="mt-0.5 text-xs sm:text-sm font-bold text-brand-dark">
                    {fact.value}
                  </p>
                </div>
                <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                  {fact.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}