import { User } from '@prisma/client';

type PublicUser = Omit<User, 'password'>;

export interface SignInResponseInit {
  accessToken: string;
  user: User;
}

export class SignInResponse {
  public accessToken: string;
  public user: PublicUser;

  constructor({ accessToken, user }: SignInResponseInit) {
    this.accessToken = accessToken;
    const userCopy = user;
    delete userCopy.password;
    this.user = userCopy;
  }
}
