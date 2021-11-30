import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CountIprsRequest,
  CreateIprRequest,
  GetIprsRequest,
  UpdateIprRequest,
} from '@modules/ipr/dtos/requests';
import {
  CountIprsResponse,
  CreateIprResponse,
  GetIprObjectTypesResponse,
  GetIprResponse,
  GetIprsResponse,
  UpdateIprResponse,
} from '@modules/ipr/dtos/responses';
import { Public, Roles } from '@modules/auth/decorators';
import { IprService } from '@modules/ipr/ipr.service';
import { UuidParamRequest } from '@common/dtos/requests';
import { Request } from 'express';
import { User, UserRole } from '@prisma/client';

@ApiTags('Ipr')
@Controller('ipr')
export class IprController {
  constructor(private readonly iprService: IprService) {}

  @Public()
  @Get('filter')
  public async getIprs(
    @Query() query: GetIprsRequest,
  ): Promise<GetIprsResponse> {
    const data = await this.iprService.getIprs(query);

    return new GetIprsResponse({ data, ...query });
  }

  @Public()
  @Get('count')
  public async countIprs(
    @Query() query: CountIprsRequest,
  ): Promise<CountIprsResponse> {
    const count = await this.iprService.countIprs(query);

    return new CountIprsResponse(count);
  }

  @Public()
  @Get('object-types')
  public async getIprFilters(): Promise<GetIprObjectTypesResponse> {
    const data = await this.iprService.getIprObjectTypes();

    return new GetIprObjectTypesResponse({ data });
  }

  @ApiBearerAuth()
  @Roles(UserRole.Administrator, UserRole.Recorder)
  @Post()
  public async createIpr(
    @Body() body: CreateIprRequest,
    @Req() req: Request,
  ): Promise<CreateIprResponse> {
    const data = await this.iprService.createIpr(body, (req.user as User).id);

    return new CreateIprResponse(data);
  }

  @Public()
  @Get(':id')
  public async getIpr(
    @Param() { id }: UuidParamRequest,
  ): Promise<GetIprResponse> {
    const data = await this.iprService.getIpr(id);
    if (!data) {
      throw new NotFoundException();
    }

    return new GetIprResponse(data);
  }

  @Put(':id')
  // TODO: create guard
  public async updateIpr(
    @Param() { id }: UuidParamRequest,
    @Body() body: UpdateIprRequest,
    @Req() req: Request,
  ): Promise<UpdateIprResponse> {
    const data = await this.iprService.updateIpr(id, body, req.user as User);

    return new UpdateIprResponse(data);
  }
}
