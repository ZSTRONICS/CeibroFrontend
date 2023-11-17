import { REGISTER } from "redux-persist";
import {
  AUTH_CONFIG,
  CREATE_ROOM,
  FORGET_PASSWORD,
  GET_PROFILE,
  GET_USERS,
  LOGIN,
  LOGOUT,
  OTP_VERIFY,
  REGISTER_CONFIRMATION,
  REGISTER_PROFILE_SETUP,
  RESET_PASSWORD,
  SEND_VERIFY_EMAIL,
  UPDATE_MY_PROFILE,
  UPDATE_PROFILE_PICTURE,
  USER_CHANGE_NUMBER,
  USER_CHANGE_PASSWORD,
  USER_VERIFY_CHANGE_NUMBER
} from "../../config/auth.config";

import { createAction } from "./action";

export const authApiAction = {
  resendOtpRequest: createAction(AUTH_CONFIG.RESEND_OTP),
  registerSetupProfile: createAction(REGISTER_PROFILE_SETUP)
};
export const registerRequest = createAction(REGISTER);
export const registerConfirmationRequest = createAction(REGISTER_CONFIRMATION);
export const UpdateProfilePicture = createAction(UPDATE_PROFILE_PICTURE);

export const loginRequest = createAction(LOGIN);
export const logoutUser = createAction(LOGOUT);

export const getAllusers = createAction(GET_USERS);
export const createChatRoom = createAction(CREATE_ROOM);

export const getMyProfile = createAction(GET_PROFILE);
export const updateMyProfile = createAction(UPDATE_MY_PROFILE);
export const otpVerify = createAction(OTP_VERIFY);
export const forgetPassword = createAction(FORGET_PASSWORD);
export const resetPassword = createAction(RESET_PASSWORD);
export const verifyEmail = createAction(SEND_VERIFY_EMAIL);
export const changePassword = createAction(USER_CHANGE_PASSWORD);
export const changeNumber = createAction(USER_CHANGE_NUMBER);
export const verifyChangeNumber = createAction(USER_VERIFY_CHANGE_NUMBER);
