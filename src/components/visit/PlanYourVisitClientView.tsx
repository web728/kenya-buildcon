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

const CORE_PARAMETERS = [
  {
    title: "Official Dates",
    value: event.dates.display,
    subtitle: `Open daily, ${event.dates.openingHours}`,
    badge: "Calendar",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Exhibition Venue",
    value: event.venue.name,
    subtitle: "Established exhibition facility",
    badge: "Facility",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5",
  },
  {
    title: "Host City & Hub",
    value: `${event.venue.city}, ${event.venue.country}`,
    subtitle: "Kenya's commercial capital",
    badge: "Location",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
  {
    title: "Access Policy",
    value: "Free Visitor Registration",
    subtitle: "Register online to secure your spot",
    badge: "Admission",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const FAQS = [
  {
    q: "Is there an entry fee for visitors?",
    a: "No. Visitor registration for Kenya Buildcon International Expo 2027 is free. Register online to secure your spot and receive updates on the event schedule, exhibitors, and special events.",
    tag: "Registration",
  },
  {
    q: "How do international delegates arrange entry to Kenya?",
    a: "International visitors should check Kenya's current entry requirements on the official Government of Kenya immigration portals before travelling. Registered delegates can request an invitation letter from the organisers to support their application.",
    tag: "Immigration",
  },
  {
    q: "What are the dates and timings?",
    a: "Kenya Buildcon International Expo 2027 runs from 9–11 June 2027 at The Sarit Expo Centre, Nairobi, open daily from 10:00 am to 6:00 pm.",
    tag: "Timings",
  },
  {
    q: "How do I reach The Sarit Expo Centre?",
    a: "The Sarit Expo Centre is in Westlands, Nairobi, and is readily accessible by taxi and ride-hailing services from across the city and from Jomo Kenyatta International Airport (NBO).",
    tag: "Logistics",
  },
];

export function PlanYourVisitClientView() {
  const cleanPhone = event.contact.general.phone.replace(/[^0-9+]/g, "");

  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="plan-visit-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#plan-visit-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Section 1: Core Parameters Grid                           */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Visitor Parameters
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark">
              Key Dates &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Location Details
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
              Essential show details to help you plan your travel, local transit, and stay in Nairobi.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.registerVisit}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_22px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Visitor Badge →
            </Link>
          </div>
        </div>

        {/* 4 Core Parameter Cards (Spacious, Zero-Chipku Grid) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CORE_PARAMETERS.map((item, idx) => {
            const isBlue = idx % 2 === 0;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
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

                  <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.title}
                  </span>

                  <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-xs leading-[1.65] text-slate-500 font-normal">
                    {item.subtitle}
                  </p>
                </div>


              </motion.div>
            );
          })}
        </motion.div>

        {/* ========================================================= */}
        {/* Section 2: Interactive Venue Map Showcase                 */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Interactive Navigation
              </span>
              <h3 className="mt-1 text-lg sm:text-2xl font-bold tracking-tight text-brand-dark">
                {event.venue.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {event.venue.fullLocation}
              </p>
            </div>

            <a
              href={event.venue.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-brand-red hover:text-brand-red hover:bg-white shrink-0"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-inner">
            <iframe
              title={`Map of ${event.venue.name}, ${event.venue.city}`}
              src={event.venue.mapEmbedUrl}
              className="h-[360px] sm:h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* Section 3: Visitor FAQ (Breathable 2-Column Grid)          */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Frequently Asked Questions
              </span>
              <h3 className="mt-1 text-xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                Visitor Guidelines &amp; Protocol
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Clear answers to help streamline your visit to the expo.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all hover:border-brand-red/40 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="rounded-full bg-slate-100 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      {faq.tag}
                    </span>
                    <span className="text-brand-red text-xs font-bold">Q&amp;A</span>
                  </div>

                  <h4 className="mt-4 text-base font-bold text-brand-dark group-hover:text-brand-red transition-colors leading-snug">
                    {faq.q}
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-[13.5px] leading-[1.75] text-slate-600 font-normal">
                    {faq.a}
                  </p>
                </div>


              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Section 4: Direct Secretariat Contact Desk                */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Visitor &amp; Delegation Assistance
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
                Have Additional Questions Regarding Your Visit?
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
                For international delegation hosting, travel invitation letters, or bulk corporate registrations, reach out directly to the joint organising committee.
              </p>
            </div>

         <div className="flex flex-col items-stretch gap-3 shrink-0 w-full lg:w-auto">
  {event.contactList.map((c) => {
    const firstName = c.name.replace(/^Mr\.\s+/, "").split(" ")[0];
    return (
      <a
        key={c.email}
        href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
        className="inline-flex items-center justify-start gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-700 transition-all hover:border-brand-red hover:text-brand-red hover:bg-white"
      >
        <svg className="h-4 w-4 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="tabular-nums whitespace-nowrap">{firstName}: {c.phone}</span>
      </a>
    );
  })}

  <a
    href={`mailto:${event.contactList[0].email}`}
    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all"
  >
    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    Email Helpdesk
  </a>
</div>
          </div>
        </div>

        {/* Bottom Registration Action Ribbon */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.04] via-white to-brand-green/[0.04] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Free trade visitor registration is currently active
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                Held from {event.dates.display} at {event.venue.fullLocation}.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
          >
            Register for Free Badge
          </Link>
        </div>
      </Container>
    </div>
  );
}