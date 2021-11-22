import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { AppService } from './app.service';
import { config } from '../../config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*^((?!api).)*$')
  getFront(@Res() res) {
    res.sendFile(join(config.staticPath, 'index.html'));
  }
}
