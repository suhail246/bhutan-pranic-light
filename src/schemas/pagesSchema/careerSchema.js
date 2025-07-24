import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const CareerSchema = z.object({
  jobName: z
    .string()
    .min(1, "Name is required.")
    .transform((val) => val.trim()),
  jobDescripton: z
    .string()
    .min(1, "Description is required.")
    .transform((val) => val.trim()),
  jobVacancies: z
    .string()
    .transform((val) => val.trim())
    .optional(),
  orderNumber: z.string().transform((orderNumber) => orderNumber.trim()),
  applyLink: z
    .string()
    .transform((val) => val.trim())
    .optional(),
  image: z
    .string()
    .nullable()
    .refine((value) => value === null || isValidId(value), {
      message: "Image must be a valid ObjectId or null.",
    })
    .default(null),
  metaTitle: z
    .string()
    .transform((val) => val.trim())
    .optional(),
  metaImage: z
    .string()
    .nullable()
    .refine((value) => value === null || isValidId(value), {
      message: "Meta Image must be a valid ObjectId or null.",
    })
    .default(null),
  metaKeywords: z
    .string()
    .transform((val) => val.trim())
    .optional(),
  metaDescription: z
    .string()
    .transform((val) => val.trim())
    .optional(),
});
