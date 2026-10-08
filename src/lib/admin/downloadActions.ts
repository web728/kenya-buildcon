"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Download } from "@/models/Download";

export async function createDownload(formData: FormData) {
  "use server";
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Database not configured");

  await Download.create({
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? "") || undefined,
    fileUrl: String(formData.get("fileUrl") ?? ""),
    category: String(formData.get("category") ?? ""),
    published: formData.get("published") === "on",
  });

  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
}

export async function toggleDownloadPublished(id: string, published: boolean) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await Download.updateOne({ _id: id }, { published });
  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
}

export async function deleteDownload(id: string) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await Download.deleteOne({ _id: id });
  revalidatePath("/admin/downloads");
  revalidatePath("/downloads");
}
