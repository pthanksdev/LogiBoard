import type { Response } from 'express';
import { InvoicesService } from './invoices.service';
import { RequestWithUser } from '../common/types/request-with-user';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    downloadInvoice(id: string, res: Response, req: RequestWithUser): Promise<void>;
}
