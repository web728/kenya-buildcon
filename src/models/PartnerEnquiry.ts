import { Schema, models, model, type InferSchemaType } from "mongoose";

const PartnerEnquirySchema = new Schema(
  {
    referenceId: { type: String, required: true, unique: true, index: true },
    organisation: { type: String, required: true },
    organisationType: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String },
    contactPerson: { type: String, required: true },
    designation: { type: String },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true },
    approximateMembership: { type: String },
    industryRepresented: { type: String },
    natureOfEnquiry: { type: String, required: true },
    message: { type: String },

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

export type PartnerEnquiryDoc = InferSchemaType<typeof PartnerEnquirySchema>;

export const PartnerEnquiry = models.PartnerEnquiry || model("PartnerEnquiry", PartnerEnquirySchema);
