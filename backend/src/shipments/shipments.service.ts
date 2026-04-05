import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ActiveUser } from '../common/types/request-with-user';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShipmentDto: CreateShipmentDto, user: ActiveUser) {
    if (user.role === 'DISPATCHER') {
      throw new ForbiddenException('Dispatchers cannot create shipments');
    }
    return this.prisma.shipment.create({
      data: {
        ...createShipmentDto,
        companyId: user.companyId,
        expectedDelivery: new Date(createShipmentDto.expectedDelivery),
      },
    });
  }

  async findAll(user: ActiveUser) {
    if (user.role === 'SUPER_ADMIN') {
      return this.prisma.shipment.findMany({
        orderBy: { createdAt: 'desc' },
        include: { driver: true },
      });
    }
    return this.prisma.shipment.findMany({
      where: { companyId: user.companyId },
      orderBy: { createdAt: 'desc' },
      include: { driver: true },
    });
  }

  async findOne(id: string, user: ActiveUser) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
    });

    if (!shipment) throw new NotFoundException();

    if (user.role !== 'SUPER_ADMIN' && shipment.companyId !== user.companyId) {
      throw new ForbiddenException();
    }

    return shipment;
  }

  async update(
    id: string,
    updateShipmentDto: UpdateShipmentDto,
    user: ActiveUser,
  ) {
    const shipment = await this.findOne(id, user);

    if (user.role === 'DISPATCHER') {
      throw new ForbiddenException('Dispatchers cannot update shipments');
    }

    const data: Record<string, any> = { ...updateShipmentDto };
    if (updateShipmentDto.expectedDelivery) {
      data.expectedDelivery = new Date(
        updateShipmentDto.expectedDelivery as string,
      );
    }
    return this.prisma.shipment.update({
      where: { id: shipment.id },
      data,
    });
  }

  async remove(id: string, user: ActiveUser) {
    const shipment = await this.findOne(id, user);

    if (user.role === 'DISPATCHER') {
      throw new ForbiddenException('Dispatchers cannot delete shipments');
    }

    return this.prisma.shipment.delete({ where: { id: shipment.id } });
  }
}
