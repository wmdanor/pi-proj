import { Module } from '@nestjs/common';
import { IprModule } from '@modules/ipr/ipr.module';
import { AuthModule } from '@modules/auth';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { JwtAuthGuard, RolesGuard } from '@modules/auth/guards';
import { UsersModule } from '@modules/users';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, './../../../', '.env'),
    }),
    AuthModule,
    IprModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
