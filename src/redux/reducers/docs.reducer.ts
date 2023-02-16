import { DOCS_CONFIG } from "config/docs.config";
import { DocsInterface, FileUploaded, FileUploadProgress, File } from "constants/interfaces/docs.interface";
import { ActionInterface } from ".";

interface FileReducerInt {
    fileUploadProgres: FileUploadProgress | any,
    filesUploaded: FileUploaded | any,
    filesUploadCompleted: DocsInterface | any
    filesBeingUploaded: File[]
    allFilesUploadedDone: boolean
}

const intialStatue: FileReducerInt = {
    fileUploadProgres: [],
    allFilesUploadedDone:false,
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
            let newFiles: File[] = []
            action.payload.every((file: File) => {
                let isAdded = false
                state.filesBeingUploaded.every((prevFile: File) => {
                    if (prevFile._id !== file._id) {
                        isAdded = true
                        return false
                    }
                    return true
                })
                if (isAdded) {
                    newFiles = [...newFiles, file]
                }
                return true
            })

            return {
                ...state,
                filesBeingUploaded: [...state.filesBeingUploaded, ...newFiles] //40
            }
        case DOCS_CONFIG.FILE_UPLOADED:
            const upComingFile = action.payload._id
            const isExist = state.filesUploaded.some((file:File)=> file._id === upComingFile)
            if (!isExist) {
                state.allFilesUploadedDone = false;
            }
            return {
                ...state,
                filesUploaded: [action.payload, ...state.filesUploaded]
            }
        case DOCS_CONFIG.FILES_UPLOAD_COMPLETED:
             const checkAllStatusDone = action.payload?.files
             .every((files:File)=> files?.uploadStatus=== action.payload?.files[0].uploadStatus)
             if (checkAllStatusDone) {
                state.filesUploaded = [...action.payload.files]
            }
            return {
                ...state,
                filesUploadCompleted: action.payload,
                allFilesUploadedDone: checkAllStatusDone,
            }
        default:
            return state
    }
}

export default DocsReducer