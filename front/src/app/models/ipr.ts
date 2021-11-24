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
    id: string
    applicationNumber: bigint
    applicationDate: Date
    copyrightRegistrationNumber: bigint
    copyrightRegistrationDate: Date
    certificateIssueDate: Date
    officialBulletinNumber: bigint
    publicationSphereData: string
    publicationType: string
    publicationTitle: string
    publicationAlternativeTitle: string | null
    publicationOrigin: PublicationOrigin
    publicationCreationReason: PublicationCreationReason
    authorPublicNameType: AuthorPublicNameType
    publicationObject: PublicationObjectType
    publicationPublicData: string | null
    paymentReceiptCode: string | null
}