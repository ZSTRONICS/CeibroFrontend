import { FileInterface } from "./docs.interface";
import { ProjectRolesInterface } from "./ProjectRoleMemberGroup.interface";
import { UserInterface } from "./user.interface";

export interface ProjectInterface {
  title: string;
  projectPhoto: string;
  photoFile:string|File|any;
  dueDate: string;
  owner: ProjectOwners[];
  access: string[];
  isDefault: boolean;
  tasksCount: number;
  docsCount: number;
  usersCount: number;
  chatCount: number;
  publishStatus: string;
  _id: string;
  inDraftState: boolean;
  extraStatus: string[],
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  creator: ProjectOwners

}
export interface ProjectOwners{
  _id: string
firstName: string
surName: string
}


export interface projectProfileInterface {
  name: string;
  _id?: string;
}

export const projectOverviewTemplate: ProjectInterface = {
  photoFile:"",
  title: "",
  extraStatus: [],
  access: [],
  dueDate: "",
  owner: [],
  description: "",
  location: "",
  projectPhoto: "",
  publishStatus: "",
  isDefault: false,
  tasksCount: 0,
  docsCount: 0,
  usersCount: 0,
  chatCount: 0,
  _id: "",
  inDraftState: false,
  createdAt: "",
  updatedAt: "",
  creator: {
    _id: "",
    firstName: "",
    surName: '',
  }
};

export const rolesTemplate: ProjectRolesInterface = {
  name: "",
  project: "",
  rolePermission: { create: false, edit: false, delete: false },
  memberPermission: { create: false, edit: false, delete: false },
  members: [],
  admin: false,
  isDefaultRole: false,
  _id: "",
  creator: "",
  createdAt: "",
  updatedAt: ""
}

export interface GroupInterface {
  name: string;
  id?: string;
  members?: any;
  _id?: string;
}
export const groupTemplate: GroupInterface = {
  name: "",
  id: "",
  _id: "",
};

export interface FolderInterfaceRoot {
  folders: FolderInterface[]
  files: FileInterface[]
}

export interface FolderInterface {
  name: string
  group: GroupInterface
  parentFolder: any
  access: ProjectCreator[]
  _id: string
  project: string
  creator: ProjectCreator
  createdAt: string
  updatedAt: string
}
export interface ProjectCreator {
  _id: string
  firstName: string
  surName: string
}

export interface FolderFileInterface {
  name: string;
  url: string;
  access: UserInterface[];
  project: ProjectInterface;
  folder: FolderInterface;
  uploadedBy: UserInterface;
  fileType: string;
  createdAt?: string;
  _id?: string;
}

export interface MemberInterface {
  user?: UserInterface;
  id?: string;
  _id?: string;
  group?: GroupInterface;
  subContractor?: GroupInterface;
  role?: RoleInterface;
  createdAt?: string;
  isInvited?: boolean;
  invitedEmail?: string;
}

export interface ProfileWork {
  comment: boolean;
  commentRequired: boolean;
  _id: string;
  name: string;
  photo: string;
  photoRequired: string;
  profile: string | TimeProfile;
  quantity: boolean;
  quantityRequired: boolean;
  roles: RoleInterface[];
  time: boolean;
  timeRequired: boolean;
}

export interface ProjectTitles {
  label: string
  value: string
}

export interface RoleInterface {
  rolePermission: RolePermission
  memberPermission: MemberPermission
  members: RoleMembers[]
  admin: boolean
  isDefaultRole: boolean
  _id: string
  permissions: Permissions
  name: string
  project: string
  createdAt: string
  updatedAt: string
}

export interface RoleMembers {
  _id: string,
  firstName: string,
  surName: string
}
export interface Permissions {
  admin: Admin
  subContractor: SubContractor
  individual: Individual
}
export interface CreateEditDeleteBool {
  create: boolean
  edit: boolean
  delete: boolean
}
export interface PermissionsInfo {
  roles: Roles
  member: Member
  timeProfile: TimeProfile
}

export interface RolePermission extends CreateEditDeleteBool { }
export interface MemberPermission extends CreateEditDeleteBool { }
export interface Admin extends PermissionsInfo { }
export interface Roles extends CreateEditDeleteBool { }
export interface Member extends CreateEditDeleteBool { }
export interface TimeProfile extends CreateEditDeleteBool { }
export interface Individual extends PermissionsInfo { }
export interface SubContractor extends PermissionsInfo { }

