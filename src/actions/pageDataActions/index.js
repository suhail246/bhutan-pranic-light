"use server";

import { PERMISSIONS } from "@/constants/permissions";
import { useExtractSlugAndTargetId } from "@/lib/hooks";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";
import {
  getAllCategories,
  getPerticularCategory,
} from "../apiClientActions/blogs/category";
import {
  getAllBlogPosts,
  getPerticularPost,
} from "../apiClientActions/blogs/posts";
import { getAllCareers, getPerticularCareer } from "../apiClientActions/career";
import { getAllCMSPages, getPerticularCMSPage } from "../apiClientActions/cms";
import {
  getAllContactQueries,
  getAllContacts,
  getContactDetails,
} from "../apiClientActions/contacts";
import { getAllCourses, getCourseDetails } from "../apiClientActions/courses";
import {
  getAllCoursePackages,
  getCoursePackageDetails,
} from "../apiClientActions/courses/packages";
import { getAllFilesFromDB } from "../apiClientActions/files";
import {
  getAllLanguages,
  getPerticularLanguage,
} from "../apiClientActions/languages";
import {
  getAllMenus,
  getPerticularMenuDetails,
} from "../apiClientActions/menu";
import {
  getAllNewsArticles,
  getPerticularNewsArticle,
} from "../apiClientActions/news/articles";
import {
  getAllNewsCategories,
  getPerticularNewsCategory,
} from "../apiClientActions/news/category";
import {
  getAllTestimonials,
  getPerticularTestimonial,
} from "../apiClientActions/testimonila";
import { getAllTimezones } from "../apiClientActions/timezone";
import {
  getAllPermissions,
  getAllRoles,
  getAllUsers,
  getPerticularRole,
  getUserDetails,
} from "../apiClientActions/user";
import { getSessionUserData } from "../authActions";

// NOTE User Permission Checks
export const checkUserPermission = async (premission) => {
  const { userId } = await verifySession();
  if (!userId) return { error: "Unauthorized" };

  const { success, userDetails, permissionsList } =
    await getSessionUserData(userId);
  const hasPermission =
    userDetails.adminAsignedRole?.name !== "Super Admin" &&
    !permissionsList.includes(premission);

  if (
    !success ||
    (userDetails.adminAsignedRole?.name !== "Super Admin" &&
      !permissionsList.includes(premission))
  ) {
    return { error: "Forbidden" };
  }

  return {
    userId,
    adminRole: userDetails.adminAsignedRole?.name || null,
    permissionsList,
  };
};

/*
 ******************
 ******************
 */

// ALL BLOG POSTS VIEW PAGE
export async function fetchAllPostsPageData(searchParams, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, category, status, featured } =
    await searchParams;

  // Check user have view_all_categories permission
  const canViewCategories =
    adminRole === "Super Admin" ||
    permissionsList.includes(PERMISSIONS.CATEGORY.VIEW_ALL_CATEGORIES);

  const [postsResponse, categoriesResponse] = await Promise.all([
    getAllBlogPosts(
      userId,
      search || "",
      page,
      pageSize,
      category,
      status,
      featured
    ),
    canViewCategories ? getAllCategories(userId) : Promise.resolve(null),
  ]);

  return {
    postsResponse,
    categoriesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// CREATE BLOG POST PAGE
export async function fetchCreateBlogPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [categoriesResponse, filesResponse] = await Promise.all([
    getAllCategories(userId),
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
  ]);

  return {
    categoriesResponse,
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// UPDATE BLOG POST PAGE
export async function fetchUpdateBlogPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { slug } = await params;
  const { slugData, targetId } = useExtractSlugAndTargetId(slug);

  if (
    !slugData ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  )
    return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [categoriesResponse, filesResponse, languagesResponse, postResponse] =
    await Promise.all([
      getAllCategories(userId),
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularPost(userId, slugData, targetId),
    ]);

  return {
    categoriesResponse,
    filesResponse,
    languagesResponse,
    postResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ALL CATEGORIES VIEW PAGE
export async function fetchAllCategoriesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search } = await searchParams;

  const { success, fetchData, message } = await getAllCategories(
    userId,
    search || ""
  );

  return {
    success,
    fetchData,
    message,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// CREATE CATEGORY PAGE
export async function fetchCreateCategoryPageData(
  searchParams,
  requiredPermission
) {
  return await fetchCreateBlogPageData(searchParams, requiredPermission);
}

// UPDATE CATEGORY PAGE
export async function fetchUpdateCategoryPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { categoryId } = await params;
  if (
    categoryId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(categoryId)
  )
    return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [
    categoriesResponse,
    filesResponse,
    languagesResponse,
    categoryDetailsResponse,
  ] = await Promise.all([
    getAllCategories(userId),
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
    getPerticularCategory(userId, categoryId),
  ]);

  return {
    categoriesResponse,
    filesResponse,
    languagesResponse,
    categoryDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ALL NEWS ARTICLES VIEW PAGE
export async function fetchAllNewsArticlesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, category, status, featured } =
    await searchParams;

  // Check user have view_all_news_categories permission
  const canViewCategories =
    adminRole === "Super Admin" ||
    permissionsList.includes(
      PERMISSIONS.NEWS_CATEGORY.VIEW_ALL_NEWS_CATEGORIES
    );

  const [newsArticleResponse, newsCategoriesResponse] = await Promise.all([
    getAllNewsArticles(
      userId,
      search || "",
      page,
      pageSize,
      category,
      status,
      featured
    ),
    canViewCategories ? getAllNewsCategories(userId) : Promise.resolve(null),
  ]);

  return {
    newsArticleResponse,
    newsCategoriesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// CREATE NEWS ARTICLE PAGE
export async function fetchCreateNewsArticlePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [newsCategoriesResponse, filesResponse] = await Promise.all([
    getAllNewsCategories(userId),
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
  ]);

  return {
    newsCategoriesResponse,
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// UPDATE NEWS ARTICLE PAGE
export async function fetchUpdateNewsArticlePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { slug } = await params;
  const { slugData, targetId } = useExtractSlugAndTargetId(slug);

  if (
    !slugData ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  )
    return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [
    newsCategoriesResponse,
    filesResponse,
    languagesResponse,
    newArticleResponse,
  ] = await Promise.all([
    getAllNewsCategories(userId),
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
    getPerticularNewsArticle(userId, slugData, targetId),
  ]);

  return {
    newsCategoriesResponse,
    filesResponse,
    languagesResponse,
    newArticleResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ALL NEWS CATEGORIES VIEW PAGE
export async function fetchAllNewsCategoriesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search } = await searchParams;

  const { success, fetchData, message } = await getAllNewsCategories(
    userId,
    search || ""
  );

  return {
    success,
    fetchData,
    message,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// CREATE NEWS CATEGORY PAGE
export async function fetchCreateNewsCategoryPageData(
  searchParams,
  requiredPermission
) {
  return await fetchCreateNewsArticlePageData(searchParams, requiredPermission);
}

// UPDATE NEWS CATEGORY PAGE
export async function fetchUpdateNewsCategoryPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { targetId } = await params;
  if (targetId === "undefiend" || !mongoose.Types.ObjectId.isValid(targetId))
    return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [
    newsCategoriesResponse,
    filesResponse,
    languagesResponse,
    newsCategoryDetailsResponse,
  ] = await Promise.all([
    getAllNewsCategories(userId),
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
    getPerticularNewsCategory(userId, targetId),
  ]);

  return {
    newsCategoriesResponse,
    filesResponse,
    languagesResponse,
    newsCategoryDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// CREATE NEW CONTACT PAGE
export async function fetchAddNewContactPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// ALL CONTACTS VIEW PAGE
export async function fetchAllContactsPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured } = await searchParams;

  const allContactsResponse = await getAllContacts(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured
  );

  return {
    allContactsResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// UPDATE CONTACT PAGE
export async function fetchUpdateContactPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { slug } = await params;
  const { slugData, targetId } = useExtractSlugAndTargetId(slug);

  if (
    !slugData ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  )
    return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse, languagesResponse, contactResponse] = await Promise.all(
    [
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getContactDetails(userId, slugData, targetId),
    ]
  );

  return {
    filesResponse,
    languagesResponse,
    contactResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// ALL CONTACT QUERY MESSAGES VIEW PAGE
export async function fetchAllContactQueriesPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { search, page, pageSize } = await searchParams;

  const allContactQueriesResponse = await getAllContactQueries(
    userId,
    search || "",
    page,
    pageSize
  );

  return {
    allContactQueriesResponse,
    userId,
    adminRole,
    permissionsList,
    search,
  };
}

/*
 ******************
 ******************
 */

// CREATE TESTIMONIAL PAGE
export async function fetchCreateTestimonialPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
  };
}

// GET ALL TESTIMONIAL PAGE
export async function fetchAllTestimonialsPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured } = await searchParams;

  const allTestimonialsResponse = await getAllTestimonials(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured
  );

  return {
    allTestimonialsResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE TESTIMONIAL PAGE
export async function fetchUpdateTestimonialPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { targetId } = await params;

  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return { error: "Not Found" };
  }

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse, languagesResponse, testimonialDetailsResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularTestimonial(userId, targetId),
    ]);

  return {
    filesResponse,
    languagesResponse,
    testimonialDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// CREATE CAREER PAGE
export async function fetchCreateCareerPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
  };
}

// GET ALL CAREER PAGE
export async function fetchAllCareersPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, status, featured } = await searchParams;

  const allCareersResponse = await getAllCareers(
    userId,
    search || "",
    page,
    pageSize,
    status,
    featured
  );

  return {
    allCareersResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE CAREER PAGE
export async function fetchUpdateCareerPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { targetId } = await params;

  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return { error: "Not Found" };
  }

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse, languagesResponse, careerDetailsResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularCareer(userId, targetId),
    ]);

  return {
    filesResponse,
    languagesResponse,
    careerDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// CREATE COURSE PAGE
export async function fetchAddNewCoursePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// VIEW COURSE PAGE
export async function fetchAllCoursesPageData(requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const coursesResponse = await getAllCourses(userId);

  return {
    coursesResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE COURSE PAGE
export async function fetchUpdateCoursePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { slug } = await params;
  const { lang, searchName, page, pageSize, selectedFileType } =
    await searchParams;

  if (!slug || !lang) {
    return { error: "Not Found" };
  }

  const [filesResponse, languagesResponse, courseDetailsResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getCourseDetails(userId, slug, lang),
    ]);

  return {
    filesResponse,
    languagesResponse,
    courseDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    lang,
    slug,
  };
}

// CREATE COURSE PACKAGE PAGE
export async function fetchAddNewCoursePackagePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [filesResponse, coursesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllCourses(userId),
  ]);

  return {
    filesResponse,
    coursesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// VIEW COURSE PACKAGES PAGE
export async function fetchAllCoursePackagesData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { course, search, page, pageSize, status, featured } =
    await searchParams;

  const [coursesResponse, coursePackagesResponse] = await Promise.all([
    getAllCourses(userId),
    getAllCoursePackages(
      userId,
      course,
      search,
      page,
      pageSize,
      status,
      featured
    ),
  ]);

  return {
    coursesResponse,
    coursePackagesResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE COURSE PACKAGE PAGE
export async function fetchUpdateCoursePackagePageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { targetId } = await params;
  if (
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return { error: "Not Found" };
  }

  const { lang, course, searchName, page, pageSize, selectedFileType } =
    await searchParams;

  const [
    filesResponse,
    languagesResponse,
    coursesResponse,
    coursePackageDetailsResponse,
  ] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
    getAllCourses(userId),
    getCoursePackageDetails(userId, targetId, lang),
  ]);

  return {
    filesResponse,
    languagesResponse,
    coursesResponse,
    coursePackageDetailsResponse,
    userId,
    targetId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    lang,
    course,
  };
}

/*
 ******************
 ******************
 */

// CREATE CMS PAGE
export async function fetchCreateCMSPageData(searchParams, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const filesResponse = await getAllFilesFromDB(
    userId,
    searchName,
    page,
    pageSize,
    selectedFileType
  );

  return {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// ALL CMS PAGE LISTING
export async function fetchAllCMSPageLisitngData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize } = await searchParams;

  const allCMSPagesResponse = await getAllCMSPages(
    userId,
    search || "",
    page,
    pageSize
  );

  return {
    allCMSPagesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
  };
}

// UPDATE CMS PAGE
export async function fetchUpdateCMSPageData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { linkId } = await params;

  if (!linkId) return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType, tab } =
    await searchParams;

  const [filesResponse, languagesResponse, cmsPageDetailsResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllLanguages(userId),
      getPerticularCMSPage(userId, linkId),
    ]);

  return {
    filesResponse,
    languagesResponse,
    cmsPageDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
  };
}

// UPDATE CMS PAGE SECTIONS
export async function fetchUpdateCMSPageSectionsData(
  params,
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { linkId } = await params;

  if (!linkId) return { error: "Not Found" };

  const { searchName, page, pageSize, selectedFileType, tab } =
    await searchParams;

  const [filesResponse, languagesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
  ]);

  return {
    filesResponse,
    languagesResponse,
    userId,
    searchName,
    selectedFileType,
    tab,
    linkId,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ADMIN_STAFF DETAILS PAGE
export async function fetchAdminStaffDetailsPageData(
  params,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;
  const { targetId } = await params;
  if (targetId === "undefiend" || !mongoose.Types.ObjectId.isValid(targetId))
    return { error: "Not Found" };

  const [userDetailsResponse, rolesResponse] = await Promise.all([
    getUserDetails(userId, targetId),
    getAllRoles(userId),
  ]);

  return {
    userDetailsResponse,
    rolesResponse,
    userId,
    targetId,
  };
}

// ADMIN_STAFF LIST PAGE
export async function fetchAdminStaffListPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize, role } = await searchParams;

  // Check user have VIEW_STAFF_ROLES permission
  const canViewRoles =
    adminRole === "Super Admin" ||
    permissionsList.includes(PERMISSIONS.STAFF.VIEW_STAFF_ROLES);

  const [getAllUsersResponse, getAllRolesResponse] = await Promise.all([
    getAllUsers(userId, search || "", page, pageSize, role),
    canViewRoles ? getAllRoles(userId) : Promise.resolve(null),
  ]);

  return {
    getAllUsersResponse,
    getAllRolesResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// ALL ADMIN_CREATED_ROLE
export async function fetchAllAdminCreatedRolePageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { search, page, pageSize } = await searchParams;

  const { success, fetchData, paginationData, message } = await getAllRoles(
    userId,
    search,
    page,
    pageSize
  );

  return {
    fetchData,
    paginationData,
    message,
    userId,
    adminRole,
    permissionsList,
  };
}

// CREATE ADMIN STAFF ROLE
export async function fetchCreateAdminStaffRolePageData(requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;

  const { success, fetchData } = await getAllPermissions(userId);

  return {
    success,
    fetchData,
    userId,
  };
}

// UPDATE ADMIN STAFF ROLE
export async function fetchUpdateAdminStaffRolePageData(
  params,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;
  const { roleId } = await params;
  if (roleId === "undefiend" || !mongoose.Types.ObjectId.isValid(roleId))
    return { error: "Not Found" };

  const [permissionsResponse, roleResponse] = await Promise.all([
    getAllPermissions(userId),
    getPerticularRole(userId, roleId),
  ]);

  return {
    permissionsResponse,
    roleResponse,
    userId,
    roleId,
  };
}

/*
 ******************
 ******************
 */

// ALL LANGUAGES VIEW PAGE
export async function fetchAllLanguagessPageData(requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { success, fetchData, message } = await getAllLanguages(userId);

  return {
    success,
    fetchData,
    message,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE LANGUAGE PAGE
export async function fetchUpdateLanguagePageData(params, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;
  const { targetId } = await params;
  if (targetId === "undefiend" || !mongoose.Types.ObjectId.isValid(targetId))
    return { error: "Not Found" };

  const { success, languageData, message } = await getPerticularLanguage(
    userId,
    targetId
  );

  return {
    success,
    languageData,
    message,
    userId,
  };
}

/*
 ******************
 ******************
 */

// ADD NEW MENU PAGE
export async function fetchCreateNewMenuPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId } = permissionCheck;

  const { search } = await searchParams;

  const menusResponse = await getAllMenus(userId, search);

  return {
    menusResponse,
    userId,
  };
}

// ALL MENU LISTING PAGE
export async function fetchAllMenusPageData(searchParams, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { search } = await searchParams;

  const menusResponse = await getAllMenus(userId, search);

  return {
    menusResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

// UPDATE MENU PAGE
export async function fetchUpdateMenuPageData(params, requiredPermission) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;
  const { targetId } = await params;
  if (targetId === "undefiend" || !mongoose.Types.ObjectId.isValid(targetId))
    return { error: "Not Found" };

  const [menusResponse, languagesResponse, menuDetailsResponse] =
    await Promise.all([
      getAllMenus(userId),
      getAllLanguages(userId),
      getPerticularMenuDetails(userId, targetId),
    ]);

  return {
    menusResponse,
    languagesResponse,
    menuDetailsResponse,
    userId,
    adminRole,
    permissionsList,
  };
}

/*
 ******************
 ******************
 */

// WEBSITE GENERAL SETTINGS PAGE
export async function fetchWebsiteGeneralSettingPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [allFilesResponse, allTimezonesResponse, languagesResponse] =
    await Promise.all([
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getAllTimezones(userId),
      getAllLanguages(userId),
    ]);

  return {
    allFilesResponse,
    allTimezonesResponse,
    languagesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
  };
}

// WEBSITE FOOTER SETTINGS PAGE
export async function fetchWebsiteFooterSettingsPageData(
  searchParams,
  requiredPermission
) {
  const permissionCheck = await checkUserPermission(requiredPermission);
  if (permissionCheck.error) return permissionCheck;

  const { userId, adminRole, permissionsList } = permissionCheck;

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [allFilesResponse, languagesResponse] = await Promise.all([
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
    getAllLanguages(userId),
  ]);

  return {
    allFilesResponse,
    languagesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
  };
}
