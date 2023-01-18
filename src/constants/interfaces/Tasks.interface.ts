
// export interface AllTask {
//   task: TaskRoot[];
// }

export interface TaskRoot {
  results: Result[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export interface Result {
  advanceOptions: AdvanceOptions
  isMultiTask: boolean
  access: string[]
  assignedTo: AssignedTo[]
  admins: Admin[]
  subTaskStatusCount: any[]
  totalSubTaskCount: number
  unSeenSubTaskCommentCount: number
  advanceOptionsEnabled: boolean
  _id: string
  title: string
  creator: Creator
  project: Project
  dueDate: Date;
  state: State;
  createdAt: string
  updatedAt: string
}

export interface AdvanceOptions {
  confirmNeeded: ConfirmNeeded[]
  viewer: Viewer[]
  categories: string[]
  manPower: number
  timeLog: boolean
  isAdditionalWork: boolean
  checkList: any[]
  location?: string
  priority?: string
  startDate?: string
}

export interface UserInfo {
    _id: string
  firstName: string
  surName: string
  profilePic: string
}

export interface ConfirmNeeded extends UserInfo {}

export interface Viewer extends UserInfo {}

export interface AssignedTo extends UserInfo {}

export interface Admin extends UserInfo {}

export interface Creator extends UserInfo {}

export interface Project {
  _id: string
  title: string
}

export enum State {
  Active = "active",
  Draft = "draft",
  All = "all",
  Done = "done",
}
