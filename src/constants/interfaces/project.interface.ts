import { dataInterface } from "components/Utills/Inputs/SelectDropdown";
import { string } from "yup/lib/locale";
import { UserInterface } from "./user.interface";

export interface ProjectOverviewInterface {
  dueDate?: any;
  owner?: UserInterface | any;
  title: string | null;
  description?: string;
  location?: string;
  projectPhoto?: string;
  photoFile?: any; // will be used only while creating a project
  id?: string;
  publishStatus?: string;
  _id?: string;
}
export interface ProjectInterface {
  projectPhoto: string;
  dueDate: string;
  owner: UserInterface;
  title: string;
  tasks: number;
  docs: number;
  users: number;
  chat: number;
  publishStatus: string;
  statusDate: string;
  id?: string;
  _id?: string;
}

export interface RoleInterface {
  name: string;
  id?: string;
  roles?: string[];
  admin?: boolean;
  member?: string[];
  timeProfile?: string[];
}

export interface projectProfileInterface {
  name: string;
  id?: string;
}

export const projectOverviewTemplate: ProjectOverviewInterface = {
  title: "",
};

export const rolesTemplate: RoleInterface = {
  name: "",
  admin: false,
};

export interface GroupInterface {
  name: string;
  id?: string;
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
