
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
import { ContactForm } from "@/components/forms/ContactForm";

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
      duration: 0.7,
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

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M5 3h4l2 5-2.5 2.2a15 15 0 005.3 5.3L16 13l5 2v4a2 2 0 01-2 2C10.2 21 3 13.8 3 5a2 2 0 012-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
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
          light
            ? "text-white/70"
            : "text-[#BE202B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   CONTACT INTRO
========================================== */

function ContactIntro() {
  return (
    <section
      aria-labelledby="contact-intro-heading"
      className="relative overflow-hidden bg-white pt-12 sm:pt-14"
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
        <Reveal className="flex flex-col gap-6 border-b border-[#111111]/10 pb-7 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[750px]"
          >
            <Eyebrow>
              Exhibition Enquiries
            </Eyebrow>

        
<h2
  id="contact-intro-heading"
  className="mt-3 text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.16] tracking-[-0.04em] text-[#111111]"
>
  How Can We{" "}
  <span className="text-[#BE202B]">
    Assist You?
  </span>
</h2>

<p className="mt-3 max-w-[670px] text-[13px] leading-[1.85] text-[#666666] sm:text-[14px]">
  For enquiries about exhibition space,
  sponsorship, partnerships, international
  participation or visitor registration,
  contact the organising team of
  Kenya Buildcon International Expo 2027.
</p>

          </motion.div>

 
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   ENQUIRY FORM
   Existing ContactForm preserved.
========================================== */

function EnquiryFormSection() {
  return (
    <section
      aria-labelledby="contact-form-heading"
      className="bg-white py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <Reveal className="mx-auto max-w-[920px]">
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-xl border border-[#111111]/10 bg-white shadow-[0_14px_45px_rgba(17,17,17,0.045)]"
          >
            <div className="flex h-[3px]">
              <span className="w-[80%] bg-[#BE202B]" />
              <span className="w-[15%] bg-[#25B34B]" />
              <span className="flex-1 bg-[#111111]" />
            </div>

            <div className="p-5 sm:p-8 lg:p-10">

<Eyebrow>
  Contact Form
</Eyebrow>

<h2
  id="contact-form-heading"
  className="mt-3 text-[clamp(1.65rem,2.7vw,2.4rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#111111]"
>
  Send Us a{" "}
  <span className="text-[#BE202B]">
    Message.
  </span>
</h2>

<p className="mt-3 max-w-[650px] text-[13px] leading-[1.8] text-[#666666]">
  Have a question about Kenya Buildcon International
  Expo 2027? Fill out the form below with your
  enquiry, and our organising team will get
  back to you.
</p>


              <div className="mt-7 border-t border-[#111111]/10 pt-7">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ==========================================
   ORGANISER CONTACT DIRECTORY
========================================== */

function OrganiserContactSection() {
  return (
    <section
      aria-labelledby="contact-team-heading"
      className="border-y border-[#111111]/10 bg-[#F8F8F8] py-12 sm:py-14 lg:py-16"
    >
      <Container>
        <Reveal className="flex flex-col gap-4 border-b border-[#111111]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            variants={itemVariants}
            className="max-w-[730px]"
          >
            <Eyebrow>
              Direct Organiser Contacts
            </Eyebrow>

            <h2
              id="contact-team-heading"
              className="mt-3 text-[clamp(1.75rem,2.8vw,2.55rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#111111]"
            >
              Speak Directly With{" "}
              <span className="text-[#BE202B]">
                Our Team.
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.8] text-[#666666]">
              Contact the event organising
              representatives using the
              telephone numbers or email
              addresses below.
            </p>
          </motion.div>
        </Reveal>

        <Reveal className="mt-6 grid items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
          {event.contactList.map((contact, index) => {
            const cleanPhone =
              contact.phone.replace(
                /[^0-9+]/g,
                ""
              );

            const isGreen = index % 3 === 1;

            return (
              <motion.article
                key={contact.email}
                variants={itemVariants}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#111111]/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_12px_30px_rgba(17,17,17,0.05)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-md ${
                      isGreen
                        ? "bg-[#25B34B]/[0.08] text-[#1D9440]"
                        : "bg-[#BE202B]/[0.07] text-[#BE202B]"
                    }`}
                  >
                    <PhoneIcon />
                  </span>

                 
                </div>

                <h3 className="mt-5 break-words text-[17px] font-extrabold leading-[1.4] tracking-[-0.025em] text-[#111111]">
                  {contact.name}
                </h3>

               

                <div className="mt-auto flex flex-col gap-2 border-t border-[#111111]/10 pt-5">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="group/link flex min-w-0 items-center gap-3 rounded-md border border-[#111111]/[0.07] bg-[#FAFAFA] px-3 py-3 transition-colors hover:border-[#25B34B]/30 hover:bg-white"
                    aria-label={`Call ${contact.name} at ${contact.phone}`}
                  >
                    <span className="shrink-0 text-[#1D9440]">
                      <PhoneIcon />
                    </span>

                    <span className="min-w-0 flex-1 text-[12px] font-semibold tabular-nums text-[#555555] group-hover/link:text-[#111111]">
                      {contact.phone}
                    </span>

                    <span className="shrink-0 text-[#BE202B]">
                      <ArrowIcon />
                    </span>
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    className="group/link flex min-w-0 items-center gap-3 rounded-md border border-[#111111]/[0.07] bg-[#FAFAFA] px-3 py-3 transition-colors hover:border-[#BE202B]/30 hover:bg-white"
                    aria-label={`Email ${contact.name} at ${contact.email}`}
                  >
                    <span className="shrink-0 text-[#BE202B]">
                      <MailIcon />
                    </span>

                    <span className="min-w-0 flex-1 break-all text-[11px] font-semibold leading-[1.6] text-[#555555] group-hover/link:text-[#111111]">
                      {contact.email}
                    </span>

                    <span className="shrink-0 text-[#BE202B]">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

 

/* ==========================================
   MAIN COMPONENT
========================================== */

export function ContactClientView() {
  return (
    <div className="bg-white text-[#111111]">
      <ContactIntro />
      <EnquiryFormSection />
      <OrganiserContactSection />
    </div>
  );
}
