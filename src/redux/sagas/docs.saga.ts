

import { DOCS_CONFIG } from "config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const getDocsByModuleNameAndId = apiCall({
  useV2Route: false,
  type: DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID,
  method: "get",
  path: (payload) => {
    let url = `/docs/viewFiles/${payload.other.moduleName}/${payload.other.moduleId}`
    return url
  }
})

const uploadDocsByModuleNameAndId = apiCall({
  useV2Route: false,
  type: DOCS_CONFIG.UPLOAD_DOCS_BY_MODULNAME_AND_ID,
  method: "post",
  isFormData: true,
  path: `/docs/upload`

})

function* docsSaga() {
  yield takeLatest(DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID, getDocsByModuleNameAndId)
  yield takeLatest(DOCS_CONFIG.UPLOAD_DOCS_BY_MODULNAME_AND_ID, uploadDocsByModuleNameAndId)
}

export default docsSaga