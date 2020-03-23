import Vue from 'vue'
import Vuex from 'vuex'
import Project from './modules/project'
import { getModule } from 'vuex-module-decorators'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    error: {
      show: false,
      message: ''
    }
  },
  mutations: {
    toggleError ({ error }, { show = false, message = '' }) {
      error.show = show
      error.message = message
    }
  },
  actions: {
  },
  modules: {
    project: Project
  }
})
export default store
export const projectModule = getModule(Project, store)
