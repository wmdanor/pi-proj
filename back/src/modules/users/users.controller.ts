import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@modules/auth/decorators';
import { UserRole } from '@prisma/client';
import {
  ActivateRecorderRequest,
  CountRecordersRequest,
  CreateRecorderRequest,
  GetRecordersRequest,
  UpdateRecorderRequest,
} from '@modules/users/dtos/requests';
import {
  CountRecordersResponse,
  CreateRecorderResponse,
  GetRecorderResponse,
  GetRecordersResponse,
  UpdateRecorderResponse,
} from '@modules/users/dtos/responses';
import { UuidParamRequest } from '@common/dtos/requests';
import { UsersService } from '@modules/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Roles(UserRole.Administrator)
  @Get('recorders')
  public async getRecorders(
    @Query() query: GetRecordersRequest,
  ): Promise<GetRecordersResponse> {
    // TODO: may be a good idea to create separate endpoint for counting
    const data = await this.usersService.getRecorders(query);

    return new GetRecordersResponse({ ...query, data });
  }

  @ApiBearerAuth()
  @Roles(UserRole.Administrator)
  @Get('recorders/count')
  public async countRecorders(
    @Query() query: CountRecordersRequest,
  ): Promise<CountRecordersResponse> {
    const count = await this.usersService.countRecorders(query);

    return new CountRecordersResponse(count);
  }

  @ApiBearerAuth()
  @Roles(UserRole.Administrator)
  @Post('recorders')
  public async createRecorder(
    @Body() body: CreateRecorderRequest,
  ): Promise<CreateRecorderResponse> {
    const user = await this.usersService.createRecorder(body);

    return new CreateRecorderResponse(user);
  }

  @ApiBearerAuth()
  @Roles(UserRole.Administrator)
  @Get('recorders/:id')
  public async getRecorder(
    @Param() { id }: UuidParamRequest,
  ): Promise<GetRecorderResponse> {
    const data = await this.usersService.getRecorder(id);
    if (data === null) {
      throw new NotFoundException();
    }

    return new GetRecorderResponse(data);
  }

  @ApiBearerAuth()
  @Roles(UserRole.Administrator)
  @Put('recorders/:id')
  public async updateRecorder(
    @Param() { id }: UuidParamRequest,
    @Body() body: UpdateRecorderRequest,
  ): Promise<UpdateRecorderResponse> {
    const data = await this.usersService.updateRecorder(id, body);
    if (data === null) {
      throw new NotFoundException();
    }

    return new UpdateRecorderResponse(data);
  }

  @ApiBearerAuth()
  @Roles(UserRole.Administrator)
  @Put('recorders/:id/activate')
  public async activateRecorder(
    @Param() { id }: UuidParamRequest,
    @Body() { isActive }: ActivateRecorderRequest,
  ): Promise<void> {
    const data = await this.usersService.activateRecorder(id, isActive);
    if (data === null) {
      throw new NotFoundException();
    }

    return;
  }
}
