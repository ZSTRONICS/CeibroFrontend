import { GET_MY_ALL_INVITES, SEND_INVITATION } from "../../config/user.config";
import { createAction } from "./action";

export const sendInvitation = createAction(SEND_INVITATION);
export const getMyAllInvites = createAction(GET_MY_ALL_INVITES);

