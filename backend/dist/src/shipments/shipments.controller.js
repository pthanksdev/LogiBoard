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
exports.ShipmentsController = void 0;
const common_1 = require("@nestjs/common");
const shipments_service_1 = require("./shipments.service");
const create_shipment_dto_1 = require("./dto/create-shipment.dto");
const update_shipment_dto_1 = require("./dto/update-shipment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const request_with_user_1 = require("../common/types/request-with-user");
let ShipmentsController = class ShipmentsController {
    shipmentsService;
    constructor(shipmentsService) {
        this.shipmentsService = shipmentsService;
    }
    create(createShipmentDto, req) {
        return this.shipmentsService.create(createShipmentDto, req.user);
    }
    findAll(req) {
        return this.shipmentsService.findAll(req.user);
    }
    findOne(id, req) {
        return this.shipmentsService.findOne(id, req.user);
    }
    update(id, updateShipmentDto, req) {
        return this.shipmentsService.update(id, updateShipmentDto, req.user);
    }
    remove(id, req) {
        return this.shipmentsService.remove(id, req.user);
    }
};
exports.ShipmentsController = ShipmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_dto_1.CreateShipmentDto,
        request_with_user_1.RequestWithUser]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_with_user_1.RequestWithUser]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, request_with_user_1.RequestWithUser]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_dto_1.UpdateShipmentDto,
        request_with_user_1.RequestWithUser]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, request_with_user_1.RequestWithUser]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "remove", null);
exports.ShipmentsController = ShipmentsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('shipments'),
    __metadata("design:paramtypes", [shipments_service_1.ShipmentsService])
], ShipmentsController);
//# sourceMappingURL=shipments.controller.js.map