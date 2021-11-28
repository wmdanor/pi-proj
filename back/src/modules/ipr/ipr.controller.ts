import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetIprRequest } from '@modules/ipr/dtos/requests';
import { GetIprResponse } from '@modules/ipr/dtos/responses';
import { Public } from '@modules/auth/decorators';
import { IprService } from '@modules/ipr/ipr.service';

@ApiTags('Ipr')
@Controller('ipr')
export class IprController {
  constructor(private readonly iprService: IprService) {}

  @ApiBearerAuth()
  @Post()
  public async createIpr(@Body() body: any) {
    return body;
  }

  @Public()
  @Get()
  public async getIprs(@Query() query: GetIprRequest): Promise<unknown> {
    const ipr = await this.iprService.getIprs();

    return new GetIprResponse({
      paginatedRequest: query,
      count: 10,
      ipr,
    });
  }

  @Public()
  @Get(':id')
  public async getIpr(@Param('id') id: string): Promise<unknown> {
    const ipr = await this.iprService.getIpr(id);
    if (ipr === null) {
      throw new NotFoundException();
    }

    return {
      data: ipr,
    };
  }
}
