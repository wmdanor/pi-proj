
import { Role } from "./role";
  
export interface User {
  id: string
  email: string
  password?: string
  createdAt: string
  role: Role
  firstName: string
  lastName: string
  patronymic: string
  birthDate: string
  passportSeries: string | null
  passportNumber: string
  passportIssueDate: string
  passportAuthority: string
  inn: string | null
  organizationId: string | null
  organizationPosition: string | null
  accessToken?: string;
  isActive?: boolean;
  organizationAddressCity?:  string
  organizationAddressDistrict?:  string
  organizationAddressStreet?:  string
  organizationAddressHouse?:string
  organizationName?:string
}