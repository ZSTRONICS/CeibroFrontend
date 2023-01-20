import { TaskInterface } from "./task.interface"

export interface TaskRoot {
  results: TaskInterface[]
  page?: number
  limit?: number
  totalPages?: number
  totalResults?: number
}

