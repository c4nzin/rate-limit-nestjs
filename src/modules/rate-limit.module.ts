import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { RateLimiterOptions } from "@canmertinyo/rate-limit-express";
import { RATE_LIMITER_MODULE_OPTIONS } from "../decorators/rate-limit.decorator";
import { Reflector } from "@nestjs/core";

@Module({})
export class RateLimiterModule implements NestModule {
  public static register(options: RateLimiterOptions): DynamicModule {
    return {
      module: RateLimiterModule,
      providers: [
        Reflector,
        {
          provide: RATE_LIMITER_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [RATE_LIMITER_MODULE_OPTIONS, Reflector],
    };
  }

  configure(consumer: MiddlewareConsumer) {}
}
