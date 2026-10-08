"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { clsx } from "@/lib/utils/clsx";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close menus on navigation (state reset during render, not in an effect)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileOpen) return;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 6) {
        setIsVisible(false);
        setOpenDropdown(null);
      } else if (currentScrollY < lastScrollY.current - 6) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpenDropdown(null);
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleKeyDown]);

  // Essential highlights (Dates, Venue, Hours & Allocation)
  const marqueeItems = [
    `${event.editionLabel} · ${event.dates.display}`,
    `${event.venue.name}, ${event.venue.city}`,
    `Open daily ${event.dates.openingHours}`,
    "Stand Bookings Now Open",
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "translate-y-0" : "-translate-y-full shadow-none"
      )}
    >
      {/* Top Eye-Catchy Marquee Ribbon */}
      <div className="relative overflow-hidden border-b border-white/[0.12] bg-[#050b11]/95 py-2.5 text-white select-none backdrop-blur-xl">
        {/* Ambient Top Glow Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-red/60 to-transparent opacity-80" />

        {/* Side Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050b11] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050b11] to-transparent sm:w-28" />

        {/* Smooth Seamless Infinite Motion */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 22,
            }}
            className="flex shrink-0 items-center gap-10 pr-10"
          >
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => {
              return (
                <div
                  key={index}
                  aria-hidden={index >= marqueeItems.length}
                  className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap"
                >
                  {/* Main Bold Text */}
                  <span className="text-white font-bold tracking-tight text-xs sm:text-[13px] drop-shadow-sm">
                    {item}
                  </span>

                  {/* Divider Star */}
                  <span className="ml-5 text-sm font-bold text-white/30">✦</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={clsx(
          "w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "border-b border-white/10 bg-[#071118]/90 py-2 backdrop-blur-2xl shadow-2xl shadow-black/50"
            : "border-b border-white/10 bg-[#071118]/40 py-3 sm:py-3.5 backdrop-blur-md"
        )}
      >
        <Container className="flex items-center justify-between gap-4 max-w-7xl">
          {/* Brand Logo */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="group relative z-10 flex items-center transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <Image
                src="/logos/Kenya-Logo.png"
                alt={event.name}
                width={1000}
                height={348}
                priority
                className="h-10 sm:h-11 md:h-12 lg:h-14 w-auto object-contain object-left drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Floating Pill Navigation */}
          <nav
            aria-label="Primary Navigation"
            ref={navRef}
            className="hidden items-center justify-center lg:flex"
          >
            <ul className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1.5 backdrop-blur-2xl shadow-lg shadow-black/20 transition-colors duration-300 hover:border-white/25">
              {mainNav.map((item) => {
                const isActive =
                  pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const hasChildren = Boolean(item.children?.length);
                const isDropdownOpen = openDropdown === item.label;

                return (
                  <li
                    key={item.href}
                    className="group relative shrink-0"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={clsx(
                        "relative flex items-center gap-1 rounded-full px-3 xl:px-4 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 xl:text-[13px]",
                        isActive
                          ? "bg-white/20 text-white shadow-inner shadow-white/20"
                          : "text-slate-200 hover:bg-white/10 hover:text-white",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                      )}
                      aria-expanded={hasChildren ? isDropdownOpen : undefined}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>

                      {hasChildren && (
                        <svg
                          className={clsx(
                            "h-3 w-3 shrink-0 transition-transform duration-300 opacity-70 group-hover:opacity-100",
                            isDropdownOpen && "rotate-180 text-brand-red-light opacity-100"
                          )}
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 4.5L6 8L9.5 4.5"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown Panel */}
                    {hasChildren && (
                      <div
                        className={clsx(
                          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isDropdownOpen
                            ? "pointer-events-auto visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible translate-y-3 opacity-0"
                        )}
                      >
                        <div className="w-64 overflow-hidden rounded-2xl border border-white/15 bg-[#071118]/95 p-2 shadow-2xl backdrop-blur-2xl">
                          {item.children?.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={clsx(
                                  "group/child flex flex-col rounded-xl p-2.5 transition-all duration-200",
                                  isChildActive
                                    ? "bg-brand-red/20 text-white"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                                )}
                              >
                                <span
                                  className={clsx(
                                    "text-xs font-semibold tracking-wide transition-colors duration-200 group-hover/child:text-brand-red-light",
                                    isChildActive ? "text-brand-red-light" : "text-slate-100"
                                  )}
                                >
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-400 group-hover/child:text-slate-300">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="hidden shrink-0 items-center justify-end gap-2.5 lg:flex">
            <Button
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-red to-red-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(200,38,45,0.35)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(200,38,45,0.6)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              Book a Stand
            </Button>
            <Button
              href={event.cta.registerVisit}
              variant="secondary"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-brand-green/60 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              Register to Visit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-red lg:hidden"
          >
            <div className="relative h-3.5 w-4.5">
              <span
                className={clsx(
                  "absolute left-0 top-0 h-0.5 w-4.5 rounded-full bg-white transition-all duration-300",
                  mobileOpen && "top-1.5 rotate-45"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-1.5 h-0.5 w-4.5 rounded-full bg-white transition-all duration-200",
                  mobileOpen && "translate-x-1 opacity-0"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-3 h-0.5 w-4.5 rounded-full bg-white transition-all duration-300",
                  mobileOpen && "top-1.5 -rotate-45"
                )}
              />
            </div>
          </button>
        </Container>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}