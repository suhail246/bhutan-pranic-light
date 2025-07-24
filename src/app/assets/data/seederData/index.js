import { configDotenv } from "dotenv";

configDotenv();

// 1. Seed Admin Created Role (Super Admin) Data in DB
export const superAdminRole = {
  name: "Super Admin",
};

// 2. Seed All Permissions Data in DB
export const permissionList = [
  // // Post
  // {
  //   section: "Post",
  //   name: "Add Post",
  // },
  // {
  //   section: "Post",
  //   name: "View All Posts",
  // },
  // {
  //   section: "Post",
  //   name: "Edit Post",
  // },
  // {
  //   section: "Post",
  //   name: "Delete Post",
  // },
  // {
  //   section: "Post",
  //   name: "Toggle Active Post",
  // },
  // {
  //   section: "Post",
  //   name: "Toggle Featured Post",
  // },
  // // Category
  // {
  //   section: "Category",
  //   name: "Add Category",
  // },
  // {
  //   section: "Category",
  //   name: "View All Categories",
  // },
  // {
  //   section: "Category",
  //   name: "Edit Category",
  // },
  // {
  //   section: "Category",
  //   name: "Delete Category",
  // },
  // {
  //   section: "Category",
  //   name: "Toggle Active Category",
  // },
  // {
  //   section: "Category",
  //   name: "Toggle Featured Category",
  // },
  // {
  //   section: "Category",
  //   name: "Toggle Default Category",
  // },
  // // File
  // {
  //   section: "File",
  //   name: "Add File",
  // },
  // {
  //   section: "File",
  //   name: "View All Files",
  // },
  // {
  //   section: "File",
  //   name: "Delete File",
  // },
  // {
  //   section: "File",
  //   name: "Download File",
  // },
  // {
  //   section: "File",
  //   name: "Toggle Default File",
  // },
  // {
  //   section: "File",
  //   name: "File Details",
  // },
  // // Staff
  // {
  //   section: "Staff",
  //   name: "Add Staff",
  // },
  // {
  //   section: "Staff",
  //   name: "View All Staffs",
  // },
  // {
  //   section: "Staff",
  //   name: "Edit Staff",
  // },
  // {
  //   section: "Staff",
  //   name: "Delete Staff",
  // },
  // {
  //   section: "Staff",
  //   name: "Add Staff Role",
  // },
  // {
  //   section: "Staff",
  //   name: "View Staff Roles",
  // },
  // {
  //   section: "Staff",
  //   name: "Edit Staff Role",
  // },
  // {
  //   section: "Staff",
  //   name: "Delete Staff Role",
  // },
  // Language
  // {
  //   section: "Language",
  //   name: "Add Language",
  // },
  // {
  //   section: "Language",
  //   name: "View All Languages",
  // },
  // {
  //   section: "Language",
  //   name: "Edit Language",
  // },
  // {
  //   section: "Language",
  //   name: "Delete Language",
  // },
  // {
  //   section: "Language",
  //   name: "Toggle Active Language",
  // },
  // {
  //   section: "Language",
  //   name: "Toggle RTL Language",
  // },
  // {
  //   section: "Language",
  //   name: "Toggle Default Language",
  // },
  // {
  //   section: "Website Setup",
  //   name: "Header Setup",
  // },
  // {
  //   section: "Website Setup",
  //   name: "Footer Setup",
  // },
  // {
  //   section: "Website Setup",
  //   name: "General Settings",
  // },
  // {
  //   section: "Menu Management",
  //   name: "Add Menu",
  // },
  // {
  //   section: "Menu Management",
  //   name: "Edit Menu",
  // },
  // {
  //   section: "Menu Management",
  //   name: "Delete Menu",
  // },
  // {
  //   section: "Menu Management",
  //   name: "View All Menus",
  // },
  // {
  //   section: "Menu Management",
  //   name: "Toggle Product Menu",
  // },
  // {
  //   section: "Menu Management",
  //   name: "Toggle Active Menu",
  // },
  // News
  // {
  //   section: "News Article",
  //   name: "Add News Article",
  // },
  // {
  //   section: "News Article",
  //   name: "View All News Articles",
  // },
  // {
  //   section: "News Article",
  //   name: "Edit News Article",
  // },
  // {
  //   section: "News Article",
  //   name: "Delete News Article",
  // },
  // {
  //   section: "News Article",
  //   name: "Toggle Active News Article",
  // },
  // {
  //   section: "News Article",
  //   name: "Toggle Featured News Article",
  // },
  // News Category
  // {
  //   section: "News Category",
  //   name: "Add News Category",
  // },
  // {
  //   section: "News Category",
  //   name: "View All News Categories",
  // },
  // {
  //   section: "News Category",
  //   name: "Edit News Category",
  // },
  // {
  //   section: "News Category",
  //   name: "Delete News Category",
  // },
  // {
  //   section: "News Category",
  //   name: "Toggle Active News Category",
  // },
  // {
  //   section: "News Category",
  //   name: "Toggle Featured News Category",
  // },
  // {
  //   section: "News Category",
  //   name: "Toggle Default News Category",
  // },
  // {
  //   section: "Careers",
  //   name: "Add New Job",
  // },
  // {
  //   section: "Careers",
  //   name: "View All Jobs",
  // },
  // {
  //   section: "Careers",
  //   name: "Edit Job",
  // },
  // {
  //   section: "Careers",
  //   name: "Delete Job",
  // },
  // {
  //   section: "Careers",
  //   name: "Toggle Active Job",
  // },
  // {
  //   section: "Careers",
  //   name: "Toggle Featured Job",
  // },
  // {
  //   section: "Contacts",
  //   name: "Add Contact",
  // },
  // {
  //   section: "Contacts",
  //   name: "View All Contacts",
  // },
  {
    section: "Contacts",
    name: "View All Contact Queries",
  },
  // {
  //   section: "Contacts",
  //   name: "Edit Contact",
  // },
  // {
  //   section: "Contacts",
  //   name: "Delete Contact",
  // },
  {
    section: "Contacts",
    name: "Delete Contact Query",
  },
  // {
  //   section: "Contacts",
  //   name: "Toggle Active Contact",
  // },
  // {
  //   section: "Contacts",
  //   name: "Toggle Active Contact Form",
  // },
  // {
  //   section: "Contacts",
  //   name: "Toggle Featured Contact",
  // },
  // {
  //   section: "Testimonial",
  //   name: "Add Testimonial",
  // },
  // {
  //   section: "Testimonial",
  //   name: "View All Testimonials",
  // },
  // {
  //   section: "Testimonial",
  //   name: "Edit Testimonial",
  // },
  // {
  //   section: "Testimonial",
  //   name: "Delete Testimonial",
  // },
  // {
  //   section: "Testimonial",
  //   name: "Toggle Active Testimonial",
  // },
  // {
  //   section: "Testimonial",
  //   name: "Toggle Featured Testimonial",
  // },
  // {
  //   section: "Career",
  //   name: "Add Career",
  // },
  // {
  //   section: "Career",
  //   name: "View All Careers",
  // },
  // {
  //   section: "Career",
  //   name: "Edit Career",
  // },
  // {
  //   section: "Career",
  //   name: "Delete Career",
  // },
  // {
  //   section: "Career",
  //   name: "Toggle Active Career",
  // },
  // {
  //   section: "Career",
  //   name: "Toggle Featured Career",
  // },
  // {
  //   section: "Content Management System",
  //   name: "Add Page",
  // },
  // {
  //   section: "Content Management System",
  //   name: "View All Pages",
  // },
  // {
  //   section: "Content Management System",
  //   name: "Edit Page",
  // },
  // {
  //   section: "Content Management System",
  //   name: "Edit Page Sections",
  // },
  // {
  //   section: "Content Management System",
  //   name: "Delete Page",
  // },
  // {
  //   section: "Content Management System",
  //   name: "Toggle Active Page",
  // },
  // {
  //   section: "Courses",
  //   name: "Add Course",
  // },
  // {
  //   section: "Courses",
  //   name: "View All Courses",
  // },
  // {
  //   section: "Courses",
  //   name: "Edit Course",
  // },
  // {
  //   section: "Courses",
  //   name: "Delete Course",
  // },
  // {
  //   section: "Courses",
  //   name: "Toggle Active Course",
  // },
  // {
  //   section: "Courses",
  //   name: "Toggle Featured Course",
  // },
  // {
  //   section: "Packages",
  //   name: "Add Package",
  // },
  // {
  //   section: "Packages",
  //   name: "View All Packages",
  // },
  // {
  //   section: "Packages",
  //   name: "Edit Package",
  // },
  // {
  //   section: "Packages",
  //   name: "Delete Package",
  // },
  // {
  //   section: "Packages",
  //   name: "Toggle Active Package",
  // },
  // {
  //   section: "Packages",
  //   name: "Toggle Featured Package",
  // },
];

// 3. Seed Admin with (Super Admin) Role Data in DB
// export const adminWithSuperAdminRole = {
//   email: process.env.ADMIN_EMAIL,
//   username: process.env.ADMIN_USERNAME,
//   password: process.env.ADMIN_PASSWORD,
//   role: ["User", "Admin"],
//   adminAsignedRole: "67b440b6f88280241fc4f677", // NOTE Add Super Admin ObjectId
//   isVerified: true,
// };

// 4. Seed Default Category Data in DB
export const category = {
  userId: "67a5dfa2ff716c2c4e15af03", // NOTE Add Admin User ObjectId
  name: "Category 1",
  slug: "category-1",
  description: "Category 1 duplicate checks",
  activeStatus: true,
  isFeatured: false,
  isDefault: true,
};

// 5. Seed languages data in DB
export const languages = [
  // {
  //   name: "English",
  //   code: "en",
  //   app_lang_code: "en",
  //   rtl: false,
  //   status: true,
  // },
  // {
  //   name: "Arabic",
  //   code: "ar",
  //   app_lang_code: "ar",
  //   rtl: true,
  //   status: true,
  // },
  // {
  //   name: "French",
  //   code: "fr",
  //   app_lang_code: "fr",
  //   rtl: false,
  //   status: true,
  // },
  {
    name: "Chinese",
    code: "ch",
    app_lang_code: "ch",
    rtl: false,
    status: true,
  },
];

// 6. Seed Blog Data in DB
export const blog = {
  userId: "67a5dfa2ff716c2c4e15af03", // NOTE Add Admin User ObjectId
  title: "Seeder Blog 2",
  slug: "seeder-blog-2",
  category: "67a5e0cd3e56d1f87ade906f", // NOTE Add Category ObjectId
  shortDescription: "Seeder Blog 2 Short Description",
  description: "Seeder Blog 2 Description",
  tags: ["tag1", "tag2", "tag3"],
  source: "https://www.google.com",
  isActive: false,
  isFeatured: false,
  metaTitle: "Seeder Blog 2 Meta Title",
  metaDescription: "Seeder Blog 2 Meta Description",
};
