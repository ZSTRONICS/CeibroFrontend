export interface Root {
  allTasks: AllTasksInterface;
}

export interface AllTasksInterface {
  ongoing: ITask[];
  done: ITask[];
  unread: ITask[];
  new: ITask[];
}

export interface AllTaskHiddenInterface {
  ongoing: ITask[];
  done: ITask[];
  canceled: ITask[];
}
export interface AllTaskToMeInterface {
  new: ITask[];
  ongoing: ITask[];
  done: ITask[];
}
export interface AllTaskFromMeInterface {
  unread: ITask[];
  ongoing: ITask[];
  done: ITask[];
}

export interface ITask {
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
  fromMeState: string;
  toMeState: string;
  hiddenState: string;
}

export interface ITaskFilterInterace {
  fromMe: {
    unread: boolean;
    ongoing: boolean;
    done: boolean;
  },
  toMe: {
    new: boolean;
    ongoing: boolean;
    done: boolean;
  },
  hidden: {
    ongoing: boolean;
    done: boolean;
    cancelled: boolean;
  }
  isAllSelectied: boolean;
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
  fileType: string;
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
  UnCancelTask = "unCancelTask"
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
