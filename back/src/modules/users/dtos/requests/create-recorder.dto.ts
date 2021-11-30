import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecorderRequestOrganization {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  public addressCity?: string;

  @IsOptional()
  @IsString()
  public addressDistrict?: string;

  @IsOptional()
  @IsString()
  public addressStreet?: string;

  @IsOptional()
  @IsString()
  public addressHouse?: string;
}

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
  @IsDate()
  public birthDate: Date;

  @IsNotEmpty()
  @IsString()
  public passportSeries?: string;

  @IsNotEmpty()
  @IsString()
  public passportNumber: string;

  @Type(() => Date)
  @IsDate()
  public passportIssueDate: Date;

  @IsString()
  @Length(4, 4)
  public passportAuthority: string;

  @IsOptional()
  @IsString()
  public inn?: string;

  @IsOptional()
  public organization?: CreateRecorderRequestOrganization;

  @IsOptional()
  @IsString()
  public organizationPosition?: string;
}
