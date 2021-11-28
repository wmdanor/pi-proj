import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { UsersController } from '@modules/users/users.controller';
import { UsersService } from '@modules/users/users.service';

@Module({
  imports: [CommonModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
