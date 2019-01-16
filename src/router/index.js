import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../pages/home.vue'], resolve)
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: resolve => require(['../pages/introduction.vue'], resolve)
    },
    {
      path: '/culture',
      name: 'culture',
      component: resolve => require(['../pages/culture.vue'], resolve)
    },
    {
      path: '/course',
      name: 'course',
      component: resolve => require(['../pages/course.vue'], resolve)
    },
    {
      path: '/courseList',
      name: 'courseList',
      component: resolve => require(['../pages/courseList.vue'], resolve)
    },
    {
      path: '/moment',
      name: 'moment',
      component: resolve => require(['../pages/moment.vue'], resolve)
    },
    {
      path: '/team',
      name: 'team',
      component: resolve => require(['../pages/team.vue'], resolve)
    },
    {
      path: '/contact',
      name: 'contact',
      component: resolve => require(['../pages/contact.vue'], resolve)
    },
    {
      path: '/lions',
      name: 'lions',
      component: resolve => require(['../pages/lions.vue'], resolve)
    }
  ]
})
