const ROUTES = {
  // Auth Routes:::
  LOGIN: "/login",

  // Public Routes:::
  HOME: "/",
  ABOUT_US: "/about-us",
  COURSES: "/courses",
  NEWS: "/news",
  CAREERS: "/careers",
  CONTACT_US: "/contact-us",
  OFFERS: "/offers",
  NOT_FOUND: "/not-found",

  // Admin Routes:::
  ADMIN_PROFILE: "/admin/profile-info",

  ADMIN_DASHBOARD_ECOMMERCE: "/admin/dashboard",
  ADMIN_DASHBOARD_ANALYTICS: "/admin/dashboard/analytics",
  ADMIN_DASHBOARD_CRM: "/admin/dashboard/crm",

  // Blog System Routes
  ADMIN_BLOG_ALL_POSTS: "/admin/blog/post/view",
  ADMIN_BLOG_CREATE_POST: "/admin/blog/post/create",
  ADMIN_BLOG_UPDATE_POST: (postId) => `/admin/blog/post/update/${postId}`,

  // Category Routes
  ADMIN_BLOG_ALL_CATEGORY: "/admin/blog/category/view",
  ADMIN_BLOG_CREATE_CATEGORY: "/admin/blog/category/create",
  ADMIN_BLOG_UPDATE_CATEGORY: (categoryId) =>
    `/admin/blog/category/update/${categoryId}`,

  // News Article Routes
  ADMIN_ALL_NEWS_ARTICLES: "/admin/news/article/view",
  ADMIN_CREATE_NEWS_ARTICLE: "/admin/news/article/create",
  ADMIN_UPDATE_NEWS_ARTICLE: (targetId) =>
    `/admin/news/article/update/${targetId}`,

  // News Category Routes
  ADMIN_ALL_NEWS_CATEGORIES: "/admin/news/category/view",
  ADMIN_CREATE_NEWS_CATEGORY: "/admin/news/category/create",
  ADMIN_UPDATE_NEWS_CATEGORY: (targetId) =>
    `/admin/news/category/update/${targetId}`,

  // Contact Routes
  ADMIN_ALL_CONTACTS: "/admin/contact/view",
  ADMIN_CREATE_CONTACT: "/admin/contact/create",
  ADMIN_ALL_CONTACT_QUERIES: "/admin/contact/queries",
  ADMIN_UPDATE_CONTACT: (targetId) => `/admin/contact/update/${targetId}`,

  // Testimonial Routes
  ADMIN_ALL_TESTIMONIALS: "/admin/testimonial/view",
  ADMIN_CREATE_TESTIMONIAL: "/admin/testimonial/create",
  ADMIN_UPDATE_TESTIMONIAL: (targetId) =>
    `/admin/testimonial/update/${targetId}`,

  // Career Routes
  ADMIN_ALL_CAREERS: "/admin/career/view",
  ADMIN_CREATE_CAREER: "/admin/career/create",
  ADMIN_UPDATE_CAREER: (targetId) => `/admin/career/update/${targetId}`,

  // Courses Routes
  ADMIN_ALL_COURSES: "/admin/training-courses/view",
  ADMIN_CREATE_COURSE: "/admin/training-courses/create?tab=section-1",
  ADMIN_UPDATE_COURSE: (slug) => `/admin/training-courses/update/${slug}`,

  // Courses Package Routes
  ADMIN_ALL_COURSE_PACKAGES: "/admin/training-courses/package/view",
  ADMIN_CREATE_COURSE_PACKAGE: "/admin/training-courses/package/create",
  ADMIN_UPDATE_COURSE_PACKAGE: (targetId) =>
    `/admin/training-courses/package/update/${targetId}`,

  // File Routes
  ADMIN_ALL_FILES: "/admin/files/view",
  ADMIN_CREATE_FILE: "/admin/files/create",

  // Menu Management Routes
  ADMIN_MENU_LISTS: "/admin/menu/view",
  ADMIN_ADD_NEW_MENU: "/admin/menu/create",
  ADMIN_EDIT_MENU: (targetId) => `/admin/menu/update/${targetId}`,

  // Staff Management Routes
  ADMIN_ALL_STAFF: "/admin/staff/view",
  ADMIN_STAFF_UPDATE: (targetId) => `/admin/staff/update/${targetId}`,

  ADMIN_STAFF_ALL_ROLES: "/admin/staff/role/view",
  ADMIN_STAFF_CREATE_ROLE: "/admin/staff/role/create",
  ADMIN_STAFF_UPDATE_ROLE: (roleId) => `/admin/staff/role/update/${roleId}`,

  // Language Management Routes
  ADMIN_ALL_LANGUAGES: "/admin/configurations/language/view",
  ADMIN_CREATE_LANGUAGE: "/admin/configurations/language/create",
  ADMIN_UPDATE_LANGUAGE: (targetId) =>
    `/admin/configurations/language/update/${targetId}`,

  // CMS Setup Routes
  ADMIN_CMS_ALL_PAGES: "/admin/pages-setup/view",
  ADMIN_CMS_CREATE_PAGE: "/admin/pages-setup/create",
  ADMIN_CMS_UPDATE_PAGE: (linkId) => `/admin/pages-setup/update/${linkId}`,
  ADMIN_CMS_UPDATE_PAGE_SECTIONS: (linkId) =>
    `/admin/pages-setup/sections/${linkId}`,

  // Setup Management Routes
  ADMIN_WEBSITE_APPEARANCE_SETUP: "/admin/configurations/appearance",
  ADMIN_WEBSITE_FOOTER_SETUP: "/admin/configurations/footer",
};

export default ROUTES;
