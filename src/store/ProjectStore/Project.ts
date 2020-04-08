import { nanoid } from 'nanoid'
import { Task } from './Task'

export interface ProjectI {
  title?: string
  tasks?: Task[]
  search?: { value: string; isVisible: boolean }
  text?: string
  id?: string
}

export class Project implements ProjectI {
  title: string

  tasks: Task[]

  search: { value: string; isVisible: boolean }

  text: string

  id: string

  constructor({ id, title, search, tasks, text }: ProjectI = {}) {
    this.id = id || nanoid(6)
    this.title = title || 'Project'
    this.search = search || { value: '', isVisible: false }
    this.tasks = tasks || []
    this.text = text || ''
  }
}
