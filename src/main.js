import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } })

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
