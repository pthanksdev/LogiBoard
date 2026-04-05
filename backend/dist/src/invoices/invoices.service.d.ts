import { PrismaService } from '../prisma/prisma.service';
import { ActiveUser } from '../common/types/request-with-user';
export declare class InvoicesService {
    private prisma;
    constructor(prisma: PrismaService);
    generateInvoice(shipmentId: string, user: ActiveUser): Promise<Buffer>;
}
