import { PaginatedResponse } from '@common/dtos/responses';
import { Mapped } from '@common/types';
import { PaginatedRequest } from '@common/dtos/requests';
import { IprUpdatesLog } from '@prisma/client';
import { IprLogResponse } from '@modules/logs-m/dtos/responses';

export interface GetIprLogsResponseInit extends Mapped<PaginatedRequest> {
  data: IprUpdatesLog[];
}

export class GetIprLogsResponse extends PaginatedResponse {
  data: IprLogResponse[];

  constructor(init: GetIprLogsResponseInit) {
    const { data, ...other } = init;

    super(other);

    this.data = data.map((item) => new IprLogResponse(item));
  }
}
