import { ShipmentStatus } from '@prisma/client';
export declare class CreateShipmentDto {
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
