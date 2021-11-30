import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
