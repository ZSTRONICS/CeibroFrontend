import { REGISTER } from "redux-persist";
import {
  LOGIN,
  GET_USERS,
  CREATE_ROOM,
  LOGOUT,
  GET_PROFILE,
  UPDATE_MY_PROFILE,
  OTP_VERIFY,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  VERIFY_EMAIL,
  SEND_VERIFY_EMAIL,
  REGISTER_CONFIRMATION,
  REGISTER_PROFILE_SETUP,
  UPDATE_PROFILE_PICTURE,
  AUTH_CONFIG,
  USER_CHANGE_PASSWORD,
  USER_CHANGE_NUMBER,
  USER_VERIFY_CHANGE_NUMBER,
} from "../../config/auth.config";

import { createAction } from "./action";

export const authApiAction = {
  resendOtpRequest: createAction(AUTH_CONFIG.RESEND_OTP),
};
export const registerRequest = createAction(REGISTER);
export const registerConfirmationRequest = createAction(REGISTER_CONFIRMATION);
export const registerSetupProfile = createAction(REGISTER_PROFILE_SETUP);
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
