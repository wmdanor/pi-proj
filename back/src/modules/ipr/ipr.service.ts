import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services';
import { Ipr } from '@prisma/client';

@Injectable()
export class IprService {
  constructor(private readonly prisma: PrismaService) {}

  public async getIprs(): Promise<Ipr[]> {
    this.prisma.ipr.count();

    return this.prisma.ipr.findMany({
      // take: 10,
      // skip: 0,
      where: {},
    });
  }

  public async getIpr(id: string): Promise<Ipr> {
    this.prisma.ipr.count();

    return this.prisma.ipr.findUnique({
      where: {
        id,
      },
    });
  }
}
