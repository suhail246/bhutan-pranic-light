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

// CREATE NEW CONTACT
export const createNewContact = async (data, userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.CREATE_NEW_CONTACT}`,
      {
        ...data,
        userId,
      }
    );

    if (response.data.success && response.status === 201) {
      // Revalidate the all contacts related caches
      await deletePatternCache(`${cacheKeyNames.CONTACTS}-*`);
      console.log(
        `createNewContact: ${cacheKeyNames.CONTACTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in creating new contact CLIENT: ${error}`);

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

// GET ALL CONTACTS
export const getAllContacts = async (
  userId,
  search,
  page,
  pageSize,
  status,
  featured
) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.CONTACTS}-${search || "search"}-${page || 1}-${pageSize || 9}-${status || "status"}-${featured || "featured"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllContacts: Cache HIT ✅");

    return {
      success: true,
      fetchData: parsedValue.contacts,
      paginationData: parsedValue.paginationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_CONTACTS}`
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
      console.log("getAllContacts: Database Call and storing in cache 💾");

      return {
        success: true,
        fetchData: response.data.contacts,
        paginationData: response.data.paginationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all contacts CLIENT: ${error.message}`);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// GET ALL CONTACTS
export const getAllContactQueries = async (userId, search, page, pageSize) => {
  // Create a unique key for the cache
  const keyName = `${cacheKeyNames.CONTACT_QUERIES}-${search || "search"}-${page || 1}-${pageSize || 9}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getAllContactQueries: Cache HIT ✅");

    return {
      success: true,
      fetchData: parsedValue?.queries || [],
      paginationData: parsedValue?.paginationData || {},
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_CONTACT_QUERIES}`
  );

  const params = {
    userId,
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
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(keyName, JSON.stringify(response.data));
      console.log(
        "getAllContactQueries: Database Call and storing in cache 💾"
      );

      return {
        success: true,
        fetchData: response.data?.queries || [],
        paginationData: response.data?.paginationData || {},
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in getting all contact queries CLIENT: ${error.message}`
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

// GET CONTACT DETAILS
export const getContactDetails = async (userId, slug, targetId) => {
  const keyName = `${cacheKeyNames.CONTACT_DETAILS}-${slug || "slug"}`;

  // Check if the cache is available, if available return the cached data
  const { parsedValue } = await getCache(keyName);
  if (parsedValue) {
    console.log("getContactDetails: Cache HIT ✅");
    return {
      success: true,
      contactDetails: parsedValue.contactDetails,
      translationDetails: parsedValue.translationData,
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_CONTACT_DETAILS}`
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
      await setCache(keyName, JSON.stringify(response.data));
      console.log("getContactDetails: Database Call and storing in cache 💾");

      return {
        success: true,
        contactDetails: response.data.contactDetails,
        translationDetails: response.data.translationData,
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting contact details CLIENT: ${error}`);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

// UPDATE CONTACT
export const updateContact = async (userId, slug, targetId, data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_CONTACT}`,
      {
        ...data,
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all contacts related caches and contactDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CONTACT_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CONTACTS}-*`),
      ]);
      console.log(
        `updateContact: ${cacheKeyNames.CONTACT_DETAILS} ${cacheKeyNames.CONTACTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating the contact CLIENT: ${error}`);

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

// DELETE CONTACT
export const deleteContact = async (userId, slug, targetId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_CONTACT}`
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
      // Revalidate the all contacts related caches and contactDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CONTACT_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CONTACT_QUERIES}-*`),
      ]);
      console.log(
        `deleteContact: ${cacheKeyNames.CONTACT_DETAILS} ${cacheKeyNames.CONTACTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the contact CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// DELETE CONTACT QUERY
export const deleteContactQuery = async (userId, slug = "", targetId) => {
  // Construct the URL with query parameters
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.DELETE_CONTACT_QUERY}`
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
      // Revalidate the all contact queries related caches
      await deletePatternCache(`${cacheKeyNames.CONTACT_QUERIES}-*`);
      console.log(
        `deleteContactQuery: ${cacheKeyNames.CONTACT_QUERIES} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in deleting the contact query CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE CONTACT ACTIVE STATUS
export const toggleContactActiveStatus = async (userId, slug, targetId) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_CONTACT_ACTIVE_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all contacts related caches and contactDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CONTACT_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CONTACTS}-*`),
      ]);
      console.log(
        `toggleContactActiveStatus: ${cacheKeyNames.CONTACT_DETAILS} ${cacheKeyNames.CONTACTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in changing contact active status CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE CONTACT ACTIVE FORM STATUS
export const toggleContactActiveFormStatus = async (userId, slug, targetId) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_CONTACT_ACTIVE_FORM_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all contacts related caches and contactDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CONTACT_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CONTACTS}-*`),
      ]);
      console.log(
        `toggleContactActiveFormStatus: ${cacheKeyNames.CONTACT_DETAILS} ${cacheKeyNames.CONTACTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing contact active form status CLIENT: ${error}`
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// TOGGLE CONTACT FEATURED STATUS
export const toggleContactFeaturedStatus = async (userId, slug, targetId) => {
  try {
    // Make the PATCH request using fetch
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TOGGLE_CONTACT_FEATURED_STATUS}`,
      {
        userId,
        targetId,
      }
    );

    if (response.data.success && response.status === 200) {
      // Revalidate the all contacts related caches and contactDetails cache
      await Promise.all([
        deleteCache(`${cacheKeyNames.CONTACT_DETAILS}-${slug || "slug"}`),
        deletePatternCache(`${cacheKeyNames.CONTACTS}-*`),
      ]);
      console.log(
        `toggleContactFeaturedStatus: ${cacheKeyNames.CONTACT_DETAILS} ${cacheKeyNames.CONTACTS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(
      `❌ Error in changing contact featured status CLIENT: ${error}`
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
