import { connectToDatabase } from "@/lib/db/mongodb";
import { Download, type DownloadDoc } from "@/models/Download";

export type DownloadSummary = DownloadDoc & { _id: string };

function serialize(doc: Record<string, unknown>): DownloadSummary {
  return JSON.parse(JSON.stringify(doc));
}

export async function getPublishedDownloads(): Promise<DownloadSummary[]> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return [];
    const docs = await Download.find({ published: true }).sort({ sortOrder: 1 }).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}
