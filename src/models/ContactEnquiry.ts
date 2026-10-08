import { Schema, models, model, type InferSchemaType } from "mongoose";

const ContactEnquirySchema = new Schema(
  {
    referenceId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    designation: { type: String },
    country: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    mobile: { type: String, required: true },
    interest: {
      type: String,
      enum: ["Exhibiting", "Visiting", "Association / Partner", "Sponsorship", "Media", "General Enquiry"],
      required: true,
    },
    message: { type: String, required: true },

    utm: { source: String, medium: String, campaign: String },
    landingPage: { type: String },
    userAgent: { type: String },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Follow-Up", "Confirmed", "Closed", "Invalid"],
      default: "New",
    },
    notes: [{ text: String, createdAt: { type: Date, default: Date.now } }],

    sheetsSyncStatus: { type: String, enum: ["pending", "synced", "failed"], default: "pending" },
    emailStatus: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  },
  { timestamps: true },
);

export type ContactEnquiryDoc = InferSchemaType<typeof ContactEnquirySchema>;

export const ContactEnquiry = models.ContactEnquiry || model("ContactEnquiry", ContactEnquirySchema);
