"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import {
  deleteCache,
  deletePatternCache,
  getCache,
  setCache,
} from "@/lib/redis/actions";
import axios from "axios";

// CREATE A NEW PAGE CMS
export const createNewPageCMS = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_PAGE_CMS}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all page cms related caches
      await deletePatternCache(`${cacheKeyNames.PAGES_CMS}-*`);
      console.log(
        `createNewPageCMS: ${cacheKeyNames.PAGES_CMS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new page CMS CLIENT: ${error}`);

    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// GET ALL PAGES
export const getAllCMSPages = async (userId, search, page, pageSize) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.PAGES_CMS}-${search || "search"}-${page || 1}-${pageSize || 9}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllCMSPages: Cache HIT ✅");

    return {
      success: true,
      fetchData: parsedValue?.cmsPages || [],
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PAGE_CMS}`
  );
  const params = {
    userId,
    search: search || "",
    page: page || 1,
    pageSize: pageSize || 9,
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllCMSPages: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data?.cmsPages || [],
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all CMS pages CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET A PERTICULAR CMS PAGE
export const getPerticularCMSPage = async (userId, linkId) => {
  const keyName = `${cacheKeyNames.PAGE_CMS_DETAILS}-${linkId || "linkId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularCMSPage: Cache HIT ✅");

    return {
      success: true,
      cmsPageData: parsedValue?.cmsPageDetails || {},
      translationDetails: parsedValue?.translationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_PAGE_CMS_DETAILS}`
  );

  const params = {
    userId: userId || "",
    linkId: linkId || "",
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });
  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log("getPerticularCMSPage: Databse Call and storing in cache 💾");
      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        cmsPageData: response.data?.cmsPageDetails || {},
        translationDetails: response.data?.translationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting cms page details CLIENT: ${error}`);
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET A PERTICULAR CMS PAGE SECTIONS CONTENT
export const getPerticularCMSPageSectionsContent = async (
  userId,
  linkId,
  lang = "en"
) => {
  const keyName = `${cacheKeyNames.PAGE_CMS_CONTENT_DETAILS}-${linkId || "linkId"}-${lang}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularCMSPageSectionsContent: Cache HIT ✅");

    return {
      success: true,
      contentDetails: parsedValue?.contentData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_PAGE_CMS_CONTENT_DETAILS}`
  );

  const params = {
    userId: userId || "",
    linkId: linkId || "",
    lang: lang,
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });
  try {
    // Make the request using fetch
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log(
        "getPerticularCMSPageSectionsContent: Databse Call and storing in cache 💾"
      );
      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        contentDetails: response.data?.contentData || {},
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in getting cms page content details CLIENT: ${error}`
    );
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// UPDATE A PERTICULAR CMS PAGE
export const updatePerticularCMSPage = async (
  userId,
  linkId,
  lang = "en",
  data
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_PAGE_CMS}`,
      {
        userId,
        linkId,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all cms pages related caches and cms page details cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.PAGE_CMS_DETAILS}-${linkId || "linkId"}`),
        deletePatternCache(
          `${cacheKeyNames.PAGE_CMS_CONTENT_DETAILS}-${linkId || "linkId"}-*`
        ),
        deletePatternCache(`${cacheKeyNames.PAGES_CMS}-*`),
      ]);
      console.log(
        `updatePerticularCMSPage: ${cacheKeyNames.PAGE_CMS_DETAILS} ${cacheKeyNames.PAGES_CMS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the cms page CLIENT: ${error}`);

    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// UPDATE A PERTICULAR CMS PAGE SECTIONS
export const updatePerticularCMSPageSections = async (
  userId,
  linkId,
  data,
  lang = "en"
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_PAGE_CMS_CONTENT}`,
      {
        userId,
        linkId,
        data,
        lang,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the cms page details cache
      await deletePatternCache(
        `${cacheKeyNames.PAGE_CMS_CONTENT_DETAILS}-${linkId || "linkId"}-*`
      );
      console.log(
        `updatePerticularCMSPageSections: ${cacheKeyNames.PAGE_CMS_CONTENT_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the cms page sections CLIENT: ${error}`);

    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// TOGGLE PERTICULAR CMS PAGE ACTIVE STATUS
export const togglePerticularCMSPageActiveStatus = async (userId, linkId) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_PAGE_CMS_ACTIVE_STATUS}`,
      {
        userId,
        linkId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all cms pages related caches and cms page details cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.PAGE_CMS_DETAILS}-${linkId || "linkId"}`),
        deletePatternCache(`${cacheKeyNames.PAGES_CMS}-*`),
      ]);
      console.log(
        `togglePerticularCMSPageActiveStatus: ${cacheKeyNames.PAGE_CMS_DETAILS} ${cacheKeyNames.PAGES_CMS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing cms page active status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
