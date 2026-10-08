"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/mongodb";
import { GalleryItem } from "@/models/GalleryItem";

export async function createGalleryItem(formData: FormData) {
  "use server";
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Database not configured");

  await GalleryItem.create({
    title: String(formData.get("title") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    category: String(formData.get("category") ?? ""),
    published: formData.get("published") === "on",
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function toggleGalleryPublished(id: string, published: boolean) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await GalleryItem.updateOne({ _id: id }, { published });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryItem(id: string) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await GalleryItem.deleteOne({ _id: id });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
