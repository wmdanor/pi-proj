import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtUserPayload } from '@modules/auth/models/jwt-user-payload';
import { Request } from 'express';
import { SignInResponse } from '@modules/auth/dtos/responses';
import { SignInRequest } from '@modules/auth/dtos/requests';
import { LocalAuthGuard } from '@modules/auth/guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  public async signIn(
    @Req() req: Request,
    @Body() body: SignInRequest,
  ): Promise<SignInResponse> {
    const result = await this.authService.signIn(req.user as JwtUserPayload);

    return {
      accessToken: result.accessToken,
    };
  }
}
