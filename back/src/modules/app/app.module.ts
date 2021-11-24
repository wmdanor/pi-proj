import { Module } from '@nestjs/common';
import { IprModule } from '@modules/ipr/ipr.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, './../../../', '.env'),
    }),
    AuthModule,
    IprModule,
    UsersModule,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
