const state = {
    mainTitle: '',
    lastProjectId: 0,
    projectList: [
        // {
        //     id: '',
        //     title: 'dcs',
        //     tasksList: [
        //         {
        //             id: '',
        //             text: '',
        //             isDone: false,
        //             textEdit: false
        //         }
        //     ],
        //     progress: 'Новые',
        //     progressList: ['Новые', 'В работе', 'Готово', 'Архив']
        // }
    ],
    searchHistory: {
        new: [],
        in_work: [],
        ready: [],
        archive: []
    }
};

const mutations = {
    initialiseStore(state) {
        if(sessionStorage.getItem('store')) {
            this.replaceState(
                {
                    ...state,
                    ...JSON.parse(sessionStorage.getItem('store'))
                }
            );
        }
    },

    loadFileToStore(state,payload) {
            this.replaceState(
                {
                    ...state,
                    ...JSON.parse(payload.file)
                }
            );
    },

    setLastProjectId(state) {
        state.lastProjectId += 1
    },

    setProjects(state, payload) {
        state.projectList = payload
    },

    editProjectTitleToggle(state, payload) {
        state.projectList[payload.index].titleEdit = !state.projectList[payload.index].titleEdit
    },

    setProjectTitle(state, payload) {
        state.projectList[payload.index].title = payload.title
    },

    setMainTitle(state, payload) {
        state.mainTitle = payload.mainTitle
    },

    setEmptyProjectTitle(state, payload) {
        state.projectList[payload.index].title = ''
    },

    addNewProject(state, payload) {
        state.projectList.push(payload)
    },

    setProjectInWork(state, payload) {
        state.projectList[payload.index].progress = 'В работе'
    },

    setProjectDone(state, payload) {
        state.projectList[payload.index].progress = 'Готово'
    },

    setProjectProgress(state, payload) {
        state.projectList[payload.index].progress = payload.progress
    },

    deleteProject(state, payload) {
        state.projectList.splice(payload.index, 1)
    },

    setProjectInArchive(state, payload) {
        state.projectList[payload.index].progress = 'Архив'
    },


    editProjectTaskToggle(state, payload) {
        state.projectList[payload.index].tasksList[payload.taskIndex].textEdit = !state.projectList[payload.index].tasksList[payload.taskIndex].textEdit
    },

    editProjectTask(state, payload) {
        state.projectList[payload.index].tasksList[payload.taskIndex].text = payload.newText
    },

    setEmptyTaskText(state, payload) {
        state.projectList[payload.index].tasksList[payload.taskIndex].text = ''
    },

    addNewTask(state, payload) {
        state.projectList[payload.index].tasksList.push(payload.task)
    },

    setTaskDone(state, payload) {
        state.projectList[payload.index].tasksList[payload.taskIndex].isDone = true
    },

    setTaskNotDone(state, payload) {
        state.projectList[payload.index].tasksList[payload.taskIndex].isDone = false
    },

    deleteTask(state, payload) {
        state.projectList[payload.index].tasksList.splice(payload.taskIndex, 1)
    },

    addNewColumnSearch(state, payload) {
        state.searchHistory[payload.list].push(payload.word)
    },
}

const getters = {
    getLastProjectId(state) {
      return state.lastProjectId
    },

    getProjectIndexById: (state) => (id) => {
        return state.projectList.findIndex(project => project.id === id)
    },

    getProjectLength(state) {
        return state.projectList.length
    },

    getProjectTitle:(state) => (index) => {
        return state.projectList[index].title
    },

    getProjectProgressList(state) {
        return keyword => state.projectList.filter( item => {
          return item.progress === keyword
        })
    },

    getProjectProgressLength(state) {
        return keyword => state.projectList.filter( item => {
            return item.progress === keyword
        }).length
    },

    getProjectTaskList:(state) => (index) => {
        return state.projectList[index].tasksList
    },

    getMainTitle(state) {
        return state.mainTitle
    },

    getProjectTaskListLength:(state) => (index) => {
        return state.projectList[index].tasksList.length
    },

    getTaskText:(state) => (payload) => {
        return state.projectList[payload.index].tasksList[payload.taskIndex].text
    },

    getTaskTextToggle:(state) => (payload) => {
        return state.projectList[payload.index].tasksList[payload.taskIndex].textEdit
    },

    getTaskIndexById: (state) => (payload) => {
        return state.projectList[payload.index].tasksList.findIndex(task => task.id === payload.taskId)
    },

    getSearchHistory(state) {
        return state.searchHistory
    },

    getSearchListNew(state) {
        return state.searchHistory.new.slice(-5)
    },

    getSearchListInWork(state) {
        return state.searchHistory.in_work.slice(-5)
    },

    getSearchListReady(state) {
        return state.searchHistory.ready.slice(-5)
    },

    getSearchListArchive(state) {
        return state.searchHistory.archive.slice(-5)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
