import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import {
  rateLimiter,
  RateLimiterOptions,
} from "@canmertinyo/rate-limit-express";
import {
  RATE_LIMITER_MODULE_OPTIONS,
  RATE_LIMITER_OPTIONS,
} from "../decorators/rate-limit.decorator";
import { Reflector } from "@nestjs/core";
import { SKIP_RATE_LIMIT } from "../decorators/skip-rate-limit.decorator";

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    @Inject(RATE_LIMITER_MODULE_OPTIONS)
    private rateLimiterModuleOptions: RateLimiterOptions,
    private readonly reflector: Reflector
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const moduleOptions = this.rateLimiterModuleOptions;
    const options = this.reflector.get<RateLimiterOptions>(
      RATE_LIMITER_OPTIONS,
      context.getHandler()
    );

    const skipRateLimit = this.reflector.get(
      SKIP_RATE_LIMIT,
      context.getHandler()
    );

    if (skipRateLimit) {
      return true;
    }

    var req = context.switchToHttp().getRequest();
    var res = context.switchToHttp().getResponse();

    rateLimiter(options ?? moduleOptions)(req, res, () => {});

    if (res.headersSent || res.finished) {
      return false;
    }

    return true;
  }
}
