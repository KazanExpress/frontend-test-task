import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BContainer, BRow, BCol, BButton, BModal, VBModal, BFormGroup, BFormInput, BFormSelect} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBlobJsonCsv from 'vue-blob-json-csv'

Vue.config.productionTip = false;

Vue.component('b-container', BContainer);
Vue.component('b-row', BRow);
Vue.component('b-col', BCol);
Vue.component('b-button', BButton);
Vue.component('b-modal', BModal);
Vue.directive('b-modal', VBModal);
Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-input', BFormInput);
Vue.component('b-form-select', BFormSelect);

Vue.use(VueBlobJsonCsv);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
