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

// CREATE NEW NEWS CATEGORY
export const createNewsCategory = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_NEWS_CATEGORY}`,
      {
        ...data,
        userId,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all allNewsCategories related caches
      await deletePatternCache(`${cacheKeyNames.NEWS_CATEGORIES}-*`);
      console.log(
        `createNewsCategory: ${cacheKeyNames.NEWS_CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new news category CLIENT: ${error}`);

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

// GET ALL NEWS CATEGORIES
export const getAllNewsCategories = async (userId, search) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.NEWS_CATEGORIES}-${search || "search"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllNewsCategories: Cache HIT ✅");

    return {
      success: true,
      fetchData: parsedValue.categories,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_NEWS_CATEGORIES}`
  );

  const params = {
    userId,
    search: search || "",
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
      console.log("getAllNewsCategories: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data.categories,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all news categories CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NEWS CATEGORY DETAILS
export const getPerticularNewsCategory = async (userId, categoryId) => {
  const keyName = `${cacheKeyNames.NEWS_CATEGORY_DETAILS}-${categoryId || "categoryId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularNewsCategory: Cache HIT ✅");

    return {
      success: true,
      categoryData: parsedValue.categoryDetails,
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_NEWS_CATEGORY_DETAILS}`
  );

  const params = {
    userId: userId || "",
    categoryId: categoryId || "",
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
      console.log(
        "getPerticularNewsCategory: Databse Call and storing in cache 💾"
      );

      return {
        success: true,
        categoryData: response.data.categoryDetails,
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting news category details CLIENT: ${error}`);
    return {
      successStatus: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE NEWS CATEGORY
export const updatePerticularNewsCategory = async (
  userId,
  categoryId,
  data
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_NEWS_CATEGORY}`,
      {
        userId,
        categoryId,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allNewsCategories related caches and newsCategoryDetails and all articles and all article details cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.NEWS_CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.NEWS_CATEGORIES}-*`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLES}-*`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLE_DETAILS}-*`),
      ]);
      console.log(
        `updatePerticularNewsCategory: ${cacheKeyNames.NEWS_CATEGORY_DETAILS} ${cacheKeyNames.NEWS_CATEGORIES} ${cacheKeyNames.NEWS_ARTICLES} ${cacheKeyNames.NEWS_ARTICLE_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the news category CLIENT: ${error}`);
    if (error.response.data.errors) {
      return {
        success: false,
        errors: error.response.data.errors || "Something went wrong",
      };
    } else if (error.response.data.message) {
      return {
        success: false,
        message: error.response.data.message || "Something went wrong",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};

// TOGGLE NEWS CATEGORY ACTIVE STATUS
export const toggleNewsCategoryActiveStatus = async (
  userId,
  categoryId,
  active
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_NEWS_CATEGORY_ACTIVE_STATUS}`,
      {
        userId,
        categoryId,
        active,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allNewsCategories related caches and newsCategoryDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.NEWS_CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.NEWS_CATEGORIES}-*`),
      ]);
      console.log(
        `toggleNewsCategoryActiveStatus: ${cacheKeyNames.NEWS_CATEGORY_DETAILS} ${cacheKeyNames.NEWS_CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing news category active status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE NEWS CATEGORY FEATURED STATUS
export const toggleNewsCategoryFeaturedStatus = async (
  userId,
  categoryId,
  featuredStatus
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_NEWS_CATEGORY_FEATURED_STATUS}`,
      {
        userId,
        categoryId,
        featuredStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allNewsCategories related caches and newscCategoryDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.NEWS_CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.NEWS_CATEGORIES}-*`),
      ]);
      console.log(
        `toggleNewsCategoryFeaturedStatus: ${cacheKeyNames.NEWS_CATEGORY_DETAILS} ${cacheKeyNames.NEWS_CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing news category featured status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE NEWS CATEGORY DEFAULT STATUS
export const toggleNewsCategoryDefaultStatus = async (
  userId,
  categoryId,
  defaultStatus
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_NEWS_CATEGORY_DEFAULT_STATUS}`,
      {
        userId,
        categoryId,
        defaultStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allNewCategories related caches and newsCategoryDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.NEWS_CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.NEWS_CATEGORIES}-*`),
      ]);
      console.log(
        `toggleNewsCategoryDefaultStatus: ${cacheKeyNames.NEWS_CATEGORY_DETAILS} ${cacheKeyNames.NEWS_CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing news category default status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// DELETE NEWS CATEGORY
export const deletePerticularNewsCategory = async (
  userId,
  slug,
  categoryId
) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_NEWS_CATEGORY}`
  );

  const params = {
    userId: userId || "",
    categoryId: categoryId || "",
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await axios.delete(url.toString());

    if (response.data.success && response.status === 200) {
      // Revalidate the all allNewsCategories related caches and newsCategoryDetails and all news articles and all news articles details cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.NEWS_CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.NEWS_CATEGORIES}-*`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLES}-*`),
        deletePatternCache(`${cacheKeyNames.NEWS_ARTICLE_DETAILS}-*`),
      ]);
      console.log(
        `deletePerticularNewsCategory: ${cacheKeyNames.NEWS_CATEGORY_DETAILS} ${cacheKeyNames.NEWS_CATEGORIES} ${cacheKeyNames.NEWS_ARTICLES} ${cacheKeyNames.NEWS_ARTICLE_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the news category CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred during cache deletion.",
    };
  }
};
