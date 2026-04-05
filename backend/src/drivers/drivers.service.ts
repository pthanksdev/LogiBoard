import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActiveUser } from '../common/types/request-with-user';

import { DriverStatus } from '@prisma/client';

@Injectable()
export class DriversService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user: ActiveUser,
    data: {
      userId: string;
      contact: string;
      status?: DriverStatus;
      vehicleId?: string;
    },
  ) {
    if (user.role === 'DISPATCHER') {
      throw new ForbiddenException('Dispatchers cannot create drivers');
    }
    return this.prisma.driver.create({
      data: {
        ...data,
        companyId: user.companyId as string,
      },
    });
  }

  async findAll(user: ActiveUser) {
    if (user.role === 'SUPER_ADMIN') {
      return this.prisma.driver.findMany({
        include: { user: true, vehicle: true },
      });
    }
    return this.prisma.driver.findMany({
      where: { companyId: user.companyId as string },
      include: { user: true, vehicle: true },
    });
  }

  async findOne(id: string, user: ActiveUser) {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: { user: true, vehicle: true },
    });

    if (!driver) throw new NotFoundException();

    if (user.role !== 'SUPER_ADMIN' && driver.companyId !== user.companyId) {
      throw new ForbiddenException();
    }

    return driver;
  }

  async update(
    id: string,
    user: ActiveUser,
    data: Partial<{ contact: string; status: DriverStatus; vehicleId: string }>,
  ) {
    const driver = await this.findOne(id, user);

    if (user.role === 'DISPATCHER') {
      throw new ForbiddenException('Dispatchers cannot update drivers');
    }

    return this.prisma.driver.update({
      where: { id: driver.id },
      data,
    });
  }

  async remove(id: string, user: ActiveUser) {
    const driver = await this.findOne(id, user);

    if (user.role === 'DISPATCHER') {
      throw new ForbiddenException('Dispatchers cannot delete drivers');
    }

    return this.prisma.driver.delete({ where: { id: driver.id } });
  }
}
