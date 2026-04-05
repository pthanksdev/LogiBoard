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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
const prisma_service_1 = require("../prisma/prisma.service");
let InvoicesService = class InvoicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateInvoice(shipmentId, user) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id: shipmentId },
            include: { company: true },
        });
        if (!shipment)
            throw new Error('Shipment not found');
        if (user.role !== 'SUPER_ADMIN' && shipment.companyId !== user.companyId) {
            throw new Error('Unauthorized access to invoice');
        }
        return new Promise((resolve) => {
            const doc = new pdfkit_1.default({ margin: 50 });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc
                .fillColor('#2563eb')
                .fontSize(25)
                .text('LogiBoard Invoice', { align: 'right' });
            doc
                .fillColor('#444444')
                .fontSize(10)
                .text(shipment.company?.name || 'LogiBoard Logistics', {
                align: 'right',
            });
            doc.moveDown();
            doc
                .fillColor('#000000')
                .fontSize(14)
                .text('Shipment Details', { underline: true });
            doc.fontSize(10).text(`Tracking ID: ${shipment.trackingId}`);
            doc.text(`Origin: ${shipment.origin}`);
            doc.text(`Destination: ${shipment.destination}`);
            doc.text(`Status: ${shipment.status}`);
            doc.moveDown();
            const tableTop = 250;
            doc.fontSize(10).font('Helvetica-Bold');
            doc.text('Description', 50, tableTop);
            doc.text('Quantity', 250, tableTop);
            doc.text('Rate', 350, tableTop);
            doc.text('Total', 450, tableTop);
            doc.font('Helvetica');
            const rowY = 270;
            doc.text('Standard Logistics Service', 50, rowY);
            doc.text('1', 250, rowY);
            doc.text(shipment.cost.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }), 350, rowY);
            doc.text(shipment.cost.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }), 450, rowY);
            doc.fontSize(10).text('Thank you for choosing LogiBoard.', 50, 700, {
                align: 'center',
                width: 500,
            });
            doc.end();
        });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map