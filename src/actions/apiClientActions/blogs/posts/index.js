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

// CREATE A NEW BLOG POST
export const createNewBlogPost = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_POST}`,
      {
        ...data,
        userId,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all allBlogPosts related caches
      await deletePatternCache(`${cacheKeyNames.BLOG_POSTS}-*`);
      console.log(
        `createNewBlogPost: ${cacheKeyNames.BLOG_POSTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new post CLIENT: ${error}`);

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

// GET ALL BLOG POSTS
export const getAllBlogPosts = async (
  userId,
  search,
  page,
  pageSize,
  category,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.BLOG_POSTS}-${search || "search"}-${page || 1}-${pageSize || 5}-${category || "category"}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllBlogPosts: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue.posts,
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_POST}`
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
      console.log("getAllBlogPosts: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data.posts,
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all posts CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET A PERTICULAR POST
export const getPerticularPost = async (userId, slug, postId) => {
  const keyName = `${cacheKeyNames.BLOG_POST_DETAILS}-${slug || "slug"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularPost: Cache HIT ✅");
    return {
      success: true,
      postData: parsedValue.postDetails,
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_POST_DETAILS}`
  );

  const params = {
    userId: userId || "",
    postId: postId || "",
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
      console.log("getPerticularPost: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        postData: response.data.postDetails,
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting post details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A PERTICULAR POST
export const updatePerticularPost = async (userId, slug, postId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_POST}`,
      {
        ...data,
        userId,
        postId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allBlogPosts related caches and blogDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.BLOG_POST_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.BLOG_POSTS}-*`),
      ]);
      console.log(
        `updatePerticularPost: ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.BLOG_POSTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
        postTile: response.data.titleName,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the post CLIENT: ${error}`);

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

// DELETE A PERTICULAR POST
export const deletePerticularPost = async (userId, slug, postId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_POST}`
  );
  const params = {
    userId: userId || "",
    postId: postId || "",
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
      // Revalidate the all allBlogPosts related caches and blogDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.BLOG_POST_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.BLOG_POSTS}-*`),
      ]);
      console.log(
        `deletePerticularPost: ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.BLOG_POSTS} Cache deleted 🗑️`
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
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// ACTIVE A PERTICULAR POST
export const postToggleActiveStatus = async (userId, slug, postId) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_ACTIVE_STATUS}`,
      {
        userId,
        postId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allBlogPosts related caches and blogDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.BLOG_POST_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.BLOG_POSTS}-*`),
      ]);
      console.log(
        `postToggleActiveStatus: ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.BLOG_POSTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing post active status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// FEATURED A PERTICULAR POST
export const postToggleFeaturedStatus = async (userId, slug, postId) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_FEATURED_STATUS}`,
      {
        userId,
        postId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allBlogPosts related caches and blogDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.BLOG_POST_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.BLOG_POSTS}-*`),
      ]);
      console.log(
        `postToggleActiveStatus: ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.BLOG_POSTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing post featured status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
