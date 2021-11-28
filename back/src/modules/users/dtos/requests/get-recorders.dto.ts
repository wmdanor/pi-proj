import { IsOptional, IsString } from 'class-validator';
import { PaginatedRequest } from '@common/dtos/requests';

export class GetRecordersRequest extends PaginatedRequest {
  @IsOptional()
  @IsString()
  public q?: string;
}
