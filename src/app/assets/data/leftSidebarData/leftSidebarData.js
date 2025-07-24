import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { CgMenuRound } from "react-icons/cg";
import { FaNewspaper, FaUsersCog } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import {
  MdModelTraining,
  MdOutlineArticle,
  MdOutlineFolder,
  MdPages,
  MdSettings,
  MdWorkHistory,
} from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

const leftSidebarData = [
  {
    tabCategory: "Menu",
    tabNameList: [
      {
        id: "Dashboard",
        tabName: "Dashboards",
        tabIcon: <RiDashboard2Fill />,
        tabDropdownList: [
          {
            id: "dashboard-analytics",
            parentTabId: "Dashboard",
            tabName: "Analytics",
            pathName: ROUTES.ADMIN_DASHBOARD_ANALYTICS,
            tabDropdownList: [],
          },
          {
            id: "dashboard-crm",
            parentTabId: "Dashboard",
            tabName: "CRM",
            pathName: ROUTES.ADMIN_DASHBOARD_CRM,
            tabDropdownList: [],
          },
          {
            id: "dashboard",
            parentTabId: "Dashboard",
            tabName: "Ecommerce",
            pathName: ROUTES.ADMIN_DASHBOARD_ECOMMERCE,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "Blog",
        tabName: "Blog System",
        tabIcon: <MdOutlineArticle />,
        required_permissions: [
          PERMISSIONS.POST.VIEW_ALL_POSTS,
          PERMISSIONS.POST.ADD_POST,
          PERMISSIONS.POST.EDIT_POST,
          PERMISSIONS.CATEGORY.VIEW_ALL_CATEGORIES,
          PERMISSIONS.CATEGORY.ADD_CATEGORY,
          PERMISSIONS.CATEGORY.EDIT_CATEGORY,
        ],
        tabDropdownList: [
          {
            id: "blog-post",
            parentTabId: "Blog",
            tabName: "Posts",
            pathName: "#",
            required_permissions: [
              PERMISSIONS.POST.VIEW_ALL_POSTS,
              PERMISSIONS.POST.ADD_POST,
              PERMISSIONS.POST.EDIT_POST,
            ],
            tabDropdownList: [
              {
                id: "blog-post-view",
                parentTabId: "Blog",
                firstChildId: "blog-post",
                tabName: "All Posts",
                pathName: ROUTES.ADMIN_BLOG_ALL_POSTS,
                required_permission: PERMISSIONS.POST.VIEW_ALL_POSTS,
                tabDropdownList: [],
              },
              {
                id: "blog-post-create",
                parentTabId: "Blog",
                firstChildId: "blog-post",
                tabName: "Create Post",
                pathName: ROUTES.ADMIN_BLOG_CREATE_POST,
                required_permission: PERMISSIONS.POST.ADD_POST,
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "blog-category",
            parentTabId: "Blog",
            tabName: "Categories",
            pathName: "#",
            required_permissions: [
              PERMISSIONS.CATEGORY.VIEW_ALL_CATEGORIES,
              PERMISSIONS.CATEGORY.ADD_CATEGORY,
              PERMISSIONS.CATEGORY.EDIT_CATEGORY,
            ],
            tabDropdownList: [
              {
                id: "blog-category-view",
                parentTabId: "Blog",
                firstChildId: "blog-category",
                tabName: "All Categories",
                pathName: ROUTES.ADMIN_BLOG_ALL_CATEGORY,
                required_permission: PERMISSIONS.CATEGORY.VIEW_ALL_CATEGORIES,
                tabDropdownList: [],
              },
              {
                id: "blog-category-create",
                parentTabId: "Blog",
                firstChildId: "blog-category",
                tabName: "Create Category",
                pathName: ROUTES.ADMIN_BLOG_CREATE_CATEGORY,
                required_permission: PERMISSIONS.CATEGORY.ADD_CATEGORY,
                tabDropdownList: [],
              },
            ],
          },
        ],
      },

      {
        id: "News",
        tabName: "News System",
        tabIcon: <FaNewspaper />,
        required_permissions: [
          PERMISSIONS.NEWS.VIEW_ALL_NEWS_ARTICLES,
          PERMISSIONS.NEWS.ADD_NEWS_ARTICLE,
          PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
          PERMISSIONS.NEWS.VIEW_ALL_NEWS_CATEGORIES,
          PERMISSIONS.NEWS.ADD_NEWS_CATEGORY,
          PERMISSIONS.NEWS.EDIT_NEWS_CATEGORY,
        ],
        tabDropdownList: [
          {
            id: "news-article",
            parentTabId: "News",
            tabName: "News Articles",
            pathName: "#",
            required_permissions: [
              PERMISSIONS.NEWS.VIEW_ALL_NEWS_ARTICLES,
              PERMISSIONS.NEWS.ADD_NEWS_ARTICLE,
              PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
            ],
            tabDropdownList: [
              {
                id: "news-article-view",
                parentTabId: "News",
                firstChildId: "news-article",
                tabName: "All News",
                pathName: ROUTES.ADMIN_ALL_NEWS_ARTICLES,
                required_permission: PERMISSIONS.NEWS.VIEW_ALL_NEWS_ARTICLES,
                tabDropdownList: [],
              },
              {
                id: "news-article-create",
                parentTabId: "News",
                firstChildId: "news-article",
                tabName: "Create News",
                pathName: ROUTES.ADMIN_CREATE_NEWS_ARTICLE,
                required_permission: PERMISSIONS.NEWS.ADD_NEWS_ARTICLE,
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "news-category",
            parentTabId: "News",
            tabName: "News Categories",
            pathName: "#",
            required_permissions: [
              PERMISSIONS.NEWS.VIEW_ALL_NEWS_CATEGORIES,
              PERMISSIONS.NEWS.ADD_NEWS_CATEGORY,
              PERMISSIONS.NEWS.EDIT_NEWS_CATEGORY,
            ],
            tabDropdownList: [
              {
                id: "news-category-view",
                parentTabId: "News",
                firstChildId: "news-category",
                tabName: "All News Categories",
                pathName: ROUTES.ADMIN_ALL_NEWS_CATEGORIES,
                required_permission: PERMISSIONS.NEWS.VIEW_ALL_NEWS_CATEGORIES,
                tabDropdownList: [],
              },
              {
                id: "news-category-create",
                parentTabId: "News",
                firstChildId: "news-category",
                tabName: "Create News Category",
                pathName: ROUTES.ADMIN_CREATE_NEWS_CATEGORY,
                required_permission: PERMISSIONS.NEWS.ADD_NEWS_CATEGORY,
                tabDropdownList: [],
              },
            ],
          },
        ],
      },

      {
        id: "Contact",
        tabName: "Contact Hub",
        tabIcon: <FaMapLocationDot />,
        required_permissions: [
          PERMISSIONS.CONTACTS.VIEW_ALL_CONTACTS,
          PERMISSIONS.CONTACTS.ADD_CONTACT,
          PERMISSIONS.CONTACTS.VIEW_ALL_CONTACT_QUERIES,
        ],
        tabDropdownList: [
          {
            id: "contact-view",
            parentTabId: "Contact",
            tabName: "Contact Lists",
            pathName: ROUTES.ADMIN_ALL_CONTACTS,
            required_permission: PERMISSIONS.CONTACTS.VIEW_ALL_CONTACTS,
            tabDropdownList: [],
          },
          {
            id: "contact-create",
            parentTabId: "Contact",
            tabName: "New Contact",
            pathName: ROUTES.ADMIN_CREATE_CONTACT,
            required_permission: PERMISSIONS.CONTACTS.ADD_CONTACT,
            tabDropdownList: [],
          },
          {
            id: "contact-queries",
            parentTabId: "Contact",
            tabName: "Queries",
            pathName: ROUTES.ADMIN_ALL_CONTACT_QUERIES,
            required_permission: PERMISSIONS.CONTACTS.VIEW_ALL_CONTACT_QUERIES,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "Testimonial",
        tabName: "Testimonial",
        tabIcon: <VscFeedback />,
        required_permissions: [
          PERMISSIONS.TESTIMONIAL.VIEW_ALL_TESTIMONIALS,
          PERMISSIONS.TESTIMONIAL.ADD_TESTIMONIAL,
        ],
        tabDropdownList: [
          {
            id: "testimonial-view",
            parentTabId: "Testimonial",
            tabName: "Feedback Gallery",
            pathName: ROUTES.ADMIN_ALL_TESTIMONIALS,
            required_permission: PERMISSIONS.TESTIMONIAL.VIEW_ALL_TESTIMONIALS,
            tabDropdownList: [],
          },
          {
            id: "testimonial-create",
            parentTabId: "Testimonial",
            tabName: "Create Feedback",
            pathName: ROUTES.ADMIN_CREATE_TESTIMONIAL,
            required_permission: PERMISSIONS.TESTIMONIAL.ADD_TESTIMONIAL,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "Career",
        tabName: "Manage Careers",
        tabIcon: <MdWorkHistory />,
        required_permissions: [
          PERMISSIONS.CAREER.VIEW_ALL_CAREERS,
          PERMISSIONS.CAREER.ADD_CAREER,
        ],
        tabDropdownList: [
          {
            id: "career-view",
            parentTabId: "Career",
            tabName: "Job Listings",
            pathName: ROUTES.ADMIN_ALL_CAREERS,
            required_permission: PERMISSIONS.CAREER.VIEW_ALL_CAREERS,
            tabDropdownList: [],
          },
          {
            id: "career-create",
            parentTabId: "Career",
            tabName: "Add New Job",
            pathName: ROUTES.ADMIN_CREATE_CAREER,
            required_permission: PERMISSIONS.CAREER.ADD_CAREER,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "training-courses",
        tabName: "Training Courses",
        tabIcon: <MdModelTraining />,
        required_permissions: [
          PERMISSIONS.COURSES.VIEW_ALL_COURSES,
          PERMISSIONS.COURSES.ADD_COURSE,
          PERMISSIONS.PACKAGES.VIEW_ALL_PACKAGES,
          PERMISSIONS.PACKAGES.ADD_PACKAGE,
        ],
        tabDropdownList: [
          {
            id: "training-courses-view",
            parentTabId: "training-courses",
            tabName: "All Courses",
            pathName: ROUTES.ADMIN_ALL_COURSES,
            required_permission: PERMISSIONS.COURSES.VIEW_ALL_COURSES,
            tabDropdownList: [],
          },
          {
            id: "training-courses-create",
            parentTabId: "training-courses",
            tabName: "Publish Course",
            pathName: ROUTES.ADMIN_CREATE_COURSE,
            required_permission: PERMISSIONS.COURSES.ADD_COURSE,
            tabDropdownList: [],
          },
          {
            id: "training-courses-package",
            parentTabId: "training-courses",
            tabName: "Packages",
            pathName: "#",
            required_permissions: [
              PERMISSIONS.PACKAGES.VIEW_ALL_PACKAGES,
              PERMISSIONS.PACKAGES.ADD_PACKAGE,
            ],
            tabDropdownList: [
              {
                id: "training-courses-package-view",
                parentTabId: "training-courses",
                firstChildId: "training-courses-package",
                tabName: "All Packages",
                pathName: ROUTES.ADMIN_ALL_COURSE_PACKAGES,
                required_permission: PERMISSIONS.PACKAGES.VIEW_ALL_PACKAGES,
                tabDropdownList: [],
              },
              {
                id: "training-courses-package-create",
                parentTabId: "training-courses",
                firstChildId: "training-courses-package",
                tabName: "Create Package",
                pathName: ROUTES.ADMIN_CREATE_COURSE_PACKAGE,
                required_permission: PERMISSIONS.PACKAGES.ADD_PACKAGE,
                tabDropdownList: [],
              },
            ],
          },
        ],
      },

      {
        id: "Files",
        tabName: "Files Console",
        tabIcon: <MdOutlineFolder />,
        required_permissions: [
          PERMISSIONS.FILE.VIEW_ALL_FILES,
          PERMISSIONS.FILE.ADD_FILE,
        ],
        tabDropdownList: [
          {
            id: "files-view",
            parentTabId: "Files",
            tabName: "File Lists",
            pathName: ROUTES.ADMIN_ALL_FILES,
            required_permission: PERMISSIONS.FILE.VIEW_ALL_FILES,
            tabDropdownList: [],
          },
          {
            id: "files-create",
            parentTabId: "Files",
            tabName: "Create File",
            pathName: ROUTES.ADMIN_CREATE_FILE,
            required_permission: PERMISSIONS.FILE.ADD_FILE,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "Menu",
        tabName: "Menu Management",
        tabIcon: <CgMenuRound />,
        required_permissions: [
          PERMISSIONS.MENU_MANAGEMENT.VIEW_ALL_MENUS,
          PERMISSIONS.MENU_MANAGEMENT.ADD_MENU,
        ],
        tabDropdownList: [
          {
            id: "menu-view",
            parentTabId: "Menu",
            tabName: "All Menus",
            pathName: ROUTES.ADMIN_MENU_LISTS,
            required_permission: PERMISSIONS.MENU_MANAGEMENT.VIEW_ALL_MENUS,
            tabDropdownList: [],
          },

          {
            id: "menu-create",
            parentTabId: "Menu",
            tabName: "Create Menu",
            pathName: ROUTES.ADMIN_ADD_NEW_MENU,
            required_permission: PERMISSIONS.MENU_MANAGEMENT.ADD_MENU,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "pages-setup",
        tabName: "CMS Setup",
        tabIcon: <MdPages />,
        required_permissions: [
          PERMISSIONS.CMS_SETUP.VIEW_ALL_PAGES,
          PERMISSIONS.CMS_SETUP.ADD_PAGE,
        ],
        tabDropdownList: [
          {
            id: "pages-setup-view",
            parentTabId: "pages-setup",
            tabName: "All Pages",
            pathName: ROUTES.ADMIN_CMS_ALL_PAGES,
            required_permission: PERMISSIONS.CMS_SETUP.VIEW_ALL_PAGES,
            tabDropdownList: [],
          },
          {
            id: "pages-setup-create",
            parentTabId: "pages-setup",
            tabName: "Add New Page",
            pathName: ROUTES.ADMIN_CMS_CREATE_PAGE,
            required_permission: PERMISSIONS.CMS_SETUP.ADD_PAGE,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "Configurations",
        tabName: "Setup & Configurations",
        tabIcon: <MdSettings />,
        required_permissions: [
          PERMISSIONS.LANGUAGE.VIEW_ALL_LANGUAGES,
          PERMISSIONS.LANGUAGE.ADD_LANGUAGE,
          PERMISSIONS.WEBSITE_SETUP.GENERAL_SETTINGS,
          PERMISSIONS.WEBSITE_SETUP.FOOTER_SETUP,
        ],
        tabDropdownList: [
          {
            id: "configurations-language",
            parentTabId: "Configurations",
            tabName: "Languages",
            pathName: "#",
            required_permissions: [
              PERMISSIONS.LANGUAGE.VIEW_ALL_LANGUAGES,
              PERMISSIONS.LANGUAGE.ADD_LANGUAGE,
            ],
            tabDropdownList: [
              {
                id: "configurations-language-view",
                parentTabId: "Configurations",
                firstChildId: "configurations-language",
                tabName: "All Languages",
                pathName: ROUTES.ADMIN_ALL_LANGUAGES,
                required_permission: PERMISSIONS.LANGUAGE.VIEW_ALL_LANGUAGES,
                tabDropdownList: [],
              },
              {
                id: "configurations-language-create",
                parentTabId: "Configurations",
                firstChildId: "configurations-language",
                tabName: "Create Language",
                pathName: ROUTES.ADMIN_CREATE_LANGUAGE,
                required_permission: PERMISSIONS.LANGUAGE.ADD_LANGUAGE,
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "configurations-appearance",
            parentTabId: "Configurations",
            tabName: "Appearance",
            pathName: ROUTES.ADMIN_WEBSITE_APPEARANCE_SETUP,
            required_permission: PERMISSIONS.WEBSITE_SETUP.GENERAL_SETTINGS,
            tabDropdownList: [],
          },
          {
            id: "configurations-footer",
            parentTabId: "Configurations",
            tabName: "Footer",
            pathName: ROUTES.ADMIN_WEBSITE_FOOTER_SETUP,
            required_permission: PERMISSIONS.WEBSITE_SETUP.FOOTER_SETUP,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "Staff",
        tabName: "Staff Management",
        tabIcon: <FaUsersCog />,
        required_permissions: [
          PERMISSIONS.STAFF.VIEW_ALL_STAFFS,
          PERMISSIONS.STAFF.EDIT_STAFF,
          PERMISSIONS.STAFF.VIEW_STAFF_ROLES,
          PERMISSIONS.STAFF.ADD_STAFF_ROLE,
          PERMISSIONS.STAFF.EDIT_STAFF_ROLE,
        ],
        tabDropdownList: [
          {
            id: "staff-view",
            parentTabId: "Staff",
            tabName: "All Staff",
            pathName: ROUTES.ADMIN_ALL_STAFF,
            required_permission: PERMISSIONS.STAFF.VIEW_ALL_STAFFS,
            tabDropdownList: [],
          },
          {
            id: "staff-role",
            parentTabId: "Staff",
            tabName: "Roles",
            pathName: "#",
            required_permissions: [
              PERMISSIONS.STAFF.VIEW_STAFF_ROLES,
              PERMISSIONS.STAFF.ADD_STAFF_ROLE,
              PERMISSIONS.STAFF.EDIT_STAFF_ROLE,
            ],
            tabDropdownList: [
              {
                id: "staff-role-view",
                parentTabId: "Staff",
                firstChildId: "staff-role",
                tabName: "All Roles",
                pathName: ROUTES.ADMIN_STAFF_ALL_ROLES,
                required_permission: PERMISSIONS.STAFF.VIEW_STAFF_ROLES,
                tabDropdownList: [],
              },
              {
                id: "staff-role-create",
                parentTabId: "Staff",
                firstChildId: "staff-role",
                tabName: "Create Role",
                pathName: ROUTES.ADMIN_STAFF_CREATE_ROLE,
                required_permission: PERMISSIONS.STAFF.ADD_STAFF_ROLE,
                tabDropdownList: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default leftSidebarData;
