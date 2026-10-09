
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";

/* ==========================================
   MOTION SYSTEM
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.07,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

/* ==========================================
   ELEGANT SVG BACKGROUND
========================================== */

function PartnersBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Very subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Upper-right architectural drawing */}
        <motion.g
          style={{ transformOrigin: "1430px 80px" }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, 8, 0] }
          }
          transition={{
            duration: 28,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <circle
            cx="1430"
            cy="80"
            r="185"
            stroke="#BE202B"
            strokeWidth="1"
            strokeOpacity="0.12"
            strokeDasharray="6 13"
          />

          <circle
            cx="1430"
            cy="80"
            r="270"
            stroke="#111111"
            strokeWidth="0.8"
            strokeOpacity="0.055"
          />

          <circle
            cx="1430"
            cy="80"
            r="350"
            stroke="#25B34B"
            strokeWidth="0.8"
            strokeOpacity="0.09"
            strokeDasharray="10 18"
          />
        </motion.g>

        {/* Bottom-left structural arcs */}
        <circle
          cx="-50"
          cy="750"
          r="210"
          stroke="#BE202B"
          strokeOpacity="0.08"
        />

        <circle
          cx="-50"
          cy="750"
          r="295"
          stroke="#111111"
          strokeOpacity="0.045"
          strokeDasharray="7 14"
        />

        {/* Thin, continuously moving wave paths */}
        {Array.from({ length: 5 }).map((_, i) => {
          const first =
            `M-100,${440 + i * 20} ` +
            `C270,${365 + i * 12} ` +
            `600,${575 - i * 7} ` +
            `950,${450 + i * 8} ` +
            `C1210,${370 + i * 8} ` +
            `1410,${510 - i * 6} ` +
            `1550,${445 + i * 7}`;

          const second =
            `M-100,${460 + i * 20} ` +
            `C290,${400 + i * 11} ` +
            `620,${550 - i * 7} ` +
            `970,${470 + i * 8} ` +
            `C1200,${410 + i * 8} ` +
            `1420,${490 - i * 6} ` +
            `1550,${465 + i * 7}`;

          return (
            <motion.path
              key={i}
              d={first}
              stroke={
                i % 3 === 0
                  ? "#BE202B"
                  : i % 3 === 1
                    ? "#25B34B"
                    : "#111111"
              }
              strokeOpacity="0.075"
              strokeWidth="0.8"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [first, second, first],
                    }
              }
              transition={{
                duration: 22 + i * 2,
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

/* ==========================================
   SHARED SECTION LABEL
========================================== */

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-7 bg-[#BE202B]" />

      <span className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#BE202B] sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}

/* ==========================================
   MAIN PARTNERS SECTION
========================================== */

type Props = {
  organiserLogos: ReactNode;
  partnerLogos: ReactNode[];
};

export function PartnersSectionClient({
  organiserLogos,
  partnerLogos,
}: Props) {
  const reduceMotion = useReducedMotion();
  const hasPartners = partnerLogos.length > 0;

  const viewport = {
    once: true,
    margin: "-50px",
  };

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/10 bg-white py-16 text-[#111111] selection:bg-[#BE202B] selection:text-white sm:py-[76px] lg:py-[84px]"
    >
      <PartnersBackground />

      <Container className="relative z-10">

        {/* =====================================
            CENTERED SECTION HEADING
        ===================================== */}

        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-[760px] text-center"
        >
          <motion.div
            variants={reveal}
            className="flex justify-center"
          >
            <SectionLabel>
              Behind the Exhibition
            </SectionLabel>
          </motion.div>

          <motion.h2
            id="partners-heading"
            variants={reveal}
            className="mt-5 text-[clamp(2rem,3.5vw,3.5rem)] font-black leading-[1.12] tracking-[-0.045em] text-[#111111]"
          >
            Our Organisers
            <span className="block text-[#BE202B]">
              &amp; Strategic Partners.
            </span>
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mx-auto mt-4 max-w-[630px] text-[13px] leading-[1.85] text-[#666666] sm:text-[15px]"
          >
            Connecting international exhibition
            expertise with industry organisations
            to create meaningful business
            opportunities in East Africa.
          </motion.p>

          {/* Animated red / green underline */}
          <motion.div
            aria-hidden="true"
            className="mx-auto mt-6 flex h-[3px] w-24 origin-center overflow-hidden"
            initial={
              reduceMotion
                ? false
                : { scaleX: 0 }
            }
            whileInView={{
              scaleX: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: EASE,
            }}
          >
            <span className="h-full w-[75%] bg-[#BE202B]" />
            <span className="h-full flex-1 bg-[#25B34B]" />
          </motion.div>
        </motion.div>

        {/* =====================================
            ORGANISERS SPOTLIGHT
        ===================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={viewport}
          transition={{
            duration: 0.85,
            ease: EASE,
          }}
          className="relative mt-10 overflow-hidden rounded-xl border border-[#111111]/10 bg-white shadow-[0_16px_45px_rgba(17,17,17,0.045)]"
        >
          {/* Top accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 flex h-[3px]"
          >
            <span className="w-[76%] bg-[#BE202B]" />
            <span className="w-[18%] bg-[#25B34B]" />
            <span className="flex-1 bg-[#111111]" />
          </div>

          {/* Actual logos receive main focus */}
          <div className="px-6 pb-7 pt-9 text-center sm:px-10 sm:pb-9 sm:pt-10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.19em] text-[#BE202B]">
              Official Joint Organisers
            </span>

            <h3 className="mt-3 text-[21px] font-black leading-[1.3] tracking-[-0.03em] text-[#111111] sm:text-[26px]">
              Futurex Trade Fair &amp; Events
              <span className="mx-2 font-medium text-[#111111]/25">
                &
              </span>
              ETSIPL
            </h3>

            <p className="mx-auto mt-3 max-w-[580px] text-[13px] leading-[1.75] text-[#777777]">
              International exhibition organisers
              bringing industry professionals,
              manufacturers and buyers together.
            </p>
          </div>

          {/* Premium logo presentation area */}
          <div className="border-t border-[#111111]/[0.07] bg-[#FAFAFA] px-5 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-11">
            <div className="mx-auto flex min-h-[100px] w-full max-w-[780px] items-center justify-center">
              {organiserLogos}
            </div>
          </div>

          {/* Quiet brand signature */}
          <div className="flex items-center justify-center gap-3 border-t border-[#111111]/[0.07] bg-white px-5 py-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25B34B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#777777]">
              Kenya Buildcon International Expo 2027
            </span>
          </div>
        </motion.div>

        {/* =====================================
            SUPPORTING PARTNER LOGOS
        ===================================== */}

        {hasPartners ? (
          <div className="mt-11">
            <div className="mb-6 flex flex-col gap-3 border-b border-[#111111]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>
                  Our Supporting Network
                </SectionLabel>

                <h3 className="mt-3 text-[22px] font-extrabold tracking-[-0.03em] text-[#111111] sm:text-[26px]">
                  Supporting Associations &amp; Media
                </h3>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#888888]">
                Partner Showcase
              </span>
            </div>

            <motion.div
              variants={stagger}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {partnerLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  variants={reveal}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                          transition: {
                            duration: 0.3,
                            ease: EASE,
                          },
                        }
                  }
                  className="group relative flex min-w-0 items-center justify-center rounded-lg border border-[#111111]/10 bg-white p-3 shadow-[0_8px_24px_rgba(17,17,17,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/30 hover:shadow-[0_14px_34px_rgba(17,17,17,0.075)]"
                >
                  <div className="w-full min-w-0">
                    {logo}
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#BE202B] transition-[width] duration-500 group-hover:w-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          /* No current partner records */
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 18 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={viewport}
            transition={{
              duration: 0.8,
              ease: EASE,
            }}
            className="mt-9 flex flex-col gap-5 rounded-xl border border-[#111111]/10 bg-[#FAFAFA] px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-[760px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#BE202B]">
                Supporting Partnerships
              </span>

              <h3 className="mt-2 text-[17px] font-extrabold tracking-[-0.025em] text-[#111111] sm:text-[19px]">
                Building Strong Industry Alliances
              </h3>

              <p className="mt-2 text-[13px] leading-[1.75] text-[#666666]">
                The previous edition was supported
                by the Kenya National Chamber of
                Commerce &amp; Industry (KNCCI) and
                KABCEC. Supporting partners for the
                4th edition will be announced here.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex min-h-[45px] shrink-0 items-center justify-center gap-3 self-start rounded-md border border-[#BE202B] bg-[#BE202B] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A71B25]"
            >
              Become a Partner

              <span
                aria-hidden="true"
                className="text-base transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        )}

        {/* =====================================
            MINIMAL PARTNERSHIP FOOTER
        ===================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 12 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={viewport}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="mt-9 flex flex-col items-start justify-between gap-4 border-t border-[#111111]/10 pt-6 sm:flex-row sm:items-center"
        >
          <p className="max-w-[660px] text-[13px] leading-[1.7] text-[#666666]">
            Interested in becoming a supporting
            organisation or media partner?
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#BE202B] transition-colors hover:text-[#111111]"
          >
            Partner With Us

            <span
              aria-hidden="true"
              className="text-lg transition-transform duration-300 group-hover:translate-x-1"
            >
              ↗
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
