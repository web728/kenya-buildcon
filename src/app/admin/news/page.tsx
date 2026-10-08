import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { News } from "@/models/News";
import { createNewsArticle, toggleNewsPublished, deleteNewsArticle } from "@/lib/admin/newsActions";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "News", robots: { index: false } };

const CATEGORIES = ["Exhibitor News", "Show Updates", "Industry Updates", "Partner News"];

type NewsRow = { _id: string; title: string; category: string; published: boolean };

export default async function AdminNewsPage() {
  const conn = await connectToDatabase();
  const articles: NewsRow[] = conn
    ? JSON.parse(JSON.stringify(await News.find().sort({ publishedAt: -1 }).lean()))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-dark">News</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
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
              {articles.map((a) => (
                <tr key={a._id}>
                  <td className="px-4 py-3 font-semibold text-brand-dark">{a.title}</td>
                  <td className="px-4 py-3">{a.category}</td>
                  <td className="px-4 py-3">
                    <PublishToggle published={a.published} onToggle={toggleNewsPublished.bind(null, a._id)} />
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton onDelete={deleteNewsArticle.bind(null, a._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 ? (
            <p className="p-8 text-center text-sm text-brand-body">No articles yet.</p>
          ) : null}
        </div>

        <div className="rounded-xl border border-brand-border bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">Add Article</h2>
          <form action={createNewsArticle} className="mt-4 flex flex-col gap-3">
            <input name="title" placeholder="Title" required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <select name="category" required defaultValue="" className="rounded-md border border-brand-border px-3 py-2 text-sm">
              <option value="" disabled>Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input name="featuredImageUrl" placeholder="Featured image URL" className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <textarea name="excerpt" placeholder="Excerpt" rows={2} required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <textarea name="body" placeholder="Body (paragraphs separated by blank lines)" rows={6} required className="rounded-md border border-brand-border px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm text-brand-body">
              <input type="checkbox" name="published" className="h-4 w-4 rounded border-brand-border" />
              Publish immediately
            </label>
            <button type="submit" className="mt-2 rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark">
              Add Article
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
