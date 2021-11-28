import { IsString, MinLength, NotEquals, ValidateIf } from 'class-validator';

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
}
