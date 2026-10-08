"use client";

import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] py-16 lg:py-24 text-brand-dark">
      {/* Subtle Background Radial Ambient Light */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-[480px] w-[480px] rounded-full bg-brand-red/[0.04] blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 h-[480px] w-[480px] rounded-full bg-brand-green/[0.04] blur-[140px]" />
        
        {/* Architectural Blueprint Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#0b1720 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* ========================================================= */}
          {/* Left Column - Hero Headline & Integrated Showcase Card     */}
          {/* ========================================================= */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/70 p-7 sm:p-9 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] backdrop-blur-xl lg:col-span-5"
          >
            <div>
              {/* Top Accent Sub-badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-red">
                  {event.editionLabel} · {event.venue.city}
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-[-0.03em] leading-[1.14] text-brand-dark">
                Where Kenya&apos;s{" "}
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                  Building & Construction
                </span>{" "}
                Industry Meets
              </h2>
            </div>

            {/* Strategic Quote Card */}
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/90 p-5 shadow-sm">
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-brand-red to-brand-green" />
              <p className="text-xs sm:text-sm font-medium leading-[1.7] text-slate-700">
                &ldquo;{event.theme}&rdquo; — a collaborative environment where innovation meets opportunity, benefiting exhibitors, attendees, and the industry as a whole.
              </p>
              <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                {event.venue.city}, {event.venue.country}
              </span>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* Right Column - Body Narrative, Features & Direct CTAs     */}
          {/* ========================================================= */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/70 p-7 sm:p-9 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] backdrop-blur-xl lg:col-span-7"
          >
            {/* Paragraphs with spacious typography */}
            <div className="space-y-4 text-slate-600 font-normal">
              <p className="text-sm sm:text-base leading-[1.75] tracking-normal">
                <strong className="font-bold text-brand-dark">{event.name}</strong> is the premier international trade exhibition for the building and construction industry in Kenya, showcasing machinery, tools, materials, architecture, interiors, engineering, manufacturing, and allied products and services.
              </p>
              <p className="text-sm sm:text-base leading-[1.75] tracking-normal">
                Taking place from <span className="font-semibold text-brand-dark">{event.dates.display}</span> at <span className="font-semibold text-brand-dark">{event.venue.fullLocation}</span>, the {event.editionLabel.toLowerCase()} brings together key stakeholders, architects and policymakers — a launchpad for companies eager to tap into East Africa&apos;s construction market.
              </p>
            </div>

            {/* Key Value Propositions (Clean Line-Icons) */}
            <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {/* Feature 1 */}
              <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-300 hover:border-brand-red/30 hover:bg-white hover:shadow-md">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-3 text-xs sm:text-sm font-bold tracking-tight text-brand-dark">
                  Targeted Networking
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-slate-500 font-normal">
                  9,500+ trade visitors attended the previous edition over three days.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-300 hover:border-brand-green/30 hover:bg-white hover:shadow-md">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="mt-3 text-xs sm:text-sm font-bold tracking-tight text-brand-dark">
                  Market Expansion
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-slate-500 font-normal">
                  Access Kenya&apos;s construction sector and the wider East African region.
                </p>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-[0_4px_20px_rgba(200,38,45,0.25)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_6px_24px_rgba(200,38,45,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Event Details
              </Button>
            <Button
  href={event.cta.bookStand}
  variant="secondary"
  className="inline-flex items-center justify-center rounded-full border border-brand-green bg-brand-green px-7 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-brand-dark hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0"
>
  Book a Stand
</Button>
                 
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}