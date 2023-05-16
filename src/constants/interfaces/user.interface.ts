
export interface UserAllContacts {
  contacts: Contact[]
}

export interface Contact {
  _id: string
  userCeibroData?: UserCeibroData
  isCeiborUser: boolean
  contactFirstName: string
  contactSurName: string
  contactFullName: string
  phoneNumber: string
  countryCode: string
  isBlocked: boolean
  isSilent: boolean
  createdAt: string
  updatedAt: string
}

export interface UserCeibroData {
  _id: string
  profilePic: string
  phoneNumber: string
  companyName: string
  jobTitle: string
  email: string
  firstName: string
  surName: string
}

export interface UserInterface {
  firstName: string
  surName: string
  email: string
  companyVat: string
  companyLocation: string
  workEmail: string
  companyName: string
  profilePic: string
  phone: string
  companyPhone: string
  role: string
  currentlyRepresenting: string
  id: string
  _id: string
  createdAt:string
  name?:string
  regDate?:string
}
export const userTemplate= {
  firstName: "",
  surName: "",
  email: "",
  companyVat: "",
  companyLocation: "",
  workEmail: "",
  companyName: "",
  profilePic: "",
  phone: "",
  companyPhone: "",
  role: "",
  currentlyRepresenting: "",
  id: "",
  _id: "",
  createdAt:"",
  name:"",
  regDate:"",
}
