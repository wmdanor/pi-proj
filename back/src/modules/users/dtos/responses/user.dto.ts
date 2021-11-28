import { User, UserRole } from '@prisma/client';
import { mapObject } from '@common/utilities';

export class UserResponse {
  public id: string;
  public email: string;
  public createdAt: Date;
  public role: UserRole;
  public firstName: string;
  public lastName: string;
  public patronymic: string;
  public birthDate: Date;
  public passportSeries: string | null;
  public passportNumber: string;
  public passportIssueDate: Date;
  public passportAuthority: string;
  public inn: string | null;
  public organizationId: string | null;
  public organizationPosition: string | null;

  constructor(init: User) {
    mapObject(init, this, {
      exclude: ['password'],
    });
  }
}
