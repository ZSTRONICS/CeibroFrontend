import { CreateEditDeleteBool } from "./project.interface"

export interface ProjectRoles {
    result: ProjectRolesInterface[]
  }

  //   project roles interface

  export interface ProjectRolesInterface {
    rolePermission: RolePermission
    memberPermission: MemberPermission
    members: Member[]
    admin: boolean
    isDefaultRole: boolean
    _id: string
    name: string
    project: string
    creator: string
    createdAt: string
    updatedAt: string
  }

  //   project group interface

  export interface ProjectGroupInterface {
    members: Member[]
    isDefaultGroup: boolean
    _id: string
    name: string
    project: string
    creator: string
    createdAt: string
    updatedAt: string
  }

  //   project members interface

  export interface ProjectMember {
    results: ProjectMemberInterface[]
  }
  export interface ProjectMemberInterface {
    isOwner: boolean
    _id: string
    user: User
    creator: string
    group: ProjectGroupInterface
    role: ProjectRolesInterface
    project: string
    createdAt: string
    updatedAt: string
  }
  export interface User {
    _id: string
    firstName: string
    surName: string
    profilePic: string
    companyName: string
    companyPhone: string
    workEmail: string
  }

  export interface RolePermission extends CreateEditDeleteBool {}
  
  export interface MemberPermission extends CreateEditDeleteBool {}
  
  export interface Member {
    _id: string
    firstName: string
    surName: string
  }
  


