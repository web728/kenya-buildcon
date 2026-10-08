import { connectToDatabase } from "@/lib/db/mongodb";
import { Exhibitor, type ExhibitorDoc } from "@/models/Exhibitor";
import { event } from "@/config/event";

export type ExhibitorSummary = ExhibitorDoc & { _id: string };

function serialize(doc: Record<string, unknown>): ExhibitorSummary {
  return JSON.parse(JSON.stringify(doc));
}

/** Returns published exhibitors, or [] if the database isn't configured/reachable. */
export async function getPublishedExhibitors(): Promise<ExhibitorSummary[]> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return [];
    const docs = await Exhibitor.find({ published: true })
      .sort({ sortOrder: 1, companyName: 1 })
      .lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}

export async function getFeaturedExhibitors(limit = 6): Promise<ExhibitorSummary[]> {
  const all = await getPublishedExhibitors();
  if (all.length < event.exhibitorDirectoryMinimum) return [];
  return all.slice(0, limit);
}

export async function getExhibitorBySlug(slug: string): Promise<ExhibitorSummary | null> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return null;
    const doc = await Exhibitor.findOne({ slug, published: true }).lean();
    return doc ? serialize(doc) : null;
  } catch {
    return null;
  }
}
