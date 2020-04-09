import Vue from 'vue';
import Vuex from 'vuex';
import {IItem, IState} from '@/interfaces/IStore';

Vue.use(Vuex);

interface IRenameItemPayload {
  id: string;
  name: string;
}

const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

function findItem(items: Array<IItem>, id: string) {
  items.forEach(item => {
    if (item.id === id){
      return item.subitems.push();
    }

    return findItem(item.subitems, id);
  });
}

export default new Vuex.Store({
  state: {
    projectName: 'New project',
    filters: {
      filterValue: '',
      filteredItems: [],
    },
    items: [
      {
        id: guid(),
        checked: false,
        name: 'Buy tomatoes',
        subitems: [{ id: guid(), checked: false, name: 'Add subitem', subitems: [
            { id: guid(), checked: true, name: 'Subsub item', subitems: [] }
          ] }],
      },
      { id: guid(), checked: false, name: 'Buy pepper', subitems: [] },
      { id: guid(), checked: true, name: 'Wash hands', subitems: [] },
      { id: guid(), checked: false, name: 'Stay home', subitems: [] }
    ],
    projects: new Set<String>([]),
  } as IState,
  mutations: {
    addItem(state, name: string): void {
      state.items.push({ id: guid(), checked: false, name, subitems: [] });
    },

    deleteItem(state, id: string): void {
      function deleteTodo(items: IItem[]) {
        items.forEach((item, index) => {
          if (item.id === id){
            items.splice(index, 1);

            return;
          }

          deleteTodo(item.subitems);
        });
      }

      deleteTodo(state.items);
    },

    updateCheckbox(state, id: string): void {
      function updateCheck(items: IItem[]) {
        items.forEach(item => {
          if (item.id === id){
            item.checked = !item.checked;

            return;
          }

          updateCheck(item.subitems);
        });
      }

      updateCheck(state.items);
    },

    changeFilter(state, input) {
      state.filters.filterValue = input;

      state.filters.filteredItems = state.items.filter(function f(item:IItem): boolean | undefined {
        if (item.name.toLowerCase().includes(input.toLowerCase())){
          return true;
        }

        if (item.subitems){
          item.subitems = item.subitems.filter(f);
        }
      });
    },

    renameItem(state, params: IRenameItemPayload): void {
      const { id, name } = params;

      function rename(items: IItem[]) {
        items.forEach(item => {
          if (item.id === id){
            item.name = name;

            return;
          }

          rename(item.subitems);
        });
      }

      rename(state.items);
    },

    updateProjectName(state, name: string){
      state.projectName = name;
    },

    pushItem(state, item){
      state.items.push(item);
    },

    clearItems(state){
      state.items = [];
    },

    addProject(state, projectName){
      state.projects.add(projectName);
    },

    deleteProject(state, projectName){
      state.projects.delete(projectName);
    },

    addSubItem(state: IState, parentid: string) {
      const newItem =  { id: guid(), checked: false, name: 'Rename me', subitems: [] };

      function addSubitem(items: IItem[]) {
        items.forEach(item => {
          if (item.id === parentid){
            item.subitems.push(newItem);

            return;
          }

          addSubitem(item.subitems);
        });
      }

      addSubitem(state.items);
    },

    updateFilteredItems(state, values: IItem[]) {
      state.filters.filteredItems = values;
    },

    updateItems(state, values: IItem[]) {
      state.items = values;
    },
  },
  actions: {},
  modules: {},
  getters: {
    projects: state => state.projects,
  },
});
