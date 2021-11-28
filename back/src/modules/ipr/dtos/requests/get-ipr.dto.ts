import { PaginatedRequest } from '@common/dtos/requests';
import { PublicationOrigin } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class GetIprRequest extends PaginatedRequest {
  @IsString()
  public title?: string;

  @IsString()
  public author?: string;

  @IsString()
  public registrationNumber?: string;

  @IsEnum(PublicationOrigin)
  public publicationOrigin?: PublicationOrigin;
}
