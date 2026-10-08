import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

export default function NotFound() {
  const cleanPhone = event.contact.general.phone.replace(/[^0-9+]/g, "");

  return (
    <>
      <Header />

      <main
        id="main-content"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b10] pt-28 pb-16 sm:pt-36 sm:pb-24 text-white selection:bg-brand-red selection:text-white"
      >
        {/* Architectural Grid & Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-red/15 blur-[160px]" />
          <div className="absolute bottom-10 right-1/4 h-[350px] w-[350px] rounded-full bg-brand-green/15 blur-[140px]" />

          {/* Blueprint Grid Texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_30%,transparent_100%)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Radar Vector Motif */}
          <svg
            viewBox="0 0 800 800"
            fill="none"
            className="absolute -right-32 -top-32 h-[600px] w-[600px] opacity-15"
          >
            <circle cx="400" cy="400" r="320" stroke="#c8262d" strokeWidth="1" strokeDasharray="6 10" />
            <circle cx="400" cy="400" r="220" stroke="#25b34b" strokeWidth="1.2" />
            <circle cx="400" cy="400" r="130" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
          </svg>
        </div>

        <Container className="relative z-10 w-full max-w-2xl text-center px-4">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-green">
              Error 404 • Destination Unknown
            </span>
          </div>

          {/* Display Heading */}
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Page Not{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-white to-brand-green">
              Located
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-xs sm:text-base leading-relaxed text-slate-300 font-normal">
            The resource you are looking for may have been restructured, removed, or is temporarily offline. Explore the core event gateways below.
          </p>

          {/* Action Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(200,38,45,0.4)] transition-all duration-300 hover:bg-brand-red-dark hover:shadow-[0_0_30px_rgba(200,38,45,0.6)] active:scale-95"
            >
              Back to Home
            </Link>

            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-brand-red/60 hover:bg-white/[0.12] active:scale-95"
            >
              Book a Stand
            </Link>

            <Link
              href={event.cta.registerVisit}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 transition-all duration-300 hover:border-white/30 hover:text-white active:scale-95"
            >
              Register to Visit
            </Link>
          </div>

        {/* Direct Organizer Assistance Desk Card */}
<div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-2xl shadow-2xl">
  <div className="flex items-center justify-between pb-4 border-b border-white/10">
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
      Need Help Finding a Page?
    </span>
    <span className="text-[11px] font-semibold text-slate-400">{event.name}</span>
  </div>

  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
    {event.contactList.map((c) => (
      <div
        key={c.email}
        className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs"
      >
        <p className="text-sm font-bold text-white">{c.name}</p>

        <a
          href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
          className="inline-flex items-center gap-2 font-semibold tabular-nums text-slate-200 transition-colors hover:text-brand-green"
        >
          <svg className="h-4 w-4 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {c.phone}
        </a>

        <a
          href={`mailto:${c.email}`}
          className="inline-flex items-center gap-2 font-semibold text-slate-200 transition-colors hover:text-brand-red truncate"
        >
          <svg className="h-4 w-4 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{c.email}</span>
        </a>
      </div>
    ))}
  </div>
</div>
        </Container>
      </main>

      <Footer />
    </>
  );
}