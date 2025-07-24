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

// CREATE A NEW CAREER
export const createNewCareer = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_CAREER}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all careers related caches
      await deletePatternCache(`${cacheKeyNames.CAREERS}-*`);
      console.log(`createNewCareer: ${cacheKeyNames.CAREERS} Cache deleted 🗑️`);

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new career CLIENT: ${error}`);

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

// GET ALL CAREER
export const getAllCareers = async (
  userId,
  search,
  page,
  pageSize,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.CAREERS}-${search || "search"}-${page || 1}-${pageSize || 9}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllCareers: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue?.careers || [],
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_CAREERS}`
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
      console.log("getAllCareers: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data?.careers || [],
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all careers CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET A PERTICULAR CAREER
export const getPerticularCareer = async (userId, targetId) => {
  const keyName = `${cacheKeyNames.CAREER_DETAILS}-${targetId || "targetId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularCareer: Cache HIT ✅");

    return {
      success: true,
      careerData: parsedValue?.careerDetails || {},
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_CAREER_DETAILS}`
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
      console.log("getPerticularCareer: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        careerData: response.data?.careerDetails || {},
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting career details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A PERTICULAR CAREER
export const updatePerticularCareer = async (userId, targetId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_CAREER}`,
      {
        userId,
        targetId,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all careers related caches and careerDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CAREER_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CAREERS}-*`),
      ]);
      console.log(
        `updatePerticularCareer: ${cacheKeyNames.CAREER_DETAILS} ${cacheKeyNames.CAREERS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the career CLIENT: ${error}`);

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

// DELETE A PERTICULAR CAREER
export const deletePerticularCareer = async (userId, slug = "", targetId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_CAREER}`
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
      // Revalidate the all careers related caches and careerDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CAREER_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CAREERS}-*`),
      ]);
      console.log(
        `deletePerticularCareer: ${cacheKeyNames.CAREER_DETAILS} ${cacheKeyNames.CAREERS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the career CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR CAREER ACTIVE STATUS
export const togglePerticularCareerActiveStatus = async (
  userId,
  slug = "",
  targetId
) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_CAREER_ACTIVE_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all careers related caches and careerDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CAREER_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CAREERS}-*`),
      ]);
      console.log(
        `togglePerticularCareerActiveStatus: ${cacheKeyNames.CAREER_DETAILS} ${cacheKeyNames.CAREERS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing career active status CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE PERTICULAR CAREER FEATURED STATUS
export const togglePerticularCareerFeaturedStatus = async (
  userId,
  slug = "",
  targetId
) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_CAREER_FEATURED_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all careers related caches and careerDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.CAREER_DETAILS}-${targetId || "targetId"}`
        ),
        deletePatternCache(`${cacheKeyNames.CAREERS}-*`),
      ]);
      console.log(
        `togglePerticularCareerFeaturedStatus: ${cacheKeyNames.CAREER_DETAILS} ${cacheKeyNames.CAREERS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing career featured status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
