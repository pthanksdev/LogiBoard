import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: {
        email: string;
        id: string;
        companyId: string | null;
        role: string;
    }): {
        access_token: string;
        user: {
            email: string;
            sub: string;
            companyId: string | null;
            role: string;
        };
    };
    register(data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            email: string;
            sub: string;
            companyId: string | null;
            role: string;
        };
    }>;
    validateOAuthUser(data: {
        email: string;
        firstName: string;
        lastName: string;
        provider: string;
        providerId: string;
    }): Promise<{
        access_token: string;
        user: {
            email: string;
            sub: string;
            companyId: string | null;
            role: string;
        };
    }>;
    getUserProfile(id: string): Promise<{
        id: string;
        createdAt: Date;
        companyId: string | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
    } | null>;
    updateAvatar(id: string, avatarUrl: string): Promise<{
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
    }>;
}
