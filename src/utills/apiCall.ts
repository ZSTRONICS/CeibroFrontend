import { toast } from "react-toastify";
import { call, put, select } from "redux-saga/effects";
import axios from "./axios";
import { requestFail, requestPending, requestSuccess } from "./status";

interface ApiCall {
  type: string;
  method: "post" | "get" | "delete" | "put" | "patch";
  path?: string | ((payload: any) => string);
  success?: (res: any, action: any) => void;
  onFailSaga?: (err: any) => void;
  finallySaga?: () => void;
  isFormData?: boolean;
  isBlob?: boolean;
}

const apiCall = ({
  type,
  method,
  path,
  success,
  onFailSaga,
  finallySaga,
  isFormData,
  isBlob,
}: ApiCall): any =>
  function* (action: any): Generator<any> {
    const {
      body,
      params,
      success: successPayload,
      onFailAction,
      finallyAction,
      showErrorToast = true,
    } = action.payload || {};
    const idToken = localStorage.getItem("tokens");

    let header: any = {};

    if (!isFormData) {
      header = {
        "Content-Type": "application/json",
      };
    }
    header["Access-Control-Allow-Origin"] = "*";

    if (idToken && idToken !== "undefined" && idToken !== "null") {
      console.log("hader is ", typeof idToken);
      header["Authorization"] = `Bearer ${JSON.parse(idToken)?.access?.token}`;
    }

    try {
      yield put({
        type: requestPending(type),
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
      const oldState = yield select((state) => state);
      yield put({
        type: requestSuccess(type),
        payload: res.data,
        oldState,
      });

      successPayload && successPayload(res);
      success && success(res, action);
    } catch (err: any) {
      onFailAction && onFailAction(err);
      onFailSaga && onFailSaga(err);
      if (showErrorToast) {
        yield put({
          type: requestFail(type),
          payload: err,
        });

        const msg =
          err?.response?.data?.message || err?.message || "Unknown error";

        toast.error(msg);
      }
    } finally {
      finallySaga?.();
      finallyAction?.();
    }
  };
export default apiCall;
