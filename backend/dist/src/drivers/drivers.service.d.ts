import { PrismaService } from '../prisma/prisma.service';
import { ActiveUser } from '../common/types/request-with-user';
import { DriverStatus } from '@prisma/client';
export declare class DriversService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: ActiveUser, data: {
        userId: string;
        contact: string;
        status?: DriverStatus;
        vehicleId?: string;
    }): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
        userId: string;
        contact: string;
        vehicleId: string | null;
    }>;
    findAll(user: ActiveUser): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string | null;
            email: string;
            passwordHash: string | null;
            provider: string | null;
            providerId: string | null;
            role: import("@prisma/client").$Enums.Role;
            firstName: string;
            lastName: string;
            avatarUrl: string | null;
            preferences: import("@prisma/client/runtime/client").JsonValue | null;
        };
        vehicle: {
            id: string;
            status: import("@prisma/client").$Enums.VehicleStatus;
            createdAt: Date;
            updatedAt: Date;
            companyId: string | null;
            licensePlate: string;
            type: string;
            capacity: number;
        } | null;
    } & {
        id: string;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
        userId: string;
        contact: string;
        vehicleId: string | null;
    })[]>;
    findOne(id: string, user: ActiveUser): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string | null;
            email: string;
            passwordHash: string | null;
            provider: string | null;
            providerId: string | null;
            role: import("@prisma/client").$Enums.Role;
            firstName: string;
            lastName: string;
            avatarUrl: string | null;
            preferences: import("@prisma/client/runtime/client").JsonValue | null;
        };
        vehicle: {
            id: string;
            status: import("@prisma/client").$Enums.VehicleStatus;
            createdAt: Date;
            updatedAt: Date;
            companyId: string | null;
            licensePlate: string;
            type: string;
            capacity: number;
        } | null;
    } & {
        id: string;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
        userId: string;
        contact: string;
        vehicleId: string | null;
    }>;
    update(id: string, user: ActiveUser, data: Partial<{
        contact: string;
        status: DriverStatus;
        vehicleId: string;
    }>): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
        userId: string;
        contact: string;
        vehicleId: string | null;
    }>;
    remove(id: string, user: ActiveUser): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.DriverStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string | null;
        userId: string;
        contact: string;
        vehicleId: string | null;
    }>;
}
