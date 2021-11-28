import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { IprController } from '@modules/ipr/ipr.controller';
import { IprService } from '@modules/ipr/ipr.service';

@Module({
  imports: [CommonModule],
  controllers: [IprController],
  providers: [IprService],
})
export class IprModule {}
