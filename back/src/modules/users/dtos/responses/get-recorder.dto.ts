import { UserResponse } from '@modules/users/dtos/responses/user.dto';
import { User } from '@prisma/client';

export class GetRecorderResponse {
  data: UserResponse;

  constructor(data: User) {
    this.data = new UserResponse(data);
  }
}
