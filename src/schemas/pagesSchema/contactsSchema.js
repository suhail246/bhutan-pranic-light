import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const AllContactsSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title name must be at least 3 characters long" })
    .transform((title) => title.trim()),
  branchName: z
    .string()
    .min(3, { message: "Branch name must be at least 3 characters long" })
    .transform((branchName) => branchName.trim()),
  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .trim()
    .transform(
      (slug) =>
        slug
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, "") // Remove leading or trailing hyphens
    )
    .refine((slug) => /^[a-z0-9-]+$/.test(slug), {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  orderNumber: z.string().transform((orderNumber) => orderNumber.trim()),
  branchAddress: z
    .string()
    .default("")
    .transform((branchAddress) => branchAddress.trim()),
  contactNumber: z
    .string()
    .default("")
    .transform((contactNumber) => contactNumber.trim()),
  contactEmail: z
    .string()
    .default("")
    .transform((contactEmail) => contactEmail.trim()),
  openingHours: z
    .object({
      labels: z.array(z.string()),
      values: z.array(z.string()),
    })
    .partial() // Makes openingHours optional
    .refine(
      (data) => {
        if (data?.label && data?.values) {
          return data.label.length === data.values.length;
        }
        return true; // Allow if openingHours is not provided
      },
      { message: "Opening hours label and values must have the same length." }
    ),
  latitude: z.string().min(1, { message: "Latitude is required." }),
  longitude: z.string().min(1, { message: "Longitude is required." }),
  metaTitle: z
    .string()
    .default("")
    .transform((title) => title.trim()),
  metaImage: z
    .string()
    .nullable()
    .refine((value) => value === null || isValidId(value), {
      message: "Meta Image must be a valid ObjectId or null.",
    })
    .default(null),
  metaKeywords: z
    .string()
    .default("")
    .transform((keywords) => keywords.trim()),
  metaDescription: z
    .string()
    .default("")
    .transform((desc) => desc.trim()),
});
