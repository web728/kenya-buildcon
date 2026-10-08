import { connectToDatabase } from "@/lib/db/mongodb";
import { Partner, type PartnerDoc } from "@/models/Partner";

export type PartnerSummary = PartnerDoc & { 
  _id: string;
  tier?: string;
};

function serialize(doc: Record<string, unknown>): PartnerSummary {
  return JSON.parse(JSON.stringify(doc));
}

/** Returns active partners, or [] if the database isn't configured/reachable. */
export async function getActivePartners(): Promise<PartnerSummary[]> {
  try {
    const conn = await connectToDatabase();
    if (!conn) return [];
    const docs = await Partner.find({ active: true }).sort({ sortOrder: 1, name: 1 }).lean();
    return docs.map(serialize);
  } catch {
    return [];
  }
}