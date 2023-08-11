export interface Root {
  allTasks: AllTasksInterface;
}

export interface AllTasksInterface {
  ongoing: Task[];
  done: Task[];
  unread: Task[];
  new: Task[];
}

export interface AllTaskHiddenInterface {
  ongoing: Task[];
  done: Task[];
  canceled: Task[];
}
export interface AllTaskToMeInterface {
  new: Task[];
  ongoing: Task[];
  done: Task[];
}
export interface AllTaskFromMeInterface {
  unread: Task[];
  ongoing: Task[];
  done: Task[];
}

export interface Task {
  _id: string;
  dueDate: string;
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
  description: string;
  project: Project;
  topic: Topic;
  creator: UserInfo;
  assignedToState: AssignedUserState[];
  taskUID: string;
  access: string[];
  invitedNumbers: InvitedNumber[];
  seenBy: string[];
  hiddenBy: string[];
  isCanceled: boolean;
  createdAt: string;
  updatedAt: string;
  files: IFile[];
  events: TaskEvent[];
  userSubState: string;
  creatorState: string;
  rootState: string;
  isCreator: boolean;
  isHiddenByMe: boolean;
  isSeenByMe: boolean;
  isAssignedToMe: boolean;
}

export interface AssignedUserState extends UserInfo {
  userId: string;
  phoneNumber: string;
  state: string;
}

export interface InvitedNumber {
  phoneNumber: string;
  firstName: string;
  surName: string;
}

export interface Topic {
  _id: string;
  topic: string;
}

export interface IFile {
  _id: string;
  fileName: string;
  fileTag: string;
  fileUrl: string;
  uploadStatus: string;
  moduleType: string;
  moduleId: string;
  hasComment: boolean;
  comment: string;
}
export enum TaskEventType {
  ForwardTask = "forwardTask",
  Comment = "comment",
  DoneTask = "doneTask",
  CancelTask = "cancelTask",
  InvitedUser = "invitedUser",
}

export interface TaskEvent {
  _id: string;
  taskId: string;
  eventType: string;
  initiator: UserInfo;
  eventData?: EventData[];
  commentData?: CommentData;
  invitedMembers: InvitedMember[]
  createdAt: string;
  updatedAt: string;
}

export interface InvitedMember {
  phoneNumber: string;
  firstName: string;
  surName: string;
}
export interface EventData extends UserInfo {
  phoneNumber: string;
}

export interface CommentData {
  _id: string;
  taskId: string;
  isFileAttached: boolean;
  message: string;
  files: IFile[];
}
