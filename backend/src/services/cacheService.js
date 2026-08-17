import { redisClient } from '../config/redis.js';

export const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCache = async (key, value, ttlSeconds = 300) => {
  await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
};

export const invalidateCache = async (pattern) => {
  const keys = await redisClient.keys(pattern);
  if (keys.length) await redisClient.del(keys);
};