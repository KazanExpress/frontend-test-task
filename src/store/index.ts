import { createStore, Store, MutationTree } from "vuex";
import { modalsModule } from "./modalsModule";
export interface Task {
  id: number;
  name: string;
  desc: string;
  finish: boolean;
  subTasks: Task[];
}
interface filterType {
  name: string;
  dropdownSort: string;
  searchQuery: string;
}
export interface State {
  title: string;
  taskData: any;
  tasks: Task[];
  filters: filterType[];
}
enum MutationTypes {
  SET_TITLE = "SET_TITLE",
  SET_TASK_DATA = "SET_TASK_DATA",
  SET_FILTERS = "SET_FILTERS",
  UPDATE_TASK_NAME = "UPDATE_TASK_NAME",
  CREATE_TASK = "CREATE_TASK",
  DELETE_TASK = "DELETE_TASK",
  FINISH_TASK = "FINISH_TASK",
  DROP_TASK = "DROP_TASK",
}
interface Mutations extends MutationTree<State> {
  [MutationTypes.SET_TITLE](state: State, title: string): void;
  [MutationTypes.SET_TASK_DATA](state: State, data: any): void;
  [MutationTypes.SET_FILTERS](state: State, filter: filterType): void;
  [MutationTypes.UPDATE_TASK_NAME](state: State, tasks?: Task[]): void;
  [MutationTypes.CREATE_TASK](state: State, tasks?: Task[]): void;
  [MutationTypes.DELETE_TASK](state: State, tasks?: Task[]): void;
  [MutationTypes.FINISH_TASK](state: State, tasks?: Task[]): void;
  [MutationTypes.DROP_TASK](state: State, { taskData, targetId }: any): void;
}
const mutations: Mutations = {
  [MutationTypes.SET_TITLE](state, title) {
    state.title = title;
    sessionStorage.setItem("title", JSON.stringify(state.title));
  },

  [MutationTypes.SET_TASK_DATA](state, data) {
    state.taskData = data;
  },

  [MutationTypes.SET_FILTERS](state, fitler) {
    state.filters.push(fitler);
    sessionStorage.setItem("filters", JSON.stringify(state.filters));
  },

  [MutationTypes.UPDATE_TASK_NAME](state, tasks = state.tasks) {
    for (const task of tasks) {
      if (task.id == state.taskData.id) {
        task.name = state.taskData.name;
        sessionStorage.setItem("myData", JSON.stringify(state.tasks));
      } else if (task.subTasks.length > 0) {
        mutations[MutationTypes.UPDATE_TASK_NAME](state, task.subTasks);
      }
    }
  },

  [MutationTypes.CREATE_TASK](state, tasks = state.tasks) {
    if (state.taskData.id == null) {
      const newTask = {
        id: Date.now(),
        name: state.taskData.name,
        desc: state.taskData.desc,
        finish: false,
        subTasks: [],
      };
      state.tasks.push(newTask);
      sessionStorage.setItem("myData", JSON.stringify(state.tasks));
    } else {
      for (const task of tasks) {
        if (task.id == state.taskData.id) {
          const newTask = {
            id: Date.now(),
            name: state.taskData.name,
            desc: state.taskData.desc,
            finish: false,
            subTasks: [],
          };
          task.subTasks.push(newTask);
        } else if (task.subTasks.length > 0) {
          mutations[MutationTypes.CREATE_TASK](state, task.subTasks);
        }
      }
    }
  },

  [MutationTypes.DELETE_TASK](state, tasks = state.tasks) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.id == state.taskData.id) {
        tasks.splice(i, 1);
        sessionStorage.setItem("myData", JSON.stringify(state.tasks));
      } else if (task.subTasks.length > 0) {
        mutations[MutationTypes.DELETE_TASK](state, task.subTasks);
      }
    }
  },

  [MutationTypes.FINISH_TASK](state, tasks = state.tasks) {
    for (const task of tasks) {
      if (task.id == state.taskData.id) {
        task.finish = state.taskData.finish;
        sessionStorage.setItem("myData", JSON.stringify(state.tasks));
      } else if (task.subTasks.length > 0) {
        mutations[MutationTypes.FINISH_TASK](state, task.subTasks);
      }
    }
  },

  [MutationTypes.DROP_TASK](state, { taskData, targetId }) {
    const targetIndex = state.tasks.findIndex((task) => task.id === targetId);

    const currentIndex = state.tasks.findIndex(
      (task) => task.id === taskData.id
    );
    if (currentIndex === -1 || !targetId) {
      state.tasks.push(taskData);
      sessionStorage.setItem("myData", JSON.stringify(state.tasks));
    } else {
      const movedTask = state.tasks.splice(currentIndex, 1)[0];
      state.tasks.splice(targetIndex, 0, movedTask);
      sessionStorage.setItem("myData", JSON.stringify(state.tasks));
    }
  },
};
const storedTitle = sessionStorage.getItem("title");
const defaultTitle = storedTitle ? JSON.parse(storedTitle) : "TODO-приложение";

const storedTasks = sessionStorage.getItem("myData");
const defaultTasks = storedTasks ? JSON.parse(storedTasks) : [];

const storedFilters = sessionStorage.getItem("filters");
const defaulFilters = storedFilters ? JSON.parse(storedFilters) : [];

const store: Store<State> = createStore({
  state: {
    title: defaultTitle,
    taskData: null,
    tasks: defaultTasks,
    filters: defaulFilters,
  },
  mutations,
  getters: {
    getTitle(state) {
      return state.title;
    },
    getTaskData(state) {
      return state.taskData;
    },
    getTasks(state) {
      return state.tasks;
    },
    getFilters(state) {
      return state.filters;
    },
  },
  modules: {
    modals: modalsModule,
  },
});
export default store;
