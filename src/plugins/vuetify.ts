import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    dark: true,
  },
  directives: {
    Ripple,
  },
})

export { vuetify }
