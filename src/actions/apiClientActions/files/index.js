"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import axios from "axios";
import {
  deleteCache,
  deletePatternCache,
  getCache,
  setCache,
} from "../../../lib/redis/actions";

// UPPY UPLOAD Files (List of files [{}, {}, {}]) in DB
export const uploadFilesToDB = async (file) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.STORE_NEW_FILES}`,
      {
        ...file,
      }
    );

    if (response.status === 201 && response.data.success) {
      await deletePatternCache(`${cacheKeyNames.FILES}-*`);
      await deleteCache(cacheKeyNames.FE_FILES);
      console.log(
        `uploadFilesToDB: ${cacheKeyNames.FILES} ${cacheKeyNames.FE_FILES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new image CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE UPPY GET ALL FILES
export const getAllFilesFromDB = async (
  userId,
  search,
  page,
  pageSize,
  selectedFileType = ""
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.FILES}-${search || "search"}-${page || 1}-${pageSize || 24}-${selectedFileType || "selectedFileType"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllFilesFromDB: Cache HIT ✅");

    return {
      success: true,
      filesList: parsedValue?.files || [],
      allFilesData: parsedValue?.allFiles || [],
      paginationData: parsedValue?.paginationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_FILES}`
  );

  const params = {
    userId,
    search: search || "",
    page: page || 1,
    pageSize: pageSize || 24,
    selectedFileType: selectedFileType || "",
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
      console.log("getAllFilesFromDB: Databse Call and storing in cache 💾");

      return {
        success: true,
        filesList: response.data?.files || [],
        allFilesData: response.data?.allFiles || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(`❌ Error in get-all-images action: ${error}`);
    return {
      success: false,
      errorMessage:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE UPPY DOWNLOAD FILE
export const downloadFile = async (fileKey, contentType, userId) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DOWNLOAD_FILE}`
  );

  const params = {
    fileKey: fileKey,
    contentType: contentType,
    userId: userId,
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await axios.get(url.toString());

    if (response.status === 200) {
      return {
        success: true,
        responseData: response,
      };
    }
  } catch (error) {
    console.log(`❌ Error in downloading image CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE UPPY DELETE FILE
export const deleteFileFromDB = async (fileKey, userId) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_FILE}`
  );

  const params = {
    fileKey: fileKey,
    userId: userId,
  };

  // Append parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await axios.delete(url.toString());

    if (response.status === 200 && response.data.success) {
      await deletePatternCache(`${cacheKeyNames.FILES}-*`);
      await deleteCache(cacheKeyNames.FE_FILES);
      console.log(
        `deleteFileFromDB: ${cacheKeyNames.FILES} ${cacheKeyNames.FE_FILES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting file CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE File Toggle Default Status
export const fileToggleDefaultStatus = async (fileKey, userId) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGEL_FILE_DEFAULT_STATUS}`,
      {
        userId,
        fileKey,
      }
    );

    if (response.status === 200 && response.data.success) {
      await deletePatternCache(`${cacheKeyNames.FILES}-*`);
      await deleteCache(cacheKeyNames.FE_FILES);
      console.log(
        `fileToggleDefaultStatus: ${cacheKeyNames.FILES} ${cacheKeyNames.FE_FILES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing file default status CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
