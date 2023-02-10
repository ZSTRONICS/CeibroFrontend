import { DOCS_CONFIG } from "config/docs.config";
import { DocsInterface, FileUploaded, FileUploadProgress } from "constants/interfaces/docs.interface";
import { stat } from "fs";
import { ActionInterface } from ".";

interface FileReducerInt {
    fileUploadProgres:FileUploadProgress | any,
    filesUploaded:FileUploaded | any,
    filesUploadCompleted:DocsInterface | any
}

const intialStatue: FileReducerInt = {
    fileUploadProgres:[],
    filesUploaded:[],
    filesUploadCompleted:{},
}

const DocsReducer = (state = intialStatue, action: ActionInterface): FileReducerInt => {
    switch (action.type) {

        case DOCS_CONFIG.FILE_UPLOAD_PROGRESS:
            return {
                ...state,
                fileUploadProgres: [action.payload, ...state.fileUploadProgres]
            }
        case DOCS_CONFIG.FILE_UPLOADED: 
            console.log('DOCS_CONFIG.FILE_UPLOADED',action.payload)
            return {
                ...state,
                filesUploaded:[action.payload, ...state.filesUploaded]
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