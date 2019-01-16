// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VeeValidate from 'vee-validate'
import vueFilters from './filters/'
import './filters/veevalidate'

Vue.config.productionTip = false


Vue.use(vueFilters);
Vue.use(VeeValidate);
// VeeValidate.Validator.localize('zh_cn');
// if (navigator.onLine) {
//   // 正常工作 有网状态
//   alert("onLine");
// } else {
//   alert("onoffline");
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
