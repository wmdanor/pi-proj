import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ipr')
export class IprController {
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  public createIpr(@Body() body: any) {
    return body;
  }
}
