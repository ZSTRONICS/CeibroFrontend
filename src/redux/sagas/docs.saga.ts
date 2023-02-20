
import { DOCS_CONFIG } from "config/docs.config";
import { takeLatest } from "redux-saga/effects";
import apiCall from "utills/apiCall";

const getDocsByModuleNameAndId = apiCall({
  type: DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID,
  method: "get",
  path: (payload) => {
    let url = `/docs/viewFiles/${payload.other.moduleName}/${payload.other.moduleId}`
    return url
  }
})

function* docsSaga() {
  yield takeLatest(DOCS_CONFIG.GET_DOCS_BY_MODULNAME_AND_ID, getDocsByModuleNameAndId)
}

export default docsSaga