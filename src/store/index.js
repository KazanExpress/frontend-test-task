import Vue from 'vue';
import Vuex from 'vuex';
import {Tabs} from '../models/Tabs';
import {Tasklist} from '../models/Tasklist';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  mutations: {
    addTaskListMutation(state, Arr) {

      let [tasksArray, taskListName] = Arr;
      state.TaskList.push(new Tasklist('', tasksArray, taskListName));
    },
    tasksListFromFile(state, parsed_json) {
      //проверка на адекватность массива задач

      console.log(parsed_json);
      //проверка на адекватность массива задач
      if (parsed_json && parsed_json.length>0 && parsed_json[0].tasks){
        state.TaskList = [];
        parsed_json.forEach(item => {
          let tempTaskList = new Tasklist()
          tempTaskList.newTaskListFromFile(item.tasks, item.title)
          state.TaskList.push(tempTaskList)
        })
      }
    },
    newList(state, newListData){
      let newTasklist = new Tasklist();
      newTasklist.newTaskListWithOneTask(newListData)
      state.TaskList.push(newTasklist)
    },
    deleteTaskListByUID(state, uID) {
      let indexForDelete = state.TaskList.findIndex(item => item.uID == uID);
      state.TaskList.splice(indexForDelete, 1);
    },
    addTaskListFromOuterTab(state, dataFromOuterTab){
      let newTasklist = new Tasklist();
      newTasklist.newTaskListFromTab(dataFromOuterTab[0])
      state.TaskList.push(newTasklist)

    },
    loadTasksFromSS(state) {
      //проверка на наличие данных в SS
      console.log('1');

      if (sessionStorage.getItem('TaskList') &&

        sessionStorage.getItem('TaskList').length > 0) {
        console.log('2');
        let dataFromSS = JSON.parse(sessionStorage.getItem('TaskList'));

        state.TaskList = [];
        dataFromSS.forEach(item => {
          let tempTaskList = new Tasklist()
          tempTaskList.taskListFromSS(item)
          state.TaskList.push(tempTaskList);
        });
      } else {sessionStorage.removeItem('TaskList')}
    },
    addFilterInSS(state, data) {
      let FilterArray = [];
      if (sessionStorage.getItem('FilterInSS')) {
        FilterArray = JSON.parse(sessionStorage.getItem('FilterInSS'));
      }
      FilterArray.push(data);

      state.filterAutocompleteData = FilterArray;
      sessionStorage.setItem('FilterInSS',
        JSON.stringify(FilterArray));
    },
    setFilter(state, filter) {
      state.activeFilter = filter;
    },
  },
  state: {
    tasks: [],
    Tabs: new Tabs(),
    TaskList: [],
    activeFilter: '',
    filterAutocompleteData: [],

  },
  getters: {
    getTasks: state => {
      console.log(state.TaskList);
      sessionStorage.setItem('TaskList', JSON.stringify(state.TaskList));
      return state.TaskList;
    },
    getFilterArray: state => {
      let FilterArray = [];
      if (sessionStorage.getItem('FilterInSS')) {
        FilterArray = JSON.parse(sessionStorage.getItem('FilterInSS'));
      }

      return FilterArray;
    },

  },
});
