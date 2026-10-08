"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/mongodb";
import { News } from "@/models/News";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createNewsArticle(formData: FormData) {
  "use server";
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Database not configured");

  const title = String(formData.get("title") ?? "");

  await News.create({
    title,
    slug: slugify(title) + "-" + Math.random().toString(36).slice(2, 6),
    excerpt: String(formData.get("excerpt") ?? ""),
    body: String(formData.get("body") ?? ""),
    featuredImageUrl: String(formData.get("featuredImageUrl") ?? "") || undefined,
    category: String(formData.get("category") ?? ""),
    published: formData.get("published") === "on",
    publishedAt: new Date(),
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function toggleNewsPublished(id: string, published: boolean) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await News.updateOne({ _id: id }, { published });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function deleteNewsArticle(id: string) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await News.deleteOne({ _id: id });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}
