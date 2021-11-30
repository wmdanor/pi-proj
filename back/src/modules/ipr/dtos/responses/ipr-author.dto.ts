import { Author, AuthorPublicNameType } from '@prisma/client';
import { mapObject } from '@common/utilities';

export class IprAuthorResponse {
  public id: string;
  public firstName: string;
  public lastName: string;
  public patronymic: string;
  public publicNameType: AuthorPublicNameType;
  public publicName: string;
  public birthdate: Date;
  public postalAddress: string;

  constructor(init: Author) {
    mapObject(init, this);
  }
}
