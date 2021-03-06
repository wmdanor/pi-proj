import { IprResponse } from '@modules/ipr/dtos/responses/ipr.dto';
import { Ipr } from '@prisma/client';

export class GetIprResponse {
  data: IprResponse;

  constructor(data: Ipr) {
    this.data = new IprResponse(data);
  }
}
