import { IprResponse } from '@modules/ipr/dtos/responses/ipr.dto';
import { Mapped } from '@common/types';
import { Ipr } from '@prisma/client';
import { PaginatedResponse } from '@common/dtos/responses';
import { PaginatedRequest } from '@common/dtos/requests';

export interface GetIprsResponseInit extends Mapped<PaginatedRequest> {
  data: Ipr[];
}

export class GetIprsResponse extends PaginatedResponse {
  public data: IprResponse[];

  constructor(init: GetIprsResponseInit) {
    const { data, ...other } = init;

    super(other);

    this.data = data.map((item) => new IprResponse(item));
  }
}
