import { PublicationObjectType } from '@prisma/client';
import { mapObject } from '@common/utilities';

export class IprObjectTypeResponse {
  public id: string;
  public name: string;

  constructor(init: PublicationObjectType) {
    mapObject(init, this);
  }
}
