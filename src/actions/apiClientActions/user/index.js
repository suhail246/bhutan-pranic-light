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

// NOTE USER ************

// GET ALL USERS
export const getAllUsers = async (userId, search, page, pageSize, role) => {
  const keyName = `${cacheKeyNames.USERS}-${search || "search"}-${page || 1}-${pageSize || 9}-${role || "role"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllUsers: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue.users,
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_USERS}`
  );
  const params = {
    userId: userId || "",
    search: search || "",
    page: page || 1,
    pageSize: pageSize || 9,
    role: role || "",
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
      console.log("getAllUsers: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        fetchData: response.data.users,
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all users CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
      fetchData: [],
      paginationData: {},
    };
  }
};

// GET A PERTICULAR USER
export const getUserDetails = async (userId, targetId) => {
  const keyName = `${cacheKeyNames.USER_DETAILS}-${targetId}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getUserDetails: Cache HIT ✅");
    return {
      success: true,
      userData: parsedValue.userDetails,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_USER_DETAILS}`
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
      console.log("getUserDetails: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        userData: response.data.userDetails,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting user details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      userData: {},
    };
  }
};

// DELETE PERTICULAR USER
export const deletePerticularUser = async (sessionId, targetUserId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_USER}`
  );
  const params = {
    sessionId: sessionId || "",
    targetUserId: targetUserId || "",
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
      // Revalidate the allUsers related caches and userDetails cache
      const [
        deleteUserDetailsCacheResponse,
        deleteSessionUserCatchResponse,
        deletePatternCacheResponse,
      ] = await Promise.all([
        deleteCache(`${cacheKeyNames.USER_DETAILS}-${targetUserId}`),
        deleteCache(`${cacheKeyNames.SESSION_USER_DETAILS}-${targetUserId}`),
        deletePatternCache(`${cacheKeyNames.USERS}-*`),
      ]);

      console.log(
        `deletePerticularUser: ${cacheKeyNames.USER_DETAILS} ${cacheKeyNames.SESSION_USER_DETAILS} ${cacheKeyNames.USERS} Cache deleted 🗑️`
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

// CREATE ADMIN STAFF
export const createNewAdminStaff = async (userId, data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_ADMIN_STAFF}`,
      {
        userId,
        ...data,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all allUsers related caches
      await deletePatternCache(`${cacheKeyNames.USERS}-*`);

      console.log(
        `createNewAdminStaff: ${cacheKeyNames.USERS} Cache deleted 🗑️`
      );
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new admin staff CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE A PERTICULAR USER
export const updatePerticularUser = async (userId, targetId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_USER}`,
      {
        userId,
        targetId,
        ...data,
      }
    );
    if (response.data.success && response.status === 200) {
      // Revalidate the all allUsers related caches
      const [
        deleteUserCacheResponse,
        deleteUserSessionCacheResponse,
        deletePatternCacheResponse,
      ] = await Promise.all([
        deleteCache(`${cacheKeyNames.USER_DETAILS}-${targetId}`),
        deleteCache(`${cacheKeyNames.SESSION_USER_DETAILS}-${targetId}`),
        deletePatternCache(`${cacheKeyNames.USERS}-*`),
      ]);

      console.log(
        `updatePerticularUser: ${cacheKeyNames.USER_DETAILS} ${cacheKeyNames.USERS} Cache deleted 🗑️`
      );
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the user CLIENT: ${error}`);

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

// NOTE ROLE ************

// CREATE A NEW ROLE
export const createNewRole = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_ROLE}`,
      {
        ...data,
        userId,
      }
    );

    if (response.data.success && response.status === 201) {
      console.log(`createNewRole: ${cacheKeyNames.ROLES} Cache deleted 🗑️`);

      await deletePatternCache(`${cacheKeyNames.ROLES}-*`);

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new role CLIENT: ${error}`);

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

// GET ALL ROLES
export const getAllRoles = async (userId, search, page, pageSize) => {
  const keyName = `${cacheKeyNames.ROLES}-${search || "search"}-${page || 1}-${pageSize || 9}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllRoles: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue.rolesData,
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_ROLES}`
  );
  const params = {
    userId: userId || "",
    search: search || "",
    page: page || 1,
    pageSize: pageSize || 9,
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
      console.log("getAllRoles: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        fetchData: response.data.rolesData,
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all roles CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
      fetchData: [],
    };
  }
};

// GET ROLE DETAILS
export const getPerticularRole = async (userId, roleId) => {
  const keyName = `${cacheKeyNames.ROLE_DETAILS}-${roleId}`;
  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getPerticularRole: Cache HIT ✅");
    return {
      success: true,
      roleData: parsedValue.roleDetails,
      selectedPermissions: parsedValue.selectedPermissions,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ROLE_DETAILS}`
  );

  const params = {
    userId: userId || "",
    roleId: roleId || "",
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
      console.log("getPerticularRole: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        roleData: response.data.roleDetails,
        selectedPermissions: response.data.selectedPermissions,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting role details CLIENT: ${error}`);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      roleData: {},
    };
  }
};

// UPDATE Perticular Role
export const updatePerticularRole = async (data, userId, roleId) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_ROLE}`,
      {
        ...data,
        userId,
        roleId,
      }
    );

    if (response.data.success && response.status === 200) {
      console.log(
        `updatePerticularRole: ${cacheKeyNames.ROLES} & ${cacheKeyNames.ROLE_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the role CLIENT: ${error}`);

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

// DELETE Perticular Role
export const deletePerticularRole = async (userId, roleId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_ROLE}`
  );
  const params = {
    userId: userId || "",
    roleId: roleId || "",
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
      console.log(
        `deletePerticularRole: ${cacheKeyNames.ROLES} & ${cacheKeyNames.USERS} & ${cacheKeyNames.USER_DETAILS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the role CLIENT: ${error}`);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// NOTE PERMISSION ************

// GET all Permissions
export const getAllPermissions = async (userId) => {
  const keyName = `${cacheKeyNames.PERMISSIONS}-${userId}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllPermissions: Cache HIT ✅");
    return {
      success: true,
      fetchData: parsedValue.permissions,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_PERMISSIONS}`
  );
  const params = {
    userId: userId || "",
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
      console.log("getAllPermissions: Databse Call and storing in cache 💾");

      await setCache(keyName, JSON.stringify(response.data));

      return {
        success: true,
        fetchData: response.data.permissions,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all permissions CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
      fetchData: [],
      paginationData: {},
    };
  }
};
