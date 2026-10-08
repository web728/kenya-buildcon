import { connectToDatabase } from "@/lib/db/mongodb";
import { GalleryItem, type GalleryItemDoc } from "@/models/GalleryItem";

export type GallerySummary = GalleryItemDoc & { _id: string };

function serialize(doc: Record<string, unknown>): GallerySummary {
  return JSON.parse(JSON.stringify(doc));
}

export async function getPublishedGalleryItems(): Promise<GallerySummary[]> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return [];
    const docs = await GalleryItem.find({ published: true }).sort({ sortOrder: 1 }).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}
