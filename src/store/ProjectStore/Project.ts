import { nanoid } from 'nanoid'
import { Task } from './Task'
import { Section } from './Section'

export interface SearchI {
  value: string
  isVisible: boolean
}

export interface ProjectI {
  title?: string
  sections?: Section[]
  search?: SearchI
  text?: string
  id?: string
}

export class Project implements ProjectI {
  title: string

  search: SearchI

  text: string

  id: string

  sections: Section[]

  constructor({ id, title, search, text, sections }: ProjectI = {}) {
    this.id = id || nanoid(6)
    this.title = title || 'Project'
    this.search = search || { value: '', isVisible: false }
    this.text = text || ''
    this.sections = sections || [
      {
        name: 'Section',
        tasks: [new Task()],
      },
    ]

    console.log(this.sections)

  }
}
