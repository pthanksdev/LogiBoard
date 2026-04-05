import { AnalyticsService } from './analytics.service';
import { RequestWithUser } from './common/types/request-with-user';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getOverview(req: RequestWithUser): Promise<{
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
}
