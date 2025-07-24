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

// ADD NEW MENU
export const createNewMenu = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.STORE_NEW_MENU}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all menus related caches
      await deletePatternCache(`${cacheKeyNames.MENUS}-*`);
      console.log(`createNewMenu: ${cacheKeyNames.MENUS} Cache deleted 🗑️`);

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new menu CLIENT: ${error}`);

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

// GET ALL MENUS
export const getAllMenus = async (userId, search = "") => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.MENUS}-${search || "search"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    return {
      success: true,
      fetchData: parsedValue?.menus || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_MENUS}`
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
      console.log("getAllMenus: Database Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        fetchData: response.data.menus,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all menus CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// GET MENU DETAILS
export const getPerticularMenuDetails = async (userId, targetId) => {
  const keyName = `${cacheKeyNames.MENU_DETAILS}-${targetId || "menuId"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularMenuDetails: Cache HIT ✅");

    return {
      success: true,
      menuData: parsedValue.menuDetails,
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.MENU_DETAILS}`
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
        "getPerticularMenuDetails: Databse Call and storing in cache 💾"
      );

      await setCache(keyName, JSON.stringify(response.data));
      return {
        success: true,
        menuData: response.data.menuDetails,
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting menu details CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A MENU
export const updatePerticularMenu = async (userId, targetId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_MENU}`,
      {
        userId,
        targetId,
        ...data,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all menu related caches and menuDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.MENU_DETAILS}-${targetId || "menuId"}`),
        deletePatternCache(`${cacheKeyNames.MENUS}-*`),
      ]);
      console.log(
        `updatePerticularMenu: ${cacheKeyNames.MENU_DETAILS} ${cacheKeyNames.MENUS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the menu CLIENT: ${error}`);

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

// TOGGLE MENU ACTIVE STATUS
export const toggleMenuActiveStatus = async (userId, targetId, active) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_MENU_ACTIVE_STATUS}`,
      {
        userId,
        targetId,
        active,
      }
    );
    if (response.data.success && response.status === 200) {
      // Revalidate the all menu related caches and menuDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.MENU_DETAILS}-${targetId || "menuId"}`),
        deletePatternCache(`${cacheKeyNames.MENUS}-*`),
      ]);
      console.log(
        `toggleProductMenuStatus: ${cacheKeyNames.MENU_DETAILS} ${cacheKeyNames.MENUS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing menu active status CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE MENU PRODUCT MENU STATUS
export const toggleProductMenuStatus = async (userId, targetId, status) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_MENU_PRODUCT_STATUS}`,
      {
        userId,
        targetId,
        status,
      }
    );
    if (response.data.success && response.status === 200) {
      // Revalidate the all menu related caches and menuDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.MENU_DETAILS}-${targetId || "menuId"}`),
        deletePatternCache(`${cacheKeyNames.MENUS}-*`),
      ]);
      console.log(
        `toggleProductMenuStatus: ${cacheKeyNames.MENU_DETAILS} ${cacheKeyNames.MENUS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing product menu status CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// DELETE MENU
export const deletePerticularMenu = async (userId, slug, targetId) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_MENU}`
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
      // Revalidate the all menus related caches and menuDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.MENU_DETAILS}-${targetId || "menuId"}`),
        deletePatternCache(`${cacheKeyNames.MENUS}-*`),
      ]);
      console.log(
        `deletePerticularMenu: ${cacheKeyNames.MENU_DETAILS} ${cacheKeyNames.MENUS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the menu CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred during cache deletion.",
    };
  }
};
