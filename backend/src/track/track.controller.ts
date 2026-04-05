import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('track')
export class TrackController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':trackingId')
  async getTrackingData(@Param('trackingId') trackingId: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { trackingId },
      include: {
        company: true,
      },
    });

    if (!shipment) {
      throw new NotFoundException('Shipment not found');
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
}
