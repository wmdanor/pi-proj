import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AuthorPublicNameType } from '@prisma/client';

export class UpdateIprRequestAuthor {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public patronymic: string;

  @IsEnum(AuthorPublicNameType)
  public publicNameType: AuthorPublicNameType;

  @IsString()
  public publicName: string;

  @Type(() => Date)
  @IsDate()
  public birthdate: Date;

  @IsString()
  public postalAddress: string;
}

export class UpdateIprRequest {
  @IsOptional()
  @IsString()
  public applicationNumber?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public applicationDate?: Date;

  @IsOptional()
  @IsString()
  public copyrightRegistrationNumber?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public copyrightRegistrationDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public certificateIssueDate?: Date;

  @IsOptional()
  @IsString()
  public officialBulletinNumber?: string;

  @IsOptional()
  @IsString()
  public publicationSphereData?: string;

  @IsOptional()
  @IsString()
  public publicationTitle?: string;

  @IsOptional()
  @IsString()
  public publicationAlternativeTitle?: string;

  @IsOptional()
  @IsString()
  public publicationOrigin?: string;

  @IsOptional()
  @IsString()
  public publicationCreationReason?: string;

  @IsOptional()
  @IsString()
  public publicationPublicData?: string;

  @IsOptional()
  @IsString()
  public paymentReceiptCode?: string;

  @IsOptional()
  @IsString()
  public publicationObjectTypeId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateIprRequestAuthor)
  public authors?: UpdateIprRequestAuthor[];

  @IsOptional()
  @IsArray()
  public deleteAuthors?: string[];
}
