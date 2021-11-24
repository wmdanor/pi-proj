import { PaginatedResponse } from '@common/dtos/responses';
import { PaginatedRequest } from '@common/dtos/requests';
import { Ipr } from '@prisma/client';
import { IprResponse } from '@modules/ipr/dtos/responses/ipr.dto';

export interface GetIprResponseInit {
  paginatedRequest: PaginatedRequest;
  count: number;
  ipr: Ipr[];
}

export class GetIprResponse extends PaginatedResponse {
  public data: IprResponse[];

  constructor({ paginatedRequest, count, ipr }: GetIprResponseInit) {
    super({ paginatedRequest, count });

    this.data = ipr.map((ipr) => new IprResponse(ipr));
  }
}
