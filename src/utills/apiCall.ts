import { toast } from "react-toastify";
import { call, put, select } from "redux-saga/effects";
// import { SHOW_TOAST } from "../redux/constants";
import axios from "./axios";
import { requestFail, requestPending, requestSuccess } from "./status";

const SHOW_TOAST = 'sld'

interface ApiCall {
  type: string;
  method: "post" | "get" | "delete" | "put" | "patch";
  path?: string | ((payload: any) => string);
  success?: (res: any, action: any) => void;
  isFormData?: boolean;
  isBlob?: boolean
}

const apiCall = ({ type, method, path, success, isFormData, isBlob }: ApiCall): any  =>
  function* (action: any): Generator<any> {
    const { body, params, success: successPayload } = action.payload || {};
    const idToken = localStorage.getItem("tokens");

    let header: any = {};

    if (!isFormData) {
      header = {
        "Content-Type": "application/json"
      };
    }
    header["Access-Control-Allow-Origin"] = "*";

    if (idToken) {
      header["Authorization"] = `Bearer ${JSON.parse(idToken).access.token}`;
    }

    try {
      yield put({
        type: requestPending(type)
      });

      let options: any = {
        url: `${typeof path === "function" ? path(action.payload) : path}`,
        method: method,
        headers: header,
        data: body,
        params,
      };

      if (isBlob) {
        options.responseType = "blob";
      }

      const res: any = yield call(axios.request, options);
      const oldState = yield select(state => state)
      yield put({
        type: requestSuccess(type),
        payload: res.data,
        oldState
      });

      successPayload && successPayload(res);
      success && success(res, action);
    } catch (err: any) {
      yield put({
        type: requestFail(type),
        payload: err
      });

      toast.error(err?.message || "Unknow error");
      // yield put({
      //   type: SHOW_TOAST,
      //   payload: { toastMessage: err?.message, toastVisible: true, error: true }
      // });
    }
  };
export default apiCall;
