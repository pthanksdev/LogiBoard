import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.passwordHash) {
      const isMatch = await bcrypt.compare(pass, user.passwordHash);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = user;
        return result;
      }
    }
    return null;
  }

  login(user: {
    email: string;
    id: string;
    companyId: string | null;
    role: string;
  }) {
    const payload = {
      email: user.email,
      sub: user.id,
      companyId: user.companyId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const company = await this.prisma.company.create({
      data: { name: `${data.firstName}'s Logistics Co.` },
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        companyId: company.id,
        role: Role.COMPANY_ADMIN,
      },
    });

    return this.login(
      user as {
        email: string;
        id: string;
        companyId: string | null;
        role: string;
      },
    );
  }

  async validateOAuthUser(data: {
    email: string;
    firstName: string;
    lastName: string;
    provider: string;
    providerId: string;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      // Update provider info if not already set
      if (!user.provider) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            provider: data.provider,
            providerId: data.providerId,
          },
        });
      }
      return this.login(
        user as {
          email: string;
          id: string;
          companyId: string | null;
          role: string;
        },
      );
    }

    // Create new user and company
    const company = await this.prisma.company.create({
      data: { name: `${data.firstName}'s Logistics Co.` },
    });

    user = await this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: data.provider,
        providerId: data.providerId,
        companyId: company.id,
        role: Role.COMPANY_ADMIN,
        passwordHash: '', // Empty password for OAuth users
      },
    });

    return this.login(
      user as {
        email: string;
        id: string;
        companyId: string | null;
        role: string;
      },
    );
  }

  async getUserProfile(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        companyId: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async updateAvatar(id: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id },
      data: { avatarUrl },
    });
  }
}
