import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecorderRequest {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @IsNotEmpty()
  @IsString()
  public patronymic: string;

  @Type(() => Date)
  @IsISO8601()
  public birthDate: Date;

  @IsNotEmpty()
  @IsString()
  public passportSeries?: string;

  @IsNotEmpty()
  @IsString()
  public passportNumber: string;

  @Type(() => Date)
  @IsISO8601()
  public passportIssueDate: Date;

  @IsString()
  @Length(4, 4)
  public passportAuthority: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  public inn?: string;

  @IsOptional()
  @IsUUID()
  public organizationId?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  public organizationPosition?: string;
}
