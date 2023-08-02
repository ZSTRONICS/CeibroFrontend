export interface RejectionCommentRoot {
    [x: string]: any
    rejectionComments: RejectionComment[]
    _id: string
  }

  export interface RejectionComment {
    _id: string
    creator: UserInfo
    comment: string
    createdAt: string
    updatedAt: string
  }
  export interface RejectedComment{
    name:string,
    _id:string,
    description: string,
  }