import { SubtaskInterface } from "./subtask.interface"
import { TaskInterface } from "./task.interface"

// export interface AllSubtasksOfTaskRoot {
//     results: AllSubtasksOfTaskResult
// }

export interface AllSubtasksOfTaskResult {
    task: TaskInterface
    subtasks: SubtaskInterface[]
}

export interface AllSubtasksForUserRoot {
    results: SubtaskInterface[]
}
