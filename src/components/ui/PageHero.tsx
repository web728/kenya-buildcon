"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  /** First part of the title (Solid white) */
  title: string;
  /** Second part of the title (Gradient highlighted text like Home Hero) */
  highlightTitle?: string;
  intro?: string;
  badgeText?: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}

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

export function PageHero({
  title,
  highlightTitle,
  intro,
  badgeText = `${event.shortName} ${event.edition} · ${event.dates.display}`,
  image,
  children,
}: PageHeroProps) {
  return (
  <section
  className="relative flex min-h-[380px] lg:min-h-[460px] w-full items-center justify-center overflow-hidden bg-[#071118] pt-28 sm:pt-32 lg:pt-36 pb-12 text-white selection:bg-brand-red selection:text-white"
  aria-label={title}
>
      {/* Background Image Canvas with Soft Frosted Fog (Home Hero Match) */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <Image
          src={image ? image.src : "/images/home/kenya-buildcon-exhibition-hall.jpg"}
          alt={image ? image.alt : `${event.name} exhibition hall`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75 scale-100"
          style={{ objectPosition: "center 45%" }}
        />

        {/* Translucent Frosted Fog Wash */}
        <div className="absolute inset-0 bg-[#071118]/45 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071118]/90 via-transparent to-[#071118]/40" />
      </div>

      {/* Static 3D Wireframe Wave Mesh & Radar Rings */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-65"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="pageWaveBlueStatic" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c8262d" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#c8262d" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#25b34b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#c8262d" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="pageWaveGreenStatic" x1="100%" y1="0%" x2="0%" y2="0%">
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

          {/* Static 3D Flowing Ribbon Lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d={`M-100,${520 + i * 16} C${240 + i * 14},${400 + i * 10} ${580 - i * 10},${680 - i * 8} ${920 + i * 8},${520 + i * 6} C${1200 - i * 8},${400 + i * 10} 1360,${610 - i * 6} 1600,${500 + i * 8}`}
              stroke={i % 2 === 0 ? "url(#pageWaveBlueStatic)" : "url(#pageWaveGreenStatic)"}
              strokeWidth={i % 3 === 0 ? "1.4" : "0.85"}
              strokeOpacity={0.25 + (i / 10) * 0.45}
              fill="none"
            />
          ))}
        </svg>

        {/* Ambient Fog Glow Points */}
        <div className="absolute top-1/4 left-1/3 h-[320px] w-[320px] rounded-full bg-brand-red/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 h-[300px] w-[300px] rounded-full bg-brand-green/20 blur-[140px] pointer-events-none" />
      </div>

      {/* Main Content */}
      <Container className="relative z-10 w-full py-16 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Top Series Context Badge (Pill Style with Glass Glow) */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-brand-dark/45 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(200,38,45,0.15)] transition-transform duration-300 hover:scale-[1.02]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-slate-200">
                {badgeText}
              </span>
            </div>
          </motion.div>

          {/* Main Title (Identical Gradient Mixed Style as Home Hero) */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-md"
          >
            {title}
            {highlightTitle ? (
              <span className="block mt-2 font-extrabold tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green">
                {highlightTitle}
              </span>
            ) : null}
          </motion.h1>

          {/* Short Crisp Tagline */}
          {intro && (
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed tracking-wide text-slate-100 font-normal drop-shadow"
            >
              {intro}
            </motion.p>
          )}

          {/* Custom Action CTAs / Buttons (If Any) */}
          {children && (
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}