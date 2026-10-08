import { Schema, models, model, type InferSchemaType } from "mongoose";

const DownloadSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    category: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type DownloadDoc = InferSchemaType<typeof DownloadSchema>;

export const Download = models.Download || model("Download", DownloadSchema);
