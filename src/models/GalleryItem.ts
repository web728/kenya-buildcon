import { Schema, models, model, type InferSchemaType } from "mongoose";

const GalleryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["Show Preparations", "Exhibitors", "Venue", "Media", "Future Editions"],
      required: true,
    },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type GalleryItemDoc = InferSchemaType<typeof GalleryItemSchema>;

export const GalleryItem = models.GalleryItem || model("GalleryItem", GalleryItemSchema);
