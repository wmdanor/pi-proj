import { IprObjectTypeResponse } from '@modules/ipr/dtos/responses/ipr-object-type.dto';

export interface GetIprObjectTypesResponseInit {
  data: IprObjectTypeResponse[];
}

export class GetIprObjectTypesResponse {
  public data: IprObjectTypeResponse[];

  constructor(init: GetIprObjectTypesResponseInit) {
    const { data } = init;

    this.data = data.map((item) => new IprObjectTypeResponse(item));
  }
}
