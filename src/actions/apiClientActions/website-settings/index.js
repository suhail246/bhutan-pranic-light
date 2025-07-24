"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import { deleteCache, getCache, setCache } from "@/lib/redis/actions";
import { getSettingsFieldValue } from "@/utils/website-settings-helper";
import axios from "axios";

// Get Website Setting's Field Value
export const getWebSettingFiledData = async (
  userId,
  targetNames,
  lang = ""
) => {
  const { parsedValue } = await getCache(cacheKeyNames.WEBSITE_SETTINGS);
  if (parsedValue) {
    console.log("getAllWebsiteSettings: Cache HIT ✅");

    return {
      targetFieldsData: getSettingsFieldValue(
        parsedValue?.settingsList || [],
        targetNames,
        lang
      ),
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.GET_ALL_WEBSITE_SETTINGS}?userId=${userId || ""}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(
        cacheKeyNames.WEBSITE_SETTINGS,
        JSON.stringify(response.data)
      );
      console.log(
        "getAllWebsiteSettings: Databse Call and storing in cache 💾"
      );

      return {
        targetFieldsData: getSettingsFieldValue(
          response.data?.settingsList || [],
          targetNames,
          lang
        ),
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting website settings CLIENT: ${error}`);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};

// Wbsite Settings Update
export const websiteSettingsUpdate = async (userId, data, lang = "en") => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.UPDATE_WEBSITE_SETTINGS}`,
      {
        userId,
        ...data,
        lang,
      }
    );

    if (response.data.success && response.status === 200) {
      await deleteCache(cacheKeyNames.WEBSITE_SETTINGS);
      console.log(
        `websiteSettingsUpdate: ${cacheKeyNames.WEBSITE_SETTINGS} Cache deleted 🗑️`
      );

      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log(`❌ Error in updating website settings CLIENT: ${error}`);

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
