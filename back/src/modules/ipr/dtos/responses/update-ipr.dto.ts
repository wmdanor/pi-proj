import { IprResponse } from '@modules/ipr/dtos/responses/ipr.dto';
import { Ipr } from '@prisma/client';

export class UpdateIprResponse {
  public data: IprResponse;

  constructor(data: Ipr) {
    this.data = new IprResponse(data);
  }
}
