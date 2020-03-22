const state = {
  titleProject: "Тестовое задание",
  todos: [
    {
      title: "Скинуть ToDo ребятам из KazanExpress",
      completed: true,
      editable: false
    }
  ]
};

const getters = {
  getSelectedTodo(state) {
    return state.todos
  },
  getLengthTodos(state) {
    return state.todos.length
  },
  getTitleProject(state) {
    return state.titleProject
  },
  getCountUnCompletedTodo(state) {
    let count = state.todos.filter(i => i.completed == false )
    return count.length
  }
};

const mutations = {
    setStore(state) {
      if(sessionStorage.getItem('store')) {
        this.replaceState(
          {...state, ...JSON.parse(sessionStorage.getItem('store'))} 
        );
      }
    },
    
    setTodos(state, payload) {
      state.todos = payload
    },
    editTitleProject(state, payload) {
      state.titleProject = payload
    },
    addNewItem(state, payload) {
      state.todos.push(payload)
    },
    editTodo(state, payload) {
      state.todos[payload.index] = payload.todo
    },

    deleteTodo(state, payload) {
      const todos           = state.todos
      todos.splice(payload, 1)
    },

    toggleTodoCompleteStatus(state, payload) {
      const todos           = state.todos
      const selectedTodo    = todos[payload]

      selectedTodo.completed = !selectedTodo.completed
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}