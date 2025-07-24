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

// CREATE A NEW TRAINGING COURSE
export const createNewCourse = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_COURSE}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all courses related cache
      await deleteCache(`${cacheKeyNames.COURSES}`);
      console.log(`createNewCourse: ${cacheKeyNames.COURSES} Cache deleted 🗑️`);

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in creating new course CLIENT: ${error.response.data.errors}`
    );

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// GET ALL COURSES
export const getAllCourses = async (userId) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.COURSES}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllCourses: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue?.courses || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_COURSES}?userId=${userId}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getAllCourses: Databse Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response?.data?.courses || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all courses CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET PERTICULAR COURSE DETAILS
export const getCourseDetails = async (userId, slug, lang = "en") => {
  const keyName = `${cacheKeyNames.COURSE_DETAILS}-${slug || "slug"}-${lang}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getCourseDetails: Cache HIT ✅");

    return {
      success: true,
      courseDetails: parsedValue?.courseData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_COURSE_DETAILS}`
  );

  const params = {
    userId: userId || "",
    slug: slug || "",
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
      console.log("getCourseDetails: Databse Call and storing in cache 💾");
      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        courseDetails: response.data?.courseData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting course details CLIENT: ${error}`);
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// UPDATE A PERTICULAR COURSE
export const updatePerticularCourse = async (
  userId,
  slug,
  data,
  lang = "en"
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_COURSE}`,
      {
        ...data,
        userId,
        slug,
        lang,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all courses related caches and courseDetails cache
      await Promise.all([
        deletePatternCache(
          `${cacheKeyNames.COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deleteCache(`${cacheKeyNames.COURSES}`),
      ]);
      console.log(
        `updatePerticularCourse: ${cacheKeyNames.COURSE_DETAILS} ${cacheKeyNames.FE_COURSE_DETAILS} ${cacheKeyNames.COURSES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the course CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// DELETE A PERTICULAR COURSE
export const deletePerticularCourse = async (userId, slug) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_COURSE}`
  );
  const params = {
    userId: userId || "",
    slug: slug || "",
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
      // Revalidate the all courses related caches and courseDetails cache
      await Promise.all([
        deletePatternCache(
          `${cacheKeyNames.COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deleteCache(`${cacheKeyNames.COURSES}`),
      ]);
      console.log(
        `deletePerticularCourse: ${cacheKeyNames.COURSE_DETAILS} ${cacheKeyNames.FE_COURSE_DETAILS} ${cacheKeyNames.COURSES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the course CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE ACTIVE COURSE
export const toggleActiveCourse = async (userId, slug) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_COURSE_ACTIVE_STATUS}`,
      {
        userId,
        slug,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all courses related caches and courseDetails cache
      await Promise.all([
        deletePatternCache(
          `${cacheKeyNames.COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deleteCache(`${cacheKeyNames.COURSES}`),
      ]);
      console.log(
        `toggleActiveCourse: ${cacheKeyNames.COURSE_DETAILS} ${cacheKeyNames.FE_COURSE_DETAILS} ${cacheKeyNames.COURSES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing course active status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE FEATURED COURSE
export const toggleFeaturedCourse = async (userId, slug) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_COURSE_FEATURED_STATUS}`,
      {
        userId,
        slug,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all course related caches and courseDetails cache
      await Promise.all([
        deletePatternCache(
          `${cacheKeyNames.COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${slug || "slug"}-*`
        ),
        deleteCache(`${cacheKeyNames.COURSES}`),
      ]);
      console.log(
        `toggleFeaturedCourse: ${cacheKeyNames.COURSE_DETAILS} ${cacheKeyNames.FE_COURSE_DETAILS} ${cacheKeyNames.COURSES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing course featured status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
