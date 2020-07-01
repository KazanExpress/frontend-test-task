import Vue from 'vue'
import Vuex from 'vuex'
import {Tabs} from '../models/Tabs';
import {Tasklist} from '../models/Tasklist';


Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
  },
  mutations: {
    addTaskListMutation (state, Arr){


      let [tasksArray, taskListName] = Arr
      state.count++;
      state.TaskList.push(new Tasklist(state.count, tasksArray, taskListName))
    },
    deleteTaskListByUID(state, uID){
      let indexForDelete = state.TaskList.findIndex(item => item.uID == uID);
      state.TaskList.splice(indexForDelete, 1)
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
    },
    setFilter (state, filter){
      console.log(filter);
      state.activeFilter = filter
    }
  },
  state: {
    count: 0,
    tasks: [],
    Tabs: new Tabs(),
    TaskList: [new Tasklist()],
    activeFilter: ''

  },
  getters: {
    getTasks: state => {
      sessionStorage.setItem('TaskList', JSON.stringify(state.TaskList))
      return state.TaskList
    },

  }
})
