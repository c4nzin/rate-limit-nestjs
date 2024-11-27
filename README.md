




# Global Configuration
```typescript
import { Module } from "@nestjs/common";
import { RateLimiterModule } from "rate-limit-nestjs";

@Module({
  imports: [
    RateLimiterModule.register({
      maxRequest: 60, // Maximum 60 requests
      ms: 60000,      // Within 60 seconds (1 minute)
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
    ms: 30000,      // Within 30 seconds
  }) // Specific to this route
  public createUser() {
    return "This route has a specific rate limit of 20 requests per 30 seconds.";
  }
}

```
