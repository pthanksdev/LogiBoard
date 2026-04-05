import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentsModule } from './shipments/shipments.module';
import { DriversModule } from './drivers/drivers.module';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TrackController } from './track/track.controller';
import { InvoicesModule } from './invoices/invoices.module';

import { PublicAnalyticsController } from './public-analytics.controller';

@Module({
  imports: [
    ShipmentsModule,
    DriversModule,
    PrismaModule,
    AuthModule,
    InvoicesModule,
  ],
  controllers: [
    AppController,
    AnalyticsController,
    TrackController,
    PublicAnalyticsController,
  ],
  providers: [AppService, NotificationsGateway, AnalyticsService],
})
export class AppModule {}
