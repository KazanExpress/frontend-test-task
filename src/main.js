import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/main.sass'

Vue.config.productionTip = false

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')