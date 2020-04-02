// @ts-ignore
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { setNameStorage, getterStorage, setterStorage } from '@/utils/sessions';
import { IApplication } from '@/interfaces/IApplication.d';

@Module({ namespaced: true, name: 'Tasker' })

class Tasker extends VuexModule implements IApplication {
  public name = 'defaultName';
  public taskItems: IApplication['taskItems'] = [];

  @Mutation
  private updateTaskItems (taskItems: IApplication['taskItems']): void {
    this.taskItems = taskItems;
  }

  @Mutation
  public updateName (name: IApplication['name']): void {
    this.name = name;
    const url = new URL(window.location.href);
    url.searchParams.set('name', name);
    // @ts-ignore
    window.history.pushState(null, '', url);
  }

  @Mutation
  public saveToStorage (project: IApplication[]): void {
    setterStorage(setNameStorage, project);
  }

  @Action
  public search ({ name }: { name: string }): any {
    const app = getterStorage(setNameStorage);
    if (app !== null) {
      // @ts-ignore
      this.context.commit('updateName', app.data.name);
      // @ts-ignore
      this.context.commit('updateTaskItems', app.data.taskItems);
    }
  }


}
export default Tasker;
