import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { PartnerEnquiry } from "@/models/PartnerEnquiry";
import { ContactEnquiry } from "@/models/ContactEnquiry";

const MODELS = {
  "exhibitor-enquiries": ExhibitorEnquiry,
  "visitor-registrations": VisitorRegistration,
  "partner-enquiries": PartnerEnquiry,
  "contact-enquiries": ContactEnquiry,
} as const;

function toCsvValue(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;
  const Model = MODELS[collection as keyof typeof MODELS];
  if (!Model) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const conn = await connectToDatabase();
  if (!conn) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const docs = await Model.find().sort({ createdAt: -1 }).lean();
  if (docs.length === 0) {
    return new NextResponse("No data", { status: 200, headers: { "Content-Type": "text/plain" } });
  }

  const keys = Array.from(
    new Set(docs.flatMap((d) => Object.keys(d as object).filter((k) => !["__v", "notes"].includes(k)))),
  );

  const lines = [
    keys.join(","),
    ...docs.map((d) => keys.map((k) => toCsvValue((d as Record<string, unknown>)[k])).join(",")),
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${collection}.csv"`,
    },
  });
}
