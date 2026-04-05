import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { PrismaService } from '../prisma/prisma.service';
import { ActiveUser } from '../common/types/request-with-user';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async generateInvoice(shipmentId: string, user: ActiveUser): Promise<Buffer> {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id: shipmentId },
      include: { company: true },
    });

    if (!shipment) throw new Error('Shipment not found');

    if (user.role !== 'SUPER_ADMIN' && shipment.companyId !== user.companyId) {
      throw new Error('Unauthorized access to invoice');
    }

    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Header
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

      // Bill To
      doc
        .fillColor('#000000')
        .fontSize(14)
        .text('Shipment Details', { underline: true });
      doc.fontSize(10).text(`Tracking ID: ${shipment.trackingId}`);
      doc.text(`Origin: ${shipment.origin}`);
      doc.text(`Destination: ${shipment.destination}`);
      doc.text(`Status: ${shipment.status}`);
      doc.moveDown();

      // Table Header
      const tableTop = 250;
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Description', 50, tableTop);
      doc.text('Quantity', 250, tableTop);
      doc.text('Rate', 350, tableTop);
      doc.text('Total', 450, tableTop);
      doc.font('Helvetica');

      // Table Row
      const rowY = 270;
      doc.text('Standard Logistics Service', 50, rowY);
      doc.text('1', 250, rowY);
      doc.text(
        shipment.cost.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
        350,
        rowY,
      );
      doc.text(
        shipment.cost.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
        450,
        rowY,
      );

      // Footer
      doc.fontSize(10).text('Thank you for choosing LogiBoard.', 50, 700, {
        align: 'center',
        width: 500,
      });

      doc.end();
    });
  }
}
