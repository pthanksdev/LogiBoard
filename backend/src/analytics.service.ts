import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ActiveUser } from './common/types/request-with-user';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview(user: ActiveUser) {
    const companyFilter =
      user.role === 'SUPER_ADMIN' ? {} : { companyId: user.companyId };

    const now = new Date();
    const firstDayPrevMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );
    const lastDayPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      totalShipments,
      activeDrivers,
      deliveredShipments,
      prevMonthShipments,
      prevMonthDelivered,
      prevMonthDrivers,
      revenueDataCurrentMonth,
      revenueDataPrevMonth,
    ] = await Promise.all([
      this.prisma.shipment.count({ where: companyFilter }),
      this.prisma.driver.count({
        where: { ...companyFilter, status: 'ON_ROUTE' },
      }),
      this.prisma.shipment.count({
        where: { ...companyFilter, status: 'DELIVERED' },
      }),
      this.prisma.shipment.count({
        where: {
          ...companyFilter,
          createdAt: { gte: firstDayPrevMonth, lte: lastDayPrevMonth },
        },
      }),
      this.prisma.shipment.count({
        where: {
          ...companyFilter,
          status: 'DELIVERED',
          createdAt: { gte: firstDayPrevMonth, lte: lastDayPrevMonth },
        },
      }),
      this.prisma.driver.count({
        where: {
          ...companyFilter,
          createdAt: { gte: firstDayPrevMonth, lte: lastDayPrevMonth },
        },
      }),
      this.prisma.shipment.aggregate({
        where: {
          ...companyFilter,
          status: 'DELIVERED',
          updatedAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) },
        },
        _sum: { cost: true },
      }),
      this.prisma.shipment.aggregate({
        where: {
          ...companyFilter,
          status: 'DELIVERED',
          updatedAt: { gte: firstDayPrevMonth, lte: lastDayPrevMonth },
        },
        _sum: { cost: true },
      }),
    ]);

    const onTimeRate =
      totalShipments > 0
        ? ((deliveredShipments / totalShipments) * 100).toFixed(1)
        : '100';
    const prevOnTimeRate =
      prevMonthShipments > 0
        ? (prevMonthDelivered / prevMonthShipments) * 100
        : 100;

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? '+100%' : '0%';
      const change = ((current - previous) / previous) * 100;
      return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
    };

    const currentRevenue = revenueDataCurrentMonth._sum.cost || 0;
    const prevRevenue = revenueDataPrevMonth._sum.cost || 0;

    const revenue = currentRevenue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return {
      metrics: [
        {
          title: 'Total Shipments',
          value: totalShipments.toLocaleString(),
          change: calculateChange(totalShipments, prevMonthShipments),
          positive: totalShipments >= prevMonthShipments,
        },
        {
          title: 'Active Drivers',
          value: activeDrivers.toString(),
          change: calculateChange(activeDrivers, prevMonthDrivers),
          positive: activeDrivers >= prevMonthDrivers,
        },
        {
          title: 'On-Time Rate',
          value: `${onTimeRate}%`,
          change: calculateChange(Number(onTimeRate), prevOnTimeRate),
          positive: Number(onTimeRate) >= prevOnTimeRate,
        },
        {
          title: 'Revenue',
          value: revenue,
          change: calculateChange(currentRevenue, prevRevenue),
          positive: currentRevenue >= prevRevenue,
        },
      ],
      chart: await this.getChartData(companyFilter),
    };
  }

  private async getChartData(
    filter: import('@prisma/client').Prisma.ShipmentWhereInput,
  ) {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    const chartData = await Promise.all(
      last7Days.map(async (date) => {
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        const count = await this.prisma.shipment.count({
          where: {
            ...filter,
            createdAt: { gte: startOfDay, lte: endOfDay },
          },
        });
        return {
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          volume: count,
        };
      }),
    );

    return chartData;
  }
  async getRecentEvents() {
    const shipments = await this.prisma.shipment.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
    });

    return shipments.map((s) => {
      const trackingIdShort = s.trackingId.slice(0, 6);
      switch (s.status) {
        case 'IN_TRANSIT':
          return `Shipment #${trackingIdShort} is currently in transit between ${s.origin} and ${s.destination}.`;
        case 'DELIVERED':
          return `Shipment #${trackingIdShort} was successfully delivered to ${s.destination}.`;
        case 'DELAYED':
          return `Shipment #${trackingIdShort} is experiencing delays on its route to ${s.destination}.`;
        default:
          return `Shipment #${trackingIdShort} status updated to ${s.status.replace('_', ' ')}.`;
      }
    });
  }

  async getGlobalStats() {
    const [totalCompanies, totalShipments, totalDrivers] = await Promise.all([
      this.prisma.company.count(),
      this.prisma.shipment.count(),
      this.prisma.driver.count(),
    ]);

    return {
      companies: totalCompanies,
      shipments: totalShipments,
      drivers: totalDrivers,
      countries: 5,
      onTimeRate: '98.5%',
    };
  }
}
