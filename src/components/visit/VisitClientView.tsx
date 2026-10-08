"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { BenefitCard } from "@/components/ui/BenefitCard";

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

// Visitor benefits from the 4th Kenya Buildcon brochure ("Why Visit")
const VISIT_BENEFITS = [
  {
    title: "Gain Insights",
    body: "Interactive sessions with industry leaders on advancements in construction technology, eco-friendly materials, and infrastructure development.",
    badge: "Knowledge",
  },
  {
    title: "Discover Innovations",
    body: "Attend workshops and seminars led by industry experts, learning about emerging trends and best practices.",
    badge: "Workshops",
  },
  {
    title: "Network with Industry Leaders",
    body: "Connect with professionals and decision-makers to discuss opportunities and challenges.",
    badge: "Networking",
  },
  {
    title: "Explore Solutions",
    body: "See a wide range of products and services in architecture, building, construction, design and engineering — all under one roof.",
    badge: "Sourcing",
  },
  {
    title: "Open Doors to Opportunities",
    body: "Meet potential clients and partners, enabling growth in the East African market.",
    badge: "Business Growth",
  },
  {
    title: "Free Visitor Registration",
    body: "Registration is free. Register online to secure your spot and receive updates on the event schedule, exhibitors, and special events.",
    badge: "Free Entry",
  },
];

// Visitor categories (Kenya Buildcon visitor profile)
const VISITOR_SEGMENTS = [
  {
    title: "Architects, Engineers & Consultants",
    roles: "Architects and Planners, Structural & Civil Engineers, Consulting Engineers, Project Managers, Interior Designers",
  },
  {
    title: "Importers, Distributors & Suppliers",
    roles: "Importers, Dealers and Distributors, Building Material Suppliers, Retailers",
  },
  {
    title: "Developers & Investors",
    roles: "Builders and Developers, Homeowners and Property Investors, Investors and Financiers, Hoteliers",
  },
  {
    title: "Contractors",
    roles: "Building Contractors, Contractors and Subcontractors, Construction Industry Professionals",
  },
  {
    title: "Government & Institutions",
    roles: "Government Agencies / Building Authorities, Universities, Technical & Research Institutes, Facility Managers",
  },
];

export function VisitClientView() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="visit-page-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#visit-page-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Header Block 1: Balanced Titles & Direct CTA              */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                Strategic Sourcing Platform
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark">
              Why Visit{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Kenya Buildcon 2027?
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
              Explore products, services and innovations in architecture, building, construction, design and engineering, and meet manufacturers and suppliers face-to-face over three days.
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

        {/* ========================================================= */}
        {/* Section 1: 6 Core Visitor Benefits (Spacious Grid)        */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VISIT_BENEFITS.map((item, idx) => (
            <BenefitCard
              key={item.title}
              title={item.title}
              description={item.body}
              badge={item.badge}
              index={idx}
              light={false}
              cta={{ label: "Register free", href: event.cta.registerVisit }}
            />
          ))}
        </motion.div>

        {/* ========================================================= */}
        {/* Section 2: Who Will You Meet Alongside You?               */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Peer Networking
              </span>
              <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                Meet The People Who Buy, Build, Specify &amp; Source
              </h3>
            </div>
            <Link
              href="/who-should-visit"
              className="text-xs font-bold text-brand-red hover:underline"
            >
              Detailed Profile Breakdown →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISITOR_SEGMENTS.map((seg) => (
              <div
                key={seg.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition-colors hover:border-brand-red/30 hover:bg-white"
              >
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">
                    {seg.title}
                  </h4>
                  <p className="mt-2 text-xs leading-[1.65] text-slate-500 font-normal">
                    {seg.roles}
                  </p>
                </div>

                <Link
                  href="/who-should-visit"
                  className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-brand-red hover:underline"
                >
                  <span>See visitor profile</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Action Ribbon                                      */}
        {/* ========================================================= */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.04] via-white to-brand-green/[0.04] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Free pre-registration is open for trade professionals
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                Join industry professionals from {event.dates.display} at {event.venue.fullLocation}.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
          >
            Register to Visit
          </Link>
        </div>
      </Container>
    </div>
  );
}   