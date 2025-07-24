import { z } from "zod";

export const ContactQueryMessageSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name required")
      .max(50, "First name too long")
      .regex(/^[A-Za-z\s]+$/, "Invalid first name"),

    lastName: z.string().trim().optional(),

    mobileNumber: z
      .string()
      .trim()
      .min(10, "Invalid mobile number")
      .max(15, "Mobile number must not exceed 15 digits")
      .regex(
        /^\+\d{1,3}\s\d{6,15}$/,
        "Mobile number must be in format COUNTRYCODE SPACE DIGITS"
      ),

    email: z
      .string()
      .trim()
      .email("Invalid email format")
      .max(100, "Email is too long"),

    problemDescription: z.string().trim().optional(),
  })
  .strict(); // ❌ Rejects any extra fields
