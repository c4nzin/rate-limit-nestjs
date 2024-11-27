import { Controller, Get, Module, UseGuards } from "@nestjs/common";
import { RateLimit } from "./decorators/rate-limit.decorator";
import { RateLimitGuard } from "./guards/rate-limit.guard";
import { RateLimiterModule } from "./modules/rate-limit.module";

@Module({
  imports: [RateLimiterModule.register({ maxRequest: 60, ms: 60000 })],
})
export class ExampleModule {}

@Controller()
@UseGuards(RateLimitGuard) //attached to the controller scope.
export class ExampleController {
  @Get("/create")
  @RateLimit({ ms: 30000, maxRequest: 60 }) //add limiter to a specific method.
  public createUser() {}
}
