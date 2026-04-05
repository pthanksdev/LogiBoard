"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TrackController = class TrackController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTrackingData(trackingId) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { trackingId },
            include: {
                company: true,
            },
        });
        if (!shipment) {
            throw new common_1.NotFoundException('Shipment not found');
        }
        return {
            trackingId: shipment.trackingId,
            origin: shipment.origin,
            originLat: shipment.originLat,
            originLng: shipment.originLng,
            destination: shipment.destination,
            destinationLat: shipment.destinationLat,
            destinationLng: shipment.destinationLng,
            status: shipment.status,
            expectedDelivery: shipment.expectedDelivery,
            actualDelivery: shipment.actualDelivery,
            company: shipment.company ? { name: shipment.company.name } : null,
        };
    }
};
exports.TrackController = TrackController;
__decorate([
    (0, common_1.Get)(':trackingId'),
    __param(0, (0, common_1.Param)('trackingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "getTrackingData", null);
exports.TrackController = TrackController = __decorate([
    (0, common_1.Controller)('track'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrackController);
//# sourceMappingURL=track.controller.js.map