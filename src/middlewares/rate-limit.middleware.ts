import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Store } from "../interfaces/store.interface";

export interface RateLimiterOptions {
  ms: number;
  maxRequest: number;
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private store: Store = {};

  constructor(private readonly rateLimiterOptions: RateLimiterOptions) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    const ip: string = req.ip || req.headers["x-forwarded-for"]![0];

    const currentTime = Date.now();
    const startTime = currentTime - this.rateLimiterOptions.ms;

    if (!this.store[ip]) {
      this.store[ip] = { count: 0, timestamp: currentTime };
    }

    if (this.store[ip].timestamp < startTime) {
      this.store[ip].count = 0;
      this.store[ip].timestamp = currentTime;
    }

    if (this.store[ip].count < this.rateLimiterOptions.maxRequest) {
      this.store[ip].count += 1;
      next();
    } else {
      res.status(429).json({
        message: "Too many requests. please try again later!",
      });
    }
  }
}
