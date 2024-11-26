import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import {
  RateLimiterOptions,
  RateLimitMiddleware,
} from "../middlewares/rate-limit.middleware";
import { RATE_LIMITER_OPTIONS } from "../decorators/rate-limit.decorator";

@Module({})
export class RateLimiterModule implements NestModule {
  public static register(options: RateLimiterOptions): DynamicModule {
    return {
      imports: [],
      providers: [
        {
          provide: RATE_LIMITER_OPTIONS,
          useValue: options,
        },
      ],
      module: RateLimiterModule,
    };
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes("*");
  }
}
