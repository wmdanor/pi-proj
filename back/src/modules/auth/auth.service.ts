import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtUserPayload } from '@modules/auth/models';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isActive) {
        throw new UnauthorizedException('User is deactivated');
      }

      return user;
    }

    return null;
  }

  public async signIn(user: User) {
    const { id, email, role } = user;
    const payload: JwtUserPayload = {
      id,
      email,
      role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
