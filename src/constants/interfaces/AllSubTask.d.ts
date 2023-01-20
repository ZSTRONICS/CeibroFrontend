import { SubtaskInterface } from "./subtask.interface"

// export interface AllSubtasksOfTaskRoot {
//     results: AllSubtasksOfTaskResult
// }

export interface AllSubtasksOfTaskResult {
    task: Task
    subtasks: SubtaskInterface[]
}

export interface AllSubtasksForUserRoot {
    results: SubtaskInterface[]
}
