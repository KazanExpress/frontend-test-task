import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from '../models/Todo'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    async fetchTasks (ctx) {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5')
      const json = await res.json()
      ctx.commit('tasksMutation', json)
    }
  },
  mutations: {
    tasksMutation (state, json) {
      // console.log (json)
      state.tasks = json
    }
  },
  state: {
    count: 0,
    tasks: [],
    Todo: new Todo()
  },
  getters: {
    getTasks: state => {
      console.log(state.tasks)
      return state.tasks
    }
  },
  modules: {}
})
