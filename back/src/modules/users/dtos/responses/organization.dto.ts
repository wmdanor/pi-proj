import { Organization } from '@prisma/client';
import { mapObject } from '@common/utilities';

export class OrganizationResponse {
  public id: string;
  public name: string;
  public addressCity: string | null;
  public addressDistrict: string | null;
  public addressStreet: string | null;
  public addressHouse: string | null;

  constructor(init: Organization) {
    mapObject(init, this);
  }
}
