import { Module } from '@nestjs/common';
import { TestModule } from '../test/test.module';
import { IprModule } from '@modules/ipr/ipr.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, './../../../', '.env'),
    }),
    TestModule,
    AuthModule,
    IprModule,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
