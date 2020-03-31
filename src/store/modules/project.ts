import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { keyNameForSave, getItemFromSessionStorage, setItemToSessionStorage } from '@/utils/session.service'
import { IProject } from '@/store/models.d.ts'

@Module({ namespaced: true, name: 'Project' })

class Project extends VuexModule implements IProject {
  public name = 'defaultName'
  public taskList: IProject['taskList'] = []

  @Mutation
  private updateTaskList (taskList: IProject['taskList']): void {
    this.taskList = taskList
  }

  @Mutation
  public updateName (name: IProject['name']): void {
    this.name = name
    // this code is intended for url query string
    const url = new URL(window.location.href)
    url.searchParams.set('name', name)
    // @ts-ignore
    window.history.pushState(null, '', url)
  }

  @Mutation
  public saveToStorage (project: IProject[]): void {
    setItemToSessionStorage(keyNameForSave, project)
  }

  @Action
  public search ({ name }: { name: string }): any {
    const project = getItemFromSessionStorage(keyNameForSave)
    if (project !== null) {
      this.context.commit('updateName', project.data.name)
      this.context.commit('updateTaskList', project.data.taskList)
    }
  }
}
export default Project
