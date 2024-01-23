export interface OptionType {
  label: string;
  value: string;
  _id?: string;
  isShown?: boolean;
  isPermanenetOption?: boolean;
}

export interface Options {
  allOptions: OptionType[];
  recentOptions: OptionType[];
}

export interface AssignedToStateType {
  phoneNumber: string;
  userId: string;
  state: string;
}
export interface CreateNewTaskFormType {
  dueDate?: string;
  topic: string;
  project?: string;
  assignedToState: AssignedToStateType[];
  creator: string;
  description?: string;
  doneImageRequired?: boolean;
  doneCommentsRequired?: boolean;
  hasPendingFilesToUpload: boolean;
  invitedNumbers?: string[];
}

export type ChangeValueType =
  | AssignedToStateType[]
  | boolean
  | string
  | string[]
  | undefined;

export type fileType = "image" | "doc";
