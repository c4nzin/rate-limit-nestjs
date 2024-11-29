import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const SKIP_RATE_LIMIT = "skipRateLimit";

export const SkipRateLimit = (): CustomDecorator => {
  return SetMetadata(SKIP_RATE_LIMIT, {});
};
