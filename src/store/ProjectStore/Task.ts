import { nanoid } from 'nanoid'

export interface TaskI {
  title?: string
  id?: string
  completed?: boolean
  description?: string
  subTasks?: Task[]
}

export class Task implements TaskI {
  title: string

  id: string

  completed: boolean

  description: string

  subTasks: Task[]

  constructor({ id, title, description, completed, subTasks }: TaskI = {}) {
    this.completed = completed || false
    this.description = description || ''
    this.id = id || nanoid()
    this.title = title || ''
    this.subTasks = subTasks || []
  }
}
