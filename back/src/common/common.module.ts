import { Module } from '@nestjs/common';
import { PrismaService } from '@common/services';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
