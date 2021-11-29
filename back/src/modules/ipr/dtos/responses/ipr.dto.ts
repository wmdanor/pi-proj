import { Ipr, PublicationObjectType } from '@prisma/client';
import { mapObject } from '@common/utilities';

class Author {}

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
  public publicationObject: PublicationObjectType;
  public authors: Author[];

  constructor(init: Ipr) {
    mapObject(init, this);
  }
}
