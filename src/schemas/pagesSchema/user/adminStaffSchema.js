import mongoose from "mongoose";
import { z } from "zod";

const nameSchema = () =>
  z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(50, "Username must be at most 50 characters long.")
    .trim();

const emailSchema = () =>
  z.string().email({ message: "Invalid email address." }).trim();

const passwordSchema = () =>
  z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(15, { message: "Password can't be more than 15 characters." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    )
    .trim();

export const AdminStaffSchema = z.object({
  name: nameSchema(),
  email: emailSchema(),
  password: passwordSchema(), // Password in required
  roleId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid role.",
  }),
});

export const UserUpdateSchema = z.object({
  name: nameSchema(),
  email: emailSchema(),
  password: z
    .string()
    .optional()
    .refine((val) => val === "" || passwordSchema().safeParse(val).success, {
      message:
        "Invalid password. It must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character.",
    }), // Password in optional
  roleId: z
    .union([z.string(), z.null()])
    .refine((id) => id === null || mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid role.",
    }),
});
