import Vue from 'vue'
import Vuex from 'vuex'
import projects from "./modules/projects";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    modules: {
        projects
    }
})
