import appReducer, { ActionInterface } from "."

const rootReducer = (state: any, action: ActionInterface) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action)
}

export default rootReducer;