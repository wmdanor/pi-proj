import { UserResponse } from '@modules/users/dtos/responses/user.dto';
import { User } from '@prisma/client';

export class CreateRecorderResponse {
  data: UserResponse;

  constructor(data: User) {
    this.data = new UserResponse(data);
  }
}
