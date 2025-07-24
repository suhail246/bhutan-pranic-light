import { z } from "zod";

export const AllLanguagesSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Language name must be at least 3 characters long" })
    .max(100, {
      message: "Language name can't be more than 100 characters long",
    })
    .transform((val) => val.trim()),
  code: z
    .string()
    .min(1, { message: "Language code required" })
    .max(2, { message: "Language code can't be more than 2 characters long" })
    .regex(/^[a-z]+$/, {
      message: "Language code must contain only lowercase letters (a-z)",
    })
    .transform((val) => val.trim()),
  app_lang_code: z
    .string()
    .transform((val) => val.trim())
    .optional(),
});
