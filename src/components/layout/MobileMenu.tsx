"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { clsx } from "@/lib/utils/clsx";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

// Variants ko explicitly typing di gayi hai taaki TypeScript error na de
const drawerVariants: Variants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 32,
    },
  },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setExpandedSubmenu((prev) => (prev === label ? null : label));
  };

  const cleanPhone = event.contact.general.phone.replace(/[^0-9+]/g, "");

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/85 backdrop-blur-xl"
          />

          {/* Drawer Panel */}
          <motion.aside
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute bottom-0 right-0 top-0 flex h-[100dvh] w-full max-w-xs flex-col justify-between border-l border-white/10 bg-[#030712] p-6 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:max-w-sm"
          >
            {/* Header / Close */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  {event.dates?.display || "2027 Edition"}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-90"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="my-auto flex-1 overflow-y-auto py-6 pr-1">
              <ul className="flex flex-col gap-1.5">
                {mainNav.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  const hasChildren = Boolean(item.children?.length);
                  const isExpanded = expandedSubmenu === item.label;

                  return (
                    <li key={item.href} className="flex flex-col">
                      <div
                        className={clsx(
                          "group flex items-center justify-between rounded-xl px-3.5 py-3 transition-all duration-200",
                          isActive
                            ? "bg-white/10 font-medium text-white"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex-1 text-sm font-medium tracking-wide"
                        >
                          {item.label}
                        </Link>

                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() => toggleSubmenu(item.label)}
                            aria-label={`Toggle ${item.label} submenu`}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white"
                          >
                            <svg
                              className={clsx(
                                "h-4 w-4 transition-transform duration-300 ease-out",
                                isExpanded && "rotate-180 text-red-400"
                              )}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {hasChildren && isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-white/10 py-1 pl-3.5"
                        >
                          {item.children?.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className={clsx(
                                    "block rounded-lg px-3 py-2 text-xs font-normal transition-all duration-200",
                                    isChildActive
                                      ? "bg-brand-red/15 font-medium text-red-400"
                                      : "text-slate-400 hover:translate-x-0.5 hover:text-white"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTAs */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
              <Link
                href={event.cta.bookStand}
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-xl bg-brand-red py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-brand-red/20 transition-all hover:bg-brand-red-dark active:scale-[0.98]"
              >
                Book a Stand
              </Link>

              <Link
                href={event.cta.registerVisit}
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-200 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-[0.98]"
              >
                Visitor Registration
              </Link>

             <div className="mt-2 px-1 text-[11px] text-slate-400">
  <span className="block truncate">{event.venue.district}, {event.venue.city}</span>
  <div className="mt-2 flex flex-col gap-1.5">
    {event.contactList.map((c) => {
      const firstName = c.name.replace(/^Mr\.\s+/, "").split(" ")[0];
      return (
        <a
          key={c.email}
          href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
          className="flex items-center justify-between font-mono font-medium text-emerald-400 transition-colors hover:text-emerald-300"
        >
          <span className="text-slate-400">{firstName}</span>
          <span className="tabular-nums">{c.phone}</span>
        </a>
      );
    })}
  </div>
</div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}