import { ShipmentStatus } from '@prisma/client';

export class CreateShipmentDto {
  companyId?: string;
  trackingId: string;
  origin: string;
  originLat: number;
  originLng: number;
  destination: string;
  destinationLat: number;
  destinationLng: number;
  status: ShipmentStatus;
  expectedDelivery: string | Date;
  driverId?: string;
}
