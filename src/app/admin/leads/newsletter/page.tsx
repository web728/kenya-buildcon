import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";

export const metadata: Metadata = { title: "Newsletter Subscribers", robots: { index: false } };

type Subscriber = {
  _id: string;
  email: string;
  country?: string;
  interest?: string[];
  createdAt: string;
};

export default async function NewsletterPage() {
  const conn = await connectToDatabase();
  const subscribers: Subscriber[] = conn
    ? JSON.parse(JSON.stringify(await NewsletterSubscriber.find().sort({ createdAt: -1 }).lean()))
    : [];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-dark">Newsletter Subscribers</h1>
      <p className="mt-1 text-sm text-brand-body">{subscribers.length} subscribers</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-brand-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-brand-border bg-brand-light text-xs font-bold uppercase tracking-wide text-brand-body">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Subscribed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {subscribers.map((s) => (
              <tr key={s._id}>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.country || "—"}</td>
                <td className="px-4 py-3">{s.interest?.join(", ") || "—"}</td>
                <td className="px-4 py-3 text-xs text-brand-body">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 ? (
          <p className="p-8 text-center text-sm text-brand-body">No subscribers yet.</p>
        ) : null}
      </div>
    </div>
  );
}
