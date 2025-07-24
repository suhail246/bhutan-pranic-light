import { PERMISSIONS } from "@/constants/permissions";

export const postTableColumns = [
  { name: "#" },
  { name: "Date", class: "hidden sm:table-cell" },
  { name: "Banner" },
  { name: "Title" },
  { name: "Category" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.POST.EDIT_POST,
      PERMISSIONS.POST.DELETE_POST,
      PERMISSIONS.POST.TOGGLE_ACTIVE_POST,
      PERMISSIONS.POST.TOGGLE_FEATURED_POST,
    ],
  },
];

export const contactQueryTableColumns = [
  { name: "#" },
  { name: "Date", class: "hidden sm:table-cell" },
  { name: "Name" },
  { name: "Contact Info" },
  { name: "Message" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [PERMISSIONS.CONTACTS.DELETE_CONTACT_QUERY],
  },
];

export const newsArticleTableColumns = [
  { name: "#" },
  { name: "Date", class: "hidden sm:table-cell" },
  { name: "Banner" },
  { name: "Title" },
  { name: "Category" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
      PERMISSIONS.NEWS.DELETE_NEWS_ARTICLE,
      PERMISSIONS.NEWS.TOGGLE_ACTIVE_NEWS_ARTICLE,
      PERMISSIONS.NEWS.TOGGLE_FEATURED_NEWS_ARTICLE,
    ],
  },
];

export const coursesTableColumns = [
  { name: "#" },
  { name: "Image" },
  { name: "Title" },
  { name: "Short Description" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.COURSES.EDIT_COURSE,
      PERMISSIONS.COURSES.DELETE_COURSE,
      PERMISSIONS.COURSES.TOGGLE_ACTIVE_COURSE,
      PERMISSIONS.COURSES.TOGGLE_FEATURED_COURSE,
    ],
  },
];

export const coursePackagesTableColumns = [
  { name: "#" },
  { name: "Name" },
  { name: "Course Name" },
  { name: "Type" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.PACKAGES.EDIT_PACKAGE,
      PERMISSIONS.PACKAGES.DELETE_PACKAGE,
      PERMISSIONS.PACKAGES.TOGGLE_ACTIVE_PACKAGE,
      PERMISSIONS.PACKAGES.TOGGLE_FEATURED_PACKAGE,
    ],
  },
];

export const cmsPageTableColumns = [
  { name: "#" },
  { name: "Name" },
  { name: "Slug" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.CMS_SETUP.EDIT_PAGE,
      PERMISSIONS.CMS_SETUP.EDIT_PAGE_SECTIONS,
      PERMISSIONS.CMS_SETUP.TOGGLE_ACTIVE_PAGE,
    ],
  },
];

export const contactsTableColumns = [
  { name: "#" },
  { name: "Name" },
  { name: "Address" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.CONTACTS.EDIT_CONTACT,
      PERMISSIONS.CONTACTS.DELETE_CONTACT,
      PERMISSIONS.CONTACTS.TOGGLE_ACTIVE_CONTACT,
      PERMISSIONS.CONTACTS.TOGGLE_ACTIVE_CONTACT_FORM,
      PERMISSIONS.CONTACTS.TOGGLE_FEATURED_CONTACT,
    ],
  },
];

export const testimonialsTableColumns = [
  { name: "#" },
  { name: "Image", class: "hidden sm:table-cell" },
  { name: "Name" },
  { name: "Message" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.TESTIMONIAL.EDIT_TESTIMONIAL,
      PERMISSIONS.TESTIMONIAL.DELETE_TESTIMONIAL,
      PERMISSIONS.TESTIMONIAL.TOGGLE_ACTIVE_TESTIMONIAL,
      PERMISSIONS.TESTIMONIAL.TOGGLE_FEATURED_TESTIMONIAL,
    ],
  },
];

export const careersTableColumns = [
  { name: "#" },
  { name: "Date" },
  { name: "Job Name" },
  { name: "Vacancies" },
  {
    name: "Actions",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.CAREER.EDIT_CAREER,
      PERMISSIONS.CAREER.DELETE_CAREER,
      PERMISSIONS.CAREER.TOGGLE_ACTIVE_CAREER,
      PERMISSIONS.CAREER.TOGGLE_FEATURED_CAREER,
    ],
  },
];

export const categoryTableColumns = [
  { name: "Name" },
  {
    name: "Actions",
    class: "md:hidden text-right",
    requirePermissionList: [
      PERMISSIONS.CATEGORY.EDIT_CATEGORY,
      PERMISSIONS.CATEGORY.DELETE_CATEGORY,
      PERMISSIONS.CATEGORY.TOGGLE_ACTIVE_CATEGORY,
      PERMISSIONS.CATEGORY.TOGGLE_FEATURED_CATEGORY,
      PERMISSIONS.CATEGORY.TOGGLE_DEFAULT_CATEGORY,
    ],
  },
  {
    name: "Active Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.CATEGORY.TOGGLE_ACTIVE_CATEGORY],
  },
  {
    name: "Featured Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.CATEGORY.TOGGLE_FEATURED_CATEGORY],
  },
  {
    name: "Default Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.CATEGORY.TOGGLE_DEFAULT_CATEGORY],
  },
  {
    name: "Options",
    class: "hidden md:table-cell text-right",
    requirePermissionList: [
      PERMISSIONS.CATEGORY.EDIT_CATEGORY,
      PERMISSIONS.CATEGORY.DELETE_CATEGORY,
    ],
  },
];

export const newsCategoryTableColumns = [
  { name: "Name" },
  {
    name: "Actions",
    class: "md:hidden text-right",
    requirePermissionList: [
      PERMISSIONS.NEWS_CATEGORY.EDIT_NEWS_CATEGORY,
      PERMISSIONS.NEWS_CATEGORY.DELETE_NEWS_CATEGORY,
      PERMISSIONS.NEWS_CATEGORY.TOGGLE_ACTIVE_NEWS_CATEGORY,
      PERMISSIONS.NEWS_CATEGORY.TOGGLE_FEATURED_NEWS_CATEGORY,
      PERMISSIONS.NEWS_CATEGORY.TOGGLE_DEFAULT_NEWS_CATEGORY,
    ],
  },
  {
    name: "Active Status",
    class: "hidden md:table-cell",
    requirePermissionList: [
      PERMISSIONS.NEWS_CATEGORY.TOGGLE_ACTIVE_NEWS_CATEGORY,
    ],
  },
  {
    name: "Featured Status",
    class: "hidden md:table-cell",
    requirePermissionList: [
      PERMISSIONS.NEWS_CATEGORY.TOGGLE_FEATURED_NEWS_CATEGORY,
    ],
  },
  {
    name: "Default Status",
    class: "hidden md:table-cell",
    requirePermissionList: [
      PERMISSIONS.NEWS_CATEGORY.TOGGLE_DEFAULT_NEWS_CATEGORY,
    ],
  },
  {
    name: "Options",
    class: "hidden md:table-cell text-right",
    requirePermissionList: [
      PERMISSIONS.NEWS_CATEGORY.EDIT_NEWS_CATEGORY,
      PERMISSIONS.NEWS_CATEGORY.DELETE_NEWS_CATEGORY,
    ],
  },
];

export const roleTableColumns = () => [
  { name: "#" },
  { name: "Name" },
  {
    name: "Options",
    class: "text-right",
    requirePermissionList: [
      PERMISSIONS.STAFF.EDIT_STAFF_ROLE,
      PERMISSIONS.STAFF.DELETE_STAFF_ROLE,
    ],
  },
];

export const userTableColumns = () => [
  { name: "#", class: "pl-3" },
  { name: "Name" },
  { name: "Email" },
  { name: "Roles" },
  {
    name: "Options",
    class: "text-right pr-3",
    requirePermissionList: [
      PERMISSIONS.STAFF.EDIT_STAFF,
      PERMISSIONS.CATEGORY.DELETE_STAFF,
    ],
  },
];

export const languagesTableColumns = () => [
  { name: "#" },
  { name: "Name" },
  {
    name: "Actions",
    class: "md:hidden text-right",
    requirePermissionList: [
      PERMISSIONS.LANGUAGE.EDIT_LANGUAGE,
      PERMISSIONS.LANGUAGE.DELETE_LANGUAGE,
      PERMISSIONS.LANGUAGE.TOGGLE_ACTIVE_LANGUAGE,
      PERMISSIONS.LANGUAGE.TOGGLE_RTL_LANGUAGE,
      PERMISSIONS.LANGUAGE.TOGGLE_DEFAULT_LANGUAGE,
    ],
  },
  {
    name: "Active Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.LANGUAGE.TOGGLE_ACTIVE_LANGUAGE],
  },
  {
    name: "RTL Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.LANGUAGE.TOGGLE_RTL_LANGUAGE],
  },
  {
    name: "Default Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.LANGUAGE.TOGGLE_DEFAULT_LANGUAGE],
  },
  {
    name: "Options",
    class: "hidden md:table-cell text-right",
    requirePermissionList: [
      PERMISSIONS.LANGUAGE.EDIT_LANGUAGE,
      PERMISSIONS.LANGUAGE.DELETE_LANGUAGE,
    ],
  },
];

export const menuTableColumns = () => [
  { name: "Name" },
  {
    name: "Actions",
    class: "md:hidden text-right",
    requirePermissionList: [
      PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU,
      PERMISSIONS.MENU_MANAGEMENT.DELETE_MENU,
      PERMISSIONS.MENU_MANAGEMENT.TOGGLE_ACTIVE_MENU,
      PERMISSIONS.MENU_MANAGEMENT.TOGGLE_PRODUCT_MENU,
    ],
  },
  {
    name: "Active Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.MENU_MANAGEMENT.TOGGLE_ACTIVE_MENU],
  },
  {
    name: "Product Menu Status",
    class: "hidden md:table-cell",
    requirePermissionList: [PERMISSIONS.MENU_MANAGEMENT.TOGGLE_PRODUCT_MENU],
  },
  {
    name: "Options",
    class: "hidden md:table-cell text-right",
    requirePermissionList: [
      PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU,
      PERMISSIONS.MENU_MANAGEMENT.DELETE_MENU,
    ],
  },
];
