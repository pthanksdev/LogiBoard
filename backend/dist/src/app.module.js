"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const shipments_module_1 = require("./shipments/shipments.module");
const drivers_module_1 = require("./drivers/drivers.module");
const notifications_gateway_1 = require("./notifications/notifications.gateway");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const analytics_controller_1 = require("./analytics.controller");
const analytics_service_1 = require("./analytics.service");
const track_controller_1 = require("./track/track.controller");
const invoices_module_1 = require("./invoices/invoices.module");
const public_analytics_controller_1 = require("./public-analytics.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shipments_module_1.ShipmentsModule,
            drivers_module_1.DriversModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            invoices_module_1.InvoicesModule,
        ],
        controllers: [
            app_controller_1.AppController,
            analytics_controller_1.AnalyticsController,
            track_controller_1.TrackController,
            public_analytics_controller_1.PublicAnalyticsController,
        ],
        providers: [app_service_1.AppService, notifications_gateway_1.NotificationsGateway, analytics_service_1.AnalyticsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map