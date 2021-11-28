import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtUserPayload, JwtUserPayloadInit } from '@modules/auth/models';
import { jwtSecret } from '@config/index';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
          return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        }
      },
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtUserPayloadInit): Promise<JwtUserPayload> {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return new JwtUserPayload(payload);
  }
}
