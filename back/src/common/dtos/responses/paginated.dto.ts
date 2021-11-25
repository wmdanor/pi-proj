import { PaginatedRequest } from '@common/dtos/requests/paginated.dto';

export interface PaginatedResponseInit {
  paginatedRequest: PaginatedRequest;
  count: number;
}

export class PaginatedResponse {
  public limit: number;

  public offset: number;

  public count: number;

  constructor(init?: PaginatedResponseInit) {
    this.limit = init?.paginatedRequest.limit;
    this.offset = init?.paginatedRequest.offset;
    this.count = init?.count;
  }
}
