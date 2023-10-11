import { Reducer, combineReducers } from "redux";
import authReducer from "./auth.reducer";
import DocsReducer from "./docs.reducer";
import navigationReducer from "./navigation.reducer";
import projectReducer from "./project.reducer";
import TaskReducer from "./task.reducer";
import userReducer from "./user.reducer";
interface Reducers {
  [key: string]: Reducer<any, any>;
}

const appReducer = combineReducers<Reducers>({
  navigation: navigationReducer,
  project: projectReducer,
  task: TaskReducer,
  docs: DocsReducer,
  auth: authReducer,
  user: userReducer,
});


export default appReducer;

export type RootState = ReturnType<typeof appReducer>;

export interface ActionInterface<T = any> {
  type: string;
  payload: T;
}
