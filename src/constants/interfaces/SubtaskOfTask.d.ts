import { UserInfo } from "./Tasks.interface"

export interface SubtaskOfTaskRoot {
  results: Results
}

export interface SubtaskOfTaskResults {
  subtasks: Subtask[]
  task: Task
}

export interface Subtask {
  advanceOptions: AdvanceOptions
  isMultiTaskSubTask: boolean
  access: string[]
  doneImageRequired: boolean
  doneCommentsRequired: boolean
  comments: any[]
  _id: string
  title: string
  taskId: string
  assignedTo: AssignedTo[]
  viewer: Viewer[]
  creator: Creator
  dueDate: string
  description: string
  subTaskState: string
  files: any[]
  createdAt: string
  updatedAt: string
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

export interface AssignedTo {
  members: Member[]
  _id: string
  addedBy: AddedBy
}

export interface Member extends UserInfo{}

export interface AddedBy extends UserInfo{}

export interface Viewer {
  members: Member[]
  _id: string
  addedBy: AddedBy
}

export interface Creator extends UserInfo{}

export interface ConfirmNeeded extends UserInfo {}

export interface Task {
  advanceOptions: AdvanceOptions2
  isMultiTask: boolean
  access: string[]
  assignedTo: AssignedTo2[]
  admins: Admin[]
  totalSubTaskCount: number
  unSeenSubTaskCommentCount: number
  advanceOptionsEnabled: boolean
  _id: string
  title: string
  creator: Creator
  project: Project
  dueDate: string
  state: string
  subTaskStatusCount: any[]
  createdAt: string
  updatedAt: string
}

export interface AdvanceOptions2 {
  confirmNeeded: ConfirmNeeded[]
  viewer: any[]
  categories: string[]
  manPower: number
  timeLog: boolean
  isAdditionalWork: boolean
  checkList: any[]
}

export interface AssignedTo2 extends UserInfo {}

export interface Admin extends UserInfo {}

export interface Project {
  _id: string
  title: string
}
