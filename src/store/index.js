import Vue from 'vue'
import Vuex from 'vuex'
import {Tabs} from '../models/Tabs';
import {Tasklist} from '../models/Tasklist';


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
      state.tasks = json
    },
    addTaskListMutation (state){
      state.count++;
      state.TaskList.push(new Tasklist(state.count))
    },
    loadTasksFromSSMutation (state){
      if (sessionStorage.getItem('TaskList') && sessionStorage.getItem('TaskList').length > 0) {

        let k = JSON.parse(sessionStorage.getItem('TaskList'))
        state.TaskList = []
        k.forEach((_, index) => {
          state.TaskList.push(new Tasklist(index))
          state.count++
        })


      }
    }
  },
  state: {
    count: 0,
    tasks: [],
    Tabs: new Tabs(),
    TaskList: [new Tasklist()]

  },
  getters: {
    getTasks: state => {
      sessionStorage.setItem('TaskList', JSON.stringify(state.TaskList))
      return state.TaskList
    },

  }
})