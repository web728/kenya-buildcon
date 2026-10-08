"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
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

const ORGANISERS_DATA = [
  {
    name: "FUTUREX TRADE FAIR & EVENTS PVT. LTD.",
    shortBadge: "Futurex Group",
    badgeTheme: "blue",
    hq: "New Delhi, India",
    established: "Operating Since 2011",
    url: "https://www.futurextrade.com/",
    logo: "/logos/futurex-logo.png",
    paragraphs: [
      "FUTUREX TRADE FAIR AND EVENTS PVT. LTD. aims to provide an ideal business platform through exhibitions, seminars, corporate events and get-togethers. Its strength lies in understanding the industry's needs and interests, and in multidimensional activities that make it a viable business platform — recognised by industry professionals as a safe bet.",
      "Futurex believes in making exhibitions the most sustainable and cost-effective mode of business activity, with the perfect blend of the best manufacturers and potential industry buyers from around the world.",
    ],
    stats: [
      { label: "Trade Exhibitions", val: "220+" },
      { label: "Exhibitors Hosted", val: "16,500+" },
      { label: "Brands on Display", val: "25,800+" },
      { label: "Global Trade Visitors", val: "950K+" },
    ],
  },
  {
    name: "EXHIBITIONS & TRADE SERVICES INDIA PVT. LTD.",
    shortBadge: "ETSIPL",
    badgeTheme: "green",
    hq: "Navi Mumbai, India",
    established: "ISO 9001:2015 Certified",
    url: "https://www.etsipl.in/",
    logo: "/logos/etsipl-logo.png",
    paragraphs: [
      "EXHIBITIONS & TRADE SERVICES INDIA PRIVATE LIMITED (ETSIPL), based out of Navi Mumbai, India, is an ISO 9001:2015 Certified Organization with more than 12 years of experience in the promotion and organizing of trade exhibitions across the globe.",
      "Through its global network, ETSIPL has a presence worldwide with local partners situated in most of the continents and is professionally committed to delivering the best trade services in the industry. Its goal through Kenya Buildcon is to provide opportunities to explore the potential of Kenya and the other countries in the East Africa region.",
    ],
    stats: [
      { label: "Global Track Record", val: "12+ Yrs" },
      { label: "Quality Certification", val: "ISO 9001" },
      { label: "Partner Network", val: "Worldwide" },
      { label: "Regional Target", val: "East Africa" },
    ],
  },
];

const CONTACT_DESKS = [
  {
    company: "Futurex Group",
    name: event.contact.futurex.name,
    phone: event.contact.futurex.phone,
    email: event.contact.futurex.email,
    location: "New Delhi Secretariat",
  },
  {
    company: "ETSIPL",
    name: event.contact.etsipl.name,
    phone: event.contact.etsipl.phone,
    email: event.contact.etsipl.email,
    location: "Navi Mumbai Desk",
  },
];

export function OrganisersClientView() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark selection:bg-brand-red selection:text-white">
      {/* Background Architectural Vector Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="organisers-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#071118" strokeWidth="0.85" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#organisers-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Header Block                                              */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
                Joint Global Organisers
              </span>
            </div>

            <h2 className="mt-3.5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-dark">
              About the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Organisers
              </span>
            </h2>

            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              {event.name} is jointly organised by Futurex Trade Fair &amp; Events and ETSIPL — organisers of the Buildcon series of international construction exhibitions.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(200,38,45,0.3)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_28px_rgba(200,38,45,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Exhibition Stand →
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Deep Dive Organiser Showcase Cards                        */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {ORGANISERS_DATA.map((org) => {
            const isBlue = org.badgeTheme === "blue";

            return (
              <motion.div
                key={org.name}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-brand-red/50 hover:shadow-2xl hover:shadow-brand-red/[0.08]"
              >
                <div>
                  {/* Top Bar: Large Logo Container + External Link */}
                  <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block h-16 w-48 sm:h-20 sm:w-56 transition-transform duration-300 group-hover:scale-105"
                    >
                      <Image
                        src={org.logo}
                        alt={org.name}
                        fill
                        sizes="240px"
                        className="object-contain object-left"
                      />
                    </a>

                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-brand-red hover:text-brand-red hover:bg-white"
                    >
                      <span>Official Site</span>
                      <span className="text-slate-400 group-hover:text-brand-red">↗</span>
                    </a>
                  </div>

                  {/* Operational Meta Badge */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                    <span
                      className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        isBlue
                          ? "bg-brand-red/10 text-brand-red"
                          : "bg-brand-green/10 text-brand-green"
                      }`}
                    >
                      {org.shortBadge}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{org.hq}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-700 font-medium">{org.established}</span>
                  </div>

                  {/* Company Name */}
                  <h3 className="mt-3 text-lg sm:text-xl font-extrabold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                    {org.name}
                  </h3>

                  {/* Paragraphs */}
                  <div className="mt-3.5 space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                    {org.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Metric Highlights 4-Box Grid */}
                  <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {org.stats.map((st) => (
                      <div
                        key={st.label}
                        className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-center transition-colors group-hover:bg-slate-50"
                      >
                        <div
                          className={`text-base sm:text-lg font-black tracking-tight ${
                            isBlue ? "text-brand-red" : "text-brand-green"
                          }`}
                        >
                          {st.val}
                        </div>
                        <div className="mt-0.5 text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Micro Footer */}
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-red hover:underline"
                >
                  <span>Visit {org.shortBadge} website</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

  {/* ========================================================= */}
{/* Unified Contact Hub (3 Contacts + Reserve Stand)          */}
{/* ========================================================= */}
<div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

  {/* Hub Header */}
  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-slate-100">
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
        Official Directory
      </span>
      <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
        Reach the Organising Secretariat
      </h3>
    </div>
    <p className="text-xs text-slate-500 font-normal max-w-sm">
      Direct official desks for stall bookings, international pavilions, and sponsorship inquiries.
    </p>
  </div>

  {/* 4 Equal Cards Grid */}
  <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">

    {/* Cards 1-3: Contact Desks */}
    {event.contactList.map((desk) => {
      const cleanPhone = desk.phone.replace(/[^0-9+]/g, "");

      return (
        <div
          key={desk.email}
          className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-200 hover:border-brand-red/40 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50"
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Official Representative
            </div>
            <h4 className="mt-1 text-base font-bold text-brand-dark group-hover:text-brand-red transition-colors">
              {desk.name}
            </h4>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/70 flex flex-col gap-2 text-xs">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-white px-3 py-2 font-semibold text-slate-700 transition-all hover:border-brand-green/50 hover:text-brand-green hover:shadow-sm"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <span className="tabular-nums whitespace-nowrap">{desk.phone}</span>
            </a>

            <a
              href={`mailto:${desk.email}`}
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-white px-3 py-2 font-semibold text-slate-700 transition-all hover:border-brand-red/50 hover:text-brand-red hover:shadow-sm"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-50 text-brand-red">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="truncate">{desk.email}</span>
            </a>
          </div>
        </div>
      );
    })}

    {/* Card 4: Reserve Stand (same structure & height as contact cards) */}
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#071118] p-5 text-white shadow-md transition-all hover:shadow-xl">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-red/20 blur-xl" />

      <div className="relative z-10">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Booth Allocation
        </div>
        <h4 className="mt-1 text-base font-bold text-white">
          Reserve Your Prime Stand
        </h4>
      </div>

      <div className="relative z-10 mt-5 pt-3.5 border-t border-white/10 flex flex-col gap-2 text-xs">
        <Link
          href={event.cta.bookStand}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-red px-3 py-2 font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_rgba(200,38,45,0.35)] transition-all hover:bg-brand-red-dark active:scale-[0.99]"
        >
          <span>Book Stand Space</span>
          <span>→</span>
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 font-semibold text-slate-200 transition-all hover:bg-white/10"
        >
          General Helpdesk
        </Link>
      </div>
    </div>

  </div>
</div>
        {/* Bottom Booking Ribbon */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.05] via-white to-brand-green/[0.05] p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-3 text-xs text-slate-700">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-green animate-pulse shrink-0" />
            <span>
              Jointly organised for the {event.editionLabel.toLowerCase()} at {event.venue.fullLocation}, {event.dates.display}.
            </span>
          </div>

          <Link
            href={event.cta.bookStand}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
          >
            Inquire for Space
          </Link>
        </div>

      </Container>
    </div>
  );
}