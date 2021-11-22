import { Controller, Get } from '@nestjs/common';

@Controller('api/test')
export class TestController {
  @Get()
  public getTest(): unknown {
    return {
      message: 'Test',
    };
  }
}
