import { PaginatedRequest } from '@common/dtos/requests/paginated.dto';
import { mapObject } from '@common/utilities';
import { Mapped } from '@common/types';

export interface PaginatedResponseInit extends Mapped<PaginatedRequest> {
  count: number;
}

export class PaginatedResponse {
  public limit: number;
  public offset: number;
  public count: number;

  constructor(init: PaginatedResponseInit) {
    mapObject(init, this);
  }
}
