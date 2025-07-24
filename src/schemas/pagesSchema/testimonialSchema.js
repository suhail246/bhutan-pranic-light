import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const TestimonialSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .transform((val) => val.trim()),
  designation: z
    .string()
    .transform((val) => val.trim())
    .optional(),
  message: z
    .string()
    .min(1, "Message is required.")
    .transform((val) => val.trim()),
  orderNumber: z.string().transform((orderNumber) => orderNumber.trim()),
  rating: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => {
        if (val === "") return true; // Allow empty string (optional field)
        const num = Number(val);
        return !isNaN(num) && num >= 1 && num <= 5;
      },
      {
        message: "Rating must be a number between 1 and 5.",
      }
    ),
  image: z
    .string()
    .nullable()
    .refine((value) => value === null || isValidId(value), {
      message: "Image must be a valid ObjectId or null.",
    })
    .default(null),
});
