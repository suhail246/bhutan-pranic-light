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

// CREATE A NEW TESTIMONIAL
export const createNewTestimonial = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_TESTIMONIAL}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all tstimonials related caches
      await deletePatternCache(`${cacheKeyNames.TESTIMONIALS}-*`);
      console.log(
        `createNewTestimonial: ${cacheKeyNames.TESTIMONIALS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new testimonial CLIENT: ${error}`);

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

// GET ALL TESTIMONIAL
export const getAllTestimonials = async (
  userId,
  search,
  page,
  pageSize,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.TESTIMONIALS}-${search || "search"}-${page || 1}-${pageSize || 9}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllTestimonials: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue?.testimonials || [],
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_TESTIMONIALS}`
  );
  const params = {
    userId,
    search: search || "",
    page: page || 1,
    pageSize: pageSize || 9,
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
      console.log("getAllTestimonials: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data?.testimonials || [],
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in getting all testimonials CLIENT: ${error.message}`
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

// GET A PERTICULAR TESTIMONIAL
export const getPerticularTestimonial = async (userId, targetId) => {
  const keyName = `${cacheKeyNames.TESTIMONIAL_DETAILS}-${targetId || "targetId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularTestimonial: Cache HIT ✅");
    return {
      success: true,
      testimonialData: parsedValue?.testimonialDetails || {},
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_TESTIMONIAL_DETAILS}`
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
        "getPerticularTestimonial: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        testimonialData: response.data?.testimonialDetails || {},
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting testimonial details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A PERTICULAR TESTIMONIAL
export const updatePerticularTestimonial = async (userId, targetId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_TESTIMONIAL}`,
      {
        ...data,
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all testimonials related caches and testimonialDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.TESTIMONIAL_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.TESTIMONIALS}-*`),
      ]);
      console.log(
        `updatePerticularTestimonial: ${cacheKeyNames.TESTIMONIAL_DETAILS} ${cacheKeyNames.TESTIMONIALS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the testimonial CLIENT: ${error}`);

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

// DELETE A PERTICULAR TESTIMONIAL
export const deletePerticularTestimonial = async (
  userId,
  slug = "",
  targetId
) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_TESTIMONIAL}`
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
      // Revalidate the all testimonials related caches and testimonialDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.TESTIMONIAL_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.TESTIMONIALS}-*`),
      ]);
      console.log(
        `deletePerticularTestimonial: ${cacheKeyNames.TESTIMONIAL_DETAILS} ${cacheKeyNames.TESTIMONIALS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the testimonial CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR TESTIMONIAL ACTIVE STATUS
export const togglePerticularTestimonialActiveStatus = async (
  userId,
  slug = "",
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_TESTIMONIAL_ACTIVE_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all testimonials related caches and testimonialDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.TESTIMONIAL_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.TESTIMONIALS}-*`),
      ]);
      console.log(
        `togglePerticularTestimonialActiveStatus: ${cacheKeyNames.TESTIMONIAL_DETAILS} ${cacheKeyNames.TESTIMONIALS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing testimonial active status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR TESTIMONIAL FEATURED STATUS
export const togglePerticularTestimonialFeaturedStatus = async (
  userId,
  slug = "",
  targetId
) => {
  try {
    // Make the patch request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_TESTIMONIAL_FEATURED_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all testimonials related caches and testimonialDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.TESTIMONIAL_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.TESTIMONIALS}-*`),
      ]);
      console.log(
        `togglePerticularTestimonialFeaturedStatus: ${cacheKeyNames.TESTIMONIAL_DETAILS} ${cacheKeyNames.TESTIMONIALS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing testimonial featured status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
