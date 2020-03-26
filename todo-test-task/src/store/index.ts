import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { IState } from '@/interfaces/IStore';

Vue.use(Vuex);

interface IRenameItemPayload {
  index: number;
  name: string;
}

export default new Vuex.Store({
  // plugins: [createPersistedState({
  //   paths: ['items', 'filters', 'projectName'],
  // }, null, null)],
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
        subitems: [{ checked: false, name: 'Add subitem', subitems: [] }],
      },
      { checked: false, name: 'Buy pepper', subitems: [] },
      { checked: true, name: 'Wash hands', subitems: [] },
      { checked: false, name: 'Stay home', subitems: [] }
    ],
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
  },
  actions: {},
  modules: {},
});
