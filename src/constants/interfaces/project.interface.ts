import { string } from "yup/lib/locale";
import { UserInterface } from "./user.interface";

export interface projectOverviewInterface {
  dueDate?: any;
  owner?: UserInterface | any;
  title: string | null;
  description?: string;
  location?: string;
  projectPhoto?: string;
  photoFile?: any; // will be used only while creating a project
  id?: string;
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

export interface roleInterface {
  name: string;
  roles?: string[];
  admin?: boolean;
  member?: string[],
  timeProfile?: string[]
}

export const projectOverviewTemplate: projectOverviewInterface = {
  title: "",
};

export const rolesTemplate: roleInterface = {
  name: "",
  admin: false,
  roles: ['create', 'delete'],
  member: [ 'edit', 'delete'],
  timeProfile: ['create', 'edit']
}
