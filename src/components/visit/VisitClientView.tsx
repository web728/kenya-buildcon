
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   MOTION
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.045,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={parentVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================
   DATA
   Official 2027 brochure: Why Visit, page 7
========================================== */

const VISIT_BENEFITS = [
  {
    number: "01",
    title: "Gain Insights",
    tag: "Industry Knowledge",
    description:
      "Explore developments in construction technology, eco-friendly materials and infrastructure through industry-focused sessions and discussions.",
  },
  {
    number: "02",
    title: "Discover Innovations",
    tag: "Ideas & Best Practices",
    description:
      "Learn about emerging trends and best practices through workshops, seminars and knowledge-sharing opportunities.",
  },
  {
    number: "03",
    title: "Network with Industry Leaders",
    tag: "Professional Connections",
    description:
      "Meet industry professionals and decision-makers to discuss opportunities, challenges and developments in construction.",
  },
  {
    number: "04",
    title: "Explore Solutions",
    tag: "Product Discovery",
    description:
      "Explore a wide range of building and construction products, technologies and services presented across the exhibition profile.",
  },
  {
    number: "05",
    title: "Open Doors to Opportunities",
    tag: "Business Development",
    description:
      "Connect with potential clients, suppliers and business partners while exploring opportunities across the East African market.",
  },
];

const VISITOR_SEGMENTS = [
  {
    number: "01",
    title: "Architects, Engineers & Consultants",
    roles:
      "Architects and Planners, Structural & Civil Engineers, Consulting Engineers, Project Managers, Interior Designers",
  },
  {
    number: "02",
    title: "Importers, Distributors & Suppliers",
    roles:
      "Importers, Dealers and Distributors, Building Material Suppliers, Retailers",
  },
  {
    number: "03",
    title: "Developers & Investors",
    roles:
      "Builders and Developers, Homeowners and Property Investors, Investors and Financiers, Hoteliers",
  },
  {
    number: "04",
    title: "Contractors",
    roles:
      "Building Contractors, Contractors and Subcontractors, Construction Industry Professionals",
  },
  {
    number: "05",
    title: "Government & Institutions",
    roles:
      "Government Agencies and Building Authorities, Universities, Technical and Research Institutes, Facility Managers",
  },
];

/* ==========================================
   SHARED UI
========================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M8 6h10v10" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-[#BE202B]" />

      <span
        className={`text-[10px] font-extrabold uppercase tracking-[0.15em] ${
          light ? "text-white/70" : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   BENEFIT CARD
========================================== */

function BenefitItem({
  item,
}: {
  item: (typeof VISIT_BENEFITS)[number];
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -3,
              transition: {
                duration: 0.25,
                ease: EASE,
              },
            }
      }
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_12px_30px_rgba(17,17,17,0.055)] sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[13px] font-extrabold tabular-nums text-[#BE202B]">
          {item.number}
        </span>

        <span className="h-[2px] w-8 bg-[#25B34B]" />
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#BE202B]">
          {item.tag}
        </p>

        <h3 className="mt-2 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111]">
          {item.title}
        </h3>

        <p className="mt-3 text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
          {item.description}
        </p>
      </div>

      <div className="mt-auto pt-5">
        <Link
          href={event.cta.registerVisit}
          className="group/link inline-flex items-center gap-2 border-t border-[#111111]/10 pt-4 text-[11px] font-extrabold text-[#BE202B] transition-colors hover:text-[#111111]"
        >
          Register to Visit

          <span className="transition-transform duration-300 group-hover/link:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#25B34B] transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* ==========================================
   WHY VISIT
========================================== */

function WhyVisitSection() {
  return (
    <section
      aria-labelledby="why-visit-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[760px]"
          >
            <Eyebrow>
              The Visitor Experience
            </Eyebrow>

            <h2
              id="why-visit-heading"
              className="mt-3 text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.16] tracking-[-0.04em] text-[#111111]"
            >
              Why Visit{" "}
              <span className="text-[#BE202B]">
                Kenya Buildcon?
              </span>
            </h2>

            <p className="mt-3 max-w-[700px] text-[13px] leading-[1.85] text-[#666666] sm:text-[14px]">
              Kenya Buildcon offers a platform to
              explore products and services in
              architecture, building, construction,
              design and engineering, while connecting
              with professionals across the industry.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="shrink-0"
          >
            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-[44px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Register to Visit

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VISIT_BENEFITS.map((item) => (
            <BenefitItem
              key={item.number}
              item={item}
            />
          ))}
        </Reveal>

        <Reveal className="mt-6 border-t border-[#111111]/10 pt-5">
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <p className="text-[12px] font-medium text-[#777777]">
              Explore the exhibition&apos;s product
              and technology scope.
            </p>

            <Link
              href="/exhibition-profile"
              className="group inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B]"
            >
              Browse Exhibition Profile
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   VISITOR PROFILES
========================================== */

function VisitorProfileSection() {
  return (
    <section
      aria-labelledby="visitor-profile-heading"
      className="border-y border-[#111111]/10 bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[760px]"
          >
            <Eyebrow>
              Professional Visitor Profile
            </Eyebrow>

            <h2
              id="visitor-profile-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-[#111111]"
            >
              Meet the People Who{" "}
              <span className="text-[#BE202B]">
                Buy, Build & Specify.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.85] text-[#666666]">
              The exhibition is designed for
              construction professionals involved
              in planning, specification, sourcing,
              development, distribution and project
              delivery across the built environment.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/who-should-visit"
              className="group inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B]"
            >
              Detailed Visitor Profile
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {VISITOR_SEGMENTS.map((segment) => (
            <motion.article
              key={segment.number}
              variants={itemVariants}
              className="group flex min-w-0 flex-col rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#25B34B]/30 hover:shadow-[0_10px_26px_rgba(17,17,17,0.04)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold tabular-nums text-[#BE202B]">
                  {segment.number}
                </span>
                <span className="h-[2px] w-7 bg-[#25B34B]" />
              </div>

              <h3 className="mt-4 text-[16px] font-extrabold leading-[1.4] text-[#111111]">
                {segment.title}
              </h3>

              <p className="mt-3 flex-1 text-[12px] leading-[1.85] text-[#666666]">
                {segment.roles}
              </p>

              <Link
                href="/who-should-visit"
                className="group/link mt-5 flex items-center justify-between gap-3 border-t border-[#111111]/10 pt-4 text-[11px] font-extrabold text-[#BE202B]"
              >
                Explore Visitor Profile

                <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   VISITOR REGISTRATION CTA
========================================== */

function RegistrationSection() {
  return (
    <section
      aria-labelledby="visit-registration-heading"
      className="relative isolate overflow-hidden bg-[#111111] py-12 text-white sm:py-14"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 600 300"
        fill="none"
        className="pointer-events-none absolute bottom-0 right-0 h-full w-auto opacity-35"
      >
        <path
          d="M110 300V110L310 25L510 110V300M180 300V150L310 95L440 150V300"
          stroke="#BE202B"
          strokeOpacity="0.65"
          strokeWidth="1.2"
        />
        <path
          d="M250 300V200H370V300M110 180H510"
          stroke="#25B34B"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </svg>

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
            <Eyebrow light>
              Kenya Buildcon International Expo 2027
            </Eyebrow>

            <h2
              id="visit-registration-heading"
              className="mt-3 text-[clamp(1.85rem,2.9vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.04em]"
            >
              Explore What&apos;s Next{" "}
              <span className="text-white/75">
                in Construction.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.85] text-white/65">
              Plan your visit for{" "}
              {event.dates.display} at{" "}
              {event.venue.name},{" "}
              {event.venue.city},{" "}
              {event.venue.country}.
              Discover products, industry discussions
              and opportunities to connect with
              construction professionals.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3"
          >
            <Link
              href={event.cta.registerVisit}
              className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Register to Visit

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>

            <Link
              href="/venue"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
            >
              Venue & Location
            </Link>
          </motion.div>
        </Reveal>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex h-[3px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>
    </section>
  );
}

/* ==========================================
   MAIN COMPONENT
========================================== */

export function VisitClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <WhyVisitSection />
      <VisitorProfileSection />
      <RegistrationSection />
    </div>
  );
}
