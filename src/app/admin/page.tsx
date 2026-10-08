import type { Metadata } from "next";
import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { PartnerEnquiry } from "@/models/PartnerEnquiry";
import { ContactEnquiry } from "@/models/ContactEnquiry";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function getCounts() {
  const conn = await connectToDatabase();
  if (!conn) {
    return { exhibitor: 0, visitor: 0, partner: 0, contact: 0, newsletter: 0, connected: false };
  }
  const [exhibitor, visitor, partner, contact, newsletter] = await Promise.all([
    ExhibitorEnquiry.countDocuments(),
    VisitorRegistration.countDocuments(),
    PartnerEnquiry.countDocuments(),
    ContactEnquiry.countDocuments(),
    NewsletterSubscriber.countDocuments(),
  ]);
  return { exhibitor, visitor, partner, contact, newsletter, connected: true };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: "Exhibitor Enquiries", value: counts.exhibitor, href: "/admin/leads/exhibitor-enquiries" },
    { label: "Visitor Registrations", value: counts.visitor, href: "/admin/leads/visitor-registrations" },
    { label: "Partner Enquiries", value: counts.partner, href: "/admin/leads/partner-enquiries" },
    { label: "Contact Enquiries", value: counts.contact, href: "/admin/leads/contact-enquiries" },
    { label: "Newsletter Subscribers", value: counts.newsletter, href: "/admin/leads/newsletter" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-dark">Dashboard</h1>

      {!counts.connected ? (
        <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          MONGODB_URI is not configured — showing zero counts. Set it in your environment to see
          live data.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-brand-border bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-extrabold text-brand-red">{card.value}</p>
            <p className="mt-2 text-sm font-semibold text-brand-dark">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
