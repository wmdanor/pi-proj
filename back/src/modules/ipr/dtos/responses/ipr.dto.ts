import { Ipr } from '@prisma/client';

export class IprResponse {
  public id: string;

  constructor(init: Ipr) {
    this.id = init.id;
  }
}
