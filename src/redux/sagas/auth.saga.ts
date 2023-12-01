import {
  AUTH_CONFIG,
  FORGET_PASSWORD,
  GET_PROFILE,
  LOGIN,
  OTP_VERIFY,
  REGISTER_CONFIRMATION,
  REGISTER_PROFILE_SETUP,
  RESET_PASSWORD,
  UPDATE_MY_PROFILE,
  UPDATE_PROFILE_PICTURE,
  USER_CHANGE_NUMBER,
  USER_CHANGE_PASSWORD,
  USER_VERIFY_CHANGE_NUMBER,
  VERIFY_EMAIL
} from "config";
import { toast } from "react-toastify";
import { REGISTER } from "redux-persist";
import { takeLatest } from "redux-saga/effects";
import apiCall from "../../utills/apiCall";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const loginRequest = apiCall({
  useV2Route: true,
  type: LOGIN,
  method: "post",
  path: "/auth/login",
});

const verifyEmail = apiCall({
  useV2Route: false,
  type: VERIFY_EMAIL,
  method: "post",
  path: "/auth/veify-email",
  onFailSaga: (err) => {
    console.error("Failed to verify", err);
  },
});

const registerRequest = apiCall({
  useV2Route: true,
  type: REGISTER,
  method: "post",
  path: "/auth/register",
  onFailSaga: (err) => {
    console.error("Failed to register", err);
  },
  success: (_res: any) => {
    toast.success("Verification code sent on your number");
  },
});

const registerConfirmationRequest = apiCall({
  useV2Route: true,
  type: REGISTER_CONFIRMATION,
  method: "post",
  path: "/auth/otp/verify",
  success: (_res: any) => {
    toast.success("Phone number verification successful");
  },
});

const resendOtp = apiCall({
  useV2Route: true,
  type: AUTH_CONFIG.RESEND_OTP,
  method: "post",
  path: "auth/otp/resend",
});

const getAuthApiToken = apiCall({
  type: AUTH_CONFIG.GET_AUTH_API_TOKEN,
  useV2Route: true,
  isUrlEncodedData: true,
  path: "auth/token",
  method: "post",
})

const registerSetupProfile = apiCall({
  useV2Route: true,
  type: REGISTER_PROFILE_SETUP,
  method: "post",
  path: (payload) => `/users/${payload.other}/profile`,
});

const getMyProfile = apiCall({
  useV2Route: false,
  type: GET_PROFILE,
  method: "get",
  path: "/users/profile",
});

const updateProfilePicture = apiCall({
  useV2Route: true,
  isFormData: true,
  type: UPDATE_PROFILE_PICTURE,
  method: "patch",
  path: "/users/profile/pic",
});

const updateMyProfile = apiCall({
  useV2Route: true,
  type: UPDATE_MY_PROFILE,
  method: "patch",
  path: "/users/profile",
});

const forgetPassword = apiCall({
  useV2Route: true,
  type: FORGET_PASSWORD,
  method: "post",
  useOtpToken: true,
  otpToken: (payload: any) => `${payload.otpToken}`,
  path: `/auth/forget-password`,
});

// otp verify for forget password
const otpVerify = apiCall({
  useV2Route: true,
  type: OTP_VERIFY,
  method: "post",
  path: "/auth/otp/verify-nodel",
});

const changePassword = apiCall({
  useV2Route: true,
  type: USER_CHANGE_PASSWORD,
  method: "post",
  path: `/users/change-password`,
});

const changeNumber = apiCall({
  useV2Route: true,
  type: USER_CHANGE_NUMBER,
  method: "post",
  path: `/users/change-number`,
});

const verifyChangeNumber = apiCall({
  useV2Route: true,
  type: USER_VERIFY_CHANGE_NUMBER,
  method: "post",
  path: `/users/verify/change-number`,
});

const resetPassword = apiCall({
  useV2Route: true,
  type: RESET_PASSWORD,
  method: "post",
  path: "/auth/reset-password",
});

function* projectSaga() {
  yield takeLatest(AUTH_CONFIG.GET_AUTH_API_TOKEN, getAuthApiToken);
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(REGISTER, registerRequest);
  yield takeLatest(REGISTER_CONFIRMATION, registerConfirmationRequest);
  yield takeLatest(AUTH_CONFIG.RESEND_OTP, resendOtp);
  yield takeLatest(REGISTER_PROFILE_SETUP, registerSetupProfile);
  yield takeLatest(VERIFY_EMAIL, verifyEmail);
  yield takeLatest(GET_PROFILE, getMyProfile);
  yield takeLatest(UPDATE_PROFILE_PICTURE, updateProfilePicture);
  yield takeLatest(UPDATE_MY_PROFILE, updateMyProfile);
  yield takeLatest(OTP_VERIFY, otpVerify);
  yield takeLatest(USER_CHANGE_PASSWORD, changePassword);
  yield takeLatest(USER_CHANGE_NUMBER, changeNumber);
  yield takeLatest(FORGET_PASSWORD, forgetPassword);
  yield takeLatest(USER_VERIFY_CHANGE_NUMBER, verifyChangeNumber);
  yield takeLatest(RESET_PASSWORD, resetPassword);
}

export default projectSaga;
