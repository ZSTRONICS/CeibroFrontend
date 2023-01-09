export interface TaskRoot {
    TaskCards: TaskCards[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
  
  export interface TaskCards {
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
    dueDate: string
    state: string
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
  
  export interface ConfirmNeeded {
    _id: string
    firstName: string
    surName: string
  }
  
  export interface Viewer {
    _id: string
    firstName: string
    surName: string
  }
  
  export interface AssignedTo {
    _id: string
    firstName: string
    surName: string
  }
  
  export interface Admin {
    _id: string
    firstName: string
    surName: string
  }
  
  export interface Creator {
    _id: string
    firstName: string
    surName: string
  }
  
  export interface Project {
    _id: string
    title: string
  }
  