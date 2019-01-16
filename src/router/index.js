import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import download from '@/components/download'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/download',
      name: 'download',
      component: download
    }
  ],
  scrollBehavior(to,from,savedPosition) {
    return{
      x: 0,
      y: 0
    }
  }
})
