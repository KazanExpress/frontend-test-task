export default {
    state: {
        projects: [
            {
                id: 1, title: "One", tasks: [
                    {
                        id: 11, title: "Todo 1", status: "to do", tasks: [
                            {
                                id: 111, title: "subtask 1", tasks: [
                                    {id: 1111, title: "subtask 1.1", tasks: []},
                                ]
                            },
                            {id: 112, title: "subtask 2", tasks: []},
                        ]
                    },
                    {id: 12, title: "Todo 2", status: "in progress", tasks: []},
                    {id: 13, title: "Todo 3", status: "done", tasks: []},
                ]
            },
            {
                id: 2, title: "Two", tasks: [
                    {id: 21, title: "Todo 4", status: "to do", tasks: []},
                    {id: 22, title: "Todo 5", status: "in progress", tasks: []},
                    {id: 23, title: "Todo 6", status: "done", tasks: []},
                ]
            },
            {
                id: 3, title: "Three", tasks: [
                    {id: 31, title: "Todo 7", status: "to do", tasks: []},
                    {id: 32, title: "Todo 8", status: "in progress", tasks: []},
                    {id: 33, title: "Todo 9", status: "done", tasks: []},
                ]
            },
        ],
        search: '',
        savedSearch: ['one']
    },
    mutations: {
        updateProjects(state, projects) {
            state.projects = projects
        },
        createProject(state, newProject) {
            state.projects.push(newProject);
        },
        updateSearch(state, newSearch) {
            state.search = newSearch
        },
        saveSearch(state, newSearch) {
            if (state.savedSearch.length >= 3) {
                state.savedSearch.pop();
            }
            state.savedSearch.unshift(newSearch);
        }
    },
    actions: {
        async fetchProjects(ctx) {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=5"
            );
            const projects = await res.json();
            ctx.commit('updateProjects', projects);
        }
    },
    getters: {
        allProjects(state) {
            return state.projects
        },
        getProjectById: (state) => (projectId) => {
            return state.projects.find(project => project.id == projectId)
        },
        getSearch(state) {
            return state.search
        },
        filteredProjects(state) {
            return state.projects.filter(project => {
                return project.title.toLowerCase().includes(state.search.toLowerCase())
            })
        },
        getSavedSearch(state) {
            return state.savedSearch
        }
    },
}