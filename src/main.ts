import 'vue-class-component/hooks'
import Vue from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import './plugins/VueCompositionApi'

import { saveState } from './globals'

window.addEventListener('beforeunload', saveState)

new Vue({
  render: (h) => h(App),
  vuetify,
}).$mount('#app')
