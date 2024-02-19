import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://capital-lemming-43403.upstash.io",
  token: process.env.REDIS_TOKEN!,
});
