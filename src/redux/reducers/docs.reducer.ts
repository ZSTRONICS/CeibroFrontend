import { DOCS_CONFIG } from "config/docs.config";
import { DocsInterface, FileUploaded, FileUploadProgress, FileInterface, DocsInterfaceRoot } from "constants/interfaces/docs.interface";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { ActionInterface } from ".";

interface FilesToBeUploaded {
    files: any[],
    moduleName: string,
    moduleId: string
}

interface FileReducerInt {
    uploadPendingFiles: boolean,
    selectedFilesToBeUploaded: FilesToBeUploaded,
    fileUploadProgres: FileUploadProgress | any,
    filesUploaded: FileUploaded | any,
    showFileUploadPreview: boolean
    filesUploadCompleted: DocsInterface | any
    filesBeingUploaded: FileInterface[]
    filesBeingUploadedCount: number
    allFilesUploadedDone: boolean
    getAllDocsByModule: FileInterface[]
    loadinggetAllDocs: boolean
}

const intialStatue: FileReducerInt = {
    uploadPendingFiles: false,
    selectedFilesToBeUploaded: { files: [], moduleName: "", moduleId: "" },
    fileUploadProgres: [],
    loadinggetAllDocs: false,
    getAllDocsByModule: [],
    filesBeingUploadedCount: 0,
    allFilesUploadedDone: false,
    showFileUploadPreview: false,
    filesUploaded: [],
    filesUploadCompleted: {},
    filesBeingUploaded: [],
}

const DocsReducer = (state = intialStatue, action: ActionInterface): FileReducerInt => {
    switch (action.type) {
        case requestPending(DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID): {
            return {
                ...state,
                loadinggetAllDocs: true,
            };
        }
        case requestSuccess(DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID):
            state.getAllDocsByModule = action.payload.result.reverse()
            return {
                ...state,
                getAllDocsByModule: [...state.getAllDocsByModule],
                loadinggetAllDocs: false,

            }
        case requestFail(DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID): {
            return {
                ...state,
                loadinggetAllDocs: false,

            };
        }

        case DOCS_CONFIG.FILE_UPLOAD_PROGRESS:
            return {
                ...state,
                fileUploadProgres: [action.payload, ...state.fileUploadProgres]
            }
        case DOCS_CONFIG.PUSH_FILE_UPLAOD_RESPONSE:
            state.filesBeingUploaded = [...action.payload, ...state.filesBeingUploaded]
            state.filesBeingUploadedCount = state.filesBeingUploaded.length
            return {
                ...state,
                filesBeingUploaded: [...state.filesBeingUploaded],
                showFileUploadPreview: true,
                allFilesUploadedDone: false
                // loadinggetAllDocs: true
            }

        case DOCS_CONFIG.UPDATE_FILE_UPLAOD_RESPONSE:
            action.payload.every((incomingFile: FileInterface) => {
                const fileIndex = state.filesBeingUploaded.findIndex((file: FileInterface) => file.fileName === incomingFile.fileName)
                state.filesBeingUploaded[fileIndex] = incomingFile
                return true
            })

            return {
                ...state,
                filesBeingUploaded: [...state.filesBeingUploaded] //40
            }
        case DOCS_CONFIG.FILE_UPLOADED:
            const fileUploadCompletedForFile = action.payload
            const fileIndex = state.filesBeingUploaded.findIndex((file: FileInterface) => file._id === fileUploadCompletedForFile._id)
            const uploadProgressIndex = state.fileUploadProgres.findIndex((file: FileUploadProgress) => file.fileId === fileUploadCompletedForFile._id)
            if (fileIndex > -1) {
                state.filesBeingUploaded[fileIndex] = action.payload
            }
            if (uploadProgressIndex > -1) {
                state.fileUploadProgres[uploadProgressIndex].progress = 100
            }
            return {
                ...state,
                filesBeingUploaded: [...state.filesBeingUploaded],
                fileUploadProgres: [...state.fileUploadProgres]
            }
        case DOCS_CONFIG.FILES_UPLOAD_COMPLETED:
            const uploadedFiles = action.payload.files
            uploadedFiles.forEach((fileUp: any) => {
                const index = state.filesBeingUploaded.findIndex((file: FileInterface) => file._id === fileUp._id)
                state.filesBeingUploaded[index] = fileUp
                state.fileUploadProgres = state.fileUploadProgres.filter((file: FileUploadProgress) => file.fileId !== fileUp._id)
            })
            const remaingFiles = state.filesBeingUploaded.filter((file: FileInterface) => file.uploadStatus !== "done")
            if (remaingFiles.length === 0) {
                state.allFilesUploadedDone = true
            }

            return {
                ...state,
                filesBeingUploadedCount: remaingFiles.length,
                filesBeingUploaded: [...state.filesBeingUploaded],
                fileUploadProgres: [...state.fileUploadProgres]
            }

        case DOCS_CONFIG.CLEAR_FILE_BEING_UPLOADED:
            let previewerVal = true
            let files = state.filesBeingUploaded.filter((file: FileInterface) => file.uploadStatus !== "done")
            if (files.length === 0) {
                previewerVal = false
            }

            return {
                ...state,
                filesBeingUploaded: [...files],
                showFileUploadPreview: previewerVal
            }

        case DOCS_CONFIG.SET_SELECTED_FILES_TO_BE_UPLOADED: 
            return {
                ...state,
                selectedFilesToBeUploaded: action.payload,
            }

        case DOCS_CONFIG.UPLAOD_FILES_NOW: 
            return {
                ...state,
                selectedFilesToBeUploaded: action.payload,
                uploadPendingFiles: true
            }

        case DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED:
            return {
                ...state,
                selectedFilesToBeUploaded: { files: [], moduleName: "", moduleId: "" },
                uploadPendingFiles: false
            }

        case DOCS_CONFIG.SET_SELECTED_MODULE_ID:
            if (state.selectedFilesToBeUploaded.files.length > 0) {
                state.selectedFilesToBeUploaded.moduleId = action.payload
                return {
                    ...state,
                    selectedFilesToBeUploaded: { ...state.selectedFilesToBeUploaded },
                    uploadPendingFiles: true
                }
            } else {
                return {
                    ...state,
                    selectedFilesToBeUploaded: { files: [], moduleName: "", moduleId: "" },
                    uploadPendingFiles: false
                }
            }

        default:
            return state
    }
}

export default DocsReducer