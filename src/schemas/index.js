import { EmailSchema } from "./authSchemas/emailSchema";
import { RegistrationSchema } from "./authSchemas/registrationSchema";
import { ResetPasswordSchema } from "./authSchemas/resetPassword";
import { SignInSchema } from "./authSchemas/signInSchema";
import { AllBlogsSchema } from "./pagesSchema/blogSystem/allBlogsSchema";
import { CategorySchema } from "./pagesSchema/blogSystem/categorySchema";
import { CareerSchema } from "./pagesSchema/careerSchema";
import { ContactQueryMessageSchema } from "./pagesSchema/contactQueryMessageSchema";
import { AllContactsSchema } from "./pagesSchema/contactsSchema";
import { HeaderMenuSchema } from "./pagesSchema/headerMenuSchema";
import { AllLanguagesSchema } from "./pagesSchema/languageSchema";
import { PageCMSValidationSchema } from "./pagesSchema/pageCMSSchema";
import { TestimonialSchema } from "./pagesSchema/testimonialSchema";
import {
  AdminStaffSchema,
  UserUpdateSchema,
} from "./pagesSchema/user/adminStaffSchema";
import { AllPermissionsSchema } from "./pagesSchema/user/userPermissionsSchema";
import { AllUserRolesSchema } from "./pagesSchema/user/userRoleSchema";
import { HeaderSettingSchema } from "./pagesSchema/website-settings/headerSettingsSchema";

export {
  AdminStaffSchema,
  AllBlogsSchema,
  AllContactsSchema,
  AllLanguagesSchema,
  AllPermissionsSchema,
  AllUserRolesSchema,
  CareerSchema,
  CategorySchema,
  ContactQueryMessageSchema,
  EmailSchema,
  HeaderMenuSchema,
  HeaderSettingSchema,
  PageCMSValidationSchema,
  RegistrationSchema,
  ResetPasswordSchema,
  SignInSchema,
  TestimonialSchema,
  UserUpdateSchema,
};
