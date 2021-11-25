import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignInResponse } from '@modules/auth/dtos/responses';
import { SignInRequest } from '@modules/auth/dtos/requests';
import { LocalAuthGuard } from '@modules/auth/guards/local.guard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  public async signIn(
    @Req() req: Request,
    @Body() body: SignInRequest,
  ): Promise<SignInResponse> {
    const user = req.user as User;
    const result = await this.authService.signIn(user);

    return new SignInResponse({
      accessToken: result.accessToken,
      user: user,
    });
  }
}
