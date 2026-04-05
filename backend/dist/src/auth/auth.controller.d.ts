import { AuthService } from './auth.service';
import { CloudinaryService } from '../common/cloudinary.service';
export declare class AuthController {
    private readonly authService;
    private readonly cloudinaryService;
    constructor(authService: AuthService, cloudinaryService: CloudinaryService);
    login(body: {
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
    register(body: {
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
    oauthLogin(body: {
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
    getProfile(req: {
        user: {
            userId: string;
            email: string;
            companyId: string | null;
            role: string;
        };
    }): Promise<{
        id: string;
        createdAt: Date;
        companyId: string | null;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
    } | null>;
    uploadAvatar(req: any, file: Express.Multer.File): Promise<{
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
