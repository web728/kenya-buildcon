import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Download } from "@/models/Download";
import { createDownload, toggleDownloadPublished, deleteDownload } from "@/lib/admin/downloadActions";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Downloads", robots: { index: false } };

type DownloadRow = { _id: string; title: string; category: string; published: boolean };

export default async function AdminDownloadsPage() {
  const conn = await connectToDatabase();
  const downloads: DownloadRow[] = conn
    ? JSON.parse(JSON.stringify(await Download.find().sort({ sortOrder: 1 }).lean()))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-dark">Downloads</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="overflow-x-auto rounded-xl border border-brand-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-brand-border bg-brand-light text-xs font-bold uppercase tracking-wide text-brand-body">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {downloads.map((d) => (
                <tr key={d._id}>
                  <td className="px-4 py-3 font-semibold text-brand-dark">{d.title}</td>
                  <td className="px-4 py-3">{d.category}</td>
                  <td className="px-4 py-3">
                    <PublishToggle published={d.published} onToggle={toggleDownloadPublished.bind(null, d._id)} />
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton onDelete={deleteDownload.bind(null, d._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {downloads.length === 0 ? <p className="p-8 text-center text-sm text-brand-body">No downloads yet.</p> : null}
        </div>

        <div className="rounded-xl border border-brand-border bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">Add Download</h2>
          <form action={createDownload} className="mt-4 flex flex-col gap-3">
            <input name="title" placeholder="Title" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="fileUrl" placeholder="File URL (/downloads/…)" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="category" placeholder="Category" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <textarea name="description" placeholder="Description" rows={2} className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm text-brand-body">
              <input type="checkbox" name="published" className="h-4 w-4 rounded border-brand-border" />
              Publish immediately
            </label>
            <button type="submit" className="mt-2 rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark">
              Add Download
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
