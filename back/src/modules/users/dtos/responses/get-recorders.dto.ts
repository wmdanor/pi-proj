import { PaginatedResponse } from '@common/dtos/responses';
import { PaginatedRequest } from '@common/dtos/requests';
import { User } from '@prisma/client';
import { UserResponse } from '@modules/users/dtos/responses';
import { Mapped } from '@common/types';

export interface GetRecordersResponseInit extends Mapped<PaginatedRequest> {
  count: number;
  data: User[];
}

export class GetRecordersResponse extends PaginatedResponse {
  public data: UserResponse[];

  constructor(init: GetRecordersResponseInit) {
    const { data, ...other } = init;

    super(other);

    this.data = data.map((item) => new UserResponse(item));
  }
}
