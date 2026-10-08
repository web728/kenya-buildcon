import { Schema, models, model, type InferSchemaType } from "mongoose";

const VisitorRegistrationSchema = new Schema(
  {
    referenceId: { type: String, required: true, unique: true, index: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    designation: { type: String, required: true },
    company: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    mobile: { type: String, required: true },

    natureOfBusiness: { type: String, required: true },
    productsInterested: { type: [String], default: [] },
    purchasingResponsibility: { type: String, required: true },
    purposeOfVisit: { type: String, required: true },

    utm: {
      source: String,
      medium: String,
      campaign: String,
    },
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

export type VisitorRegistrationDoc = InferSchemaType<typeof VisitorRegistrationSchema>;

export const VisitorRegistration =
  models.VisitorRegistration || model("VisitorRegistration", VisitorRegistrationSchema);
