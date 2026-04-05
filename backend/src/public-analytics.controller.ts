import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('public-analytics')
export class PublicAnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('global-stats')
  async getGlobalStats() {
    return this.analyticsService.getGlobalStats();
  }

  @Get('recent-events')
  async getRecentEvents() {
    return this.analyticsService.getRecentEvents();
  }
}
