import { Ipr } from '@prisma/client';
import { mapObject } from '@common/utilities';
import { IprObjectTypeResponse } from '@modules/ipr/dtos/responses/ipr-object-type.dto';
import { IprAuthorResponse } from '@modules/ipr/dtos/responses/ipr-author.dto';

export class IprResponse {
  public id: string;
  public applicationNumber: string;
  public applicationDate: Date;
  public copyrightRegistrationNumber: string;
  public copyrightRegistrationDate: Date;
  public certificateIssueDate: Date;
  public officialBulletinNumber: string;
  public publicationSphereData: string;
  public publicationTitle: string;
  public publicationAlternativeTitle: string | null;
  public publicationOrigin: string;
  public publicationCreationReason: string;
  public publicationPublicData: string | null;
  public paymentReceiptCode: string | null;
  public publicationObjectTypeId: string;
  public userId: string;
  public publicationObject: IprObjectTypeResponse;
  public authors: IprAuthorResponse[];

  constructor(init: Ipr) {
    mapObject(init, this);
  }
}
