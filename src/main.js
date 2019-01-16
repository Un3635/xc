// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import store from './store'

// import VeeValidate from 'vee-validate'
// import vueFilters from './filters/'
// import './filters/veevalidate'

// Vue.config.productionTip = false


// Vue.use(vueFilters);
// Vue.use(VeeValidate);
// // VeeValidate.Validator.localize('zh_cn');
// // if (navigator.onLine) {
// //   // 正常工作 有网状态
// //   alert("onLine");
// // } else {
// //   alert("onoffline");
// // }
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {sync} from 'vuex-router-sync';
import store from './store'

import VeeValidate from 'vee-validate'
import vueFilters from './filters/'
import './filters/veevalidate'

Vue.config.productionTip = false


Vue.use(vueFilters);
Vue.use(VeeValidate);

export function createApp() {
  // 同步路由状态(route state)到 store
  // sync(store, router);
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  // 暴露 app, router 和 store。
  console.log(app);
  return {app, router, store};
}
