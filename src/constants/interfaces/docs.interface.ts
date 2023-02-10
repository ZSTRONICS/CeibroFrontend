export interface Docs {
    results: Results
  }
  
  export interface Results {
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
  