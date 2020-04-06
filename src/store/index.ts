import { TaskI, ProjectT } from '../types'

const fetchTasks = async () => {
  const it = await window.fetch(
    'https://jsonplaceholder.typicode.com/user/1/todos'
  )

  return it.json()
}

export class Store {
  private readonly projectId: number

  private readonly storage = window.sessionStorage

  private readonly key = 'projects'

  private readonly wantPlaceholder = true

  private getProjects(): ProjectT[] {
    const dataStr = this.storage.getItem(this.key)
    assert(dataStr)

    return JSON.parse(dataStr)
  }

  private getProject(id = this.projectId): ProjectT {
    const data = this.getProjects()

    if (!data[id]) {
      data[id] = {}
    }

    return data[id]
  }

  constructor(projectId: number) {
    const maybeProjects = this.storage.getItem(this.key)

    this.projectId = projectId

    if (!maybeProjects) {
      this.storage.setItem(this.key, JSON.stringify([]))
    }
  }

  saveTasks(tasks: TaskI[]): boolean {
    const data = this.getProjects()

    if (!data[this.projectId]) {
      data[this.projectId] = {}
    }

    data[this.projectId].tasks = tasks

    this.storage.setItem(this.key, JSON.stringify(data))
    return true
  }

  async getTasks(): Promise<TaskI[]> {
    const data = this.getProject()

    if (!data?.tasks && this.wantPlaceholder) {
      return fetchTasks()
    }

    return data.tasks || []
  }

  saveTitle(name: string): boolean {
    const data = this.getProjects()

    if (!data[this.projectId]) {
      data[this.projectId] = {}
    }

    data[this.projectId].name = name
    this.storage.setItem(this.key, JSON.stringify(data))
    return true
  }

  async getTitle(): Promise<string> {
    const data = this.getProject()
    if (!data?.name && this.wantPlaceholder) {
      return 'Project'
    }

    return data.name || ''
  }

  saveSearch(
    search: { value: string; isVisible: boolean } | undefined
  ): boolean {
    const data = this.getProjects()

    if (!data[this.projectId]) {
      data[this.projectId] = {}
    }

    data[this.projectId].search = search
    this.storage.setItem(this.key, JSON.stringify(data))
    return true
  }

  async getSearch() {
    const data = this.getProject()
    if (!data?.search && this.wantPlaceholder) {
      return { value: '', isVisible: false }
    }

    return data.search || { value: '', isVisible: false }
  }
}
