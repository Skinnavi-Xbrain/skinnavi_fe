import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CombosService {
  constructor(private prisma: PrismaService) {}

  async findRecommendedCombos(comboIds: string[]) {
    return this.prisma.skincare_combos.findMany({
      where: {
        id: { in: comboIds },
        is_active: true,
      },
      include: {
        combo_products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image_url: true,
                display_price: true,
                usage_role: true,
              },
            },
          },
        },
      },
    });
  }
}
