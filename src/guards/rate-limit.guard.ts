import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RATE_LIMITER_OPTIONS } from "../decorators/rate-limit.decorator";
import { Request } from "express";

@Injectable()
export class RateLimitGuard implements CanActivate {
  private store: Record<string, { count: number; timestamp: number }> = {};

  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.get<{ ms: number; maxRequest: number }>(
      RATE_LIMITER_OPTIONS,
      context.getHandler()
    );

    if (!options) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const ip = request.ip!;
    const currentTime = Date.now();
    const startTime = currentTime - options.ms;

    if (!this.store[ip]) {
      this.store[ip] = { count: 0, timestamp: currentTime };
    }

    if (this.store[ip].timestamp < startTime) {
      this.store[ip].count = 0;
      this.store[ip].timestamp = currentTime;
    }

    if (this.store[ip].count < options.maxRequest) {
      this.store[ip].count += 1;
      return true;
    }

    return false;
  }
}
