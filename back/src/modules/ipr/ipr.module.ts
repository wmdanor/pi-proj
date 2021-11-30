import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { IprController } from '@modules/ipr/ipr.controller';
import { IprService } from '@modules/ipr/ipr.service';
import { PreloadIprMiddleware } from '@modules/users/middlewares/preload-ipr.middleware';

@Module({
  imports: [CommonModule],
  controllers: [IprController],
  providers: [IprService],
})
export class IprModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreloadIprMiddleware).forRoutes(
      {
        path: 'ipr',
        method: RequestMethod.GET,
      },
      {
        path: 'ipr',
        method: RequestMethod.PUT,
      },
    );
  }
}
