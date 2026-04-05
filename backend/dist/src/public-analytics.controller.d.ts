import { AnalyticsService } from './analytics.service';
export declare class PublicAnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getGlobalStats(): Promise<{
        companies: number;
        shipments: number;
        drivers: number;
        countries: number;
        onTimeRate: string;
    }>;
    getRecentEvents(): Promise<string[]>;
}
