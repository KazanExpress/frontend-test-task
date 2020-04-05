import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import router from './router';

import { setNameStorage, preloaderStorageHandler, setterStorage } from '@/utils/sessions.service';

import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
window.onbeforeunload = preloaderStorageHandler.bind(window, store, setNameStorage, setterStorage);

Vue.config.productionTip = false;

new Vue({
  store,
  router,

  render: (h) => h(App),
}).$mount('#app');
