import { PublicationObjectType } from '@prisma/client';
import { mapObject } from '@common/utilities';

export interface GetIprFiltersResponseInit {
  objectTypes: PublicationObjectType[];
}

export class GetIprFiltersResponse {
  public objectTypes: PublicationObjectType[];

  // TODO
  constructor(init: GetIprFiltersResponseInit | unknown) {
    mapObject(init, this);
  }
}
