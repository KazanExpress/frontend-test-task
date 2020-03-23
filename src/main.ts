import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import { keyNameForSave, beforeUnload, setItemToSessionStorage } from '@/utils/session.service'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

window.onbeforeunload = beforeUnload.bind(window, store, keyNameForSave, setItemToSessionStorage)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h: any) => h(App)
}).$mount('#app')
