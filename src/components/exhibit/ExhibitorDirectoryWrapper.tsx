
"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

export function ExhibitorDirectoryWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.72,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
