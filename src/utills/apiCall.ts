
import { toast } from 'react-toastify'
import { call, put, select } from 'redux-saga/effects'
import { logoutUser } from '../redux/action'
import { RootState } from '../redux/reducers'
import { AxiosV1, AxiosV2 } from './axios'
import { requestFail, requestPending, requestSuccess } from './status'

interface ApiCall {
  type: string
  method: 'post' | 'get' | 'delete' | 'put' | 'patch'
  path?: string | ((payload: any, store?: RootState) => string)
  success?: (res: any, action: any) => void
  onFailSaga?: (err: any) => void
  finallySaga?: () => void
  isFormData?: boolean
  isUrlEncodedData?: boolean
  useOtpToken?: boolean
  otpToken?: ((payload: any) => string)
  isBlob?: boolean
  useV2Route: boolean
}

const apiCall = ({
  type,
  method,
  isUrlEncodedData,
  path,
  success,
  onFailSaga,
  finallySaga,
  isFormData,
  isBlob,
  useV2Route,
  useOtpToken,
  otpToken,
}: ApiCall): any =>
  function* (action: any): Generator<any> {
    const {
      body,
      params,
      success: successPayload,
      onFailAction,
      finallyAction,
      showErrorToast = true,
    } = action.payload || {}
    let idToken = null
    let header: any = {}
    if (useOtpToken) {
      header['Authorization'] = `Bearer ${otpToken}`
    } else {
      idToken = localStorage.getItem('tokens')
    }

    if (isUrlEncodedData) {
      header = {
        "Content-Type": "application/x-www-form-urlencoded",
      }

    } else {
      if (!isFormData) {
        header = {
          'Content-Type': 'application/json',
        }


      } else {
        header = {
          'Content-Type': 'multipart/form-data',
        }
      }
    }
    header['Access-Control-Allow-Origin'] = '*'

    const tokenLessRoutes = [
      "/auth/login",
      "/auth/veify-email",
      // "/auth/register",
      "/auth/otp/verify",
      `/auth/forget-password`,
      "/auth/otp/verify-nodel",
      "/auth/reset-password"
    ]
    console.log('idToken==>1', idToken, otpToken)

    if (!tokenLessRoutes.includes(`${path}`)) {
      console.log('idToken', idToken)
      if (idToken && idToken !== 'undefined' && idToken !== 'null') {
        console.log('Authorization', idToken)
        header['Authorization'] = `Bearer ${JSON.parse(idToken)?.access?.token}`
      }
    }

    try {
      yield put({
        type: requestPending(type),
      })

      //@ts-ignore
      const store: RootState = yield select(state => state)

      let options: any = {
        url: `${typeof path === 'function' ? path(action.payload, store) : path}`,
        method: method,
        headers: header,
        data: body,
        params,
      }

      if (isBlob) {
        options.responseType = 'blob'
      }
      let res: any;
      if (useV2Route) {
        res = yield call(AxiosV2.request, options)
      } else {
        res = yield call(AxiosV1.request, options)
      }
      const oldState = yield select(state => state)
      yield put({
        type: requestSuccess(type),
        payload: res.data,
        oldState,
      })

      successPayload && successPayload(res)
      success && success(res, action)
    } catch (err: any) {
      onFailAction && onFailAction(err)
      onFailSaga && onFailSaga(err)

      yield put({
        type: requestFail(type),
        payload: err,
      })

      if (showErrorToast) {
        if (
          err?.response?.status === 401 ||
          err?.response?.status === 406 ||
          err?.response?.status === 423
        ) {
          yield put(logoutUser())
          return
        }

        const msg = err?.response?.data?.message || err?.message || 'Unknown error'

        toast.error(msg)
      }
    } finally {
      finallySaga?.()
      finallyAction?.()
    }
  }
export default apiCall
