// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import Filters from './filters'


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(Filters);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
