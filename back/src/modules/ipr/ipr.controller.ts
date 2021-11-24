import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetIprRequest } from '@modules/ipr/dtos/requests/get-ipr.dto';
import { GetIprResponse } from '@modules/ipr/dtos/responses/get-ipr.dto';
import { IprService } from '@modules/ipr/ipr.service';

@Controller('ipr')
export class IprController {
  constructor(private readonly iprService: IprService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createIpr(@Body() body: any) {
    return body;
  }

  public async getIpr(@Query() query: GetIprRequest): Promise<GetIprResponse> {
    const ipr = await this.iprService.getIpr();

    return new GetIprResponse({
      paginatedRequest: query,
      count: 10,
      ipr,
    });
  }
}
