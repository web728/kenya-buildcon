"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Exhibitor } from "@/models/Exhibitor";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createExhibitor(formData: FormData) {
  "use server";
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Database not configured");

  const companyName = String(formData.get("companyName") ?? "");
  const products = String(formData.get("products") ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  await Exhibitor.create({
    companyName,
    slug: slugify(companyName) + "-" + Math.random().toString(36).slice(2, 6),
    logoUrl: String(formData.get("logoUrl") ?? "") || undefined,
    country: String(formData.get("country") ?? ""),
    standNumber: String(formData.get("standNumber") ?? "") || undefined,
    category: String(formData.get("category") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? "") || undefined,
    products,
    website: String(formData.get("website") ?? "") || undefined,
    brochureUrl: String(formData.get("brochureUrl") ?? "") || undefined,
    published: formData.get("published") === "on",
  });

  revalidatePath("/admin/exhibitors");
  revalidatePath("/exhibitors");
  redirect("/admin/exhibitors");
}

export async function toggleExhibitorPublished(id: string, published: boolean) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await Exhibitor.updateOne({ _id: id }, { published });
  revalidatePath("/admin/exhibitors");
  revalidatePath("/exhibitors");
}

export async function deleteExhibitor(id: string) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await Exhibitor.deleteOne({ _id: id });
  revalidatePath("/admin/exhibitors");
  revalidatePath("/exhibitors");
}
