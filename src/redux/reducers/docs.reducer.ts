import { DOCS_CONFIG } from "config/docs.config";
import { DocsInterface, FileUploaded, FileUploadProgress, File } from "constants/interfaces/docs.interface";
import { ActionInterface } from ".";

interface FileReducerInt {
    fileUploadProgres: FileUploadProgress | any,
    filesUploaded: FileUploaded | any,
    filesUploadCompleted: DocsInterface | any
    filesBeingUploaded: File[]
}

const intialStatue: FileReducerInt = {
    fileUploadProgres: [],
    filesUploaded: [],
    filesUploadCompleted: {},
    filesBeingUploaded: []
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
            return {
                ...state,
                filesUploaded: [action.payload, ...state.filesUploaded]
            }
        case DOCS_CONFIG.FILES_UPLOAD_COMPLETED:

            return {
                ...state,
                filesUploadCompleted: action.payload
            }
        default:
            return state
    }
}

export default DocsReducer