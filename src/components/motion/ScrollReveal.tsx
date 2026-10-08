"use client";

import { useEffect, useRef } from "react";

export function ScrollReveal({
  children,
  className,
  y = 28,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
