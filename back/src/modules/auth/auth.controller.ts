import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignInResponse } from '@modules/auth/dtos/responses';
import { SignInRequest } from '@modules/auth/dtos/requests';
import { LocalAuthGuard } from '@modules/auth/guards';
import { User } from '@prisma/client';
import { Public } from '@modules/auth/decorators';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignInRequest })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  public async signIn(@Req() req: Request): Promise<SignInResponse> {
    const user = req.user as User;
    const result = await this.authService.signIn(user);

    return new SignInResponse({
      accessToken: result.accessToken,
      user: user,
    });
  }
}
