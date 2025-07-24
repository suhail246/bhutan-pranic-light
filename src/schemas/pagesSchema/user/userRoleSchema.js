import mongoose from "mongoose";
import { z } from "zod";

export const AllUserRolesSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Role name must be at least 3 characters long" })
    .max(100, { message: "Role name can't be more than 100 characters long" })
    .transform((val) => val.trim()),
  permissionIds: z
    .array(
      z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid permission ID",
      })
    )
    .min(1, { message: "At least one permission is required" }),
});
