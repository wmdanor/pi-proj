import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AuthorPublicNameType } from '@prisma/client';

export class CreateIprRequestAuthor {
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

export class CreateIprRequest {
  @IsString()
  public applicationNumber: string;

  @Type(() => Date)
  @IsDate()
  public applicationDate: Date;

  @IsString()
  public copyrightRegistrationNumber: string;

  @Type(() => Date)
  @IsDate()
  public copyrightRegistrationDate: Date;

  @Type(() => Date)
  @IsDate()
  public certificateIssueDate: Date;

  @IsString()
  public officialBulletinNumber: string;

  @IsString()
  public publicationSphereData: string;

  @IsString()
  public publicationTitle: string;

  @IsOptional()
  @IsString()
  public publicationAlternativeTitle?: string;

  @IsString()
  public publicationOrigin: string;

  @IsString()
  public publicationCreationReason: string;

  @IsOptional()
  @IsString()
  public publicationPublicData?: string;

  @IsOptional()
  @IsString()
  public paymentReceiptCode?: string;

  @IsUUID()
  public publicationObjectTypeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIprRequestAuthor)
  public authors: CreateIprRequestAuthor[];
}
