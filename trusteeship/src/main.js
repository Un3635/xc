// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import promise from 'es6-promise';

promise.polyfill();

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueFilters from './filters';
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2';
import VeeValidate from 'vee-validate';
import AppConfig from './config/index';
import customValidator from './plugins/validator';
import Vue2Crumbs from 'vue-2-crumbs';
import MetaInfo from 'vue-meta-info';
import './assets/fonts/iconfont.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueFilters);
Vue.use(VueClipboard);
Vue.use(customValidator, AppConfig.validateConfig);
Vue.use(VeeValidate);
Vue.use(Vue2Crumbs);
Vue.use(MetaInfo);
Vue.use(VueAwesomeSwiper);

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
