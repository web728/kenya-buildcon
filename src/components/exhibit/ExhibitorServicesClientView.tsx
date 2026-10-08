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
      staggerChildren: 0.07,
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

const SERVICES = [
  {
    id: "visa",
    title: "Visa Information & Entry Requirements",
    tag: "Travel Guidance",
    body: "International exhibitors and delegates travelling to Kenya must confirm their individual entry requirements before booking flights. Consult the official Kenya Department of Immigration Services for current guidance.",
    link: { label: "Kenya Department of Immigration Services", href: "https://immigration.go.ke/" },
    isAvailable: true,
  },
  {
    id: "invitation-letter",
    title: "Official Visa Invitation Letters",
    tag: "Delegation Support",
    body: "Confirmed exhibitors who need an invitation letter from the organisers to support their entry application can request one once their stand booking is confirmed.",
    cta: { label: "Request Invitation Letter →", href: "/contact" },
    isAvailable: true,
  },
  {
    id: "stand-construction",
    title: "Stand Construction & Space Options",
    tag: "Hall Setup",
    body: "Exhibitors can select between a turnkey Shell Scheme package (complete with branded fascia board, standard carpet, spotlights, power points, and furniture) or Raw Bare Space for custom-fabricated pavilions and heavy machinery displays.",
    cta: { label: "Explore Booth Options →", href: "/exhibit" },
    isAvailable: true,
  },
  {
    id: "freight-logistics",
    title: "Customs Clearance & Freight Logistics",
    tag: "Port & Transport",
    body: "Exhibits shipped to Nairobi typically arrive via the Port of Mombasa or Jomo Kenyatta International Airport. Official freight forwarding partners and temporary import procedures will be shared with all confirmed exhibitors.",
    isAvailable: false,
  },
  {
    id: "hotels",
    title: "Hospitality & Corporate Hotel Bookings",
    tag: "Accommodation",
    body: "Recommended hotels in Westlands and central Nairobi, convenient for The Sarit Expo Centre, will be shared with confirmed exhibitors.",
    isAvailable: false,
  },
  {
    id: "exhibitor-manual",
    title: "Technical Exhibitor Manual",
    tag: "Operations",
    body: "The exhibitor manual with build-up and dismantling schedules, technical guidelines and security procedures will be shared directly with confirmed exhibitors.",
    isAvailable: false,
  },
  {
    id: "on-site-services",
    title: "On-Site Hall Services & Utilities",
    tag: "Trade Floor",
    body: "Details of electrical connections, internet access, material handling and other on-site services for build-up and show days will be shared with confirmed exhibitors.",
    isAvailable: false,
  },
];

export function ExhibitorServicesClientView() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#0b1720" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-grid)" />
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
                Operational Excellence
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark">
              Exhibition Services &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                On-Site Facilities
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
              Essential operational resources, visa facilitation, freight logistics, and booth delivery specifications for participants at {event.name}.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_22px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Exhibition Space →
            </Link>
          </div>
        </div>

        {/* Spacious Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {SERVICES.map((item) => (
            <motion.div
              key={item.id}
              id={item.id}
              variants={itemVariants}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 p-6 sm:p-7 shadow-[0_2px_12px_rgb(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-red/5"
            >
              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {item.tag}
                  </span>

                  {item.isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand-green">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                      Active Service
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Release Pending
                    </span>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="mt-5 text-base sm:text-lg font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                  {item.title}
                </h3>

                {/* Service Description */}
                <p className="mt-2.5 text-xs sm:text-[13.5px] leading-[1.75] text-slate-600 font-normal">
                  {item.body}
                </p>
              </div>

              {/* Action Buttons & Links */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {item.link ? (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark hover:underline"
                  >
                    {item.link.label} ↗
                  </a>
                ) : item.cta ? (
                  <Link
                    href={item.cta.href}
                    className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark hover:underline"
                  >
                    {item.cta.label}
                  </Link>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">
                    Manual release with booth confirmation
                  </span>
                )}

              </div>
            </motion.div>
          ))}
        </motion.div>

     {/* Direct Organizer Helpdesk Card (Brochure Match - Dual Organisers) */}
<div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div className="max-w-xl">
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
        Dedicated Operations Desk
      </span>
      <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
        Require Custom Technical Assistance?
      </h3>
      <p className="mt-2 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
        For custom machinery weight allowances, compressed air installation, or special stand fabrication inquiries, connect directly with the organizing secretariat.
      </p>
    </div>

    {/* Dual Helpline Actions (Futurex & ETSIPL) */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
      {/* Futurex Desk */}
      <a
        href={`tel:${event.contact.futurex.phone.replace(/[^0-9+]/g, "")}`}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs font-semibold text-slate-700 transition-all hover:border-brand-red hover:text-brand-red hover:bg-white hover:shadow-sm"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-50 text-brand-red">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </span>
        <span>Futurex: {event.contact.futurex.phone}</span>
      </a>

      {/* ETSIPL Desk */}
      <a
        href={`tel:${event.contact.etsipl.phone.replace(/[^0-9+]/g, "")}`}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs font-semibold text-slate-700 transition-all hover:border-brand-green hover:text-brand-green hover:bg-white hover:shadow-sm"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-brand-green">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </span>
        <span>ETSIPL: {event.contact.etsipl.phone}</span>
      </a>
    </div>
  </div>
</div>

        {/* Bottom Booking Ribbon */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.04] via-white to-brand-green/[0.04] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Planning your exhibition presence in Nairobi?
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                Held from {event.dates.display} at {event.venue.name}. Stand locations allocated on a first-come, first-served basis.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.bookStand}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-red-dark transition-all duration-200"
          >
            Apply for Stand Space
          </Link>
        </div>
      </Container>
    </div>
  );
}