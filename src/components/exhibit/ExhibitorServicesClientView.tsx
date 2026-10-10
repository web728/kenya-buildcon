
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
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
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
   ICONS
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

function PhoneIcon() {
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
      <path d="M5 3h4l2 5-2.5 2.2a15 15 0 005.3 5.3L16 13l5 2v4a2 2 0 01-2 2C10.2 21 3 13.8 3 5a2 2 0 012-2Z" />
    </svg>
  );
}

/* ==========================================
   SERVICE CONTENT

   Service topics retained from original page.
   Unconfirmed commercial arrangements are
   described as enquiries, not guarantees.
========================================== */

type Service = {
  id: string;
  number: string;
  title: string;
  tag: string;
  body: string;
  icon: string;
  actionLabel: string;
  actionHref: string;
  external?: boolean;
  note?: string;
};

const SERVICES: Service[] = [
  {
    id: "visa",
    number: "01",
    title: "Visa Information & Entry Requirements",
    tag: "Travel Guidance",
    body:
      "International exhibitors and delegates should check the latest Kenyan entry and travel requirements before arranging their journey. Entry conditions depend on nationality and individual circumstances.",
    icon:
      "M12 3a9 9 0 100 18 9 9 0 000-18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18",
    actionLabel: "Official Immigration Information",
    actionHref: "https://immigration.go.ke/",
    external: true,
    note: "Always check official government guidance.",
  },
  {
    id: "invitation-letter",
    number: "02",
    title: "Exhibitor Invitation Letters",
    tag: "Documentation",
    body:
      "Exhibitors requiring an invitation letter for travel documentation can contact the organising team with their company and participation details. Requests are subject to organiser verification.",
    icon:
      "M5 4h14v16H5V4Zm3 4h8M8 12h8M8 16h5",
    actionLabel: "Contact Organisers",
    actionHref: "/contact",
    note: "An invitation letter does not guarantee entry approval.",
  },
  {
    id: "stand-construction",
    number: "03",
    title: "Stand Construction & Space Options",
    tag: "Exhibition Space",
    body:
      "Discuss shell scheme participation, raw space and custom stand requirements with the organisers. Stand dimensions, fittings, power provision and any special construction arrangements should be confirmed before fabrication.",
    icon:
      "M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4",
    actionLabel: "Explore Exhibiting Options",
    actionHref: "/exhibit",
    note: "Final specifications depend on the agreed stand package.",
  },
  {
    id: "freight-logistics",
    number: "04",
    title: "Customs Clearance & Freight Logistics",
    tag: "Shipping & Transport",
    body:
      "Exhibitors planning to transport machinery, product samples or display materials to Nairobi should review freight handling, customs documentation, delivery schedules and temporary import requirements with their appointed logistics providers and the organising team.",
    icon:
      "M3 7h11v10H3V7Zm11 3h4l3 4v3h-7v-7ZM7 20a2 2 0 100-4 2 2 0 000 4Zm11 0a2 2 0 100-4 2 2 0 000 4Z",
    actionLabel: "Discuss Freight Requirements",
    actionHref: "/contact",
    note: "No official freight partner is specified in the supplied brochure.",
  },
  {
    id: "hotels",
    number: "05",
    title: "Accommodation & Travel Planning",
    tag: "Hospitality",
    body:
      "Plan accommodation and local transport around The Sarit Expo Centre in Westlands, Nairobi. Exhibitors may contact the organising team for event-location guidance while arranging their own hotel and transport reservations.",
    icon:
      "M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M2 21h20M8 7h2M14 7h2M8 11h2M14 11h2M9 21v-6h6v6",
    actionLabel: "View Venue Information",
    actionHref: "/venue",
    note: "Hotel rates and preferred properties are not confirmed here.",
  },
  {
    id: "exhibitor-manual",
    number: "06",
    title: "Technical Exhibitor Manual",
    tag: "Exhibition Operations",
    body:
      "For build-up and dismantling arrangements, stand-design approvals, venue access, safety rules and technical requirements, contact the organisers for the applicable exhibitor instructions and event documentation.",
    icon:
      "M6 3h9l4 4v14H6a2 2 0 01-2-2V5a2 2 0 012-2Zm9 0v5h5M8 12h8M8 16h8",
    actionLabel: "Request Technical Guidance",
    actionHref: "/contact",
    note: "Operational schedules and technical limits require confirmation.",
  },
  {
    id: "on-site-services",
    number: "07",
    title: "On-Site Hall Services & Utilities",
    tag: "Venue Facilities",
    body:
      "Discuss electricity, internet connectivity, material handling, machinery placement and special utility needs before finalising your stand design. Service scope, charges and availability should be confirmed with the organisers.",
    icon:
      "M13 2 5 13h6l-1 9 9-12h-6l1-8Z",
    actionLabel: "Contact the Operations Team",
    actionHref: "/contact",
    note: "Utility connections and technical capacities are not guaranteed.",
  },
];

/* ==========================================
   SECTION HEADING
========================================== */

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
   SERVICE CARD
========================================== */

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reducedMotion = useReducedMotion();

  const isGreen = index % 4 === 1;

  return (
    <motion.article
      id={service.id}
      variants={itemVariants}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: 0.3,
                ease: EASE,
              },
            }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_14px_34px_rgba(17,17,17,0.06)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${
            isGreen
              ? "bg-[#25B34B]/[0.08] text-[#1D9440] group-hover:bg-[#25B34B] group-hover:text-white"
              : "bg-[#BE202B]/[0.07] text-[#BE202B] group-hover:bg-[#BE202B] group-hover:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[21px] w-[21px]"
            aria-hidden="true"
          >
            <path d={service.icon} />
          </svg>
        </span>

        <span className="text-[11px] font-bold tabular-nums text-[#AAAAAA]">
          {service.number}
        </span>
      </div>

      <div className="mt-5">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#BE202B]">
          {service.tag}
        </span>

        <h3 className="mt-2 text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111]">
          {service.title}
        </h3>
      </div>

      <p className="mt-3 flex-1 text-[12px] leading-[1.85] text-[#666666] sm:text-[13px]">
        {service.body}
      </p>

     

      <div className="mt-5 border-t border-[#111111]/10 pt-4">
        {service.external ? (
          <a
            href={service.actionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-[11px] font-extrabold text-[#BE202B] transition-colors hover:text-[#111111]"
          >
            {service.actionLabel}

            <span className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
              <ArrowIcon diagonal />
            </span>
          </a>
        ) : (
          <Link
            href={service.actionHref}
            className="group/link inline-flex items-center gap-2 text-[11px] font-extrabold text-[#BE202B] transition-colors hover:text-[#111111]"
          >
            {service.actionLabel}

            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        )}
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#25B34B] transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* ==========================================
   SERVICES DIRECTORY
========================================== */

function ServicesDirectory() {
  return (
    <section
      aria-labelledby="exhibitor-services-heading"
      className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Container className="relative z-10">
        <Reveal className="flex flex-col gap-5 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
            <Eyebrow>
              Exhibitor Planning Resources
            </Eyebrow>

            <h2
              id="exhibitor-services-heading"
              className="mt-3 text-[clamp(1.8rem,3vw,2.7rem)] font-extrabold leading-[1.17] tracking-[-0.04em] text-[#111111]"
            >
              Plan Your Exhibition{" "}
              <span className="text-[#BE202B]">
                Participation.
              </span>
            </h2>

            <p className="mt-3 max-w-[690px] text-[13px] leading-[1.8] text-[#666666] sm:text-[14px]">
              Practical information for exhibitors
              preparing to participate in{" "}
              {event.name} at{" "}
              {event.venue.name} in Nairobi.
              Explore travel requirements, exhibition
              space, logistics and technical enquiries.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[43px] items-center gap-3 rounded-md bg-[#BE202B] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#A51B25]"
            >
              Book Exhibition Space

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </Reveal>

     
      </Container>
    </section>
  );
}

/* ==========================================
   ORGANISER HELP DESK
========================================== */

function OrganiserHelpdesk() {
  return (
    <section
      aria-labelledby="operations-helpdesk-heading"
      className="border-y border-[#111111]/10 bg-[#F8F8F8] py-10 sm:py-12"
    >
      <Container>
        <Reveal className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div variants={itemVariants}>
            <Eyebrow>
              Organiser Assistance
            </Eyebrow>

            <h2
              id="operations-helpdesk-heading"
              className="mt-3 text-[clamp(1.7rem,2.6vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#111111]"
            >
              Need Technical{" "}
              <span className="text-[#BE202B]">
                Assistance?
              </span>
            </h2>

            <p className="mt-3 max-w-[570px] text-[13px] leading-[1.8] text-[#666666]">
              For exhibition space planning,
              custom stand fabrication, heavy
              equipment displays, logistics
              coordination or operational questions,
              contact the Kenya Buildcon
              organising team.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-[12px] font-extrabold text-[#BE202B] hover:text-[#111111]"
            >
              Contact Organisers
              <ArrowIcon />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-[#111111]/10 bg-white p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#111111]/10 pb-4">
              <h3 className="text-[14px] font-extrabold text-[#111111]">
                Official Contact Desks
              </h3>

              <span className="h-[2px] w-8 bg-[#25B34B]" />
            </div>

            <div className="mt-4 grid gap-2">
              {event.contactList.map((contact) => (
                <a
                  key={contact.email}
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="group flex min-w-0 items-center gap-3 rounded-md border border-[#111111]/[0.08] bg-[#FAFAFA] p-3.5 transition-colors duration-300 hover:border-[#BE202B]/25 hover:bg-white"
                  aria-label={`Call ${contact.name} at ${contact.phone}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#BE202B]/[0.07] text-[#BE202B]">
                    <PhoneIcon />
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-[12px] font-extrabold text-[#111111]">
                      {contact.name}
                    </span>

                    <span className="text-[11px] font-medium tabular-nums text-[#777777]">
                      {contact.phone}
                    </span>
                  </span>

                  <span className="text-[#BE202B] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              ))}
            </div>

             
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   FINAL BOOKING CTA
========================================== */

function ServicesBookingCta() {
  return (
    <section
      aria-labelledby="services-booking-heading"
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
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />

        <path
          d="M250 300V200H370V300M110 180H510"
          stroke="#25B34B"
          strokeOpacity="0.4"
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
              Kenya Buildcon 2027
            </Eyebrow>

            <h2
              id="services-booking-heading"
              className="mt-3 text-[clamp(1.8rem,2.9vw,2.65rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white"
            >
              Prepare Your Stand.{" "}
              <span className="text-white/75">
                Connect in Nairobi.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.8] text-white/65">
              Explore exhibiting opportunities at{" "}
              {event.name}, taking place
              {` ${event.dates.display}`} at{" "}
              {event.venue.name},{" "}
              {event.venue.city}.
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
              Book Exhibition Space

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
            >
              Get Assistance
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

export function ExhibitorServicesClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <ServicesDirectory />
      <OrganiserHelpdesk />
      <ServicesBookingCta />
    </div>
  );
}
