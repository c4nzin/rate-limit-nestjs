import { RateLimiterOptions } from "@canmertinyo/rate-limit-express";
import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const RATE_LIMITER_OPTIONS = "rateLimiterOptions";
export const RATE_LIMITER_MODULE_OPTIONS = "rateLimiterModuleOptions";

export const RateLimit = (options: RateLimiterOptions): CustomDecorator => {
  return SetMetadata(RATE_LIMITER_OPTIONS, options);
};
