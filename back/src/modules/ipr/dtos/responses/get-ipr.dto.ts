import { PaginatedResponse } from '@common/dtos/responses';
import { PaginatedRequest } from '@common/dtos/requests';
import { Ipr } from '@prisma/client';

export interface GetIprResponseInit {
  paginatedRequest: PaginatedRequest;
  ipr: Ipr[];
}

export class GetIprResponse extends PaginatedResponse {
  // public data: IprResponse[];
  public data: Ipr[];

  constructor({ paginatedRequest, ipr }: GetIprResponseInit) {
    super({ ...paginatedRequest });

    // this.data = ipr.map((ipr) => new IprResponse(ipr));
    this.data = ipr;
  }
}
