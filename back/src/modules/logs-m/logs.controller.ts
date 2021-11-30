import { Controller, Get, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetIprLogsRequest } from '@modules/logs-m/dtos/requests';
import { GetIprLogsResponse } from '@modules/logs-m/dtos/responses';

@ApiTags('Logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @ApiBearerAuth()
  @Get('ipr')
  public async getIprLogs(
    @Query() query: GetIprLogsRequest,
  ): Promise<GetIprLogsResponse> {
    const data = await this.logsService.getIprLogs(query);

    return new GetIprLogsResponse({ ...query, data });
  }
}
