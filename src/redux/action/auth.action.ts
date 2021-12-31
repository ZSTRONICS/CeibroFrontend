import { LOGIN } from "../../config/auth.config"
import { createAction } from "./action"


export const loginRequest = createAction(LOGIN)
