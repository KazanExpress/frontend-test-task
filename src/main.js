import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

import  'normalize.css'
import '@/styles/main.sass'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')