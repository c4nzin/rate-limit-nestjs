import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const RATE_LIMITER_OPTIONS = "rateLimiterOptions";

export const RateLimit = (options: {
  ms: number;
  maxRequest: number;
}): CustomDecorator => {
  return SetMetadata(RATE_LIMITER_OPTIONS, options);
};
