import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services/prisma.service';
import { Ipr } from '@prisma/client';

@Injectable()
export class IprService {
  constructor(private readonly prisma: PrismaService) {}

  public async getIpr(): Promise<Ipr[]> {
    this.prisma.ipr.count();

    return this.prisma.ipr.findMany({
      take: 10,
      skip: 0,
      where: {},
    });
  }
}
