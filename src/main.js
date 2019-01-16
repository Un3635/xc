// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import calc from './calc'
import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$ajax = axios
Vue.use(calc)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

// const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
