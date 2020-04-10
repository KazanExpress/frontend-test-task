import { Task } from './Task'

export interface SectionI {
  name?: string
  tasks?: Task[]
}

export class Section implements SectionI {
  name: string

  tasks: Task[]

  constructor(obj: SectionI = {}) {
    this.name = obj.name || ''
    this.tasks = obj.tasks || [new Task()]
  }
}
