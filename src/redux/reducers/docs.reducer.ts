import { DOCS_CONFIG } from "config/docs.config";
import { DocsInterface, FileUploaded, FileUploadProgress, File } from "constants/interfaces/docs.interface";
import { ActionInterface } from ".";

interface FileReducerInt {
    fileUploadProgres: FileUploadProgress | any,
    filesUploaded: FileUploaded | any,
    closeFileUploadPreview: boolean
    filesUploadCompleted: DocsInterface | any
    filesBeingUploaded: File[]
    allFilesUploadedDone: boolean
}

const intialStatue: FileReducerInt = {
    fileUploadProgres: [],
    allFilesUploadedDone: false,
    closeFileUploadPreview: false,
    filesUploaded: [],
    filesUploadCompleted: {},
    filesBeingUploaded: [],
}

const DocsReducer = (state = intialStatue, action: ActionInterface): FileReducerInt => {
    switch (action.type) {

        case DOCS_CONFIG.FILE_UPLOAD_PROGRESS:
            return {
                ...state,
                fileUploadProgres: [action.payload, ...state.fileUploadProgres]
            }
        case DOCS_CONFIG.PUSH_FILE_UPLAOD_RESPONSE:
            // let newFiles: File[] = []
            // action.payload.every((file: File) => {
            //     let isAdded = false
            //     state.filesBeingUploaded.every((prevFile: File) => {
            //         if (prevFile._id !== file._id) {
            //             isAdded = true
            //             return false
            //         }
            //         return true
            //     })
            //     if (isAdded) {
            //         newFiles = [...newFiles, file]
            //     }
            //     return true
            // })
            state.closeFileUploadPreview = false
            return {
                ...state,
                filesBeingUploaded: [...action.payload, ...state.filesBeingUploaded] //40
            }

        case DOCS_CONFIG.UPDATE_FILE_UPLAOD_RESPONSE:
            action.payload.every((incomingFile: File) => {
                const fileIndex = state.filesBeingUploaded.findIndex((file: File) => file.fileName === incomingFile.fileName)
                state.filesBeingUploaded[fileIndex] = incomingFile
                return true
            })

            return {
                ...state,
                filesBeingUploaded: [...state.filesBeingUploaded] //40
            }
        case DOCS_CONFIG.FILE_UPLOADED:
            const fileUploadCompletedForFile = action.payload
            const fileIndex = state.filesBeingUploaded.findIndex((file: File) => file._id === fileUploadCompletedForFile._id)
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
                const index = state.filesBeingUploaded.findIndex((file: File) => file._id === fileUp._id)
                state.filesBeingUploaded[index] = fileUp
                state.fileUploadProgres = state.fileUploadProgres.filter((file: FileUploadProgress) => file.fileId !== fileUp._id)
            })
            const remaingFiles = state.filesBeingUploaded.filter((file: File) => file.uploadStatus !== "done")
            if (remaingFiles.length === 0) {
                state.allFilesUploadedDone = true
            }

            return {
                ...state,
                filesBeingUploaded: [...state.filesBeingUploaded],
                fileUploadProgres: [...state.fileUploadProgres]
            }

        case DOCS_CONFIG.CLEAR_FILE_BEING_UPLOADED:
            state.filesBeingUploaded = state.filesBeingUploaded.filter((file: File) => file.uploadStatus !== "done")
            if(state.filesBeingUploaded.length === 0){
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