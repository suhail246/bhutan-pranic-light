"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import axios from "axios";
import {
  deleteCache,
  deletePatternCache,
  getCache,
  setCache,
} from "../../../../lib/redis/actions";

// NOTE CREATE A NEW CATEGORY
export const createNewCategory = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_CATEGORY}`,
      {
        ...data,
        userId,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all allCategories related caches
      await deletePatternCache(`${cacheKeyNames.CATEGORIES}-*`);
      console.log(
        `createNewCategory: ${cacheKeyNames.CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new category CLIENT: ${error}`);

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

// NOTE GET ALL CATEGORIES
export const getAllCategories = async (userId, search) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.CATEGORIES}-${search || "search"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllCategories: Cache HIT ✅");

    return {
      success: true,
      fetchData: parsedValue.categories,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_CATEGORIES}`
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
      console.log("getAllCategories: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        fetchData: response.data.categories,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all categories CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
      fetchData: [],
    };
  }
};

// NOTE Change Category Active Status
export const changeCategoryStatus = async (userId, categoryId, active) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CHANGE_CATEGORY_ACTIVE_STATUS}`,
      {
        userId,
        categoryId,
        active,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allCategories related caches and categoryDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CATEGORIES}-*`),
      ]);
      console.log(
        `changeCategoryStatus: ${cacheKeyNames.CATEGORY_DETAILS} ${cacheKeyNames.CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing category active status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE Change Category Default Status
export const changeCategoryDefaultStatus = async (
  userId,
  categoryId,
  defaultStatus
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CHANGE_CATEGORY_DEFAULT_STATUS}`,
      {
        userId,
        categoryId,
        defaultStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allCategories related caches and categoryDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CATEGORIES}-*`),
      ]);
      console.log(
        `changeCategoryDefaultStatus: ${cacheKeyNames.CATEGORY_DETAILS} ${cacheKeyNames.CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing category default status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE Change Category Featured Status
export const changeCategoryFeaturedStatus = async (
  userId,
  categoryId,
  featuredStatus
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CHANGE_CATEGORY_FEATURED_STATUS}`,
      {
        userId,
        categoryId,
        featuredStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allCategories related caches and categoryDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CATEGORIES}-*`),
      ]);
      console.log(
        `changeCategoryFeaturedStatus: ${cacheKeyNames.CATEGORY_DETAILS} ${cacheKeyNames.CATEGORIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing category featured status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE GET A PERTICULAR CATEGORY
export const getPerticularCategory = async (userId, categoryId) => {
  const keyName = `${cacheKeyNames.CATEGORY_DETAILS}-${categoryId || "categoryId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularCategory: Cache HIT ✅");
    return {
      success: true,
      categoryData: parsedValue.categoryDetails,
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_CATEGORY_DETAILS}`
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
      console.log(
        "getPerticularCategory: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        categoryData: response.data.categoryDetails,
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting category details CLIENT: ${error}`);
    return {
      successStatus: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
      categoryData: {},
    };
  }
};

// NOTE UPDATE A PERTICULAR CATEGORY
export const updatePerticularCategory = async (userId, categoryId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_CATEGORY}`,
      {
        userId,
        categoryId,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allCategories related caches and categoryDetails and all blog posts and all blog post details cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CATEGORIES}-*`),
        deletePatternCache(`${cacheKeyNames.BLOG_POSTS}-*`),
        deletePatternCache(`${cacheKeyNames.BLOG_POST_DETAILS}-*`),
      ]);
      console.log(
        `updatePerticularCategory: ${cacheKeyNames.CATEGORY_DETAILS} ${cacheKeyNames.CATEGORIES} ${cacheKeyNames.BLOG_POSTS} ${cacheKeyNames.BLOG_POST_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the category CLIENT: ${error}`);
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

// NOTE DELETE A PERTICULAR CATEGORY
export const deletePerticularCategory = async (userId, slug, categoryId) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_CATEGORY}`
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
      // Revalidate the all allCategories related caches and categoryDetails and all blog posts and all blog post details cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CATEGORY_DETAILS}-${categoryId || "categoryId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CATEGORIES}-*`),
        deletePatternCache(`${cacheKeyNames.BLOG_POSTS}-*`),
        deletePatternCache(`${cacheKeyNames.BLOG_POST_DETAILS}-*`),
      ]);
      console.log(
        `deletePerticularCategory: ${cacheKeyNames.CATEGORY_DETAILS} ${cacheKeyNames.CATEGORIES} ${cacheKeyNames.BLOG_POSTS} ${cacheKeyNames.BLOG_POST_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the category CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred during cache deletion.",
    };
  }
};
