"use client";

import { useState } from "react";
import Image from "next/image";
import type { GallerySummary } from "@/lib/data/gallery";

export function GalleryGrid({ items }: { items: GallerySummary[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-brand-light"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            ✕
          </button>
          <div className="relative h-[70vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={active.imageUrl} alt={active.title} fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
