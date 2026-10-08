import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { GalleryItem } from "@/models/GalleryItem";
import { createGalleryItem, toggleGalleryPublished, deleteGalleryItem } from "@/lib/admin/galleryActions";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Gallery", robots: { index: false } };

const CATEGORIES = ["Show Preparations", "Exhibitors", "Venue", "Media", "Future Editions"];

type GalleryRow = { _id: string; title: string; category: string; published: boolean };

export default async function AdminGalleryPage() {
  const conn = await connectToDatabase();
  const items: GalleryRow[] = conn
    ? JSON.parse(JSON.stringify(await GalleryItem.find().sort({ sortOrder: 1 }).lean()))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-dark">Gallery</h1>

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
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 font-semibold text-brand-dark">{item.title}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">
                    <PublishToggle published={item.published} onToggle={toggleGalleryPublished.bind(null, item._id)} />
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton onDelete={deleteGalleryItem.bind(null, item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 ? <p className="p-8 text-center text-sm text-brand-body">No images yet.</p> : null}
        </div>

        <div className="rounded-xl border border-brand-border bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">Add Image</h2>
          <form action={createGalleryItem} className="mt-4 flex flex-col gap-3">
            <input name="title" placeholder="Title / alt text" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <input name="imageUrl" placeholder="Image URL (/images/gallery/…)" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <select name="category" required defaultValue="" className="rounded-md border border-brand-border px-3 py-2 text-sm">
              <option value="" disabled>Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-brand-body">
              <input type="checkbox" name="published" className="h-4 w-4 rounded border-brand-border" />
              Publish immediately
            </label>
            <button type="submit" className="mt-2 rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark">
              Add Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
