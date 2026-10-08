"use client";

import { event } from "@/config/event";
import { useEffect, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(targetIso: string): Remaining {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: Math.floor(totalSeconds % 60),
  };
}

const UNITS: { key: keyof Remaining; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function Countdown({ targetIso, className }: { targetIso: string; className?: string }) {
  // Starts null so server and first client render match exactly (both show
  // "--"); the real value is filled in after mount, avoiding a hydration
  // mismatch between server render time and client hydration time.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: seeds the live value once mounted, then ticks every second.
    setRemaining(getRemaining(targetIso));
    const id = setInterval(() => setRemaining(getRemaining(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return (
    <div
      role="timer"
      aria-label={`Countdown to ${event.name}`}
      className={className ?? "flex gap-3 sm:gap-4"}
    >
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex w-16 flex-col items-center rounded-lg border border-white/15 bg-white/5 py-3 backdrop-blur-sm sm:w-20"
        >
          <span className="tabular-nums text-2xl font-extrabold text-white sm:text-3xl">
            {remaining ? String(remaining[unit.key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/60 sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
