import { UserInfo } from "./Tasks.interface"

export interface AllSubTaskRoot {
    results: Result[]
  }

  export interface AllSubTasResult {
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
    viewer: Viewer1[]
    categories: string[]
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

  export interface Viewer {
    members: Member[]
    _id: string
    addedBy: AddedBy
  }

  export interface ConfirmNeeded extends UserInfo {}
  export interface Viewer1 extends UserInfo {}
  export interface Member extends UserInfo {}
  export interface AddedBy extends UserInfo {}
  export interface Creator extends UserInfo {}
