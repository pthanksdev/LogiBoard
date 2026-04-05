import { PrismaService } from './prisma/prisma.service';
import { ActiveUser } from './common/types/request-with-user';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getOverview(user: ActiveUser): Promise<{
        metrics: {
            title: string;
            value: string;
            change: string;
            positive: boolean;
        }[];
        chart: {
            name: string;
            volume: number;
        }[];
    }>;
    private getChartData;
    getRecentEvents(): Promise<string[]>;
    getGlobalStats(): Promise<{
        companies: number;
        shipments: number;
        drivers: number;
        countries: number;
        onTimeRate: string;
    }>;
}
