import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['items'],
  }, null, null)],
  state: {
    items: [
      { checked: false, name: 'Buy tomatoes' },
      { checked: false, name: 'Buy pepper' },
      { checked: true, name: 'Wash hands' },
      { checked: false, name: 'Stay home' }
    ],
  },
  mutations: {
    addItem(state, name: string): void {
      state.items.push({ checked: false, name });
    },

    deleteItem(state, index: number): void {
      state.items.splice(index, 1);
    },

    updateCheckbox(state, index: number): void {
      console.warn(state.items[index].checked);
      state.items[index].checked = !state.items[index].checked;
    },
  },
  actions: {},
  modules: {},
});
