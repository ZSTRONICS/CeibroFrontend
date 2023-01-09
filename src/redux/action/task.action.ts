import configs, { GET_TASK } from "../../config/task.config"
import { createAction } from './action';

const taskActions = {
    openDrawer: () => {
        return {
                type: configs.OPEN_TASK_DRAWER
            }
    },
    closeDrawer: () => {
        return {
            type: configs.CLOSE_TASK_DRAWER
        }
    },
    setMenue: (id: number) => {
        return {
            type: configs.SET_MENUE,
            payload: id
        }
    }
}

export const getAllTask = createAction(GET_TASK)

export default taskActions