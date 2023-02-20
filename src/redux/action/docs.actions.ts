import { DOCS_CONFIG } from 'config/docs.config';
import { createAction } from './action';

const docsAction = {
    
    getDocsByModuleNameAndId: createAction(DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID)
    
    // do it later while refactoring uploading docs of task move here   

}

export default docsAction