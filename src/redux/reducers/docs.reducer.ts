import { DOCS_CONFIG } from "config/docs.config";
import { DocsInterface, FileUploaded, FileUploadProgress, FileInterface, DocsInterfaceRoot } from "constants/interfaces/docs.interface";
import { requestFail, requestPending, requestSuccess } from "utills/status";
import { ActionInterface } from ".";

interface FileReducerInt {
    fileUploadProgres: FileUploadProgress | any,
    filesUploaded: FileUploaded | any,
    closeFileUploadPreview: boolean
    filesUploadCompleted: DocsInterface | any
    filesBeingUploaded: FileInterface[]
    allFilesUploadedDone: boolean
    getAllDocsByModule: FileInterface[]
    loadinggetAllDocs: boolean
}

const intialStatue: FileReducerInt = {
    fileUploadProgres: [],
    loadinggetAllDocs: false,
    getAllDocsByModule: [],
    allFilesUploadedDone: false,
    closeFileUploadPreview: false,
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
            return {
                ...state,
                filesBeingUploaded: [...action.payload, ...state.filesBeingUploaded],
                closeFileUploadPreview: false,
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
            state.filesBeingUploaded[fileIndex] = action.payload

            const uploadProgressIndex = state.fileUploadProgres.findIndex((file: FileUploadProgress) => file.fileId === fileUploadCompletedForFile._id)
            state.fileUploadProgres[uploadProgressIndex].progress = 100


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
                filesBeingUploaded: [...state.filesBeingUploaded],
                fileUploadProgres: [...state.fileUploadProgres]
            }

        case DOCS_CONFIG.CLEAR_FILE_BEING_UPLOADED:
            state.filesBeingUploaded = state.filesBeingUploaded.filter((file: FileInterface) => file.uploadStatus !== "done")
            if (state.filesBeingUploaded.length === 0) {
                state.closeFileUploadPreview = true
            }
            return {
                ...state,
                filesBeingUploaded: [...state.filesBeingUploaded]
            }
        default:
            return state
    }
}

export default DocsReducer