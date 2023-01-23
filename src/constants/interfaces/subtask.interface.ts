export interface SubtaskInterface {
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
  state: string
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

export interface UserInfo {
  _id: string
firstName: string
surName: string
profilePic: string
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