import { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import { string } from "yup/lib/locale";
import { UserInterface } from "./user.interface";

export interface ProjectOverviewInterface {
  dueDate: any;
  access:string[];
  owner:  any;
  title: string;
  description: string;
  location: string;
  projectPhoto: string;
  photoFile?: any; // will be used only while creating a project
  id?: string;
  publishStatus: string;
  _id?: string;
  isDefault:boolean;
  extraStatus:string[],
}
export interface ProjectInterface {
  projectPhoto: string;
  dueDate: string;
  owner: UserInterface[];
  title: string;
  tasks: number;
  docsCount: number;
  usersCount: number;
  chatCount: number;
  publishStatus: string;
  statusDate: string;
  id?: string;
  _id?: string;
  isDefault:boolean;
  extraStatus:string[],
  access:string[];
  description: string;
  location: string;

}

export interface userRolesPermissions {
  admin?: boolean;
  roles?: string[];
  member?: string[];
  timeProfile?: string[];
}

export interface RoleInterface {
  name: string;
  _id?: string;
  roles?: string[];
  admin?: boolean;
  member?: string[];
  timeProfile?: string[];
  memberIds?: any;
}

export interface projectProfileInterface {
  name: string;
  _id?: string;
}

export const projectOverviewTemplate: ProjectOverviewInterface = {
  title: "",
  extraStatus: [],
  access: [],
  dueDate: "",
  owner: [],
  description: "",
  location: "",
  projectPhoto: "",
  publishStatus: "",
  isDefault: false
};

export const rolesTemplate: RoleInterface = {
  name: "",
  admin: false,
};

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

export interface FolderInterface {
  name: string;
  id?: string;
  _id?: string;
  access: string[];
  creator: UserInterface;
  group: GroupInterface;
  createdAt: string;
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

export interface TimeProfile {
  name: string;
  _id: string;
  project: string | ProjectInterface;
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

export interface ProjectTitles{
  label: string
  value: string
}