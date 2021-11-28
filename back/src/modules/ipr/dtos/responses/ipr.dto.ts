import { Ipr } from '@prisma/client';

export class IprResponse {
  public id: string;

  public test: bigint;

  constructor(init: Ipr) {
    this.id = init.id;
  }
}
