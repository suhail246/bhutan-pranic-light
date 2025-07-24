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

// CREATE A NEW NEWS ARTICLE
export const createNewNewsArticle = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_NEWS_ARTICLE}`,
      {
        ...data,
        userId,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all allNewsArticles related caches
      await deletePatternCache(`${cacheKeyNames.NEWS_ARTICLES}-*`);
      console.log(
        `createNewNewsArticle: ${cacheKeyNames.NEWS_ARTICLES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new news article CLIENT: ${error}`);

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

// GET ALL NEWS ARTICLES
export const getAllNewsArticles = async (
  userId,
  search,
  page,
  pageSize,
  category,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.NEWS_ARTICLES}-${search || "search"}-${page || 1}-${pageSize || 5}-${category || "category"}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllNewsArticles: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue?.newsArticles || [],
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_NEWS_ARTICLES}`
  );
  const params = {
    userId,
    search: search || "",
    page: page || 1,
    pageSize: pageSize || 5,
    category: category || "",
    status: status || "",
    featured: featured || "",
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
      console.log("getAllNewsArticles: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data?.newsArticles || [],
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in getting all news articles CLIENT: ${error.message}`
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

// GET A PERTICULAR NEWS ARTICLE
export const getPerticularNewsArticle = async (userId, slug, targetId) => {
  const keyName = `${cacheKeyNames.NEWS_ARTICLE_DETAILS}-${slug || "slug"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularNewsArticle: Cache HIT ✅");

    return {
      success: true,
      newsArticleData: parsedValue?.newsArticleDetails || {},
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_NEWS_ARTICLE_DETAILS}`
  );

  const params = {
    userId: userId || "",
    targetId: targetId || "",
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
        "getPerticularNewsArticle: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        newsArticleData: response.data?.newsArticleDetails || {},
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting news article details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A PERTICULAR NEWS ARTICLE
export const updatePerticularNewsArticle = async (
  userId,
  slug,
  targetId,
  data
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_NEWS_ARTICLE}`,
      {
        ...data,
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.NEWS_ARTICLE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLES}-*`),
      ]);
      console.log(
        `updatePerticularNewsArticle: ${cacheKeyNames.NEWS_ARTICLE_DETAILS} ${cacheKeyNames.NEWS_ARTICLES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the news article CLIENT: ${error}`);

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

// DELETE A PERTICULAR NEWS ARTICLE
export const deletePerticularNewsArticle = async (userId, slug, targetId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_NEWS_ARTICLE}`
  );
  const params = {
    userId: userId || "",
    targetId: targetId || "",
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    // Make the DELETE request using fetch
    const response = await axios.delete(url.toString());

    if (response.data.success && response.status === 200) {
      // Revalidate the allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.NEWS_ARTICLE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLES}-*`),
      ]);
      console.log(
        `deletePerticularNewsArticle: ${cacheKeyNames.NEWS_ARTICLE_DETAILS} ${cacheKeyNames.NEWS_ARTICLES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the news article CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR NEWS ARTICLE ACTIVE STATUS
export const togglePerticularNewsArticleActiveStatus = async (
  userId,
  slug,
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_NEWS_ARTICLE_ACTIVE_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.NEWS_ARTICLE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLES}-*`),
      ]);
      console.log(
        `togglePerticularNewsArticleActiveStatus: ${cacheKeyNames.NEWS_ARTICLE_DETAILS} ${cacheKeyNames.NEWS_ARTICLES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing news article active status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR NEWS ARTICLE FEATURED STATUS
export const togglePerticularNewsArticleFeaturedStatus = async (
  userId,
  slug,
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_NEWS_ARTICLE_FEATURED_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the allNewsArticles related caches and newsArticleDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.NEWS_ARTICLE_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLES}-*`),
      ]);
      console.log(
        `togglePerticularNewsArticleFeaturedStatus: ${cacheKeyNames.NEWS_ARTICLE_DETAILS} ${cacheKeyNames.NEWS_ARTICLES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing news article featured status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
