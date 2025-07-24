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

// CREATE A NEW COURSE PACKAGE
export const createNewCoursePackage = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_COURSE_PACKAGE}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all course_packages related cache
      await deletePatternCache(`${cacheKeyNames.COURSE_PACKAGES}-*`);
      console.log(
        `createNewCoursePackage: ${cacheKeyNames.COURSE_PACKAGES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new course package CLIENT: ${error}`);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// GET ALL COURSE PACKAGES
export const getAllCoursePackages = async (
  userId,
  course,
  search,
  page,
  pageSize,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.COURSE_PACKAGES}-${course || "course"}-${search || "search"}-${page || 1}-${pageSize || 9}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllCoursePackages: Cache HIT ✅");
    return {
      success: true,
      packages: parsedValue?.coursePackages || [],
      paginationData: parsedValue?.paginationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_COURSE_PACKAGES}`
  );
  const params = {
    userId,
    course: course || "",
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
      console.log("getAllCoursePackages: Databse Call and storing in cache 💾");

      return {
        success: true,
        packages: response.data?.coursePackages || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all course packages CLIENT: ${error}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET COURSE PACKAGE DETAILS
export const getCoursePackageDetails = async (
  userId,
  targetId,
  lang = "en"
) => {
  const keyName = `${cacheKeyNames.COURSE_PACKAGE_DETAILS}-${targetId || "targetId"}-${lang}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getCoursePackageDetails: Cache HIT ✅");

    return {
      success: true,
      coursePackageDetails: parsedValue?.coursePackageData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_COURSE_PACKAGE_DETAILS}`
  );

  const params = {
    userId: userId || "",
    targetId: targetId || "",
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
        "getCoursePackageDetails: Databse Call and storing in cache 💾"
      );
      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        coursePackageDetails: response.data?.coursePackageData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting course package details CLIENT: ${error}`);
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// UPDATE A PERTICULAR COURSE PACKAGE
export const updatePerticularCoursePackage = async (
  userId,
  courseSlug,
  targetId,
  data,
  lang = "en"
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_COURSE_PACKAGE}`,
      {
        userId,
        targetId,
        lang,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all course_packages related caches and coursePackageDetails cache
      await Promise.all([
        deleteCache(
          `${cacheKeyNames.COURSE_PACKAGE_DETAILS}-${targetId || "targetId"}-${lang}`
        ),
        deletePatternCache(`${cacheKeyNames.COURSE_PACKAGES}-*`),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${courseSlug}-*`
        ),
      ]);
      console.log(
        `updatePerticularCoursePackage: ${cacheKeyNames.COURSE_PACKAGE_DETAILS} ${cacheKeyNames.COURSE_PACKAGES} ${cacheKeyNames.FE_COURSE_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the course package CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// DELETE A PERTICULAR COURSE PACKAGE
export const deletePerticularCoursePackage = async (
  userId,
  courseSlug,
  targetId
) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_COURSE_PACKAGE}`
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
      // Revalidate the all course_packages related caches and packageDetails cache
      await Promise.all([
        deletePatternCache(
          `${cacheKeyNames.COURSE_PACKAGE_DETAILS}-${targetId || "targetId"}-*`
        ),
        deletePatternCache(`${cacheKeyNames.COURSE_PACKAGES}-*`),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${courseSlug}-*`
        ),
      ]);
      console.log(
        `deletePerticularCoursePackage: ${cacheKeyNames.COURSE_PACKAGE_DETAILS} ${cacheKeyNames.COURSE_PACKAGES} ${cacheKeyNames.FE_COURSE_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the course package CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE ACTIVE COURSE PACKAGE
export const togglePerticularCoursePackageActiveStatus = async (
  userId,
  courseSlug,
  targetId
) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_COURSE_PACKAGE_ACTIVE_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all course_packages related caches and packageDetails cache
      await Promise.all([
        deletePatternCache(
          `${cacheKeyNames.COURSE_PACKAGE_DETAILS}-${targetId || "targetId"}-*`
        ),
        deletePatternCache(`${cacheKeyNames.COURSE_PACKAGES}-*`),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${courseSlug}-*`
        ),
      ]);
      console.log(
        `togglePerticularCoursePackageActiveStatus: ${cacheKeyNames.COURSE_PACKAGE_DETAILS} ${cacheKeyNames.COURSE_PACKAGES} ${cacheKeyNames.FE_COURSE_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in toggling the course package active status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE FEATURED COURSE PACKAGE
export const togglePerticularCoursePackageFeaturedStatus = async (
  userId,
  courseSlug,
  targetId
) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_COURSE_PACKAGE_FEATURED_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all course_packages related caches and packageDetails cache
      await Promise.all([
        deletePatternCache(
          `${cacheKeyNames.COURSE_PACKAGE_DETAILS}-${targetId || "targetId"}-*`
        ),
        deletePatternCache(`${cacheKeyNames.COURSE_PACKAGES}-*`),
        deletePatternCache(
          `${cacheKeyNames.FE_COURSE_DETAILS}-${courseSlug}-*`
        ),
      ]);
      console.log(
        `togglePerticularCoursePackageFeaturedStatus: ${cacheKeyNames.COURSE_PACKAGE_DETAILS} ${cacheKeyNames.COURSE_PACKAGES} ${cacheKeyNames.FE_COURSE_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in toggling the course package featured status CLIENT: ${error}`
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
