import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { jwtSecret } from '@config/index';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from '@modules/auth/strategies';
import { UsersModule } from '@modules/users';
import { AuthService } from '@modules/auth/auth.service';
import { AuthController } from '@modules/auth/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '86400s' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
