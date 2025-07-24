import { z } from "zod";

export const HeaderSettingSchema = z.object({
  tobar_banner_link: z.string().url({ message: "Enter a valid URL" }),
  helpline_number: z
    .string()
    .min(5, { message: "Helpline number is required" }),
  header_menu_items: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        link: z.string().url("Enter a valid URL"),
      })
    )
    .min(1, "At least one item is required"),
});
