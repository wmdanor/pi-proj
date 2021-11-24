import { UnauthorizedException } from '@nestjs/common';

export interface JwtUserPayloadInit {
  userId: number;
  email: string;
}

export class JwtUserPayload {
  public id: number;
  public email: string;

  constructor(payload: JwtUserPayloadInit) {
    const { userId, email } = payload;

    if (!(userId && email)) {
      throw new UnauthorizedException('Invalid token');
    }

    this.id = userId;
    this.email = email;
  }
}
