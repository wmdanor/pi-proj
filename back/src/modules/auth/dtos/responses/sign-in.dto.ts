export class SignInResponse {
  accessToken: string;

  constructor(init: Partial<SignInResponse>) {
    this.accessToken = init.accessToken;
  }
}
