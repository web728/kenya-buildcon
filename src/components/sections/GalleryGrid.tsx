
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

type GalleryItem = {
  _id: string;
  imageUrl: string;
  title: string;
};

interface GalleryGridProps {
  items: GalleryItem[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 5 19 19M19 5 5 19" />
    </svg>
  );
}

function ChevronIcon({
  direction,
}: {
  direction: "previous" | "next";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {direction === "previous" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

export function GalleryGrid({
  items,
}: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<
    number | null
  >(null);

  const reducedMotion = useReducedMotion();
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const previouslyFocusedElement =
    useRef<HTMLElement | null>(null);

  const touchStartX = useRef<number | null>(
    null
  );

  const active =
    activeIndex !== null
      ? items[activeIndex] ?? null
      : null;

  const isOpen = active !== null;

  const closeGallery = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setActiveIndex((current) => {
      if (
        current === null ||
        items.length === 0
      ) {
        return current;
      }

      return (current + 1) % items.length;
    });
  }, [items.length]);

  const previousImage = useCallback(() => {
    setActiveIndex((current) => {
      if (
        current === null ||
        items.length === 0
      ) {
        return current;
      }

      return (
        (current - 1 + items.length) %
        items.length
      );
    });
  }, [items.length]);

  const openGallery = useCallback(
    (index: number) => {
      previouslyFocusedElement.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      setActiveIndex(index);
    },
    []
  );

  /* ==========================================
     LIGHTBOX KEYBOARD + SCROLL CONTROL
  ========================================== */

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(
      () => closeButtonRef.current?.focus()
    );

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGallery();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousImage();
      }

      if (event.key !== "Tab") return;

      const dialog = document.getElementById(
        "expo-gallery-lightbox"
      );

      if (!dialog) return;

      const controls =
        Array.from(
          dialog.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])"
          )
        );

      if (controls.length === 0) return;

      const first = controls[0];
      const last = controls[controls.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.cancelAnimationFrame(
        focusFrame
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previouslyFocusedElement.current?.focus();
    };
  }, [
    isOpen,
    closeGallery,
    nextImage,
    previousImage,
  ]);

  return (
    <>
      {/* PHOTO GRID */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <motion.button
            key={item._id}
            type="button"
            aria-label={`Open gallery image: ${item.title}`}
            onClick={() => openGallery(index)}
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "0px 0px -24px 0px",
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              delay: reducedMotion
                ? 0
                : Math.min(index % 8, 7) * 0.035,
              ease: EASE,
            }}
            className="group relative aspect-[4/5] min-w-0 cursor-zoom-in overflow-hidden rounded-md border border-[#111111]/[0.07] bg-[#F3F3F3] outline-none transition-[border-color,box-shadow] duration-300 hover:border-[#BE202B]/35 hover:shadow-[0_12px_28px_rgba(17,17,17,0.10)] focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2 sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
              priority={index < 2}
              className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.045]"
            />

            {/* Very subtle hover treatment — no text */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.055]"
            />

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#BE202B] transition-transform duration-500 group-hover:scale-x-100"
            />
          </motion.button>
        ))}
      </div>

      {/* FULLSCREEN IMAGE VIEWER */}
      <AnimatePresence>
        {active && (
          <motion.div
            id="expo-gallery-lightbox"
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Exhibition photo viewer"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.22,
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080808]/[0.97] px-3 pb-5 pt-16 sm:px-8 sm:pb-8 sm:pt-20"
            onClick={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeGallery();
              }
            }}
            onTouchStart={(event) => {
              touchStartX.current =
                event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const start = touchStartX.current;
              const end =
                event.changedTouches[0]
                  ?.clientX;

              touchStartX.current = null;

              if (
                start === null ||
                end === undefined ||
                items.length < 2
              ) {
                return;
              }

              const distance = end - start;

              if (distance < -60) {
                nextImage();
              } else if (distance > 60) {
                previousImage();
              }
            }}
          >
            {/* Close */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeGallery}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/[0.08] text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white sm:right-8 sm:top-7"
            >
              <CloseIcon />
            </button>

            {/* Photo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active._id}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.975,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={
                  reducedMotion
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 0.985,
                      }
                }
                transition={{
                  duration: reducedMotion
                    ? 0
                    : 0.32,
                  ease: EASE,
                }}
                className="relative h-full w-full max-w-[1500px]"
              >
                <Image
                  src={active.imageUrl}
                  alt={active.title}
                  fill
                  sizes="100vw"
                  className="select-none object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Previous / Next */}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute bottom-5 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-black/60 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2"
                >
                  <ChevronIcon direction="previous" />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute bottom-5 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-black/60 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2"
                >
                  <ChevronIcon direction="next" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
