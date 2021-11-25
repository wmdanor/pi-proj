import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetIprRequest } from '@modules/ipr/dtos/requests/get-ipr.dto';
import { GetIprResponse } from '@modules/ipr/dtos/responses/get-ipr.dto';
import { IprService } from '@modules/ipr/ipr.service';
import { Response } from 'express';

@Controller('ipr')
export class IprController {
  constructor(private readonly iprService: IprService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createIpr(@Body() body: any) {
    return body;
  }

  @Get()
  public async getIprs(
    @Query() query: GetIprRequest,
    @Res() res: Response,
  ): Promise<unknown> {
    const ipr = await this.iprService.getIprs();

    console.log(1);
    res.set('Content-Type', 'application/json');
    console.log(2);
    const response = new GetIprResponse({
      paginatedRequest: query,
      count: 10,
      ipr,
    });
    console.log(3);
    const str = JSON.stringify(response, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v,
    );
    console.log(str);
    console.log(JSON.parse(str));
    return JSON.parse(str);
  }

  @Get(':id')
  public async getIpr(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<unknown> {
    const ipr = await this.iprService.getIpr(id);

    res.set('Content-Type', 'application/json');
    const response = {
      data: ipr,
    };
    return JSON.stringify(response, (_, v) =>
      typeof v === 'bigint' ? v.toString() : v,
    );
  }
}
