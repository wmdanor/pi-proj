import { Module } from '@nestjs/common';
import { IprController } from './ipr.controller';
import { IprService } from './ipr.service';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [IprController],
  providers: [IprService],
})
export class IprModule {}
