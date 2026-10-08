import { connectToDatabase } from "@/lib/db/mongodb";
import { News, type NewsDoc } from "@/models/News";

export type NewsSummary = NewsDoc & { _id: string };

function serialize(doc: Record<string, unknown>): NewsSummary {
  return JSON.parse(JSON.stringify(doc));
}

/** Returns published news, or [] if the database isn't configured/reachable. */
export async function getPublishedNews(limit?: number): Promise<NewsSummary[]> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return [];
    const query = News.find({ published: true }).sort({ publishedAt: -1 });
    const docs = await (limit ? query.limit(limit) : query).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsSummary | null> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return null;
    const doc = await News.findOne({ slug, published: true }).lean();
    return doc ? serialize(doc) : null;
  } catch {
    return null;
  }
}
