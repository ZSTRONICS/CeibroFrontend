import { ActionInterface } from "../reducers";

interface CreateAction {
    body?: any;
    params?: any;
    success?: (res: any, action: ActionInterface) => void;
    other?: any;
}

// Generic method for action dispatch and for apiCall.js templatee
export function createAction(type: string) {
    return (payload: CreateAction = {}) => ({
        type,
        payload: {
            body: payload.body,
            params: payload.params,
            success: payload.success,
            other: payload.other
        }
    })
}