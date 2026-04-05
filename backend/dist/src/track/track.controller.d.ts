import { PrismaService } from '../prisma/prisma.service';
export declare class TrackController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTrackingData(trackingId: string): Promise<{
        trackingId: string;
        origin: string;
        originLat: number;
        originLng: number;
        destination: string;
        destinationLat: number;
        destinationLng: number;
        status: import("@prisma/client").$Enums.ShipmentStatus;
        expectedDelivery: Date;
        actualDelivery: Date | null;
        company: {
            name: string;
        } | null;
    }>;
}
