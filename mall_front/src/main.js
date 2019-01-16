// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
Vue.config.productionTip = false;
import ElementUI from 'element-ui'
import Vue2Crumbs from 'vue-2-crumbs'
import Filters from './filter'

import 'babel-polyfill';
import promise from 'es6-promise';
promise.polyfill();

Object.keys(Filters).forEach(key=>{
  Vue.filter(key,Filters[key]);
})
Vue.use(ElementUI)
Vue.use(Vue2Crumbs)
Vue.use(Vuex)

import './assets/js/config.js'
import {allMethods} from './assets/js/config'
import {bus} from './assets/js/config'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = allMethods.API
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$http.interceptors.request.use((config) => {
  if(config.headers['Content-Type'] == 'application/json'){
    return config;
  }
  //在发送请求之前做某件事
  if (config.method === 'post') {
    config.data.hs = new Date().getTime()
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


Vue.prototype.$http.interceptors.response.use((res) => {
  // alert(JSON.stringify(res))

  if (Number(res.data.code) === 7024) {
    localStorage.removeItem('xckz_mall')
    localStorage.removeItem('xckz_mall_status')
    localStorage.removeItem('xckz_mall_companyName')
    bus.$emit('logout', 'returnHome')
    return res;
  } else {
    if (res) {
      return res;
    }
  }
}, (error) => {
  if (error.response) {
    // console.error('error: ', error.response);

    if (error.response.status === 404) {
      bus.$emit('error')
    }
    else {
      // console.log('Error', error.message);
      alert('接口请求失败或超时！请刷新重试');
    }
  }
  // else {
  //   alert('接口请求失败或超时！请刷新重试');
  // }
  return Promise.reject();
});

const store = new Vuex.Store({
  state: {
    menu: []
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
