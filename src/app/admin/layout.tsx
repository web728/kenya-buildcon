import Link from "next/link";
import { auth, signOut } from "@/lib/auth/auth";
import { event } from "@/config/event";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin" }],
  },
  {
    label: "Leads",
    items: [
      { label: "Exhibitor Enquiries", href: "/admin/leads/exhibitor-enquiries" },
      { label: "Visitor Registrations", href: "/admin/leads/visitor-registrations" },
      { label: "Partner Enquiries", href: "/admin/leads/partner-enquiries" },
      { label: "Contact Enquiries", href: "/admin/leads/contact-enquiries" },
      { label: "Newsletter", href: "/admin/leads/newsletter" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Exhibitors", href: "/admin/exhibitors" },
      { label: "Partners", href: "/admin/partners" },
      { label: "News", href: "/admin/news" },
      { label: "Gallery", href: "/admin/gallery" },
      { label: "Downloads", href: "/admin/downloads" },
    ],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    // proxy.ts already redirects unauthenticated users away from /admin/*,
    // this is a defensive fallback (e.g. direct render in tests).
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-svh bg-brand-light">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-brand-border bg-white lg:flex">
        <div className="border-b border-brand-border px-6 py-5">
          <p className="text-sm font-extrabold text-brand-dark">{event.shortName}</p>
          <p className="text-xs text-brand-body">Admin</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-brand-body/70">
                {group.label}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-2 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-brand-border px-6 py-4">
          <p className="truncate text-xs text-brand-body">{session.user?.email}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button type="submit" className="mt-2 text-xs font-semibold text-brand-red hover:underline">
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
