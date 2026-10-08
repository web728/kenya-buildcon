import type { Metadata } from "next";
import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ContactEnquiry } from "@/models/ContactEnquiry";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { LeadRowActions } from "@/components/admin/LeadRowActions";

export const metadata: Metadata = { title: "Contact Enquiries", robots: { index: false } };

type Lead = {
  _id: string;
  referenceId: string;
  name: string;
  company: string;
  country: string;
  email: string;
  mobile: string;
  interest: string;
  message: string;
  status: string;
  sheetsSyncStatus: string;
  emailStatus: string;
  notes: { text: string; createdAt: string }[];
};

export default async function ContactEnquiriesPage() {
  const conn = await connectToDatabase();
  const leads: Lead[] = conn
    ? JSON.parse(JSON.stringify(await ContactEnquiry.find().sort({ createdAt: -1 }).lean()))
    : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-brand-dark">Contact Enquiries</h1>
        <Link
          href="/api/admin/export/contact-enquiries"
          className="rounded-md border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-light"
        >
          Export CSV
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-brand-border bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-brand-border bg-brand-light text-xs font-bold uppercase tracking-wide text-brand-body">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Integrations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {leads.map((lead) => (
              <tr key={lead._id} className="align-top">
                <td className="px-4 py-3 font-mono text-xs">{lead.referenceId}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-brand-dark">{lead.name}</p>
                  <p className="text-xs text-brand-body">{lead.email}</p>
                  <p className="text-xs text-brand-body">{lead.mobile}</p>
                </td>
                <td className="px-4 py-3">{lead.company}</td>
                <td className="px-4 py-3">{lead.interest}</td>
                <td className="max-w-xs px-4 py-3 text-xs text-brand-body">{lead.message}</td>
                <td className="px-4 py-3">
                  <StatusSelect collection="contact" id={lead._id} status={lead.status} />
                </td>
                <td className="px-4 py-3">
                  <LeadRowActions
                    collection="contact"
                    id={lead._id}
                    notes={lead.notes}
                    sheetsSyncStatus={lead.sheetsSyncStatus}
                    emailStatus={lead.emailStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 ? (
          <p className="p-8 text-center text-sm text-brand-body">No contact enquiries yet.</p>
        ) : null}
      </div>
    </div>
  );
}
