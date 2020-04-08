import { nanoid } from 'nanoid'

export interface TaskI {
  title?: string
  id?: string
  completed?: boolean
  description?: string
}

export class Task implements TaskI {
  title: string

  id: string

  completed: boolean

  description: string

  constructor({ id, title, description, completed }: TaskI = {}) {
    this.completed = completed || false
    this.description = description || ''
    this.id = id || nanoid()
    this.title = title || ''
  }
}
