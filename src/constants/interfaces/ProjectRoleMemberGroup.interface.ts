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
  export const roleTemplate:ProjectRolesInterface={
    _id:'',
    admin:false,
    createdAt:"",
    updatedAt:'',
    creator:"",
    isDefaultRole:false,
    memberPermission:{create:false,delete:false,edit:false},
    rolePermission:{create:false,delete:false,edit:false},
    members:[],
    name:"",
    project:"",
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
export const groupTemplate:ProjectGroupInterface={
  members:[],
  _id:"",
  name:"",
  project:"",
  createdAt:"",
  creator:"",
  isDefaultGroup:false,
  updatedAt:""
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

  export const memberTemplate: ProjectMemberInterface = {
    _id: "",
    createdAt: "",
    creator: "",
    isOwner: false,
    project: "",
    updatedAt: "",
    user: {
      _id: "",
      firstName: "",
      surName: "",
      profilePic: "",
      companyName: "",
      companyPhone: "",
      workEmail: "",
    },
    role: {
      _id: "",
      admin: false,
      isDefaultRole: false,
      createdAt: "",
      creator: "",
      members: [],
      name: "",
      updatedAt: "",
      project: "",
      memberPermission: { create: false, delete: false, edit: false },
      rolePermission: { create: false, delete: false, edit: false },

},

    group: {
      members: [],
      isDefaultGroup: false,
      _id: "",
      name: "",
      project: "",
      creator: "",
      createdAt: "",
      updatedAt: "",
    },
  };

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
  


