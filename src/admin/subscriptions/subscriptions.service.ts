import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminSubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getActiveSubscriptions() {
    const activeCount = await this.prisma.user_package_subscriptions.count({
      where: {
        start_date: { lte: new Date() },
        end_date: { gte: new Date() },
      },
    });

    const byPackage = await this.prisma.user_package_subscriptions.groupBy({
      by: ['routine_package_id'],
      where: {
        start_date: { lte: new Date() },
        end_date: { gte: new Date() },
      },
      _count: { _all: true },
    });

    return {
      activeSubscriptions: activeCount,
      byPackage: byPackage.map((r) => ({
        routinePackageId: r.routine_package_id,
        activeSubscriptions: r._count._all,
      })),
      activeDefinition:
        'Active = start_date <= today AND end_date >= today (inclusive).',
    };
  }

  async getPackages() {
    const packages = await this.prisma.routine_packages.findMany({
      include: {
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
      orderBy: {
        price: 'asc',
      },
    });

    return packages.map((pkg) => ({
      id: pkg.id,
      packageName: pkg.package_name,
      description: pkg.description,
      highlights: pkg.highlights,
      durationDays: pkg.duration_days,
      price: pkg.price,
      totalScanLimit: pkg.total_scan_limit,
      allowTracking: pkg.allow_tracking,
      subscriberCount: pkg._count.subscriptions,
    }));
  }

  async getPackageDetail(id: string) {
    const pkg = await this.prisma.routine_packages.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
    });

    if (!pkg) {
      throw new NotFoundException('Subscription package not found');
    }

    return {
      id: pkg.id,
      packageName: pkg.package_name,
      description: pkg.description,
      highlights: pkg.highlights,
      durationDays: pkg.duration_days,
      price: pkg.price,
      totalScanLimit: pkg.total_scan_limit, // ✅ FIX
      allowTracking: pkg.allow_tracking,
      subscriberCount: pkg._count.subscriptions,
    };
  }

  async createPackage(data: {
    packageName: string;
    description: string;
    highlights: any;
    durationDays: number;
    price: number;
    weeklyScanLimit: number;
    allowTracking: boolean;
  }) {
    if (![7, 30, 90].includes(data.durationDays)) {
      throw new BadRequestException('durationDays must be 7, 30, or 90 days');
    }

    return this.prisma.routine_packages.create({
      data: {
        package_name: data.packageName,
        description: data.description,
        highlights: data.highlights,
        duration_days: data.durationDays,
        price: data.price,
        total_scan_limit: data.weeklyScanLimit, // ✅ FIX
        allow_tracking: data.allowTracking,
      },
    });
  }

  async updatePackage(
    id: string,
    data: {
      packageName?: string;
      description?: string;
      highlights?: any;
      durationDays?: number;
      price?: number;
      weeklyScanLimit?: number;
      allowTracking?: boolean;
    },
  ) {
    const existing = await this.prisma.routine_packages.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Subscription package not found');
    }

    if (data.durationDays && ![7, 30, 90].includes(data.durationDays)) {
      throw new BadRequestException('durationDays must be 7, 30, or 90 days');
    }

    return this.prisma.routine_packages.update({
      where: { id },
      data: {
        package_name: data.packageName,
        description: data.description,
        highlights: data.highlights,
        duration_days: data.durationDays,
        price: data.price,
        total_scan_limit: data.weeklyScanLimit, // ✅ FIX
        allow_tracking: data.allowTracking,
      },
    });
  }

  async deletePackage(id: string) {
    const existing = await this.prisma.routine_packages.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Subscription package not found');
    }

    return this.prisma.routine_packages.delete({
      where: { id },
    });
  }
}
