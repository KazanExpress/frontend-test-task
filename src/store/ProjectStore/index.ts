import { Project, ProjectI } from './Project'

export class ProjectStore {
  /*
  this might need to be implemented later.
  */

  // private static activeProjectInstances = new WeakSet()

  private readonly storage = window.sessionStorage

  private readonly key = 'projects'

  private defaultProjectId?: string

  private data: Record<string, Project> = {}

  constructor(projectId?: string) {
    let projects: Record<string, Project>
    const maybeProjects = this.storage.getItem(this.key)

    this.defaultProjectId = projectId

    if (!maybeProjects) {
      this.data = {}
      return
    }

    try {
      projects = JSON.parse(maybeProjects)
    } catch (err) {
      console.warn('Failed to parse saved data - resorting to defaults')
      projects = {}
    }

    this.data = projects
  }

  setDefaultProjectId(projectId: string) {
    this.defaultProjectId = projectId
    return true
  }

  getProject(projectId = this.defaultProjectId): Project | false {
    assert(projectId && this.data[projectId])

    return this.data[projectId]
  }

  addProject(arg?: ProjectI) {
    const project = new Project(arg)
    this.data[project.id] = project
    return project
  }

  saveState() {
    this.storage.setItem(this.key, JSON.stringify(this.data))
    return true
  }

  exportProjectState(projectId = this.defaultProjectId) {
    assert(projectId)

    return JSON.stringify(this.data[projectId])
  }

  importProjectState(json: string, projectId = this.defaultProjectId) {
    assert(projectId)

    this.data[projectId] = JSON.parse(json)
    return this.data[projectId]
  }
}
