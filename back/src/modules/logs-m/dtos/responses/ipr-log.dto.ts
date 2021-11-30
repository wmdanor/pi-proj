import { IprUpdatesLog, IprUpdatesLogsType } from '@prisma/client';
import { mapObject } from '@common/utilities';

export class IprLogResponse {
  public id: string;
  public createdAt: Date;
  public type: IprUpdatesLogsType;
  public updateReason: string;
  public description: string;
  public documentNumber: string | null;
  public iprId: string;
  public userId: string;

  constructor(init: IprUpdatesLog) {
    mapObject(init, this);
  }
}
