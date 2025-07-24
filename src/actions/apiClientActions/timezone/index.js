"use server";

import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import { getCache, setCache } from "@/lib/redis/actions";
import axios from "axios";

export const getAllTimezones = async (userId) => {
  const { parsedValue } = await getCache(cacheKeyNames.TIME_ZONES);
  if (parsedValue) {
    console.log("getAllTimezones: Cache HIT ✅");

    return {
      success: true,
      timezonesData: parsedValue?.timezonesList || [],
    };
  }

  // Make the request if the cache is not available and store the data in the cache
  const url = new URL(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.TIMEZONE_LISTS}?userId=${userId || ""}`
  );

  try {
    const response = await axios.get(url.toString());

    if (response.data.success && response.status === 200) {
      await setCache(cacheKeyNames.TIME_ZONES, JSON.stringify(response.data));
      console.log("getAllTimezones: Databse Call and storing in cache 💾");

      return {
        success: true,
        timezonesData: response.data?.timezonesList || [],
      };
    }
  } catch (error) {
    console.log(`❌ Error in getting all timezone CLIENT: ${error}`);

    return {
      success: false,
      errorMessage:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
