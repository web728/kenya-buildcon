"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { showStats } from "@/data/previousEdition";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(current) {
        setDisplayValue(Math.floor(current).toLocaleString());
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function HeroStatsSection() {
  return (
    <section className="relative z-20 border-y border-white/10 bg-[#071118]/80 py-6 sm:py-8 backdrop-blur-xl text-white selection:bg-brand-red selection:text-white">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {showStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-4 md:py-0 md:px-6 text-center"
            >
              {/* Number with Gradient Accent (Sleek Font Scale) */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green drop-shadow-sm">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Minimal Label */}
              <p className="mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
          Previous edition results · Official Post Show Report
        </p>
      </Container>
    </section>
  );
}