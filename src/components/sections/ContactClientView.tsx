"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

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

const CONTACT_PERSONS = [
  {
    company: "Futurex Group",
    location: "New Delhi",
    person: event.contact.futurex,
    isBlue: true,
  },
  {
    company: "ETSIPL",
    location: "Navi Mumbai",
    person: event.contact.etsipl,
    isBlue: false,
  },
  {
    company: "Futurex Group",
    location: "New Delhi",
    person: event.contact.sales,
    isBlue: true,
  },
];

export function ContactClientView() {
  return (
    <div className="relative overflow-hidden bg-slate-50/50 py-16 sm:py-24 text-brand-dark selection:bg-brand-red selection:text-white">
      {/* Background Architectural Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-page-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0b1720" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-page-grid)" />
        </svg>
      </div>

      {/* Ambient Gradient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 -z-10 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />

      <Container className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pb-10 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-red/20 bg-brand-red/[0.06] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
                Contact Directory
              </span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12] text-brand-dark">
              Connect with Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-dark to-brand-green">
                Team
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              For stand bookings, country pavilions, sponsorship, partnerships or general enquiries about Kenya Buildcon 2027.
            </p>
          </div>

          {/* Schedule Badge Card */}
          <div className="shrink-0 rounded-2xl border border-slate-200/90 bg-white/80 p-5 shadow-sm backdrop-blur-md text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Event Schedule
            </span>
            <span className="mt-1 text-sm sm:text-base font-extrabold text-brand-dark block">
              {event.dates.display}
            </span>
            <span className="mt-0.5 text-xs text-slate-500 font-medium block">
              {event.venue.fullLocation}
            </span>
          </div>
        </div>

        {/* Section 1: Contact Form (Now on Top) */}
        <div className="mt-12 sm:mt-16 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-xl shadow-slate-200/50 max-w-4xl mx-auto">
          <div className="text-center pb-8 border-b border-slate-100 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
              Send Us a Message
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Fill out the enquiry form below and our team will get back to you shortly.
            </p>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        {/* Section 2: Direct Team Contact Cards (Below Form) */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="text-center pb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
              Direct Assistance
            </span>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold tracking-tight text-brand-dark">
              Or Speak Directly with Our Organising Team
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CONTACT_PERSONS.map((item) => {
              const cleanPhone = item.person.phone.replace(/[^0-9+]/g, "");

              return (
                <motion.div
                  key={item.person.email}
                  variants={itemVariants}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          item.isBlue
                            ? "bg-brand-red/10 text-brand-red"
                            : "bg-brand-green/10 text-brand-green"
                        }`}
                      >
                        {item.company}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {item.location}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-colors">
                      {item.person.name}
                    </h3>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2.5 text-xs">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 px-4 py-2.5 font-semibold text-slate-700 transition-all hover:border-brand-green/50 hover:bg-white hover:text-brand-green hover:shadow-sm"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-brand-green">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <span className="tabular-nums">{item.person.phone}</span>
                    </a>

                    <a
                      href={`mailto:${item.person.email}`}
                      className="inline-flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 px-4 py-2.5 font-semibold text-slate-700 transition-all hover:border-brand-red/50 hover:bg-white hover:text-brand-red hover:shadow-sm"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-50 text-brand-red">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span className="truncate">{item.person.email}</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Booking Action Ribbon */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-brand-red/20 bg-gradient-to-r from-brand-red/[0.05] via-white to-brand-green/[0.05] p-7 shadow-lg shadow-brand-red/5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green shadow-inner">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-brand-dark">
                Planning to participate as an exhibitor or trade delegate?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                Held from {event.dates.display} at {event.venue.name}, {event.venue.city}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href={event.cta.bookStand}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand-red/20 hover:bg-brand-red-dark hover:shadow-lg transition-all duration-200"
            >
              Book Stand Space
            </Link>
            <Link
              href={event.cta.registerVisit}
              className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:border-brand-red hover:text-brand-red hover:bg-slate-50 transition-all duration-200"
            >
              Visitor Pass
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}