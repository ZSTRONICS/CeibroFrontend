import { combineReducers } from 'redux'
import appReducer from './app.reducer'
import projectReducer from './project.reducer'
import taskReducer from './task.reducer'
import authReducer from './auth.reducer'
import chatReducer from './chat.reducer'

const rootReducer  = combineReducers({
    app: appReducer,
    project: projectReducer,
    task: taskReducer,
    auth: authReducer,
    chat: chatReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

export interface ActionInterface {
    type: string
    payload: any
}