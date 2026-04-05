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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DriversService = class DriversService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user, data) {
        if (user.role === 'DISPATCHER') {
            throw new common_1.ForbiddenException('Dispatchers cannot create drivers');
        }
        return this.prisma.driver.create({
            data: {
                ...data,
                companyId: user.companyId,
            },
        });
    }
    async findAll(user) {
        if (user.role === 'SUPER_ADMIN') {
            return this.prisma.driver.findMany({
                include: { user: true, vehicle: true },
            });
        }
        return this.prisma.driver.findMany({
            where: { companyId: user.companyId },
            include: { user: true, vehicle: true },
        });
    }
    async findOne(id, user) {
        const driver = await this.prisma.driver.findUnique({
            where: { id },
            include: { user: true, vehicle: true },
        });
        if (!driver)
            throw new common_1.NotFoundException();
        if (user.role !== 'SUPER_ADMIN' && driver.companyId !== user.companyId) {
            throw new common_1.ForbiddenException();
        }
        return driver;
    }
    async update(id, user, data) {
        const driver = await this.findOne(id, user);
        if (user.role === 'DISPATCHER') {
            throw new common_1.ForbiddenException('Dispatchers cannot update drivers');
        }
        return this.prisma.driver.update({
            where: { id: driver.id },
            data,
        });
    }
    async remove(id, user) {
        const driver = await this.findOne(id, user);
        if (user.role === 'DISPATCHER') {
            throw new common_1.ForbiddenException('Dispatchers cannot delete drivers');
        }
        return this.prisma.driver.delete({ where: { id: driver.id } });
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map