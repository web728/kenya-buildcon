"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Partner } from "@/models/Partner";

export async function createPartner(formData: FormData) {
  "use server";
  const conn = await connectToDatabase();
  if (!conn) throw new Error("Database not configured");

  await Partner.create({
    name: String(formData.get("name") ?? ""),
    logoUrl: String(formData.get("logoUrl") ?? ""),
    url: String(formData.get("url") ?? "") || undefined,
    category: String(formData.get("category") ?? ""),
    active: formData.get("active") === "on",
  });

  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  revalidatePath("/");
}

export async function togglePartnerActive(id: string, active: boolean) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await Partner.updateOne({ _id: id }, { active });
  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  revalidatePath("/");
}

export async function deletePartner(id: string) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await Partner.deleteOne({ _id: id });
  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  revalidatePath("/");
}
