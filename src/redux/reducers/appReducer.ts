import { Reducer, combineReducers } from "redux";
import navigationReducer from "./navigation.reducer";
import projectReducer from "./project.reducer";
import TaskReducer from "./task.reducer";
import authReducer from "./auth.reducer";
import chatReducer from "./chat.reducer";
import userReducer from "./user.reducer";
import DocsReducer from "./docs.reducer";

interface Reducers {
  [key: string]: Reducer<any, any>;
}

const appReducer = combineReducers<Reducers>({
  navigation: navigationReducer,
  project: projectReducer,
  task: TaskReducer,
  docs: DocsReducer,
  auth: authReducer,
  chat: chatReducer,
  user: userReducer,
});


export default appReducer;

export type RootState = ReturnType<typeof appReducer>;

export interface ActionInterface {
  type: string;
  payload: any;
}
