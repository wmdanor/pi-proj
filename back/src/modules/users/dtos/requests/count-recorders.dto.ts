import { IsOptional, IsString } from 'class-validator';

export class CountRecordersRequest {
  @IsOptional()
  @IsString()
  public q?: string;
}
