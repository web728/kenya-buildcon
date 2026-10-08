"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FinalCtaSection() {
  return (
    <section
      aria-label="Event Participation and Registration"
      className="relative overflow-hidden bg-slate-50/70 py-12 sm:py-16 border-b border-slate-200/80"
    >
      {/* Light Background Subtle Grid Motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <Container className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-[#071118] p-6 sm:p-10 shadow-2xl text-white"
        >
          {/* Top Subtle Gradient Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-red to-transparent" />

          {/* Ambient Inner Glows */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-green/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content Area */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  {event.brandLines.main}
                </span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Shape East Africa&apos;s{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green">
                  Construction Future
                </span>
              </h2>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                Connect with trade buyers, contractors, and decision-makers at {event.venue.name}, {event.venue.city}.
              </p>

              {/* Minimal Schedule Bar */}
              <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.dates.display}
                </span>

                <span className="hidden h-3.5 w-px bg-white/20 sm:block" />

                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.venue.fullLocation}
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-red/30 transition-all duration-300 hover:bg-brand-red-dark hover:shadow-brand-red/50 hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Book a Stand</span>
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href={event.cta.registerVisit}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-brand-green/80 hover:bg-white/[0.12] hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Register to Visit</span>
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}