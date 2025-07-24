import mongoose from "mongoose";
import { z } from "zod";

export const HeaderMenuSchema = z.object({
  // Validates the menu name: must be a trimmed string between 2 and 50 characters.
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, {
      message: "Name can't be more than 50 characters long",
    })
    .transform((val) => val.trim()),

  // Validates the menu link: must start with '/' or be '#', and contain only letters, numbers, and dashes.
  link: z
    .string()
    .regex(/^\/[a-zA-Z0-9-/]*$|^#$/, {
      message:
        "Invalid link format. It must start with '/' or be '#' and contain only letters, numbers, and dashes.",
    })
    .transform((val) => val.trim()),

  // Validates the parent menu ID:
  // - Optional field that allows null values.
  // - Converts "none" to null.
  // - Ensures a valid MongoDB ObjectId if provided.
  parentMenu: z
    .string()
    .optional()
    .nullable()
    .transform((value) => (!value || value === "none" ? null : value)) // ✅ Convert "none" to null
    .refine((value) => !value || mongoose.Types.ObjectId.isValid(value), {
      message: "Invalid parent menu ID",
    }),

  // Validates the order number:
  // - Input is expected as a string.
  // - If empty, defaults to "1".
  // - Ensures it is a valid integer.
  // - Must be greater than 0 (no negative or zero values allowed).
  orderNumber: z
    .string()
    .transform((val) => val.trim() || "1")
    .refine((val) => !isNaN(Number(val)) && Number.isInteger(Number(val)), {
      message: "Order number must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Order number must be greater than 0",
    }),
});
