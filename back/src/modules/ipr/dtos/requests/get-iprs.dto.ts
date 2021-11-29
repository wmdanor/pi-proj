import { IsOptional, IsString } from 'class-validator';
import { PaginatedRequest } from '@common/dtos/requests';

export class GetIprsRequest extends PaginatedRequest {
  @IsOptional()
  @IsString()
  public publicationTitle?: string;

  @IsOptional()
  @IsString()
  public authorName?: string;

  @IsOptional()
  @IsString()
  public copyrightRegistrationNumber?: string;

  @IsOptional()
  @IsString()
  public publicationObject?: string;
}
