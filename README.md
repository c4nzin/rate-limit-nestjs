# Rate Limit Nestjs

```bash
npm i rate-limit-nestjs
```

## Features and Decorators

| **Feature/Decorator** | **Description**                                                                | **Usage Example**                                           |
| --------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `@RateLimit`          | Apply a custom rate limit to a specific route or method.                       | `@RateLimit({ maxRequest: 20, ms: 30000 })`                 |
| `@SkipRateLimit`      | Exclude a specific route or method from any rate limiting rules.               | `@SkipRateLimit()`                                          |
| `RateLimitGuard`      | A guard to enable rate limiting globally or at the controller level.           | `@UseGuards(RateLimitGuard)`                                |
| `RateLimiterModule`   | A module to configure global rate limiting options for the entire application. | `RateLimiterModule.register({ maxRequest: 60, ms: 60000 })` |

# Global Configuration

```typescript
import { Module } from "@nestjs/common";
import { RateLimiterModule } from "rate-limit-nestjs";

@Module({
  imports: [
    RateLimiterModule.register({
      maxRequest: 60, // Maximum 60 requests
      ms: 60000, // Within 60 seconds (1 minute)
    }),
  ],
})
export class ExampleModule {}
```

# Controller Level Scope

```typescript
import { Controller, Get, UseGuards } from "@nestjs/common";
import { RateLimitGuard } from "rate-limit-nestjs";

@Controller()
@UseGuards(RateLimitGuard) // Global scope for all methods in this controller
export class ExampleController {
  @Get("/info")
  public getInfo() {
    return "This route is rate-limited by the global guard.";
  }
}
```

# Method-Specific Rate limit

```typescript
import { Controller, Get } from "@nestjs/common";
import { RateLimit } from "rate-limit-nestjs";

@Controller()
export class ExampleController {
  @Get("/create")
  @RateLimit({
    maxRequest: 20, // Maximum 20 requests
    ms: 30000, // Within 30 seconds
  }) // Specific to this route
  public createUser() {
    return "This route has a specific rate limit of 20 requests per 30 seconds.";
  }

  @Get()
  @SkipRateLimit() // You can optionally exclude specific routes from rate limiting.
  getHello(): string {
    return this.appService.getHello();
  }
}
```
