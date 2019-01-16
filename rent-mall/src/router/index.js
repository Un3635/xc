import Vue from 'vue';
import VueRouter from 'vue-router';

VueRouter.install(Vue);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: resolve => require(['../pages/home.vue'], resolve)
    }
  ]
});

export default router;

