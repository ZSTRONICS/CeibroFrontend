import { SEND_INVITATION } from "../../config/user.config";
import { createAction } from "./action";

export const sendInvitation = createAction(SEND_INVITATION);
