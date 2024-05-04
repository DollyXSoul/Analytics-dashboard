import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://fit-shrew-44158.upstash.io",
  token: process.env.REDIS_TOKEN!,
});
