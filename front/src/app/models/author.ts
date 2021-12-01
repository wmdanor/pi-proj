
export enum PublicNameType {
  RealName,
  Pseudonym
}
export interface Author {
  id?: string,
  firstName: string,
  lastName: string,
  patronymic: string,
  publicNameType: PublicNameType,
  publicName: string,
  birthdate: string,
  postalAddress: string
  }