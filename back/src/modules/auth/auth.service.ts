import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '@modules/users/users.service';

type User = any;

// type UserNoPassword = {
//   [Property in keyof Users as Exclude<Property, 'password'>]: Users[Property];
// };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // private readonly usersService: UsersService,
  ) {}

  public async validateUser(email: string, password: string): Promise<User> {
    return { email, password, id: 1 };

    // const user = await this.usersService.getUserByEmail(email);
    //
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   return user;
    // }
    //
    // return null;
  }

  public async signIn(user: User) {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
