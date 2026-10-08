import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Partner } from "@/models/Partner";
import { createPartner, togglePartnerActive, deletePartner } from "@/lib/admin/partnerActions";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Partners", robots: { index: false } };

const CATEGORIES = ["Supporting Organisation", "Association Partner", "Industry Partner", "Media Partner"];

type PartnerRow = { _id: string; name: string; category: string; active: boolean; url?: string };

export default async function AdminPartnersPage() {
  const conn = await connectToDatabase();
  const partners: PartnerRow[] = conn
    ? JSON.parse(JSON.stringify(await Partner.find().sort({ sortOrder: 1, name: 1 }).lean()))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-dark">Partners</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="overflow-x-auto rounded-xl border border-brand-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-brand-border bg-brand-light text-xs font-bold uppercase tracking-wide text-brand-body">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {partners.map((p) => (
                <tr key={p._id}>
                  <td className="px-4 py-3 font-semibold text-brand-dark">{p.name}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">
                    <PublishToggle published={p.active} onToggle={togglePartnerActive.bind(null, p._id)} />
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton onDelete={deletePartner.bind(null, p._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {partners.length === 0 ? (
            <p className="p-8 text-center text-sm text-brand-body">No partners yet.</p>
          ) : null}
        </div>

        <div className="rounded-xl border border-brand-border bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">Add Partner</h2>
          <form action={createPartner} className="mt-4 flex flex-col gap-3">
            <input name="name" placeholder="Organisation name" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="logoUrl" placeholder="Logo URL" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="url" placeholder="Website URL" className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <select name="category" required defaultValue="" className="rounded-md border border-brand-border px-3 py-2 text-sm">
              <option value="" disabled>Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-brand-body">
              <input type="checkbox" name="active" className="h-4 w-4 rounded border-brand-border" />
              Show on site
            </label>
            <button type="submit" className="mt-2 rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark">
              Add Partner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
