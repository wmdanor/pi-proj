enum AuthorPublicNameType {
    Pseudonym
}

enum PublicationCreationReason {
    Test
}

export interface PublicationObjectType {
    id?: string;
    name?: string;
}

export interface PublicationOrigin {
    Derivative: 'похідний',
    NonDerivative :'не похідний'
}
enum PublicNameType {
    RealName,
    Pseudonym
}

export interface Author{
    id: string,
    firstName:	string
    lastName	:string
    patronymic	:string
    publicNameType:	PublicNameType
    publicName:	string
    birthdate:	string
    postalAddress:	string
}

export interface Ipr {
    id?: string
    applicationNumber?: string
    applicationDate?: string
    copyrightRegistrationNumber?: string
    copyrightRegistrationDate?: string
    certificateIssueDate?: string
    officialBulletinNumber?: string
    publicationSphereData?: string
    publicationType?: string
    publicationTitle?: string
    publicationAlternativeTitle?: string | null
    publicationOrigin?: PublicationOrigin
    publicationCreationReason?: PublicationCreationReason
    authors?: Author[]
    publicationObject?: PublicationObjectType
    publicationPublicData?: string | null
    publicationObjectTypeId?: string
    paymentReceiptCode?: string | null
}