import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "New Password must be at least 8 characters" })
      .max(15, { message: "New Password can't be more than 15 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        {
          message:
            "New Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .trim(),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Confirm New Password must be at least 8 characters" })
      .max(15, {
        message: "Confirm New Password can't be more than 15 characters",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        {
          message:
            "Confirm New Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .trim(),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        path: ["confirmNewPassword"],
        message: "New Password doesn't match with Confirm New Password",
      });
    }
  });
