// @ts-ignore
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { setNameStorage, getterStorage, setterStorage } from '@/utils/sessions.service';
import { IApplication } from '@/interfaces/IApplication.d';

@Module({ namespaced: true, name: 'Tasker' })

class Tasker extends VuexModule implements IApplication {
  public name = 'Имя по умолчанию';
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
  public storageSaveTasks (tasker: IApplication[]): void {
    setterStorage(setNameStorage, tasker);
  }

  @Action
  public search ({ name }: { name: string }): any {
    const tasker = getterStorage(setNameStorage);
    if (tasker !== null) {
      this.context.commit('updateName', tasker.data.name);
      this.context.commit('updateTaskItems', tasker.data.taskItems);
    }
  }


}
export default Tasker;
