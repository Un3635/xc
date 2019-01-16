import Vue from 'vue';
import App from './App.vue';
import AppConfig from './config';
import store from './store';
import router from './router';
import customValidator from './plugins/validator';
import {sync} from 'vuex-router-sync';
import * as uiv from 'uiv';
import titleMixin from './util/title';
import VueFilters from './filters';
import CustomPlugins from './components';
import 'babel-polyfill';
import promise from 'es6-promise';
import {isWeChat} from './plugins/utils';

promise.polyfill();
import {
  ToastPlugin,
  ConfirmPlugin,
  AlertPlugin,
  LoadingPlugin,
  XHeader,
  Tabbar,
  TabbarItem,
  ViewBox,
  XButton
} from 'vux';

const requireWxModule = () => import('./util/wx');
const components = [XHeader, Tabbar, TabbarItem, ViewBox, XButton];
const plugins = [CustomPlugins, ToastPlugin, ConfirmPlugin, AlertPlugin, LoadingPlugin];

components.forEach(component => {
  Vue.component(component.name, component);
});

Vue.use(customValidator, AppConfig.validateConfig);

if (process.env.VUE_ENV === 'client') {
  const FastClick = require('fastclick');
  FastClick.attach(document.body);
  plugins.forEach(plugin => {
    Vue.use(plugin);
  });
  let vueAwesomeSwiper = require('vue-awesome-swiper');
  Vue.use(vueAwesomeSwiper);
  // let vueCoreImageUpload = require('vue-core-image-upload');
  // Vue.component('vue-core-image-upload', vueCoreImageUpload);

  if (isWeChat) {
    const WechatPlugin = require('vux/src/plugins/wechat');
    Vue.use(WechatPlugin);
    requireWxModule()
      .then(module => {
        module.default();
      });
  }
}

Vue.mixin(titleMixin);

Vue.use(uiv);

Vue.use(VueFilters);

export function createApp() {
  // 同步路由状态(route state)到 store
  sync(store, router);
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  // 暴露 app, router 和 store。
  return {app, router, store};
}
