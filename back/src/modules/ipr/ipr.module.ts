import { Module } from '@nestjs/common';
import { IprController } from './ipr.controller';

@Module({
  controllers: [IprController],
})
export class IprModule {}
