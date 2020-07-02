import Vue from 'vue';
import Vuex from 'vuex';
import {Tabs} from '../models/Tabs';
import {Tasklist} from '../models/Tasklist';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
  },
  mutations: {
    addTaskListMutation(state, Arr) {
      const [tasksArray, taskListName] = Arr;
      state.TaskList.push(new Tasklist('', tasksArray, taskListName));
    },
    tasksListFromFile(state, parsedJson) {

      // проверка на адекватность массива задач
      if (parsedJson && parsedJson.length>0 && parsedJson[0].tasks) {
        state.TaskList = [];
        parsedJson.forEach((item) => {
          const tempTaskList = new Tasklist();
          tempTaskList.newTaskListFromFile(item);
          state.TaskList.push(tempTaskList);
        });
      }
    },
    newList(state, newListData) {
      const newTasklist = new Tasklist();
      newTasklist.newTaskListWithOneTask(newListData);
      state.TaskList.push(newTasklist);
    },
    deleteTaskListByUID(state, uID) {
      const indexForDelete = state.TaskList.findIndex((item) =>
        item.uID == uID);
      state.TaskList.splice(indexForDelete, 1);
    },
    addTaskListFromOuterTab(state, dataFromOuterTab) {
      const newTasklist = new Tasklist();
      newTasklist.newTaskListFromTab(dataFromOuterTab[0]);
      state.TaskList.push(newTasklist);
    },
    loadTasksFromSS(state) {
      // проверка на наличие данных в SS
      if (sessionStorage.getItem('TaskList') &&

        sessionStorage.getItem('TaskList').length > 0) {
        const dataFromSS = JSON.parse(sessionStorage.getItem('TaskList'));

        state.TaskList = [];
        dataFromSS.forEach((item) => {
          const tempTaskList = new Tasklist();
          tempTaskList.taskListFromSS(item);
          state.TaskList.push(tempTaskList);
        });
      } else {
        sessionStorage.removeItem('TaskList');
      }
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
    getTasks: (state) => {
      sessionStorage.setItem('TaskList', JSON.stringify(state.TaskList));
      return state.TaskList;
    },
    getFilterArray: (state) => {
      let FilterArray = [];
      if (sessionStorage.getItem('FilterInSS')) {
        FilterArray = JSON.parse(sessionStorage.getItem('FilterInSS'));
      }
      return FilterArray;
    },

  },
});
