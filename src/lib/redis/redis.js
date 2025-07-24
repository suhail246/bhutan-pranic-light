import Redis from "ioredis";

const getRedisURL = () => {
  // This will only work in Server side.
  if (process.env.REDIS_URL) return process.env.REDIS_URL;

  // In client side it will thorw an error.
  throw new Error("REDIS_URL is not defined.");
};

export const redis = new Redis(getRedisURL(), {
  reconnectOnError: (err) => {
    console.error("🔴 Redis connection error: ", err);
    return true; // Auto-reconnect on error
  },
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000); // Exponential backoff
    console.warn(`⚠️ Redis connection lost. Retrying in ${delay} ms.`);
    return delay;
  },
  maxRetriesPerRequest: null, // Prevents automatic request failure
  enableReadyCheck: false, // Avoids waiting for 'ready' event if Redis is slow
});
