import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Response } from 'express';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithUser } from '../common/types/request-with-user';

@ApiTags('Invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shipments')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get(':id/invoice')
  async downloadInvoice(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: RequestWithUser,
  ) {
    const buffer = await this.invoicesService.generateInvoice(id, req.user);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${id}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
