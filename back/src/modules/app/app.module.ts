import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from '../test/test.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from '../../config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: config.staticPath,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
