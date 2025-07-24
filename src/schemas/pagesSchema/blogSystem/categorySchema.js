import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const CategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Category name must atleast 3 characters long." })
    .transform((name) => name.trim()), // Trim leading and trailing whitespace

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

  description: z.string().optional(),

  parentCategoryId: z
    .string()
    .optional()
    .refine((value) => !value || value === "none" || isValidId(value), {
      message: "Parent category must be either 'none' or a valid ObjectId.",
    }),

  metaTitle: z
    .string()
    .optional()
    .transform((title) => title?.trim() || ""),

  metaImage: z
    .string()
    .nullable()
    .refine(
      (value) => value === null || mongoose.Types.ObjectId.isValid(value),
      {
        message: "Meta Image must be a valid ObjectId or null.",
      }
    )
    .default(null),

  metaDescription: z
    .string()
    .optional()
    .transform((desc) => desc?.trim() || ""),
});
