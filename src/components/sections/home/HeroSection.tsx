"use client";

import Image from "next/image";
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
      delayChildren: 0.1,
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
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroSection() {
  return (
  <section
  className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#071118] pt-28 sm:pt-36 lg:pt-40 pb-16 text-white selection:bg-brand-red selection:text-white"
  aria-label={`${event.name} — ${event.dates.display}, ${event.venue.fullLocation}`}
>
      {/* Background Image Canvas with Soft Frosted Fog */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <Image
          src="/images/home/kenya-buildcon-exhibition-hall.jpg"
          alt="Exhibition hall at a previous Kenya Buildcon International Expo, The Sarit Expo Centre, Nairobi"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75 scale-100"
          style={{ objectPosition: "center 45%" }}
        />

        {/* Translucent Frosted Fog Wash */}
        <div className="absolute inset-0 bg-[#071118]/45 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071118]/85 via-transparent to-[#071118]/40" />
      </div>

      {/* Floating 3D Wireframe Wave Mesh (Reference Image Inspired) */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-65"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveBlueLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c8262d" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#c8262d" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#25b34b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#c8262d" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="waveGreenLight" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#25b34b" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#25b34b" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#c8262d" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#25b34b" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Left Side Concentric Rings */}
          <g opacity="0.4">
            <circle cx="80" cy="620" r="150" stroke="#c8262d" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="80" cy="620" r="230" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <circle cx="80" cy="620" r="320" stroke="#25b34b" strokeWidth="1" strokeDasharray="8 12" />
          </g>

          {/* Right Side Concentric Rings */}
          <g opacity="0.4">
            <circle cx="1360" cy="620" r="160" stroke="#25b34b" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="1360" cy="620" r="250" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <circle cx="1360" cy="620" r="340" stroke="#c8262d" strokeWidth="1" strokeDasharray="10 14" />
          </g>

          {/* Animated 3D Flowing Ribbon Lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M-100,${520 + i * 16} C${240 + i * 14},${400 + i * 10} ${580 - i * 10},${680 - i * 8} ${920 + i * 8},${520 + i * 6} C${1200 - i * 8},${400 + i * 10} 1360,${610 - i * 6} 1600,${500 + i * 8}`}
              stroke={i % 2 === 0 ? "url(#waveBlueLight)" : "url(#waveGreenLight)"}
              strokeWidth={i % 3 === 0 ? "1.4" : "0.85"}
              strokeOpacity={0.25 + (i / 10) * 0.45}
              fill="none"
              animate={{
                d: [
                  `M-100,${520 + i * 16} C${240 + i * 14},${400 + i * 10} ${580 - i * 10},${680 - i * 8} ${920 + i * 8},${520 + i * 6} C${1200 - i * 8},${400 + i * 10} 1360,${610 - i * 6} 1600,${500 + i * 8}`,
                  `M-100,${500 + i * 16} C${260 + i * 12},${430 + i * 8} ${560 - i * 8},${640 - i * 6} ${940 + i * 6},${550 + i * 4} C${1180 - i * 8},${420 + i * 8} 1380,${580 - i * 8} 1600,${520 + i * 6}`,
                  `M-100,${520 + i * 16} C${240 + i * 14},${400 + i * 10} ${580 - i * 10},${680 - i * 8} ${920 + i * 8},${520 + i * 6} C${1200 - i * 8},${400 + i * 10} 1360,${610 - i * 6} 1600,${500 + i * 8}`,
                ],
              }}
              transition={{
                duration: 14 + i * 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Ambient Fog Glow Points */}
        <div className="absolute top-1/4 left-1/3 h-[320px] w-[320px] rounded-full bg-brand-red/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 h-[300px] w-[300px] rounded-full bg-brand-green/20 blur-[140px] pointer-events-none" />
      </div>

      {/* Main Content (Spacious & Minimal) */}
      <Container className="relative z-10 w-full py-16 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >

       {/* Featured Glass Date & Venue Pill */}
<motion.div
  variants={itemVariants}
  className="mb-8 inline-flex max-w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.06] p-1.5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] sm:mb-10 sm:flex-row sm:gap-0 sm:rounded-full sm:px-4 sm:py-1.5"
>
  {/* Date */}
  <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-slate-100 sm:text-sm">
    <svg 
      className="h-4 w-4 shrink-0 text-brand-red" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
    <span className="whitespace-nowrap tracking-wide">{event.dates.display}</span>
  </div>

  {/* Divider (Desktop only) */}
  <div className="hidden h-3.5 w-px bg-white/20 sm:block mx-1" aria-hidden="true" />

  {/* Venue & City */}
  <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-slate-100 sm:text-sm">
    <svg 
      className="h-4 w-4 shrink-0 text-brand-green" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
      />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
      />
    </svg>
    <span className="whitespace-nowrap tracking-wide">
      {event.venue.name}, {event.venue.city}
    </span>
  </div>
</motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-md"
          >
            {event.shortName}
            <span className="block mt-2 font-extrabold tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green">
              International Expo {event.edition}
            </span>
          </motion.h1>

          {/* Short Crisp Tagline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed tracking-wide text-slate-100 font-normal drop-shadow"
          >
            <span className="font-semibold text-white">{event.editionLabel}</span> · {event.descriptor}
          </motion.p>

         

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            <Button
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-9 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-[0_0_28px_rgba(200,38,45,0.4)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_0_36px_rgba(200,38,45,0.55)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book a Stand
            </Button>
            <Button
              href={event.cta.registerVisit}
              variant="secondary"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-9 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white backdrop-blur-xl transition-all duration-300 hover:border-brand-green/60 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Register to Visit
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}