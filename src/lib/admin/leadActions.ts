"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ExhibitorEnquiry } from "@/models/ExhibitorEnquiry";
import { VisitorRegistration } from "@/models/VisitorRegistration";
import { PartnerEnquiry } from "@/models/PartnerEnquiry";
import { ContactEnquiry } from "@/models/ContactEnquiry";
import { appendLeadRow, isSheetsConfigured, type SheetRow } from "@/lib/google/sheets";

export type LeadCollection = "exhibitor" | "visitor" | "partner" | "contact";

const MODELS = {
  exhibitor: ExhibitorEnquiry,
  visitor: VisitorRegistration,
  partner: PartnerEnquiry,
  contact: ContactEnquiry,
} as const;

const PATHS: Record<LeadCollection, string> = {
  exhibitor: "/admin/leads/exhibitor-enquiries",
  visitor: "/admin/leads/visitor-registrations",
  partner: "/admin/leads/partner-enquiries",
  contact: "/admin/leads/contact-enquiries",
};

const SHEET_TABS: Record<LeadCollection, string> = {
  exhibitor: "Exhibitor Enquiries",
  visitor: "Visitor Registrations",
  partner: "Partner Enquiries",
  contact: "Contact Enquiries",
};

export async function updateLeadStatus(collection: LeadCollection, id: string, status: string) {
  const conn = await connectToDatabase();
  if (!conn) return;
  await MODELS[collection].updateOne({ _id: id }, { status });
  revalidatePath(PATHS[collection]);
}

export async function addLeadNote(collection: LeadCollection, id: string, text: string) {
  if (!text.trim()) return;
  const conn = await connectToDatabase();
  if (!conn) return;
  await MODELS[collection].updateOne({ _id: id }, { $push: { notes: { text: text.trim() } } });
  revalidatePath(PATHS[collection]);
}

function toSheetRow(collection: LeadCollection, doc: Record<string, unknown>): SheetRow {
  const referenceId = String(doc.referenceId ?? "");
  switch (collection) {
    case "exhibitor":
      return {
        referenceId,
        name: `${doc.firstName} ${doc.lastName}`,
        company: String(doc.companyName ?? ""),
        designation: String(doc.designation ?? ""),
        country: String(doc.country ?? ""),
        city: String(doc.city ?? ""),
        email: String(doc.email ?? ""),
        phone: String(doc.mobile ?? ""),
        type: String(doc.companyType ?? ""),
        productInterest: String(doc.productCategory ?? ""),
        message: String(doc.productsServices ?? ""),
        utmSource: "", utmMedium: "", utmCampaign: "", landingPage: String(doc.landingPage ?? ""),
      };
    case "visitor":
      return {
        referenceId,
        name: `${doc.firstName} ${doc.lastName}`,
        company: String(doc.company ?? ""),
        designation: String(doc.designation ?? ""),
        country: String(doc.country ?? ""),
        city: String(doc.city ?? ""),
        email: String(doc.email ?? ""),
        phone: String(doc.mobile ?? ""),
        type: String(doc.natureOfBusiness ?? ""),
        productInterest: Array.isArray(doc.productsInterested) ? doc.productsInterested.join(", ") : "",
        message: String(doc.purposeOfVisit ?? ""),
        utmSource: "", utmMedium: "", utmCampaign: "", landingPage: String(doc.landingPage ?? ""),
      };
    case "partner":
      return {
        referenceId,
        name: String(doc.contactPerson ?? ""),
        company: String(doc.organisation ?? ""),
        designation: String(doc.designation ?? ""),
        country: String(doc.country ?? ""),
        city: "",
        email: String(doc.email ?? ""),
        phone: String(doc.phone ?? ""),
        type: String(doc.organisationType ?? ""),
        productInterest: String(doc.industryRepresented ?? ""),
        message: String(doc.natureOfEnquiry ?? ""),
        utmSource: "", utmMedium: "", utmCampaign: "", landingPage: String(doc.landingPage ?? ""),
      };
    case "contact":
      return {
        referenceId,
        name: String(doc.name ?? ""),
        company: String(doc.company ?? ""),
        designation: String(doc.designation ?? ""),
        country: String(doc.country ?? ""),
        city: "",
        email: String(doc.email ?? ""),
        phone: String(doc.mobile ?? ""),
        type: String(doc.interest ?? ""),
        productInterest: "",
        message: String(doc.message ?? ""),
        utmSource: "", utmMedium: "", utmCampaign: "", landingPage: String(doc.landingPage ?? ""),
      };
  }
}

export async function retrySheetsSync(collection: LeadCollection, id: string) {
  if (!isSheetsConfigured()) return;

  const conn = await connectToDatabase();
  if (!conn) return;
  const Model = MODELS[collection];
  const doc = await Model.findById(id).lean();
  if (!doc) return;

  try {
    await appendLeadRow(SHEET_TABS[collection], toSheetRow(collection, doc as Record<string, unknown>));
    await Model.updateOne({ _id: id }, { sheetsSyncStatus: "synced" });
  } catch {
    await Model.updateOne({ _id: id }, { sheetsSyncStatus: "failed" });
  }
  revalidatePath(PATHS[collection]);
}
