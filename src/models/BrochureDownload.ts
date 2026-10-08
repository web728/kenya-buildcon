import { Schema, model, models } from "mongoose";

const BrochureDownloadSchema = new Schema(
  {
    referenceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    utm: {
      source: String,
      medium: String,
      campaign: String,
    },
    landingPage: String,
    userAgent: String,
    sheetsSyncStatus: { type: String, enum: ["pending", "synced", "failed"], default: "pending" },
  },
  { timestamps: true }
);

export const BrochureDownload = models.BrochureDownload || model("BrochureDownload", BrochureDownloadSchema);