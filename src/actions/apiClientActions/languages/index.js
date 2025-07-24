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

// GET ALL LANGUAGES
export const getAllLanguages = async (userId) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.LANGUAGES}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllLanguages: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue.languageList,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_LANGUAGES}`
  );
  const params = {
    userId,
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
      console.log("getAllLanguages: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data.languageList,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all languages CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// CREATE A NEW LANGUAGE
export const createNewLanguage = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_LANGUAGE}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all allLanguages related caches
      await Promise.all([
        deleteCache(`${cacheKeyNames.LANGUAGES}`),
        deletePatternCache(`${cacheKeyNames.BLOG_POST_DETAILS}-*`),
        deletePatternCache(`${cacheKeyNames.CATEGORY_DETAILS}-*`),
      ]);
      console.log(
        `createNewLanguage: ${cacheKeyNames.LANGUAGES} ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.CATEGORY_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new language CLIENT: ${error}`);

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

// UPDATE A LANGUAGE
export const updatePerticularLanguage = async (userId, targetId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_LANGUAGE}`,
      {
        userId,
        targetId,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allLanguages related caches and languageDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.LANGUAGES}`),
        deleteCache(
          `${cacheKeyNames.LANGUAGE_DETAILS}-${targetId || "languageId"}`
        ),
        deletePatternCache(`${cacheKeyNames.BLOG_POST_DETAILS}-*`),
        deletePatternCache(`${cacheKeyNames.CATEGORY_DETAILS}-*`),
      ]);
      console.log(
        `updatePerticularLanguage: ${cacheKeyNames.LANGUAGES} ${cacheKeyNames.LANGUAGE_DETAILS} ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.CATEGORY_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the language CLIENT: ${error}`);

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

// GET A PERTICULAR LANGUAGE
export const getPerticularLanguage = async (userId, targetId) => {
  const keyName = `${cacheKeyNames.LANGUAGE_DETAILS}-${targetId || "languageId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularLanguage: Cache HIT ✅");
    return {
      success: true,
      languageData: parsedValue.languageDetails,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.LANGUAGE_DETAILS}`
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
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      console.log(
        "getPerticularLanguage: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        languageData: response.data.languageDetails,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting language details CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// DELETE LANGUAGE
export const deletePerticularLanguage = async (userId, slug, targetId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_LANGUAGE}`
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
    const response = await axios.delete(url.toString());

    if (response.data.success && response.status === 200) {
      // Revalidate the all allLanguages related caches
      await Promise.all([
        deleteCache(`${cacheKeyNames.LANGUAGES}`),
        deletePatternCache(`${cacheKeyNames.BLOG_POST_DETAILS}-*`),
        deletePatternCache(`${cacheKeyNames.CATEGORY_DETAILS}-*`),
      ]);
      console.log(
        `deletePerticularLanguage: ${cacheKeyNames.LANGUAGES} ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.CATEGORY_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the language CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE LANGUAGE ACTIVE STATUS
export const toggleActiveLanguage = async (userId, targetId, activeStatus) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_ACTIVE_LANGUAGE}`,
      {
        userId,
        targetId,
        activeStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allLanguages related caches and languageDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.LANGUAGES}`),
        deletePatternCache(`${cacheKeyNames.BLOG_POST_DETAILS}-*`),
        deletePatternCache(`${cacheKeyNames.CATEGORY_DETAILS}-*`),
      ]);
      console.log(
        `toggleActiveLanguage: ${cacheKeyNames.LANGUAGES} ${cacheKeyNames.BLOG_POST_DETAILS} ${cacheKeyNames.CATEGORY_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in toggling the language active status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE LANGUAGE RTL STATUS
export const toggleRTLLanguage = async (userId, targetId, rtlStatus) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_RTL_LANGUAGE}`,
      {
        userId,
        targetId,
        rtlStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allLanguages related caches and languageDetails cache
      await deleteCache(`${cacheKeyNames.LANGUAGES}`);
      console.log(
        `toggleRTLLanguage: ${cacheKeyNames.LANGUAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in toggling the language RTL status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE LANGUAGE DEFAULT STATUS
export const toggleDefaultLanguage = async (
  userId,
  targetId,
  defaultStatus
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_DEFAULT_LANGUAGE}`,
      {
        userId,
        targetId,
        defaultStatus,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all allLanguages related caches and languageDetails cache
      await deleteCache(`${cacheKeyNames.LANGUAGES}`);
      console.log(
        `toggleDefaultLanguage: ${cacheKeyNames.LANGUAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in toggling the language default status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
