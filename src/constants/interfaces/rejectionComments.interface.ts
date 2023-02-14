import { UserInfo } from "./subtask.interface"

export interface RejectionCommentRoot {
    [x: string]: any
    rejectionComments: RejectionComment[]
    _id: string
  }

  export interface RejectionComment {
    _id: string
    creator: Creator
    comment: string
  }
  export interface RejectedComment{
    name:string,
    _id:string,
    description: string,
  }
  export interface Creator extends UserInfo {}