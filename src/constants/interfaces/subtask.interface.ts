export interface SubtaskInterface {
  advanceOptions: AdvanceOptions
  isMultiTaskSubTask: boolean
  access: string[]
  subTaskFixedForUser: string[]
  doneImageRequired: boolean
  doneCommentsRequired: boolean
  unSeenCommentsCount:number
  attachmentsCount:number
  comments: any[]
  _id: string
  title: string
  taskId: string
  assignedTo: AssignedTo[]
  rejectedBy: UserInfo[]
  viewer: Viewer[]
  creator: Creator
  dueDate: string
  description: string
  state: SubtaskState[]
  files: any[]
  createdAt: string
  updatedAt: string
  recentComments:RecentCommentsInterface[]
  taskData:TaskData
  assignedToMembersOnly: []
}

export interface TaskData{
  admins:string[]
  project:{_id:string,title:string},
  title:string
}
export interface AdvanceOptions {
  confirmNeeded: ConfirmNeeded[]
  viewer: any[]
  categories: any[]
  manPower: number
  timeLog: boolean
  isAdditionalWork: boolean
  checkList: any[]
}

export interface SubtaskState {
  userId: string,
  _id: string,
  userState: string
}

export interface AssignedTo {
  members: UserInfo[]
  _id: string
  addedBy: UserInfo
}


export interface Member extends UserInfo{}

export interface AddedBy extends UserInfo{}

export interface Viewer {
  members: UserInfo[]
  _id: string
  addedBy: AddedBy
}

export interface RecentCommentsInterface {
  access: string[]
  isFileAttached: boolean
  files: any[]
  seenBy: SeenBy[]
  _id: string
  taskId: string
  subTaskId: string
  sender: Sender
  userState: string
  message: string
  createdAt: string
  updatedAt: string
}

export interface Creator extends UserInfo{}
export interface ConfirmNeeded extends UserInfo {}
export interface SeenBy extends UserInfo{}
export interface Sender extends UserInfo{}
