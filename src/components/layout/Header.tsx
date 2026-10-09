
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   DESIGN TOKENS
========================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

type NavItem = (typeof mainNav)[number];

/* ==========================================
   ICONS
========================================== */

function ArrowIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ArrowUpRight({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 18 18 6M8 6h10v10" />
    </svg>
  );
}

function ChevronIcon({
  open = false,
}: {
  open?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==========================================
   ROUTE MATCHING
========================================== */

function isRouteActive(
  pathname: string,
  href: string
) {
  if (href === "/") {
    return pathname === "/";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

/* ==========================================
   SLIM EVENT RIBBON
========================================== */

function EventRibbon() {
  return (
    <div className="relative h-[32px] border-b border-white/10 bg-[#111111] text-white">
      <Container className="flex h-full items-center justify-between gap-3">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#25B34B]" />

          <span className="truncate text-[10px] font-semibold tracking-[0.025em] text-white/90 sm:text-[11px]">
            {event.editionLabel}
          </span>

          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-white/20 sm:block"
          />

          <span className="hidden items-center gap-1.5 whitespace-nowrap text-[10px] text-white/65 sm:inline-flex">
            <CalendarIcon />
            {event.dates.display}
          </span>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-4">
          <span className="hidden items-center gap-1.5 whitespace-nowrap text-[10px] text-white/65 lg:inline-flex">
            <PinIcon />
            {event.venue.city}, {event.venue.country}
          </span>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[10px] font-bold text-[#F26B70] transition-colors duration-300 hover:text-white"
          >
            Stand Enquiry

            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </div>
  );
}

/* ==========================================
   DESKTOP NAV ITEM
========================================== */

function DesktopNavItem({
  item,
  pathname,
  open,
  setOpen,
  close,
  reduceMotion,
}: {
  item: NavItem;
  pathname: string;
  open: boolean;
  setOpen: () => void;
  close: () => void;
  reduceMotion: boolean;
}) {
  const hasChildren = Boolean(item.children?.length);

  const directActive = isRouteActive(
    pathname,
    item.href
  );

  const childActive =
    item.children?.some((child) =>
      isRouteActive(pathname, child.href)
    ) ?? false;

  const active = directActive || childActive;

  const menuId = `desktop-submenu-${item.href.replace(
    /[^a-zA-Z0-9]/g,
    "-"
  )}`;

  return (
    <li
      className="group relative flex h-full shrink-0 items-center"
      onMouseEnter={() => {
        if (hasChildren) setOpen();
      }}
      onMouseLeave={() => {
        if (hasChildren) close();
      }}
      onFocusCapture={() => {
        if (hasChildren) setOpen();
      }}
      onBlurCapture={(e) => {
        if (
          hasChildren &&
          !e.currentTarget.contains(
            e.relatedTarget as Node | null
          )
        ) {
          close();
        }
      }}
    >
      <div className="flex h-full items-center">
        <Link
          href={item.href}
          aria-current={directActive ? "page" : undefined}
          onClick={close}
          className={`relative inline-flex h-11 items-center whitespace-nowrap rounded-md py-2 pl-2.5 text-[12px] font-semibold tracking-[-0.01em] transition-colors duration-300 2xl:text-[12.5px] ${
            hasChildren ? "pr-1" : "pr-2.5"
          } ${
            active
              ? "text-[#BE202B]"
              : "text-[#303030] hover:text-[#BE202B]"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B]`}
        >
          {item.label}

          {/* Active page underline */}
          {active && (
            <motion.span
              layoutId="premium-header-active-link"
              className="absolute bottom-[2px] left-2.5 right-0 h-[2px] rounded-full bg-[#BE202B]"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 34,
              }}
              aria-hidden="true"
            />
          )}
        </Link>

        {hasChildren && (
          <button
            type="button"
            aria-label={`${open ? "Close" : "Open"} ${item.label} submenu`}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => {
              if (open) close();
              else setOpen();
            }}
            className={`flex h-9 w-6 items-center justify-center rounded-md transition-colors duration-300 ${
              open
                ? "text-[#BE202B]"
                : "text-[#777777] hover:text-[#BE202B]"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B]`}
          >
            <ChevronIcon open={open} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {hasChildren && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="submenu"
              id={menuId}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 7 }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 5 }
              }
              transition={{
                duration: reduceMotion
                  ? 0.01
                  : 0.2,
                ease: EASE,
              }}
              className="absolute left-1/2 top-full z-[70] w-[290px] -translate-x-1/2 pt-2"
            >
              <div className="relative overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-2 shadow-[0_24px_60px_rgba(17,17,17,0.15)]">
                {/* Top line */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-[#BE202B]" />

                <div className="px-3 pb-2 pt-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#BE202B]">
                    Explore {item.label}
                  </span>
                </div>

                <div className="max-h-[min(60vh,400px)] overflow-y-auto">
                  {item.children?.map((child) => {
                    const selected = isRouteActive(
                      pathname,
                      child.href
                    );

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        aria-current={
                          selected ? "page" : undefined
                        }
                        className={`group/child flex items-start justify-between gap-3 rounded-lg px-3 py-3 transition-colors duration-200 ${
                          selected
                            ? "bg-[#BE202B]/[0.07]"
                            : "hover:bg-[#F7F7F7]"
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B]`}
                      >
                        <div className="min-w-0">
                          <span
                            className={`block text-[12px] font-bold leading-[1.4] transition-colors duration-200 ${
                              selected
                                ? "text-[#BE202B]"
                                : "text-[#111111] group-hover/child:text-[#BE202B]"
                            }`}
                          >
                            {child.label}
                          </span>

                          {child.description && (
                            <span className="mt-1 block text-[11px] leading-[1.55] text-[#777777]">
                              {child.description}
                            </span>
                          )}
                        </div>

                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#BE202B]/60 transition-transform duration-300 group-hover/child:translate-x-0.5 group-hover/child:-translate-y-0.5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

/* ==========================================
   MOBILE NAVIGATION
========================================== */

function MobileNavigation({
  pathname,
  onClose,
  reduceMotion,
}: {
  pathname: string;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const [expanded, setExpanded] = useState<
    string | null
  >(null);

  return (
    <motion.div
      id="mobile-navigation"
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -10 }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -8 }
      }
      transition={{
        duration: reduceMotion ? 0.01 : 0.25,
        ease: EASE,
      }}
      className="absolute inset-x-0 top-full z-[70] max-h-[calc(100dvh-106px)] overflow-y-auto overscroll-contain border-t border-[#111111]/10 bg-white shadow-[0_24px_50px_rgba(0,0,0,0.16)] xl:hidden"
    >
      <Container>
        <nav
          aria-label="Mobile navigation"
          className="py-5"
        >
          <div className="space-y-1">
            {mainNav.map((item) => {
              const hasChildren = Boolean(
                item.children?.length
              );

              const active =
                isRouteActive(pathname, item.href) ||
                (item.children?.some((child) =>
                  isRouteActive(
                    pathname,
                    child.href
                  )
                ) ??
                  false);

              const isExpanded =
                expanded === item.href;

              return (
                <div
                  key={item.href}
                  className="overflow-hidden rounded-lg"
                >
                  <div
                    className={`flex items-center justify-between ${
                      active
                        ? "bg-[#BE202B]/[0.06]"
                        : "hover:bg-[#F7F7F7]"
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={
                        isRouteActive(
                          pathname,
                          item.href
                        )
                          ? "page"
                          : undefined
                      }
                      className={`flex min-h-[47px] min-w-0 flex-1 items-center px-4 text-[14px] font-semibold ${
                        active
                          ? "text-[#BE202B]"
                          : "text-[#111111]"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {hasChildren && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`${
                          isExpanded ? "Collapse" : "Expand"
                        } ${item.label} submenu`}
                        onClick={() =>
                          setExpanded(
                            isExpanded
                              ? null
                              : item.href
                          )
                        }
                        className="flex h-[47px] w-[48px] shrink-0 items-center justify-center text-[#555555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B]"
                      >
                        <ChevronIcon
                          open={isExpanded}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: reduceMotion
                              ? 0.01
                              : 0.22,
                            ease: EASE,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-l-2 border-[#BE202B]/25 py-1 pl-3 ml-4">
                            {item.children?.map(
                              (child) => {
                                const childActive =
                                  isRouteActive(
                                    pathname,
                                    child.href
                                  );

                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={
                                      onClose
                                    }
                                    className={`block rounded-md px-3 py-2.5 text-[13px] leading-[1.5] ${
                                      childActive
                                        ? "font-bold text-[#BE202B]"
                                        : "font-medium text-[#555555] hover:bg-[#F7F7F7] hover:text-[#BE202B]"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile actions */}
          <div className="mt-5 grid gap-3 border-t border-[#111111]/10 pt-5 sm:grid-cols-2">
            <Link
              href={event.cta.bookStand}
              onClick={onClose}
              className="flex min-h-[48px] items-center justify-between rounded-md bg-[#BE202B] px-5 text-[12px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#A71B25]"
            >
              Book a Stand
              <ArrowIcon />
            </Link>

            <Link
              href={event.cta.registerVisit}
              onClick={onClose}
              className="flex min-h-[48px] items-center justify-between rounded-md border border-[#111111]/15 bg-[#F8F8F8] px-5 text-[12px] font-bold uppercase tracking-[0.04em] text-[#111111] transition-colors hover:border-[#25B34B] hover:text-[#1D9440]"
            >
              Register to Visit
              <ArrowIcon />
            </Link>
          </div>

          {/* Event details */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#111111]/10 py-4 text-[11px] font-medium text-[#777777]">
            <span>{event.dates.display}</span>

            <span className="text-[#1D9440]">
              {event.venue.city},{" "}
              {event.venue.country}
            </span>
          </div>
        </nav>
      </Container>
    </motion.div>
  );
}

/* ==========================================
   MAIN HEADER
========================================== */

export function Header() {
  const pathname = usePathname() ?? "/";
  const reduceMotion = Boolean(
    useReducedMotion()
  );

  const [isVisible, setIsVisible] =
    useState(true);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);

  const lastY = useRef(0);
  const accumulatedScroll = useRef(0);
  const previousPath = useRef(pathname);

  /* ----------------------------------
     CLOSE MENUS
  ---------------------------------- */

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, []);

  /* ----------------------------------
     ROUTE CHANGES
  ---------------------------------- */

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      closeMenus();
      setIsVisible(true);
    }
  }, [pathname, closeMenus]);

  /* ----------------------------------
     SCROLL BEHAVIOR
  ---------------------------------- */

  useEffect(() => {
    let frame: number | null = null;

    const updateScroll = () => {
      const currentY = Math.max(
        0,
        window.scrollY
      );

      const delta = currentY - lastY.current;

      setIsScrolled(currentY > 16);

      if (
        currentY < 90 ||
        mobileOpen ||
        openDropdown
      ) {
        setIsVisible(true);
        accumulatedScroll.current = 0;
      } else {
        if (
          Math.sign(delta) !==
          Math.sign(accumulatedScroll.current)
        ) {
          accumulatedScroll.current = delta;
        } else {
          accumulatedScroll.current += delta;
        }

        if (accumulatedScroll.current > 24) {
          setIsVisible(false);
          accumulatedScroll.current = 0;
        }

        if (accumulatedScroll.current < -16) {
          setIsVisible(true);
          accumulatedScroll.current = 0;
        }
      }

      lastY.current = currentY;
      frame = null;
    };

    const onScroll = () => {
      if (frame === null) {
        frame =
          window.requestAnimationFrame(
            updateScroll
          );
      }
    };

    updateScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [mobileOpen, openDropdown]);

  /* ----------------------------------
     BODY SCROLL LOCK
  ---------------------------------- */

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileOpen]);

  /* ----------------------------------
     ESCAPE + OUTSIDE CLICK
  ---------------------------------- */

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenus();
      }
    };

    const onPointerDown = (
      e: PointerEvent
    ) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(
          e.target as Node
        )
      ) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      onKeyDown
    );

    document.addEventListener(
      "pointerdown",
      onPointerDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        onKeyDown
      );

      document.removeEventListener(
        "pointerdown",
        onPointerDown
      );
    };
  }, [closeMenus]);

  /* ----------------------------------
     CLOSE MOBILE MENU ON DESKTOP
  ---------------------------------- */

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1280px)"
    );

    const handleBreakpoint = () => {
      if (media.matches) {
        setMobileOpen(false);
      } else {
        setOpenDropdown(null);
      }
    };

    handleBreakpoint();

    media.addEventListener(
      "change",
      handleBreakpoint
    );

    return () => {
      media.removeEventListener(
        "change",
        handleBreakpoint
      );
    };
  }, []);

  /* ----------------------------------
     RENDER
  ---------------------------------- */

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 w-full ${
        reduceMotion
          ? "transition-none"
          : "transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      } ${
        isVisible ||
        mobileOpen ||
        openDropdown
          ? "translate-y-0"
          : "-translate-y-full"
      }`}
    >
      {/* EVENT TOP RIBBON */}
      <EventRibbon />

      {/* MAIN NAVBAR */}
      <div
        className={`relative z-20 border-b border-[#111111]/10 bg-white transition-shadow duration-300 ${
          isScrolled
            ? "shadow-[0_10px_30px_rgba(0,0,0,0.09)]"
            : "shadow-none"
        }`}
      >
        <Container>
          <div
            className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${
              isScrolled
                ? "h-[68px] sm:h-[72px]"
                : "h-[74px] sm:h-[78px]"
            }`}
          >
            {/* =================================
                LOGO — NO BACKGROUND
            ================================= */}

            <Link
              href="/"
              onClick={closeMenus}
              aria-label={`${event.name} homepage`}
              className="group relative z-10 flex min-w-0 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B]"
            >
              <Image
                src="/logos/logo.png"
                alt={event.name}
                width={1000}
                height={348}
                priority
                sizes="(max-width: 640px) 170px, (max-width: 1280px) 195px, 215px"
                className={`w-auto max-w-[180px] object-contain object-left transition-[height,transform] duration-300 group-hover:scale-[1.025] sm:max-w-[195px] xl:max-w-[215px] ${
                  isScrolled
                    ? "h-[45px] sm:h-[49px]"
                    : "h-[51px] sm:h-[54px]"
                }`}
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              aria-label="Primary navigation"
              className="hidden min-w-0 items-center justify-center xl:flex"
            >
              <ul className="flex items-center gap-0.5 2xl:gap-1">
                {mainNav.map((item) => (
                  <DesktopNavItem
                    key={`${item.href}-${item.label}`}
                    item={item}
                    pathname={pathname}
                    open={
                      openDropdown ===
                      item.label
                    }
                    setOpen={() => {
                      setOpenDropdown(
                        item.label
                      );
                      setIsVisible(true);
                    }}
                    close={() => {
                      setOpenDropdown(
                        (current) =>
                          current ===
                          item.label
                            ? null
                            : current
                      );
                    }}
                    reduceMotion={
                      reduceMotion
                    }
                  />
                ))}
              </ul>
            </nav>

            {/* DESKTOP CTAS */}
            <div className="hidden shrink-0 items-center gap-2 xl:flex">
              <Link
                href={event.cta.bookStand}
                className="group inline-flex h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#BE202B] px-4 text-[11px] font-extrabold uppercase tracking-[0.025em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A61B25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2"
              >
                Book a Stand

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href={
                  event.cta.registerVisit
                }
                className="group hidden h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[#111111]/15 bg-white px-4 text-[11px] font-bold uppercase tracking-[0.025em] text-[#111111] transition-all duration-300 hover:border-[#25B34B] hover:bg-[#25B34B] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B34B] 2xl:inline-flex"
              >
                Register

                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* MOBILE / TABLET HAMBURGER */}
            <div className="flex shrink-0 items-center gap-2 xl:hidden">
              <Link
                href={
                  event.cta.registerVisit
                }
                onClick={closeMenus}
                className="hidden h-[40px] items-center rounded-md border border-[#111111]/15 px-3.5 text-[11px] font-bold text-[#111111] transition-colors duration-300 hover:border-[#1D9440] hover:text-[#1D9440] sm:inline-flex"
              >
                Register
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(
                    (value) => !value
                  );

                  setOpenDropdown(null);
                  setIsVisible(true);
                }}
                aria-expanded={
                  mobileOpen
                }
                aria-controls="mobile-navigation"
                aria-label={
                  mobileOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                className={`relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
                  mobileOpen
                    ? "border-[#BE202B] bg-[#BE202B]"
                    : "border-[#111111] bg-[#111111] hover:border-[#BE202B] hover:bg-[#BE202B]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE202B] focus-visible:ring-offset-2`}
              >
                <span
                  aria-hidden="true"
                  className="relative h-4 w-5"
                >
                  <span
                    className={`absolute left-0 top-[1px] h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                      mobileOpen
                        ? "top-[7px] rotate-45"
                        : ""
                    }`}
                  />

                  <span
                    className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-white transition-all duration-200 ${
                      mobileOpen
                        ? "translate-x-2 opacity-0"
                        : ""
                    }`}
                  />

                  <span
                    className={`absolute left-0 top-[13px] h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                      mobileOpen
                        ? "top-[7px] -rotate-45"
                        : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>

        {/* UNDERLINE ACCENT */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 flex h-[2px]"
        >
          <span className="w-[82%] bg-[#BE202B]" />
          <span className="w-[13%] bg-[#25B34B]" />
          <span className="flex-1 bg-[#111111]" />
        </div>
      </div>

      {/* MOBILE MENU BACKDROP */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion
                ? 0
                : 0.2,
            }}
            onClick={closeMenus}
            className="fixed inset-x-0 top-[106px] z-10 h-[calc(100dvh-106px)] bg-black/45 xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* INTEGRATED MOBILE MENU */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <MobileNavigation
            key="mobile-menu"
            pathname={pathname}
            onClose={closeMenus}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
