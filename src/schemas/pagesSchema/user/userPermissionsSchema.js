import mongoose from "mongoose";
import { z } from "zod";

// Action Schema for each permission action
const ActionSchema = z.object({
  name: z
    .string()
    .min(1, "Action name is required")
    .max(50, "Action name must not exceed 50 characters"),
  status: z.boolean().default(false), // Default status is false
});

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const AllPermissionsSchema = z.object({
  module: z
    .string()
    .min(3, "Module name must be at least 3 characters long")
    .max(100, "Module name can't be more than 100 characters long"),
  role: z.string().refine((value) => isValidId(value), {
    message: "Role must be a valid ID",
  }),
  actions: z
    .array(ActionSchema)
    .min(1, "At least one action must be provided")
    .max(10, "A maximum of 10 actions are allowed"),
});
