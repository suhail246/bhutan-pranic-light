import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const PageCMSValidationSchema = z.object({
  pageName: z
    .string()
    .min(1, { message: "Page name is required." })
    .transform((val) => val.trim()),
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
  description: z
    .string()
    .default("")
    .transform((val) => val.trim()),
  metaTitle: z
    .string()
    .default("")
    .transform((val) => val.trim()),
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
    .transform((val) => val.trim()),
  metaDescription: z
    .string()
    .default("")
    .transform((val) => val.trim()),
});
