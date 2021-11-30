import { PaginatedRequest } from '@common/dtos/requests/paginated.dto';
import { mapObject } from '@common/utilities';

export class PaginatedResponse {
  public limit: number;
  public offset: number;

  constructor(init: PaginatedRequest) {
    mapObject(init, this, {
      include: ['limit', 'offset'],
    });
  }
}
