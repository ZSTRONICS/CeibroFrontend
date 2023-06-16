
export enum State {
  New = "new",
  Active = "active",
  Draft = "draft",
  All = "all",
  Done = "done",
}

export enum SubtaskState {
  Assigned = "assigned",
  Accepted = "accepted",
  Start = "start",
  Rejected = "rejected",
  Draft = "draft",
  Done = "done",
  All = "all",
  Ongoing= "ongoing",
}

export interface TaskInterface {
  advanceOptions: AdvanceOptions
  isMultiTask: boolean
  access: string[]
  assignedTo: UserInfo[]
  admins: UserInfo[]
  totalSubTaskCount: number
  unSeenSubTaskCommentCount: number
  advanceOptionsEnabled: boolean
  _id: string
  title: string
  creator: Creator
  project: Project
  dueDate: string
  state: State
  description: string
  subTaskStatusCount: any[]
  createdAt: string
  updatedAt: string
  isEditable?: boolean
}

export interface Creator extends UserInfo{}
export interface ConfirmNeeded extends UserInfo {}
export interface AdvanceOptions {
  confirmNeeded: ConfirmNeeded[]
  viewer: any[]
  categories: string[]
  manPower: number
  timeLog: boolean
  isAdditionalWork: boolean
  checkList: any[]
}

export interface Project {
  _id: string
  title: string
}
