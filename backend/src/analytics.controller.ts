import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';
import { RequestWithUser } from './common/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  getOverview(@Request() req: RequestWithUser) {
    return this.analyticsService.getOverview(req.user);
  }
}
