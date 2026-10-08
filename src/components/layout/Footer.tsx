import Image from "next/image";
import Link from "next/link";
import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

const SOCIAL_LINKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: event.social.linkedin,
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    href: event.social.facebook,
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: event.social.instagram,
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    href: event.social.twitter,
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
].filter((link) => Boolean(link.href));

const FOOTER_CONTACTS = [
  {
    company: "Futurex Group",
    name: event.contact.futurex.name,
    phone: event.contact.futurex.phone,
    email: event.contact.futurex.email,
    isBlue: true,
  },
  {
    company: "ETSIPL",
    name: event.contact.etsipl.name,
    phone: event.contact.etsipl.phone,
    email: event.contact.etsipl.email,
    isBlue: false,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071118] text-white selection:bg-brand-red selection:text-white pt-16 pb-10 border-t border-white/10">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -bottom-36 -right-36 z-0 h-[520px] w-[520px] select-none opacity-25">
        <svg viewBox="0 0 800 800" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="320" fill="none" stroke="#c8262d" strokeWidth="1" strokeDasharray="6 10" />
          <circle cx="400" cy="400" r="220" fill="none" stroke="#25b34b" strokeWidth="1.2" />
          <circle cx="400" cy="400" r="140" fill="#c8262d" opacity="0.15" filter="blur(40px)" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <Container className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header: Enlarged Logo, Description & Both Organiser Contacts */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between pb-12 border-b border-white/10">
          <div className="max-w-xl">
            {/* Prominent Large Logo */}
            <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
              <Image
                src="/logos/Kenya-Logo.png"
                alt={event.name}
                width={1000}
                height={348}
                className="h-12 sm:h-16 md:h-20 w-auto object-contain object-left"
              />
            </Link>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300 font-normal">
              {event.descriptor}. {event.brandLines.supporting}
            </p>

            {/* Event Details Badge */}
            <div className="mt-4 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-slate-200 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              <span className="font-medium">{event.dates.display}</span>
              <span className="text-white/30">•</span>
              <span>{event.venue.name}, {event.venue.city}</span>
              <span className="text-white/30">•</span>
              <span>{event.dates.openingHours}</span>
            </div>
          </div>

         {/* Organiser Contacts (Futurex x2 & ETSIPL) */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 backdrop-blur-xl lg:max-w-3xl w-full shadow-2xl">
  {event.contactList.map((c) => {
    const cleanPhone = c.phone.replace(/[^0-9+]/g, "");
    const isFuturex = c.company === "Futurex Group";

    return (
      <div
        key={c.email}
        className="flex flex-col justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:border-white/15"
      >
        <div>
         
          <p className="mt-2 text-sm font-bold text-white">{c.name}</p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col gap-1.5 text-xs">
          <a
            href={`tel:${cleanPhone}`}
            className="inline-flex items-center gap-2 font-medium text-slate-300 hover:text-brand-green transition-colors"
          >
            <svg className="h-3.5 w-3.5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="tabular-nums">{c.phone}</span>
          </a>

          <a
            href={`mailto:${c.email}`}
            className="inline-flex items-center gap-2 font-medium text-slate-300 hover:text-brand-red-light transition-colors truncate"
          >
            <svg className="h-3.5 w-3.5 text-brand-red-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{c.email}</span>
          </a>
        </div>
      </div>
    );
  })}
</div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5 border-b border-white/10">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red-light">Event</h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
              {footerNav.event?.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red-light">Exhibit</h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
              {footerNav.exhibit?.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red-light">Visit</h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
              {footerNav.visit?.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red-light">Information</h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
              {footerNav.information?.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red-light">Legal &amp; Desk</h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
              {footerNav.legal?.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

    {/* Joint Organisers Section */}
<div className="mt-12 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
  <div>
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
        Joint Event Organisers
      </span>
    </div>

    <h4 className="mt-3 text-base sm:text-lg font-bold text-white tracking-tight">
      Futurex Trade Fair &amp; Events Pvt. Ltd. &bull; ETSIPL
    </h4>
    <p className="mt-1 text-xs text-slate-400 font-normal">
      Connecting global manufacturers with Kenya and the East African region
    </p>
  </div>

  {/* Visually Balanced Logo Containers */}
  <div className="flex items-center gap-4 shrink-0">
    {/* Left Logo: Futurex (Wide Rectangle - controlled with px-3.5) */}
    <a
      href="https://www.futurextrade.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 sm:h-16 w-40 sm:w-44 items-center justify-center rounded-2xl border border-white/15 bg-white px-3.5 py-2.5 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
    >
      <div className="relative h-full w-full">
        <Image
          src="/logos/futurex-logo.png"
          alt="Futurex Trade Fair & Events"
          fill
          sizes="180px"
          className="object-contain object-center"
        />
      </div>
    </a>

    {/* Right Logo: ETSIPL (Round/Square - boosted with scale-110 & minimal padding) */}
    <a
      href="https://www.etsipl.in/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 sm:h-16 w-28 sm:w-32 items-center justify-center rounded-2xl border border-white/15 bg-white p-1.5 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
    >
      <div className="relative h-full w-full scale-[1.12]">
        <Image
          src="/logos/etsipl-logo.png"
          alt="Exhibitions & Trade Services India (ETSIPL)"
          fill
          sizes="140px"
          className="object-contain object-center"
        />
      </div>
    </a>
  </div>
</div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-xs text-slate-400 sm:flex-row">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {event.name}. All rights reserved.
          </p>

          {SOCIAL_LINKS.length > 0 && (
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-red hover:text-white hover:bg-brand-red/20"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}

          <p className="text-center sm:text-right font-medium text-slate-300">
            {event.websiteDisplay}
          </p>
        </div>
      </Container>
    </footer>
  );
}