"use server";

import { redis } from "./redis";

// ✅ SET CACHE
export const setCache = async (key, value, ttl) => {
  try {
    if (!key || !value) {
      return {
        cacheStatus: false,
        errorMessage: "Invalid key or value",
      };
    }

    ttl ? await redis.set(key, value, "EX", ttl) : await redis.set(key, value);

    return {
      cacheStatus: true,
      errorMessage: null,
    };
  } catch (error) {
    console.log(`🔴 Redis Set Error: ${error}`);
    return {
      cacheStatus: false,
      errorMessage: error.message,
    };
  }
};

// ✅ GET CACHE
export const getCache = async (key) => {
  try {
    if (!key) return { parsedValue: null };

    const value = await redis.get(key);

    return {
      parsedValue: value ? JSON.parse(value) : null,
    };
  } catch (error) {
    console.log(`🔴 Redis Get Error: ${error}`);
    return { parsedValue: null };
  }
};

// ✅ DELETE CACHE
export const deleteCache = async (key) => {
  try {
    if (!key || !typeof key === "string") {
      return {
        cacheStatus: false,
        errorMessage: "Invalid key",
      };
    }
    await redis.del(key);
    return {
      cacheStatus: true,
      errorMessage: null,
    };
  } catch (error) {
    console.log(`🔴 Redis Delete Error: ${error}`);
    return {
      cacheStatus: false,
      errorMessage: error.message,
    };
  }
};

// ✅ Delete Cache by Pattern (Wildcard Keys)
export const deletePatternCache = async (pattern) => {
  try {
    if (!pattern || typeof pattern !== "string") {
      return {
        cacheStatus: false,
        errorMessage: "Invalid pattern",
      };
    }

    const keys = await redis.keys(pattern);

    if (keys.length > 0) await redis.del(...keys);

    return {
      cacheStatus: true,
      errorMessage: keys.length ? null : "No matching keys found",
    };
  } catch (error) {
    console.log(`🔴 Redis Pattern Delete Error: ${error}`);
    return {
      cacheStatus: false,
      errorMessage: error.message,
    };
  }
};

// ✅ DELETE ALL CACHE
export const deleteAllCache = async () => {
  try {
    await redis.flushall();
    return {
      cacheStatus: true,
      errorMessage: null,
    };
  } catch (error) {
    console.log(`🔴 Redis FlushAll Error: ${error}`);
    return {
      cacheStatus: false,
      errorMessage: error.message,
    };
  }
};

// ✅ GET REDIS CACHE COUNT
export const getRedisCacheCount = async () => {
  try {
    return await redis.dbsize();
  } catch (error) {
    console.error("🔴 Redis Cache Count Error: ", error);
    return 0;
  }
};

// ✅ TODO GET REDIS STATS INFO
export const getRedisStatsInfo = async () => {
  try {
    const response = await redis.info();

    return {
      status: true,
      data: response,
    };
  } catch (error) {
    console.error("🔴 Redis Stats Info Error: ", error);

    return {
      status: false,
      message: error.message,
    };
  }
};
