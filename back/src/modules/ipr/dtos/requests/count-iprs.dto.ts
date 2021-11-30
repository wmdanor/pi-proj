import { IsOptional, IsString } from 'class-validator';

export class CountIprsRequest {
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
  public publicationObjectTypeId?: string;
}
