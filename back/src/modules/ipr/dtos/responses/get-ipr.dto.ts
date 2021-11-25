import { PaginatedResponse } from '@common/dtos/responses';
import { PaginatedRequest } from '@common/dtos/requests';
import { Ipr } from '@prisma/client';

export interface GetIprResponseInit {
  paginatedRequest: PaginatedRequest;
  count: number;
  ipr: Ipr[];
}

export class GetIprResponse extends PaginatedResponse {
  // public data: IprResponse[];
  public data: Ipr[];

  constructor({ paginatedRequest, count, ipr }: GetIprResponseInit) {
    super({ paginatedRequest, count });

    // this.data = ipr.map((ipr) => new IprResponse(ipr));
    this.data = ipr;
  }
}
