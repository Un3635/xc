import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Exchange from '@/components/record/exchange.vue'
import Detail from '@/components/record/detail.vue'
import Question from '@/components/record/question.vue'
import Gift from '@/components/gift/index.vue'
import Banner from '@/components/banner/index.vue'
// import Register from '@/components/register/index.vue'
// 邀请路由
import Invitation from '@/components/invitation/index.vue'
import InviteRecord from '@/components/invitation/record.vue'
import InviteWithdrawal from '@/components/invitation/withdrawal.vue'
import ToWithdrawal from '@/components/invitation/toWithDrawal.vue'
import InviteRegister from '@/components/invitation/register.vue'

// 协议路由
import AgreementPlatform from '@/components/agreement/platform.vue'
import AgreementPrivacy from '@/components/agreement/privacy.vue'
import AgreementRecharge from '@/components/agreement/recharge.vue'
import AgreementRegister from '@/components/agreement/register.vue'

// android 拦截路由
import AndroidRoute from '@/components/androidRoute'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: 'record',
      name: 'record',
      component: {template: '<router-view />'},
      children:[
        {
          path: '/detail',
          name: 'detail',
          component: Detail,
          meta: {
            title: '明细'
          }
        },
        {
          path: '/exchange',
          name: 'exchange',
          component: Exchange,
          meta: {
            title: '兑换记录'
          }
        },
        {
          path: '/withdrawal',
          name: 'withdrawal',
          component: Exchange,
          meta: {
            title: '提现记录'
          }
        },
        {
          path: '/question',
          name: 'question',
          component: Question,
          meta: {
            title: '帮助与反馈'
          }
        }
      ]
    },
    {
      path: '/gift',
      name: 'gift',
      component: Gift,
      meta: {
        title: '礼包详情'
      }
    },
    {
      path: '/banner',
      name: 'banner',
      component: Banner
    },
    {
      path: '/invite',
      name: 'invitation',
      component: Invitation,
      meta: {
        title: '邀请好友'
      }
    },
    {
      path: '/inviteRecord',
      name: 'inviteRecord',
      component: InviteRecord,
      meta: {
        title: '我的战绩'
      }
    },
    {
      path: '/inviteWithdrawal',
      name: 'inviteWithdrawal',
      component: InviteWithdrawal,
      meta: {
        title: '邀请提现记录'
      }
    },
    {
      path: '/toWithdrawal',
      name: 'toWithdrawal',
      component: ToWithdrawal,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/inviteRegister',
      name: 'inviteRegister',
      component: InviteRegister,
      meta: {
        title: '邀请'
      }
    },
    {
      path: '/agreement/platform',
      name: 'agreementPlatform',
      component: AgreementPlatform,
      meta: {
        title: '平台入驻协议'
      }
    },
    {
      path: '/agreement/privacy',
      name: 'agreementPrivacy',
      component: AgreementPrivacy,
      meta: {
        title: '隐私协议'
      }
    },
    {
      path: '/agreement/recharge',
      name: 'agreementRecharge',
      component: AgreementRecharge,
      meta: {
        title: '用户充值协议'
      }
    },
    {
      path: '/agreement/register',
      name: 'agreementRegister',
      component: AgreementRegister,
      meta: {
        title: '用户注册协议'
      }
    },
    {
      path: '/android/back',
      redirect: {
        name: 'androidRoute'
      }
    },
    {
      path: '/android/invite',
      redirect: {
        name: 'androidRoute'
      }
    },
    {
      path: '/android/feedback',
      name: 'androidRoute',
      component: AndroidRoute
    }
  ]
})
