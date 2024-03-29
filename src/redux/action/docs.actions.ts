import { DOCS_CONFIG } from 'config/docs.config';
import { createAction } from './action';

const docsAction = {
    getDocsByModuleNameAndId: createAction(DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID),
    uploadDocsByModuleNameAndId: createAction(DOCS_CONFIG.UPLOAD_DOCS_BY_MODULNAME_AND_ID),
    getDrawingFileDZIUrls: createAction(DOCS_CONFIG.GET_DRAWING_FILE_DZIURLS)
}

export default docsAction