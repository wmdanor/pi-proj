enum AuthorPublicNameType {
    Pseudonym
}

enum PublicationCreationReason {
    Test
}

enum PublicationObjectType {
    Test
}

enum PublicationOrigin {
    Derivative,
    NonDerivative
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
    authorPublicNameType?: string //AuthorPublicNameType
    publicationObject?: PublicationObjectType
    publicationPublicData?: string | null
    paymentReceiptCode?: string | null
}