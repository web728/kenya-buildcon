
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   BRAND & MOTION
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={parentVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================
   SHARED ELEMENTS
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
      className="h-4 w-4"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M8 6h10v10" />
      ) : (
        <path d="M4 12h16m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}

function SmallLabel({
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
        className={`text-[10px] font-extrabold uppercase tracking-[0.16em] ${
          light ? "text-white/75" : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function SectionPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />
      <svg
        viewBox="0 0 1300 450"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M780 450V120L1030 25L1280 120V450M850 450V170L1030 100L1210 170V450"
          stroke="#BE202B"
          strokeWidth="0.9"
          strokeOpacity="0.08"
        />
        <path
          d="M0 365C270 230 460 415 770 310S1160 250 1380 340"
          stroke="#25B34B"
          strokeWidth="0.9"
          strokeOpacity="0.1"
        />
      </svg>
    </div>
  );
}

/* ==========================================
   ORGANISER DATA
   Preserved from original component
========================================== */

const ORGANISERS = [
  {
    id: "futurex",
    name: "FUTUREX TRADE FAIR & EVENTS PVT. LTD.",
    shortName: "Futurex Group",
    location: "New Delhi, India",
    credential: "Operating Since 2011",
    url: "https://www.futurextrade.com/",
    logo: "/logos/futurex-logo.png",
    accent: "red" as const,
    paragraphs: [
      "FUTUREX TRADE FAIR AND EVENTS PVT. LTD. aims to provide an ideal business platform through exhibitions, seminars, corporate events and get-togethers. Its strength lies in understanding the industry's needs and interests, and in multidimensional activities that make it a viable business platform — recognised by industry professionals as a safe bet.",
      "Futurex believes in making exhibitions the most sustainable and cost-effective mode of business activity, with the perfect blend of the best manufacturers and potential industry buyers from around the world.",
    ],
    stats: [
      { label: "Trade Exhibitions", value: "220+" },
      { label: "Exhibitors Hosted", value: "16,500+" },
      { label: "Brands on Display", value: "25,800+" },
      { label: "Global Trade Visitors", value: "950K+" },
    ],
  },
  {
    id: "etsipl",
    name: "EXHIBITIONS & TRADE SERVICES INDIA PVT. LTD.",
    shortName: "ETSIPL",
    location: "Navi Mumbai, India",
    credential: "ISO 9001:2015 Certified",
    url: "https://www.etsipl.in/",
    logo: "/logos/etsipl-logo.png",
    accent: "green" as const,
    paragraphs: [
      "EXHIBITIONS & TRADE SERVICES INDIA PRIVATE LIMITED (ETSIPL), based out of Navi Mumbai, India, is an ISO 9001:2015 Certified Organization with more than 12 years of experience in the promotion and organizing of trade exhibitions across the globe.",
      "Through its global network, ETSIPL has a presence worldwide with local partners situated in most of the continents and is professionally committed to delivering the best trade services in the industry. Its goal through Kenya Buildcon is to provide opportunities to explore the potential of Kenya and the other countries in the East Africa region.",
    ],
    stats: [
      { label: "Global Track Record", value: "12+ Yrs" },
      { label: "Quality Certification", value: "ISO 9001" },
      { label: "Partner Network", value: "Worldwide" },
      { label: "Regional Target", value: "East Africa" },
    ],
  },
];

/* ==========================================
   ORGANISER PROFILE CARD
========================================== */

function OrganiserCard({
  organiser,
  index,
}: {
  organiser: (typeof ORGANISERS)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const isFuturex = organiser.accent === "red";

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: 0.32,
                ease: EASE,
              },
            }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#111111]/10 bg-white shadow-[0_8px_30px_rgba(17,17,17,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_16px_38px_rgba(17,17,17,0.07)]"
    >
      {/* Organisation branding */}
      <div className="border-b border-[#111111]/10 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`text-[10px] font-extrabold uppercase tracking-[0.14em] ${
              isFuturex ? "text-[#BE202B]" : "text-[#1D9440]"
            }`}
          >
            Joint Organiser · 0{index + 1}
          </span>

          <span className="text-[10px] font-bold text-[#AAAAAA]">
            {organiser.credential}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <a
            href={organiser.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit the official website of ${organiser.shortName}`}
            className="relative block h-[68px] w-[190px] sm:h-[76px] sm:w-[225px]"
          >
            <Image
              src={organiser.logo}
              alt={`${organiser.shortName} official logo`}
              fill
              sizes="(max-width: 640px) 190px, 225px"
              className="object-contain object-left"
            />
          </a>

          <a
            href={organiser.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#555555] transition-colors hover:text-[#BE202B]"
          >
            Official Website
            <ArrowIcon diagonal />
          </a>
        </div>
      </div>

      {/* Profile */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isFuturex ? "bg-[#BE202B]" : "bg-[#25B34B]"
            }`}
          />

          <span className="text-[11px] font-semibold text-[#777777]">
            {organiser.location}
          </span>
        </div>

        <h3 className="mt-3 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] sm:text-[19px]">
          {organiser.name}
        </h3>

        <div className="mt-4 space-y-3">
          {organiser.paragraphs.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Organisation reported metrics */}
        <div className="mt-auto pt-6">
          <div className="mb-3 flex items-center justify-between gap-3 border-t border-[#111111]/10 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#888888]">
              Organisation Highlights
            </span>
            <span className="text-[10px] font-semibold text-[#AAAAAA]">
              Company profile
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {organiser.stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-md border border-[#111111]/[0.07] bg-[#F8F8F8] p-3"
              >
                <span
                  className={`block break-words text-[15px] font-black leading-[1.25] tracking-[-0.03em] sm:text-[17px] ${
                    isFuturex ? "text-[#BE202B]" : "text-[#1D9440]"
                  }`}
                >
                  {stat.value}
                </span>

                <span className="mt-1.5 block text-[9px] font-semibold leading-[1.5] text-[#777777]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex h-[3px]"
      >
        <span
          className={`w-[80%] ${
            isFuturex ? "bg-[#BE202B]" : "bg-[#25B34B]"
          }`}
        />
        <span className="flex-1 bg-[#111111]" />
      </div>
    </motion.article>
  );
}

/* ==========================================
   ORGANISER INTRODUCTION
========================================== */

function OrganisersOverview() {
  return (
    <section
      aria-labelledby="organisers-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <SectionPattern />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[780px]"
          >
            <SmallLabel>
              Joint Global Organisers
            </SmallLabel>

            <h2
              id="organisers-heading"
              className="mt-3 text-[clamp(1.8rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.04em] text-[#111111]"
            >
              Experienced Teams.{" "}
              <span className="text-[#BE202B]">
                One Trade Platform.
              </span>
            </h2>

            <p className="mt-3 max-w-[680px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
              {event.name} is jointly organised by
              Futurex Trade Fair &amp; Events and
              Exhibitions &amp; Trade Services India
              (ETSIPL), bringing exhibition
              experience and international business
              connections to the Buildcon platform.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[43px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors duration-300 hover:bg-[#A51B25]"
            >
              Book Exhibition Stand

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid items-stretch gap-4 lg:grid-cols-2">
          {ORGANISERS.map((organiser, index) => (
            <OrganiserCard
              key={organiser.id}
              organiser={organiser}
              index={index}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   OFFICIAL CONTACT DESK
========================================== */

function ContactIcon({
  type,
}: {
  type: "phone" | "email";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px] shrink-0"
      aria-hidden="true"
    >
      {type === "phone" ? (
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.04 11.04 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ) : (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      )}
    </svg>
  );
}

function OrganiserContacts() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="organisers-contact-heading"
      className="border-y border-[#111111]/[0.07] bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={itemVariants}>
            <SmallLabel>
              Official Contact Directory
            </SmallLabel>

            <h2
              id="organisers-contact-heading"
              className="mt-3 text-[clamp(1.75rem,2.8vw,2.55rem)] font-extrabold tracking-[-0.04em] text-[#111111]"
            >
              Connect With the{" "}
              <span className="text-[#BE202B]">
                Organising Team.
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-[360px] text-[12px] leading-[1.75] text-[#777777] sm:text-[13px]"
          >
            Contact the event representatives for
            exhibition participation, stand bookings
            and general enquiries.
          </motion.p>
        </Reveal>

        {/* Actual contact list from central config */}
        <Reveal className="mt-6 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {event.contactList.map((desk) => {
            const dialPhone = desk.phone.replace(/[^0-9+]/g, "");

            return (
              <motion.article
                key={desk.email}
                variants={itemVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: {
                          duration: 0.3,
                          ease: EASE,
                        },
                      }
                }
                className="group flex min-w-0 flex-col rounded-lg border border-[#111111]/10 bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/25 hover:shadow-[0_10px_28px_rgba(17,17,17,0.05)]"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-[0.11em] text-[#BE202B]">
                  Official Representative
                </span>

                <h3 className="mt-2 text-[15px] font-extrabold leading-[1.4] text-[#111111]">
                  {desk.name}
                </h3>

                <div className="mt-auto space-y-2 pt-5">
                  <a
                    href={`tel:${dialPhone}`}
                    className="flex min-w-0 items-center gap-2.5 rounded-md border border-[#111111]/[0.07] bg-[#FAFAFA] px-3 py-2.5 text-[11px] font-semibold text-[#555555] transition-colors hover:border-[#25B34B]/40 hover:text-[#1D9440]"
                  >
                    <ContactIcon type="phone" />
                    <span className="min-w-0 break-words">
                      {desk.phone}
                    </span>
                  </a>

                  <a
                    href={`mailto:${desk.email}`}
                    className="flex min-w-0 items-center gap-2.5 rounded-md border border-[#111111]/[0.07] bg-[#FAFAFA] px-3 py-2.5 text-[11px] font-semibold text-[#555555] transition-colors hover:border-[#BE202B]/40 hover:text-[#BE202B]"
                  >
                    <ContactIcon type="email" />
                    <span className="min-w-0 break-all">
                      {desk.email}
                    </span>
                  </a>
                </div>
              </motion.article>
            );
          })}

          {/* Fourth CTA card */}
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-[#111111] p-5 text-white"
          >
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-12 h-32 w-32 rounded-full border border-[#BE202B]/30"
            />

            <div className="relative">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#F26B70]">
                Exhibition Participation
              </span>

              <h3 className="mt-3 max-w-[220px] text-[19px] font-extrabold leading-[1.3] tracking-[-0.025em]">
                Bring Your Brand to Nairobi.
              </h3>

              <p className="mt-3 text-[12px] leading-[1.75] text-white/65">
                Enquire about stand space and
                participation opportunities.
              </p>
            </div>

            <div className="relative mt-6 flex flex-col gap-2">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-[40px] items-center justify-between gap-3 rounded-md bg-[#BE202B] px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#A51B25]"
              >
                Book Stand Space
                <ArrowIcon diagonal />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[40px] items-center justify-center rounded-md border border-white/20 px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#111111]"
              >
                General Helpdesk
              </Link>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   CLOSING CTA
========================================== */

function OrganisersClosing() {
  return (
    <section
      aria-labelledby="organisers-closing-heading"
      className="relative isolate overflow-hidden bg-[#111111] py-10 text-white sm:py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[720px]"
          >
            <SmallLabel light>
              Kenya Buildcon International Expo
            </SmallLabel>

            <h2
              id="organisers-closing-heading"
              className="mt-3 text-[clamp(1.8rem,2.8vw,2.7rem)] font-extrabold leading-[1.2] tracking-[-0.04em]"
            >
              Build International{" "}
              <span className="text-[#F26B70]">
                Business Connections.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.8] text-white/65">
              Join {event.name} at{" "}
              {event.venue.name},{" "}
              {event.venue.city}. Meet construction
              professionals and explore business
              opportunities across Kenya and East Africa.
            </p>

            <p className="mt-3 text-[11px] font-semibold text-white/50">
              {event.dates.display} · {event.venue.fullLocation}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3"
          >
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[44px] items-center justify-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Book a Stand
              <ArrowIcon diagonal />
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
            >
              Register to Visit
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
   MAIN CLIENT COMPONENT
========================================== */

export function OrganisersClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <OrganisersOverview />
      <OrganiserContacts />
      <OrganisersClosing />
    </div>
  );
}
