import Vue from 'vue';
import Vuex from 'vuex';
import data from '../store/data';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        data
    }
})

store.subscribe((mutation, state) => {
    sessionStorage.setItem('store', JSON.stringify(state));
});

export default store