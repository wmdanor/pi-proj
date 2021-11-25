import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatedRequest {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  public limit?: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  public offset?: number = 0;
}
