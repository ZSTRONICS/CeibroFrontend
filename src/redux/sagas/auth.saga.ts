import { REGISTER } from "redux-persist";
import { toast } from "react-toastify";
import { takeLatest } from "redux-saga/effects";
import {
  CREATE_ROOM,
  FORGET_PASSWORD,
  GET_PROFILE,
  LOGIN,
  OTP_VERIFY,
  REGISTER_CONFIRMATION,
  RESET_PASSWORD,
  SEND_VERIFY_EMAIL,
  UPDATE_MY_PROFILE,
  VERIFY_EMAIL,
  REGISTER_PROFILE_SETUP,
} from "../../config/auth.config";
import apiCall from "../../utills/apiCall";
import { ActionInterface } from "../reducers";

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
    console.error("it is failed", err);
  },
});

const registerRequest = apiCall({
  useV2Route: true,
  type: REGISTER,
  method: "post",
  path: "/auth/register",
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
    toast.success("Verifieid your number");
  },
});

const registerSetupProfile = apiCall({
  useV2Route: true,
  type: REGISTER_PROFILE_SETUP,
  method: "post",
  path: (payload) => `/users/${payload?.other}/profile`,
  success: (_res: any) => {
    toast.success("Successfully setup profile");
  },
});

const createChatRoom = apiCall({
  useV2Route: false,
  type: CREATE_ROOM,
  method: "post",
  path: "/chat/rooms",
  success: (_res: any, _action: ActionInterface) => {
    toast.success("Chat room created successfully");
  },
});

const getMyProfile = apiCall({
  useV2Route: false,
  type: GET_PROFILE,
  method: "get",
  path: "/users/profile",
});

const otpVerify = apiCall({
  useV2Route: false,
  type: OTP_VERIFY,
  method: "post",
  path: (payload) => `/auth/verify-email?otp=${payload?.other}`,
});

const updateMyProfile = apiCall({
  useV2Route: false,
  type: UPDATE_MY_PROFILE,
  method: "patch",
  path: "/users/profile",
});

const forgetPassword = apiCall({
  useV2Route: false,
  type: FORGET_PASSWORD,
  method: "post",
  path: `/auth/forgot-password`,
});

const resetPassword = apiCall({
  useV2Route: false,
  type: RESET_PASSWORD,
  method: "post",
  path: (payload) => `/auth/reset-password?token=${payload?.other}`,
  // reset-password?otp=grgdfvdf
});

const sendVerifyEmail = apiCall({
  useV2Route: false,
  type: SEND_VERIFY_EMAIL,
  method: "post",
  path: `/auth/send-verification-email`,
});

function* projectSaga() {
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(REGISTER, registerRequest);
  yield takeLatest(REGISTER_CONFIRMATION, registerConfirmationRequest);
  yield takeLatest(REGISTER_PROFILE_SETUP, registerSetupProfile);
  yield takeLatest(CREATE_ROOM, createChatRoom);
  yield takeLatest(VERIFY_EMAIL, verifyEmail);
  yield takeLatest(GET_PROFILE, getMyProfile);
  yield takeLatest(UPDATE_MY_PROFILE, updateMyProfile);
  yield takeLatest(OTP_VERIFY, otpVerify);
  yield takeLatest(FORGET_PASSWORD, forgetPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeLatest(SEND_VERIFY_EMAIL, sendVerifyEmail);
}

export default projectSaga;
