import { z } from "zod";

export const RegistrationSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(50, "Username must be at most 50 characters long")
      .trim(),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(15, { message: "Password can't be more than 15 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters" })
      .max(15, { message: "Confirm Password can't be more than 15 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        {
          message:
            "Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .trim(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Password doesn't match with Confirm Password",
      });
    }
  });
