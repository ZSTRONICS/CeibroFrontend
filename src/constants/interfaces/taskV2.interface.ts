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
  title: string;
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
  description: string;
  confirmer: any,
  viewer: UserInfo[];
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
  locations: any[];
  eventsCount: number;
  hasPinData: boolean;
  pinData: any;
  taskRootState: string;
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
    canceled: boolean;
  }
  isAllSelected: boolean;
}

export interface PinData {
  _id: string;
  pinUID: number;
  type: string;
  page_width: number;
  page_height: number;
  x_coord: number;
  y_coord: number;
  pinPhotoUrl: string;
  creator: string;
  taskData: ITask;
  tags: string[];
  drawingId: string;
  thumbnailId: string | null;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllTasksAllEvents {
  allEvents: TaskEvent[];
  allTasks: ITask[];
  latestUpdatedAt: string;
  allPins: PinData[];
}

export interface AssignedUserState extends UserInfo {
  userId: string;
  phoneNumber: string;
  state: string;
  profilePic: string;

}

export interface InvitedNumber {
  phoneNumber: string;
  firstName: string;
  surName: string;
  profilePic: string;
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
  eventSeenBy: any[];
  eventNumber: number;
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

export interface TaskFile {
  taskId: string;
  commentId: string;
  fileId: string;
  initiator: UserInfo;
  createdAt: string;
  comment: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  fileTag: string;
  isCommentFile: boolean;
  isTaskFile: boolean;
}

export enum TaskRootStateTags {
  Ongoing = "Ongoing",
  Approval = "Approval",
  Closed = "Closed",
  Canceled = "Canceled",
}

export enum TaskState {
  NEW = "new",
  ONGOING = "ongoing",
  UNREAD = "unread",
  DONE = "done",
  CANCELED = "canceled",
  HIDDEN = "hidden",
}
