import {
  IsDate,
  IsString,
  MinLength,
  NotEquals,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRecorderRequest {
  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @MinLength(1)
  public firstName?: string;

  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @MinLength(1)
  public lastName?: string;

  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @MinLength(1)
  public patronymic?: string;

  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @MinLength(1)
  public passportSeries?: string;

  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @MinLength(1)
  public passportNumber?: string;

  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  @MinLength(1)
  public passportAuthority?: string;

  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  @Type(() => Date)
  @IsDate()
  public passportIssueDate?: string;
}
