import Vue from 'vue';
import Vuex from 'vuex';
import { Item, State, RenameItem } from '../store/interfaces';

Vue.use(Vuex);

const generateId = () => {

  return Math.random().toString(36);
};

let items = [
  {
    id: generateId(),
    checked: false,
    name: 'Buy tomatoes',
    subitems: [{
      id: generateId(), checked: false, name: 'Add subitem', subitems: [
        { id: generateId(), checked: true, name: 'Subsub item', subitems: [] }
      ],
    }],
  },
  { id: generateId(), checked: false, name: 'Buy pepper', subitems: [] }
];

let filters = {
  filterValue: '',
  filteredItems: [],
  savedFilters: [],
};

if (sessionStorage.getItem('toDoList') !== null) {
  let itemsJSON = sessionStorage.getItem('toDoList');
  if (itemsJSON) {
    items = JSON.parse(itemsJSON);
  }
}

if (sessionStorage.getItem('filters') !== null){
  let filtersJSON = sessionStorage.getItem('filters');
  if (filtersJSON) {
    filters = JSON.parse(filtersJSON);
  }
}

export default new Vuex.Store({
  state: {
    projectName: 'Новый проект',
    filters: filters,
    items: items,
    projects: new Set<String>([]),
  } as State,
  mutations: {

    updateStorage(state) {
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },

    updateProjectName(state, name: string) {
      state.projectName = name;

      sessionStorage.setItem('projectName', name);
    },

    addProject(state, projectName) {
      state.projects.add(projectName);
    },

    deleteProject(state, projectName) {
      state.projects.delete(projectName);
    },

    addItem(state): void {
      state.items.push({ id: generateId(), checked: false, name: 'Rename me', subitems: [] });
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },

    deleteItem(state, id: string): void {
      function deleteTodo(items: Item[]) {
        items.forEach((item, index) => {
          if (item.id === id) {
            items.splice(index, 1);

            return;
          }

          deleteTodo(item.subitems);
        });
      }

      deleteTodo(state.items);
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },

    renameItem(state, params: RenameItem): void {
      const { id, name } = params;

      function rename(items: Item[]) {
        items.forEach(item => {
          if (item.id === id) {
            item.name = name;
          }

          rename(item.subitems);
        });
      }
      rename(state.items);
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },

    pushItem(state, item) {
      state.items.push(item);
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },

    addSubItem(state: State, parentid: string) {
      const newItem = { id: generateId(), checked: false, name: 'Rename me', subitems: [] };

      function addSubitem(items: Item[]) {
        items.forEach(item => {
          if (item.id === parentid) {
            item.subitems.push(newItem);

            return;
          }

          addSubitem(item.subitems);
        });
      }

      addSubitem(state.items);
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },

    updateItems(state, values: Item[]) {
      state.items = values;
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },


    updateCheckbox(state, id: string): void {
      function updateCheck(items: Item[]) {
        items.forEach(item => {
          if (item.id === id) {
            item.checked = !item.checked;

            return;
          }

          updateCheck(item.subitems);
        });
      }

      updateCheck(state.items);
      sessionStorage.setItem('toDoList', JSON.stringify(state.items));
    },

    exportProject(state): void {
      let content = JSON.stringify(state);
      let fileName = `${state.projectName}'.txt`;
      const data = `data:text/plain;charset=utf-8,'${encodeURIComponent(content)}`;
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', fileName);
      link.click();
    },


    changeFilter(state, input) {
      state.filters.filterValue = input;

      if (input === '') {

        state.filters.filteredItems = [];

      } else {

        state.filters.filteredItems = state.items.filter(function f(item: Item): boolean | undefined {

          if (item.subitems) {
            item.subitems = item.subitems.filter(f);
          }

          return item.name.toLowerCase().includes(input.toLowerCase()) || item.subitems.length != 0;

        });

      }
      sessionStorage.setItem('filters', JSON.stringify(state.filters));
    },
  },
  actions: {},
  modules: {},
  getters: {
    projects: state => state.projects,
    item: state => (id: string) => {
      let itemToTransfer!: Item;

      function searchItem(items: Item[]) {
        items.forEach(item => {
          if (item.id === id) {
            itemToTransfer = item;

            return;
          }

          searchItem(item.subitems);
        });
      }

      searchItem(state.items);

      return itemToTransfer;
    },
  },
});
