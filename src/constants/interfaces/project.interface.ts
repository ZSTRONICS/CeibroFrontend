import { UserInterface } from "./user.interface";

export interface projectOverviewInterface {
  dueDate?: any;
  owner?: UserInterface | any;
  title: string;
  description?: string;
  location?: string;
  projectPhoto?: string;
  photoFile?: any; // will be used only while creating a project
  id?: string;
  _id?: string;
}

export const projectOverviewTemplate: projectOverviewInterface = {
  title: "",
};
