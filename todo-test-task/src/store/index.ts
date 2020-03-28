import Vue from 'vue';
import Vuex from 'vuex';
import {IItem, IState} from '@/interfaces/IStore';

Vue.use(Vuex);

interface IRenameItemPayload {
  index: number;
  name: string;
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
        checked: false,
        name: 'Buy tomatoes',
        subitems: [{ checked: false, name: 'Add subitem', subitems: [
            { checked: true, name: 'Subsub item', subitems: [] }
          ] }],
      },
      { checked: false, name: 'Buy pepper', subitems: [] },
      { checked: true, name: 'Wash hands', subitems: [] },
      { checked: false, name: 'Stay home', subitems: [] }
    ],
    projects: new Set<String>([]),
  } as IState,
  mutations: {
    addItem(state, name: string): void {
      state.items.push({ checked: false, name, subitems: [] });
    },

    deleteItem(state, index: number): void {
      state.items.splice(index, 1);
    },

    updateCheckbox(state, index: number): void {
      state.items[index].checked = !state.items[index].checked;
    },

    changeFilter(state, input) {
      state.filters.filterValue = input;
      state.filters.filteredItems = state.items.filter(item =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
    },

    renameItem(state, params: IRenameItemPayload): void {
      const { index, name } = params;
      state.items[index].name = name;
    },

    updateProjectName(state, name: string){
      state.projectName = name;
    },

    pushItem(state, item){
      state.items.push(item);
    },

    addProject(state, projectName){
      state.projects.add(projectName);
    },

    deleteProject(state, projectName){
      state.projects.delete(projectName);
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