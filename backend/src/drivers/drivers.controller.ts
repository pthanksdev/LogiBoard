import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../common/types/request-with-user';
import { DriverStatus } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(
    @Body()
    data: {
      userId: string;
      contact: string;
      status?: DriverStatus;
      vehicleId?: string;
    },
    @Request() req: RequestWithUser,
  ) {
    return this.driversService.create(req.user, data);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.driversService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.driversService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    data: Partial<{ contact: string; status: DriverStatus; vehicleId: string }>,
    @Request() req: RequestWithUser,
  ) {
    return this.driversService.update(id, req.user, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.driversService.remove(id, req.user);
  }
}
