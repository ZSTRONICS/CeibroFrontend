export interface SubtaskRoot {
    results: Results
  }
  
  export interface Results {
    subtasks: Subtask[]
    task: Task2
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
    task: Task
    assignedTo: AssignedTo[]
    viewer: Viewer[]
    creator: Creator
    dueDate: string
    description: string
    subTaskState: string
    files: any[]
    activityLog: any[]
    createdAt: string
    updatedAt: string
  }
  
  export interface AdvanceOptions {
    confirmNeeded: any[]
    viewer: any[]
    categories: any[]
    manPower: number
    timeLog: boolean
    isAdditionalWork: boolean
    checkList: any[]
  }
  
  export interface Task {
    _id: string
    title: string
    state: string
  }
  
  export interface AssignedTo {
    members: Member[]
    _id: string
    addedBy: AddedBy
  }
  
  export interface Member {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface AddedBy {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface Viewer {
    members: Member2[]
    _id: string
    addedBy: AddedBy2
  }
  
  export interface Member2 {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface AddedBy2 {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface Creator {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface Task2 {
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
    creator: Creator2
    project: Project
    dueDate: string
    state: string
    subTaskStatusCount: any[]
    createdAt: string
    updatedAt: string
  }
  
  export interface AdvanceOptions2 {
    confirmNeeded: any[]
    viewer: any[]
    categories: any[]
    manPower: number
    timeLog: boolean
    isAdditionalWork: boolean
    checkList: any[]
  }
  
  export interface AssignedTo2 {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface Admin {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface Creator2 {
    _id: string
    firstName: string
    surName: string
    profilePic: string
  }
  
  export interface Project {
    _id: string
    title: string
    location: string
  }
  