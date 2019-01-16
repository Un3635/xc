import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/'
import download from '@/components/app-download'
import Android from '@/components/android'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/CN'
    },
    {
      path: '/CN',
      name: "IndexCN",
      meta: {
        title: '去中心化钱包'
      },
      component: Index
    },
    {
      path: '/EN',
      name: 'IndexEN',
      meta: {
        title: 'decentralized wallet'
      },
      component: Index
    },
    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/android',
      name: 'android',
      component: Android
    }
  ]
})
