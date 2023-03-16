import { Creator } from "./project.interface"

export interface DocsInterface {
  results: FileUploadResponse
}

export interface FileUploadProgress {
  file: FileInterface
  fileId: string
  uploadedSize: number
  totalSize: number
  progress: number
}

export interface FileUploadResponse {
  files: FileInterface[]
  moduleName: string
  moduleId: string
}

export interface FileInterface {
  access: Creator[]
  version: number
  _id: string
  fileSize: number
  progress?: number
  uploadedBy: Creator
  fileUrl: string
  fileType: string
  fileName: string
  uploadStatus: string
  moduleType: string
  moduleId: string
  createdAt?: string
  updatedAt?: string
}



export interface FileUploaded extends FileInterface {
  module: string
  eventType: string
  data: FileInterface
}

// get all docs by moduleName and id 
export interface DocsInterfaceRoot {
  result: GetAllDocsInterface[]
}

export interface GetAllDocsInterface extends FileInterface {}