import { User } from '@prisma/client';
import { UserResponse } from '@modules/users/dtos/responses';

export interface SignInResponseInit {
  accessToken: string;
  user: User;
}

export class SignInResponse {
  public accessToken: string;
  public user: UserResponse;

  constructor({ accessToken, user }: SignInResponseInit) {
    this.accessToken = accessToken;
    this.user = new UserResponse(user);
  }
}
