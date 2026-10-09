
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

/* =========================================
   MOTION
========================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

/* =========================================
   SOCIAL ICONS
========================================= */

function SocialIcon({
  type,
}: {
  type: "linkedin" | "facebook" | "instagram" | "twitter";
}) {
  if (type === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.3" />
        <circle
          cx="17.7"
          cy="6.5"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    href: event.social.linkedin,
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    href: event.social.facebook,
  },
  {
    key: "instagram" as const,
    label: "Instagram",
    href: event.social.instagram,
  },
  {
    key: "twitter" as const,
    label: "X",
    href: event.social.twitter,
  },
].filter((item) => Boolean(item.href));

/* =========================================
   SUBTLE BACKGROUND
========================================= */

function FooterBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <svg
        viewBox="0 0 1440 650"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.g
          style={{ transformOrigin: "1400px 500px" }}
          animate={
            reduceMotion ? undefined : { rotate: 360 }
          }
          transition={{
            duration: 115,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="1400"
            cy="500"
            r="170"
            stroke="#BE202B"
            strokeOpacity="0.18"
            strokeDasharray="8 15"
          />
          <circle
            cx="1400"
            cy="500"
            r="255"
            stroke="#25B34B"
            strokeOpacity="0.12"
          />
        </motion.g>

        {Array.from({ length: 4 }).map((_, i) => {
          const a = `M-80,${385 + i * 22} C270,${295 + i * 10} 600,${530 - i * 7} 920,${395 + i * 8} C1200,${315 + i * 7} 1410,${480 - i * 6} 1540,${385 + i * 7}`;

          const b = `M-80,${405 + i * 22} C285,${335 + i * 10} 620,${500 - i * 7} 940,${415 + i * 8} C1190,${350 + i * 7} 1420,${455 - i * 6} 1540,${405 + i * 7}`;

          return (
            <motion.path
              key={i}
              d={a}
              stroke={
                i % 2 === 0 ? "#BE202B" : "#25B34B"
              }
              strokeOpacity="0.09"
              strokeWidth="0.8"
              animate={
                reduceMotion
                  ? undefined
                  : { d: [a, b, a] }
              }
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* =========================================
   FOOTER CONTACT
========================================= */

type Contact = (typeof event.contactList)[number];

function FooterContact({
  contact,
}: {
  contact: Contact;
}) {
  const cleanPhone = contact.phone.replace(/[^0-9+]/g, "");

  return (
    <div className="min-w-0">
    

      <h4 className="mt-1 text-[13px] font-bold text-[#F26B70]">
        {contact.name}
      </h4>

      <a
        href={`tel:${cleanPhone}`}
        className="mt-2 block text-[12px] leading-[1.5] text-white/60 transition-colors hover:text-[#25B34B]"
      >
        {contact.phone}
      </a>

      <a
        href={`mailto:${contact.email}`}
        className="mt-1 block break-all text-[12px] leading-[1.5] text-white/60 transition-colors hover:text-[#F26B70]"
      >
        {contact.email}
      </a>
    </div>
  );
}

/* =========================================
   NAV COLUMN
========================================= */

type NavItem = {
  label: string;
  href: string;
};

function NavColumn({
  title,
  items,
}: {
  title: string;
  items?: readonly NavItem[];
}) {
  return (
    <motion.div variants={reveal} className="min-w-0">
      <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">
        {title}
      </h3>

      <ul className="space-y-2">
        {items?.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="text-[12px] leading-[1.5] text-white/55 transition-colors hover:text-[#F26B70]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* =========================================
   MAIN COMPACT FOOTER
========================================= */

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#111111] text-white">
      <FooterBackground />

      {/* Top brand accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 flex h-[3px]"
      >
        <span className="w-[82%] bg-[#BE202B]" />
        <span className="w-[13%] bg-[#25B34B]" />
        <span className="flex-1 bg-white" />
      </div>

      <Container className="relative z-10">
        {/* TOP: BRAND + CONTACTS */}
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid gap-7 border-b border-white/10 pb-7 pt-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:pt-11"
        >
          {/* Brand */}
          <motion.div variants={reveal} className="min-w-0">
            <Link
              href="/"
              aria-label={`${event.name} homepage`}
              className="inline-block max-w-full"
            >
              <Image
                src="/logos/kenya.png"
                alt={event.name}
                width={1000}
                height={348}
                className="h-auto w-[220px] max-w-full object-contain sm:w-[255px]"
              />
            </Link>

            <p className="mt-3 max-w-[400px] text-[12px] leading-[1.65] text-white/60">
              {event.descriptor}.{" "}
              {event.brandLines.supporting}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-white/75">
              <span>{event.dates.display}</span>

              <span className="text-[#25B34B]">
                {event.venue.city}, {event.venue.country}
              </span>
            </div>
          </motion.div>

          {/* Contact desks */}
          <motion.div variants={reveal} className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-5 bg-[#BE202B]" />
              <h3 className="text-[11px] font-bold uppercase tracking-[0.13em] text-white">
                Event Contacts
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-3 sm:gap-4">
              {event.contactList.map((contact, index) => (
                <FooterContact
                  key={`${contact.email}-${index}`}
                  contact={contact}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* MIDDLE: NAVIGATION */}
        <motion.nav
          aria-label="Footer navigation"
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-25px" }}
          className="grid grid-cols-2 gap-x-5 gap-y-6 border-b border-white/10 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:gap-7"
        >
          <NavColumn title="Event" items={footerNav.event} />
          <NavColumn title="Exhibit" items={footerNav.exhibit} />
          <NavColumn title="Visit" items={footerNav.visit} />
          <NavColumn
            title="Information"
            items={footerNav.information}
          />
          <NavColumn
            title="Legal & Desk"
            items={footerNav.legal}
          />
        </motion.nav>

        {/* BOTTOM: ORGANISERS + COPYRIGHT + SOCIAL */}
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Organiser details + original logos */}
          <motion.div
            variants={reveal}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.11em] text-[#F26B70]">
                Joint Organisers
              </span>
              <span className="mt-1 block text-[12px] font-semibold text-white/75">
                Futurex &amp; ETSIPL
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.futurextrade.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Futurex website"
                className="flex h-[49px] w-[117px] items-center justify-center rounded-md bg-white px-2.5 py-1.5 transition-transform hover:-translate-y-0.5 sm:w-[128px]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/logos/futurex-logo.png"
                    alt="Futurex"
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </a>

              <a
                href="https://www.etsipl.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ETSIPL website"
                className="flex h-[49px] w-[88px] items-center justify-center rounded-md bg-white px-2 py-1.5 transition-transform hover:-translate-y-0.5 sm:w-[97px]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/logos/etsipl-logo.png"
                    alt="ETSIPL"
                    fill
                    sizes="97px"
                    className="object-contain"
                  />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Copyright and socials */}
          <motion.div
            variants={reveal}
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <p className="text-[11px] leading-[1.5] text-white/45">
              © {new Date().getFullYear()}{" "}
              {event.name}. All rights reserved.
            </p>

            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BE202B] hover:bg-[#BE202B] hover:text-white"
                  >
                    <SocialIcon type={social.key} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
