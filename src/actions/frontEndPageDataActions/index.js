"use server";

import {
  getAllPublicCareers,
  getAllPublicContacts,
  getAllPublicCourses,
  getAllPublicFiles,
  getAllPublicLanguages,
  getAllPublicMenus,
  getAllPublicNewsArticles,
  getAllPublicNewsCategories,
  getAllPublicTestimonials,
  getAllPublicWebsiteSettings,
  getPublicCourseDetails,
  getPublicPageCMSContent,
} from "../frontEndActions/action";

// Parent Layout Data
export const fetchPublicParentLayoutData = async () => {
  const [websiteSettingsResponse, filesResponse, languageResponse] =
    await Promise.all([
      getAllPublicWebsiteSettings(),
      getAllPublicFiles(),
      getAllPublicLanguages(),
    ]);

  return {
    settingsData: websiteSettingsResponse?.settingsData || [],
    filesList: filesResponse?.filesList || [],
    languageList: languageResponse?.fetchData || [],
  };
};

// Header Data
export const fetchPublicHeaderData = async () => {
  const headerMenuResponse = await getAllPublicMenus();

  return {
    menuList: headerMenuResponse?.fetchData || [],
  };
};

// NOTE News Listing Page Data
export const fetchPublicNewsListingPageData = async (
  searchParams,
  linkId = "",
  lang = "en"
) => {
  const { search, page, pageSize, category, status, featured } =
    await searchParams;

  const [
    newsArticleResponse,
    newsCategoriesResponse,
    contentResponse,
    filesResponse,
  ] = await Promise.all([
    getAllPublicNewsArticles(
      search,
      page,
      pageSize,
      category,
      status,
      featured
    ),
    getAllPublicNewsCategories(),
    getPublicPageCMSContent(linkId, lang),
    getAllPublicFiles(),
  ]);

  return {
    newsArticleResponse,
    newsCategoriesResponse,
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: filesResponse?.filesList || [],
    search,
    category,
    page,
  };
};

// About Page Data
export const fetchPublicCommonPageData = async (linkId, lang = "en") => {
  const [fielsResponse, contentResponse] = await Promise.all([
    getAllPublicFiles(),
    getPublicPageCMSContent(linkId, lang),
  ]);

  return {
    filesList: fielsResponse?.filesList || [],
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
  };
};

// Careers Page Data
export const fetchPublicCareersPageData = async (linkId = "", lang = "en") => {
  const [careersResponse, contentResponse, filesResponse] = await Promise.all([
    getAllPublicCareers(),
    getPublicPageCMSContent(linkId, lang),
    getAllPublicFiles(),
  ]);

  return {
    fetchData: careersResponse?.fetchData || [],
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: filesResponse?.filesList || [],
  };
};

// Contact Us Page Data
export const fetchPublicContactUsPageData = async (
  searchParams,
  linkId,
  lang = "en"
) => {
  const { search } = await searchParams;

  const [allContactResponse, searchContactResponse, contentResponse] =
    await Promise.all([
      getAllPublicContacts(),
      getAllPublicContacts(search),
      getPublicPageCMSContent(linkId, lang),
    ]);

  return {
    allContactResponse,
    searchContactResponse,
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
  };
};

// Courses Page Data
export const fetchPublicCoursesPageData = async (linkId = "", lang = "en") => {
  const [contentResponse, coursesResponse, fielsResponse] = await Promise.all([
    getPublicPageCMSContent(linkId, lang),
    getAllPublicCourses(),
    getAllPublicFiles(),
  ]);

  return {
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
    filesList: fielsResponse?.filesList || [],
    coursesResponse,
  };
};

// Course Details Page Data
export const fetchPublicCourseDetailsPageData = async (slug, lang = "en") => {
  const [
    testimonialResponse,
    courseDetailsResponse,
    filesResponse,
    contentResponse,
    courseContentResponse,
  ] = await Promise.all([
    getAllPublicTestimonials(),
    getPublicCourseDetails(slug, lang),
    getAllPublicFiles(),
    getPublicPageCMSContent("home", lang),
    getPublicPageCMSContent("courses", lang),
  ]);

  return {
    testimonialResponse,
    courseDetailsResponse,
    filesResponse,
    contentData: contentResponse?.contentDetails || {},
    courseContentData: courseContentResponse?.contentDetails || {},
  };
};

// Home Page Data
export const fetchPublicHomePageData = async (linkId = "", lang = "") => {
  const [
    newsResponse,
    testimonialResponse,
    filesResponse,
    contentResponse,
    coursesResponse,
  ] = await Promise.all([
    getAllPublicNewsArticles(),
    getAllPublicTestimonials(),
    getAllPublicFiles(),
    getPublicPageCMSContent(linkId, lang),
    getAllPublicCourses(),
  ]);

  return {
    newsResponse,
    testimonialResponse,
    coursesResponse,
    filesList: filesResponse?.filesList || [],
    contentData: contentResponse?.contentDetails || {},
    otherInfoData: contentResponse?.otherInfoData || {},
  };
};
