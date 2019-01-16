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
      redirect: '/hash',
      name: '首页',
      component: resolve => require(['../pages/home.vue'], resolve)
    },
    {
      path: '/hash',
      name: '算力',
      component: resolve => require(['../pages/hash/hash.vue'], resolve)
    },
    {
      path: '/hash-detail',
      name: '购买算力',
      component: resolve => require(['../pages/hash/hash-detail.vue'], resolve)
    },
    {
      path: '/income',
      name: '收益',
      component: resolve => require(['../pages/income/income.vue'], resolve)
    },
    {
      path: '/income-detail',
      name: '收益详情',
      meta: {auth: true},
      component: resolve => require(['../pages/income/income-detail.vue'], resolve)
    },
    {
      path: '/i',
      name: '我',
      component: resolve => require(['../pages/my-center/my-center.vue'], resolve)
    },
    {
      path: '/account',
      name: '账户余额',
      meta: {auth: true},
      component: resolve => require(['../pages/my-center/balance/account.vue'], resolve)
    },
    {
      path: '/order',
      name: '我的订单',
      meta: {auth: true},
      component: resolve => require(['../pages/my-center/order/order.vue'], resolve)
    },
    {
      path: '/sign-in',
      name: '手机快捷登录',
      component: resolve => require(['../pages/login/sign-in.vue'], resolve)
    },
    {
      path: '/invite',
      name: '邀请注册',
      component: resolve => require(['../pages/login/invite.vue'], resolve)
    },
    {
      path: '/product-detail',
      name: '产品详情',
      component: resolve => require(['../pages/product/product-detail.vue'], resolve)
    },
    {
      path: '/cart',
      name: '购物车',
      component: resolve => require(['../pages/shoppingcart/cart.vue'], resolve)
    },
    {
      path: '/submit-order',
      name: '确认订单',
      component: resolve => require(['../pages/shoppingcart/submit-order.vue'], resolve)
    },
    {
      path: '/select-address',
      name: '选择地址',
      component: resolve => require(['../pages/address/select-address.vue'], resolve)
    },
    {
      path: '/add-address',
      name: '新增地址',
      component: resolve => require(['../pages/address/add-address.vue'], resolve)
    },
    {
      // 这个页面路由不能随便改（影响微信支付）
      path: '/cashier-center',
      name: '收银中心',
      meta: {auth: true},
      component: resolve => require(['../pages/pay/cashier-center.vue'], resolve)
    },
    {
      path: '/pay-result',
      name: '支付结果',
      meta: {auth: true},
      component: resolve => require(['../pages/pay/pay-result.vue'], resolve)
    },
    {
      path: '/invitation',
      name: '我的邀请',
      meta: {auth: true},
      component: resolve => require(['../pages/invitation/invitation.vue'], resolve)
    },
    {
      path: '/invitation-detail',
      name: '邀请详情',
      meta: {auth: true},
      component: resolve => require(['../pages/invitation/invitation-detail.vue'], resolve)
    },
    {
      path: '/activity',
      name: '活动',
      component: resolve => require(['../pages/activity/activity.vue'], resolve)
    }
  ]
});

export default router;

