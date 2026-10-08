import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Exhibitor } from "@/models/Exhibitor";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { countries } from "@/data/countries";
import { createExhibitor, toggleExhibitorPublished, deleteExhibitor } from "@/lib/admin/exhibitorActions";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Exhibitors", robots: { index: false } };

type ExhibitorRow = {
  _id: string;
  companyName: string;
  country: string;
  category: string;
  standNumber?: string;
  published: boolean;
};

export default async function AdminExhibitorsPage() {
  const conn = await connectToDatabase();
  const exhibitors: ExhibitorRow[] = conn
    ? JSON.parse(JSON.stringify(await Exhibitor.find().sort({ sortOrder: 1, companyName: 1 }).lean()))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-dark">Exhibitors</h1>
      <p className="mt-1 text-sm text-brand-body">
        {exhibitors.filter((e) => e.published).length} published of {exhibitors.length} total. The
        public directory hides itself until at least 6 exhibitors are published.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="overflow-x-auto rounded-xl border border-brand-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-brand-border bg-brand-light text-xs font-bold uppercase tracking-wide text-brand-body">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Stand</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {exhibitors.map((ex) => (
                <tr key={ex._id}>
                  <td className="px-4 py-3 font-semibold text-brand-dark">{ex.companyName}</td>
                  <td className="px-4 py-3">{ex.country}</td>
                  <td className="px-4 py-3">{ex.category}</td>
                  <td className="px-4 py-3">{ex.standNumber || "—"}</td>
                  <td className="px-4 py-3">
                    <PublishToggle
                      published={ex.published}
                      onToggle={toggleExhibitorPublished.bind(null, ex._id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton onDelete={deleteExhibitor.bind(null, ex._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {exhibitors.length === 0 ? (
            <p className="p-8 text-center text-sm text-brand-body">No exhibitors yet — add one using the form.</p>
          ) : null}
        </div>

        <div className="rounded-xl border border-brand-border bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">Add Exhibitor</h2>
          <form action={createExhibitor} className="mt-4 flex flex-col gap-3">
            <input name="companyName" placeholder="Company name" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <select name="country" required defaultValue="" className="rounded-md border border-brand-border px-3 py-2 text-sm">
              <option value="" disabled>Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select name="category" required defaultValue="" className="rounded-md border border-brand-border px-3 py-2 text-sm">
              <option value="" disabled>Category</option>
              {exhibitionSectors.map((s) => (
                <option key={s.slug} value={s.name}>{s.name}</option>
              ))}
            </select>
            <input name="standNumber" placeholder="Stand number" className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="logoUrl" placeholder="Logo URL (/images/exhibitors/…)" className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="website" placeholder="Website" className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="brochureUrl" placeholder="Brochure URL" className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <textarea name="shortDescription" placeholder="Short description" rows={3} className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="products" placeholder="Products (comma separated)" className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm text-brand-body">
              <input type="checkbox" name="published" className="h-4 w-4 rounded border-brand-border" />
              Publish immediately
            </label>
            <button type="submit" className="mt-2 rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark">
              Add Exhibitor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
