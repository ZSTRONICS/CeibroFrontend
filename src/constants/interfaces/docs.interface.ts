
export interface DocsInterface {
  results: FileUploadCompleted
}

export interface FileUploadProgress {
  fileId: string
  uploadedSize: number
  totalSize: number
  progress: number
}

export interface FileUploadCompleted {
  files: File[]
  moduleName: string
  moduleId: string
}

export interface File {
  access: string[]
  version: number
  _id: string
  uploadedBy: string
  fileUrl: string
  fileType: string
  fileName: string
  uploadStatus: string
  moduleType: string
  moduleId: string
  createdAt: string
  updatedAt: string
}

export interface FileUploaded extends File {
  module: string
  eventType: string
  data: Data
}

export interface Data extends File { }

