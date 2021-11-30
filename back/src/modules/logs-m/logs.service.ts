import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/services';
import { IprUpdatesLog } from '@prisma/client';
import { GetIprLogsRequest } from '@modules/logs-m/dtos/requests';

@Injectable()
export class LogsService {
  constructor(private readonly prisma: PrismaService) {}

  public async getIprLogs(query: GetIprLogsRequest): Promise<IprUpdatesLog[]> {
    const { limit, offset } = query;

    return this.prisma.iprUpdatesLog.findMany({
      skip: offset,
      take: limit,
      include: {
        user: true,
      },
    });
  }
}
