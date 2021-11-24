import { UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export interface JwtUserPayloadInit {
  id: string;
  email: string;
  role: UserRole;
}

export class JwtUserPayload {
  public id: string;
  public email: string;
  public role: UserRole;

  constructor(payload: JwtUserPayloadInit) {
    const { id, email, role } = payload;

    if (!(id && email && role)) {
      throw new UnauthorizedException('Invalid token');
    }

    this.id = id;
    this.email = email;
    this.role = role;
  }
}
