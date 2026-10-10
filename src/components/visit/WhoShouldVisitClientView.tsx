
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
import { visitorGroups } from "@/data/visitorProfile";
import { visitorGroupIconMap } from "@/components/icons/MiscIcons";

/* ==========================================
   MOTION SETTINGS
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.04,
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

/* ==========================================
   OFFICIAL BROCHURE OBJECTIVES
   Source: Kenya Buildcon 2027, page 7
========================================== */

const VISITOR_OBJECTIVES = [
  {
    number: "01",
    title: "Explore Solutions",
    description:
      "See a wide range of products and services in architecture, building, construction, design and engineering, all under one roof.",
  },
  {
    number: "02",
    title: "Gain Insights",
    description:
      "Engage with industry leaders on advancements in construction technology, eco-friendly materials and infrastructure development.",
  },
  {
    number: "03",
    title: "Discover Innovations",
    description:
      "Attend workshops and seminars led by industry experts to learn about emerging trends and best practices.",
  },
  {
    number: "04",
    title: "Network with Industry Leaders",
    description:
      "Connect with professionals and decision-makers to discuss opportunities and challenges facing the industry.",
  },
  {
    number: "05",
    title: "Open Doors to Opportunities",
    description:
      "Meet potential clients and partners while exploring opportunities for growth in the East African market.",
  },
];

/* ==========================================
   SHARED COMPONENTS
========================================== */

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

function ArrowIcon() {
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
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function DefaultGroupIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 21V7l8-4 8 4v14M2 21h20M9 9h1m4 0h1m-6 4h1m4 0h1m-5 8v-4h4v4" />
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
   VISITOR GROUP CARD
========================================== */

function VisitorGroupCard({
  group,
  index,
}: {
  group: (typeof visitorGroups)[number];
  index: number;
}) {
  const reducedMotion = useReducedMotion();

  const Icon = visitorGroupIconMap[group.slug];

  const useGreenAccent = index % 3 === 1;

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
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 shadow-[0_6px_24px_rgba(17,17,17,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_12px_32px_rgba(17,17,17,0.06)] sm:p-6"
    >
      {/* Icon and number */}
      <div className="flex items-center justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors duration-300 ${
            useGreenAccent
              ? "bg-[#25B34B]/[0.08] text-[#1D9440] group-hover:bg-[#25B34B] group-hover:text-white"
              : "bg-[#BE202B]/[0.07] text-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white"
          }`}
        >
          {Icon ? (
            <Icon className="h-5 w-5" />
          ) : (
            <DefaultGroupIcon />
          )}
        </div>

        <span className="text-[11px] font-extrabold tabular-nums tracking-[0.08em] text-[#AAAAAA]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Group name */}
      <h3 className="mt-5 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] transition-colors duration-300 group-hover:text-[#BE202B]">
        {group.name}
      </h3>

      {/* All roles from existing dataset */}
      <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2">
        {group.roles.map((role) => (
          <li
            key={role}
            className="inline-flex items-start gap-2 rounded-md border border-[#111111]/[0.07] bg-[#F8F8F8] px-3 py-2 text-[11px] font-medium leading-[1.55] text-[#555555]"
          >
            <span
              aria-hidden="true"
              className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#25B34B]"
            />
            <span>{role}</span>
          </li>
        ))}
      </ul>

      {/* Registration link */}
      <Link
        href={event.cta.registerVisit}
        className="group/link mt-6 flex items-center justify-between gap-3 border-t border-[#111111]/10 pt-4 text-[11px] font-extrabold text-[#BE202B] transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B]"
      >
        <span>Register to Visit</span>

        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
          <ArrowIcon />
        </span>
      </Link>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#25B34B] transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* ==========================================
   VISITOR GROUPS SECTION
========================================== */

function VisitorGroupsSection() {
  return (
    <section
      aria-labelledby="visitor-groups-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
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
              Professional Visitor Profile
            </Eyebrow>

            <h2
              id="visitor-groups-heading"
              className="mt-3 text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.16] tracking-[-0.04em] text-[#111111]"
            >
              Who Should{" "}
              <span className="text-[#BE202B]">
                Visit Kenya Buildcon?
              </span>
            </h2>

            <p className="mt-3 max-w-[710px] text-[13px] leading-[1.85] text-[#666666] sm:text-[14px]">
              Kenya Buildcon is designed for the
              professionals and organisations
              involved in the planning, sourcing,
              specification, construction and
              development of building and
              infrastructure projects.
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

        <Reveal className="mt-6 grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visitorGroups.map((group, index) => (
            <VisitorGroupCard
              key={group.slug}
              group={group}
              index={index}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   WHY VISIT OBJECTIVES
========================================== */

function VisitorObjectivesSection() {
  return (
    <section
      aria-labelledby="visitor-objectives-heading"
      className="border-y border-[#111111]/10 bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
            <Eyebrow>
              Exhibition Experience
            </Eyebrow>

            <h2
              id="visitor-objectives-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-[#111111]"
            >
              What You Can{" "}
              <span className="text-[#BE202B]">
                Explore at the Expo.
              </span>
            </h2>

            <p className="mt-3 max-w-[690px] text-[13px] leading-[1.85] text-[#666666]">
              The official event brochure highlights
              opportunities to discover products,
              exchange knowledge, build industry
              connections and explore business
              possibilities across East Africa.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/exhibition-profile"
              className="group inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B]"
            >
              Explore Exhibition Profile

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VISITOR_OBJECTIVES.map((item) => (
            <motion.article
              key={item.number}
              variants={itemVariants}
              className="group relative flex flex-col rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_10px_28px_rgba(17,17,17,0.04)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[12px] font-extrabold text-[#BE202B]">
                  {item.number}
                </span>

                <span className="h-[2px] w-7 bg-[#25B34B]" />
              </div>

              <h3 className="mt-5 text-[16px] font-extrabold leading-[1.4] text-[#111111]">
                {item.title}
              </h3>

              <p className="mt-3 text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   VISITOR REGISTRATION
========================================== */

function VisitorRegistrationSection() {
  return (
    <section
      aria-labelledby="visitor-registration-heading"
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
          strokeWidth="1.2"
          strokeOpacity="0.65"
        />

        <path
          d="M250 300V200H370V300M110 180H510"
          stroke="#25B34B"
          strokeWidth="1"
          strokeOpacity="0.45"
        />
      </svg>

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
            <Eyebrow light>
              Kenya Buildcon 2027
            </Eyebrow>

            <h2
              id="visitor-registration-heading"
              className="mt-3 text-[clamp(1.85rem,2.9vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.04em] text-white"
            >
              Connect With the{" "}
              <span className="text-white/75">
                Construction Industry.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.85] text-white/65">
              Explore products, meet industry
              professionals and discover opportunities
              at {event.name}, taking place{" "}
              {event.dates.display} at{" "}
              {event.venue.name},{" "}
              {event.venue.city},{" "}
              {event.venue.country}.
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
              Venue Information
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
   MAIN VIEW
========================================== */

export function WhoShouldVisitClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <VisitorGroupsSection />
      <VisitorObjectivesSection />
      <VisitorRegistrationSection />
    </div>
  );
}
