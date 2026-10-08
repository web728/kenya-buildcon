import { Schema, models, model, type InferSchemaType } from "mongoose";

const PartnerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, required: true },
    url: { type: String },
    category: {
      type: String,
      enum: ["Supporting Organisation", "Association Partner", "Industry Partner", "Media Partner"],
      required: true,
    },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type PartnerDoc = InferSchemaType<typeof PartnerSchema>;

export const Partner = models.Partner || model("Partner", PartnerSchema);
