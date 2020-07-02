import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false;
Vue.filter('capitalize', function(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter('toDate', function(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('ru-RU');
});

Vue.use(VModal, {dynamic: true, dynamicDefaults: {clickToClose: false}});


new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
