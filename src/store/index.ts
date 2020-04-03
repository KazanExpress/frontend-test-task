import Vue from 'vue';
import Vuex from 'vuex';
import Tasker from './modules/tasker';
import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex);

let storeApp = new Vuex.Store({
  state: {
    error: {
      show: false,
      message: '',
    },
  },
  mutations: {
    onError ({ error }, { show = false, message = '' }) {
      error.show = show;
      error.message = message;
    },
  },
  actions: {
  },
  modules: {
    project: Tasker,
  },
});
export default storeApp;
export let taskerModule = getModule(Tasker, storeApp);
