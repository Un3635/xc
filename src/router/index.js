import Vue from 'vue';
import VueRouter from 'vue-router';

VueRouter.install(Vue);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/home.vue'], resolve),
      children: [{
        path: '',
        components: {
          hot: resolve => require(['../pages/home/hot.vue'], resolve),
          xingZheng: resolve => require(['../pages/home/list.vue'], resolve),
          jiShu: resolve => require(['../pages/home/list.vue'], resolve),
          tuXing: resolve => require(['../pages/home/list.vue'], resolve),
          bianXie: resolve => require(['../pages/home/list.vue'], resolve),
          peiJian: resolve => require(['../pages/home/list.vue'], resolve)
        }
      }]
    },
    {
      path: '/detail',
      name: '详情',
      component: resolve => require(['../pages/commodity-details.vue'], resolve)
    },
    {
      path: '/product-list',
      name: '全部',
      component: resolve => require(['../pages/product-list.vue'], resolve)
    }
  ]
});

export default router;

