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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ShipmentsService = class ShipmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createShipmentDto, user) {
        if (user.role === 'DISPATCHER') {
            throw new common_1.ForbiddenException('Dispatchers cannot create shipments');
        }
        return this.prisma.shipment.create({
            data: {
                ...createShipmentDto,
                companyId: user.companyId,
                expectedDelivery: new Date(createShipmentDto.expectedDelivery),
            },
        });
    }
    async findAll(user) {
        if (user.role === 'SUPER_ADMIN') {
            return this.prisma.shipment.findMany({
                orderBy: { createdAt: 'desc' },
                include: { driver: true },
            });
        }
        return this.prisma.shipment.findMany({
            where: { companyId: user.companyId },
            orderBy: { createdAt: 'desc' },
            include: { driver: true },
        });
    }
    async findOne(id, user) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id },
        });
        if (!shipment)
            throw new common_1.NotFoundException();
        if (user.role !== 'SUPER_ADMIN' && shipment.companyId !== user.companyId) {
            throw new common_1.ForbiddenException();
        }
        return shipment;
    }
    async update(id, updateShipmentDto, user) {
        const shipment = await this.findOne(id, user);
        if (user.role === 'DISPATCHER') {
            throw new common_1.ForbiddenException('Dispatchers cannot update shipments');
        }
        const data = { ...updateShipmentDto };
        if (updateShipmentDto.expectedDelivery) {
            data.expectedDelivery = new Date(updateShipmentDto.expectedDelivery);
        }
        return this.prisma.shipment.update({
            where: { id: shipment.id },
            data,
        });
    }
    async remove(id, user) {
        const shipment = await this.findOne(id, user);
        if (user.role === 'DISPATCHER') {
            throw new common_1.ForbiddenException('Dispatchers cannot delete shipments');
        }
        return this.prisma.shipment.delete({ where: { id: shipment.id } });
    }
};
exports.ShipmentsService = ShipmentsService;
exports.ShipmentsService = ShipmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShipmentsService);
//# sourceMappingURL=shipments.service.js.map