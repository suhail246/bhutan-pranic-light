import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const AllNewsArticleSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .transform((title) => title.trim()),
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
  category: z.string().refine((value) => isValidId(value), {
    message: "Category must be a valid ObjectId.",
  }),
  bannerImage: z.string().refine((value) => isValidId(value), {
    message: "Banner Image must be a valid ObjectId.",
  }),
  shortDescription: z.string().min(5, {
    message: "Short Description must be at least 5 characters long",
  }),
  description: z.string().optional(),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag must not be empty." })
        .max(20, { message: "Each tag must not exceed 20 characters." })
    )
    .max(20, { message: "A maximum of 20 tags are allowed." })
    .optional(),
  source: z.string().optional().default(""),
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
  metaDescription: z
    .string()
    .default("")
    .transform((desc) => desc.trim()),
});
