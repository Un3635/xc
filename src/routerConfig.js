/* eslint-disable */

/*****************************************************heleen*************************************************/
import {rfrouterConfig, rfConfigMenuOut} from './riskControl.financial.routerConfig';
import { auditrouterConfig, auditrouterConfigMenuOut } from './audit.routerConfig';


/*****************************************************heleen*************************************************/

// 工具
import UtilIce from '@/libs/util-ice.js'
// 页面和布局
import Index from './pages/Index'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import HeaderAside from './layouts/HeaderAside'
//用户中心
import user from './pages/userCenter/user'
import userDetail from './pages/userCenter/user/componnets/userDetail'
import meets from './pages/userCenter/meets'
import meetsDetail from './pages/userCenter/meets/componnets/meetsDetail'
import meetsEdit from './pages/userCenter/meets/componnets/meetsEdit'
import costRates from './pages/userCenter/costRates'
import costRateDetail from './pages/userCenter/costRates/componnets/costRateDetail'
import benefitRates from './pages/userCenter/benefitRates'
import benefitRateDetail from './pages/userCenter/benefitRates/componnets/benefitRateDetail'
import balance from './pages/userCenter/balance'
import balanceDetail from './pages/userCenter/balance/componnets/balanceDetail'
//运营中心
import banner from './pages/operate/banner'
import bannerDetail from './pages/operate/banner/componnets/bannerDetail'
import bannerAdd from './pages/operate/banner/componnets/bannerAdd'
import bannerEdit from './pages/operate/banner/componnets/bannerEdit'
import gifts from './pages/operate/gifts'
import giftEdit from './pages/operate/gifts/componnets/giftEdit'
import giftAdd from './pages/operate/gifts/componnets/giftAdd'
import redpacket from './pages/operate/redpacket'
import redpacketEdit from './pages/operate/redpacket/componnets/redpacketEdit'
import packetPresuppose from './pages/operate/redpacket/componnets/packetPresuppose'
import presupposeEdit from './pages/operate/redpacket/componnets/presupposeEdit'
import interestEdit from './pages/operate/interest/componnets/interestEdit'
import interest from './pages/operate/interest'
import interestAdd from './pages/operate/interest/componnets/interestAdd'
import tag from './pages/operate/tag'
import tagAdd from './pages/operate/tag/componnets/tagAdd'
import tagEdit from './pages/operate/tag/componnets/tagEdit'
import notify from './pages/operate/notify'
import notifyAdd from './pages/operate/notify/componnets/notifyAdd'
import notifyDetail from './pages/operate/notify/componnets/notifyDetail'
import question from './pages/operate/question'
import questionAdd from './pages/operate/question/componnets/questionAdd'
import questionEdit from './pages/operate/question/componnets/questionEdit'
import prohibition from './pages/operate/prohibition'
import prohibitionAdd from './pages/operate/prohibition/componnets/prohibitionAdd'
import prohibitionEdit from './pages/operate/prohibition/componnets/prohibitionEdit'
import mstype from './pages/operate/mstype'
import mstypeAdd from './pages/operate/mstype/componnets/mstypeAdd'
import mstypeEdit from './pages/operate/mstype/componnets/mstypeEdit'
import institution from './pages/operate/institution'
import institutionAdd from './pages/operate/institution/componnets/institutionAdd'
import institutionEdit from './pages/operate/institution/componnets/institutionEdit'
import institutionDetail from './pages/operate/institution/componnets/institutionDetail'
import invitation from './pages/operate/invitation'
//

//权限管理
import role from './pages/authority/role'
import roleDetail from './pages/authority/role/componnets/roleDetail'
import roleEdit from './pages/authority/role/componnets/roleEdit'
import roleAdd from './pages/authority/role/componnets/roleAdd'
import roleSetting from './pages/authority/role/componnets/roleSettintg'
import account from './pages/authority/account'
import accountDetail from './pages/authority/account/componnets/accountDetail'
import accountEdit from './pages/authority/account/componnets/accountEdit'
import accountAdd from './pages/authority/account/componnets/accountAdd'


import d2admin from "./store/modules/d2admin";






// 如果不指定 name 字段，会根据 path 生成 name = page-demo1
// 转换规则见 UtilIce.recursiveRouterConfig 中 path2name 方法
// meta 字段会和默认值使用 Object.assign 合并
// 如果不指定 meta.name 的话，name 字段会使用和上面路由 name 一样的取值逻辑
// 下面两个页面就是对比 你可以分别观察两个页面上显示的路由数据差异

const routerConfig = [
    {
        path: '/',
        name: 'index',
        layout: HeaderAside,
        component: Index,
        meta: {
            requiresAuth: true,
            title: ''
        }
    },
    //用户中心
    {
        path: '/userCenter/user',
        name: 'user',
        layout: HeaderAside,
        component: user,
        meta: {
            requiresAuth: true,
            title: '用户管理'
        }
    },
    {
      path: '/userCenter/meets',
      name: 'meets',
      layout: HeaderAside,
      component: meets,
      meta: {
        requiresAuth: true,
        title: 'Ms管理'
      }
    },
    {
      path: '/userCenter/costRates',
      name: 'costRates',
      layout: HeaderAside,
      component: costRates,
      meta: {
        requiresAuth: true,
        title: '用户消费等级'
      }
    },
    {
      path: '/userCenter/benefitRates',
      name: 'benefitRates',
      layout: HeaderAside,
      component: benefitRates,
      meta: {
        requiresAuth: true,
        title: 'ms收益等级'
      }
    },
    {
      path: '/userCenter/balance',
      name: 'balance',
      layout: HeaderAside,
      component: balance,
      meta: {
        requiresAuth: true,
        title: '账户余额'
      }
    },
    //运营中心
    {
      path: '/operate/banner',
      name: 'banner',
      layout: HeaderAside,
      component: banner,
      meta: {
        requiresAuth: true,
        title: 'banner管理'
      }
    },
    {
      path: '/operate/gifts',
      name: 'gifts',
      layout: HeaderAside,
      component: gifts,
      meta: {
        requiresAuth: true,
        title: '礼物管理'
      }
    },
    {
      path: '/operate/interest',
      name: 'interest',
      layout: HeaderAside,
      component: interest,
      meta: {
        requiresAuth: true,
        title: '兴趣管理'
      }
    },
    {
      path: '/operate/tag',
      name: 'tag',
      layout: HeaderAside,
      component: tag,
      meta: {
        requiresAuth: true,
        title: '标签管理'
      }
    },
    {
      path: '/operate/notify',
      name: 'notify',
      layout: HeaderAside,
      component: notify,
      meta: {
        requiresAuth: true,
        title: '通知管理'
      }
    },
    {
      path: '/operate/question',
      name: 'question',
      layout: HeaderAside,
      component: question,
      meta: {
        requiresAuth: true,
        title: 'Q&A管理'
      }
    },
    {
      path: '/operate/prohibition',
      name: 'prohibition',
      layout: HeaderAside,
      component: prohibition,
      meta: {
        requiresAuth: true,
        title: '禁词管理'
      }
    },
    {
      path: '/operate/mstype',
      name: 'mstype',
      layout: HeaderAside,
      component: mstype,
      meta: {
        requiresAuth: true,
        title: 'Ms类型管理'
      }
    },
    {
      path: '/operate/institution',
      name: 'institution',
      layout: HeaderAside,
      component:institution,
      meta: {
        requiresAuth: true,
        title: '机构管理'
      }
    },
    {
      path: '/operate/invitation',
      name: ' invitation',
      layout: HeaderAside,
      component: invitation,
      meta: {
        requiresAuth: true,
        title: '邀请管理'
      }
    },
    {
      path: '/operate/redpacket',
      name: 'redpacket',
      layout: HeaderAside,
      component: redpacket,
      meta: {
        requiresAuth: true,
        title: '红包管理'
      }
    },
    //权限管理
    {
        path: '/authority/role',
        name: 'role',
        layout: HeaderAside,
        component: role,
        meta: {
          requiresAuth: true,
          title: '角色管理'
        }
      },
    {
        path: '/authority/account',
        name: 'account',
        layout: HeaderAside,
        component: account,
        meta: {
          requiresAuth: true,
          title: '账号管理'
        }
      }
];

// 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig

const routerConfigMenuOut = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '*',
    component: Error404
  },
  {
    path: '/userCenter/user/userDetail',
    name: 'userDetail',
    layout: HeaderAside,
    component: userDetail,
    meta: {
      requiresAuth: true,
      title: '用户详情'
    }
  },
  {
    path: '/userCenter/meets/meetsDetail',
    name: 'meetsDetail',
    layout: HeaderAside,
    component: meetsDetail,
    meta: {
      requiresAuth: true,
      title: 'Ms查看'
    }
  },
  {
    path: '/userCenter/meets/meetsEdit',
    name: 'meetsEdit',
    layout: HeaderAside,
    component: meetsEdit,
    meta: {
      requiresAuth: true,
      title: 'Ms编辑'
    }
  },
  {
    path: '/userCenter/costRates/costRateDetail',
    name: 'costRateDetail',
    layout: HeaderAside,
    component: costRateDetail,
    meta: {
      requiresAuth: true,
      title: '消费等级查看'
    }
  },
  {
    path: '/userCenter/benefitRates/benefitRateDetail',
    name: 'benefitRateDetail',
    layout: HeaderAside,
    component: benefitRateDetail,
    meta: {
      requiresAuth: true,
      title: 'Ms收益等级查看'
    }
  },
  {
    path: '/userCenter/balance/balanceDetail',
    name: 'balanceDetail',
    layout: HeaderAside,
    component: balanceDetail,
    meta: {
      requiresAuth: true,
      title: '账户余额查看'
    }
  },
  {
    path: '/operate/banner/bannerDetail',
    name: 'bannerDetail',
    layout: HeaderAside,
    component: bannerDetail,
    meta: {
      requiresAuth: true,
      title: 'Banner详情'
    }
  },
  {
    path: '/operate/banner/bannerAdd',
    name: 'bannerAdd',
    layout: HeaderAside,
    component: bannerAdd,
    meta: {
      requiresAuth: true,
      title: '新增Banner'
    }
  },
  {
    path: '/operate/banner/bannerEdit',
    name: 'bannerEdit',
    layout: HeaderAside,
    component: bannerEdit,
    meta: {
      requiresAuth: true,
      title: '编辑Banner'
    }
  },
  {
    path: '/operate/gifts/giftEdit',
    name: 'giftEdit',
    layout: HeaderAside,
    component: giftEdit,
    meta: {
      requiresAuth: true,
      title: '礼物编辑'
    }
  },
  {
    path: '/operate/gifts/giftAdd',
    name: 'giftAdd',
    layout: HeaderAside,
    component: giftAdd,
    meta: {
      requiresAuth: true,
      title: '新增礼物'
    }
  },
  {
    path: '/operate/redpacket/packetPresuppose',
    name: 'packetPresuppose',
    layout: HeaderAside,
    component: packetPresuppose,
    meta: {
      requiresAuth: true,
      title: '预设红包'
    }
  },
  {
    path: '/operate/redpacket/packetPresuppose/presupposeEdit',
    name: 'presupposeEdit',
    layout: HeaderAside,
    component: presupposeEdit,
    meta: {
      requiresAuth: true,
      title: '预设红包编辑'
    }
  },
  {
    path: '/operate/redpacket/redpacketEdit',
    name: 'redpacketEdit',
    layout: HeaderAside,
    component: redpacketEdit,
    meta: {
      requiresAuth: true,
      title: '编辑红包'
    }
  },
  {
    path: '/operate/interest/interestEdit',
    name: 'interestEdit',
    layout: HeaderAside,
    component: interestEdit,
    meta: {
      requiresAuth: true,
      title: '编辑兴趣'
    }
  },
  {
    path: '/operate/interest/interestAdd',
    name: 'interestAdd',
    layout: HeaderAside,
    component: interestAdd,
    meta:{
      requiresAuth: true,
      title: '新增兴趣'
    }
  },
  {
    path: '/operate/tag/tagAdd',
    name: 'tagAdd',
    layout: HeaderAside,
    component: tagAdd,
    meta:{
      requiresAuth: true,
      title: '新增标签'
    }
  },
  {
    path: '/operate/tag/tagEdit',
    name: 'tagEdit',
    layout: HeaderAside,
    component: tagEdit,
    meta:{
      requiresAuth: true,
      title: '编辑标签'
    }
  },
  {
    path: '/operate/notify/notifyAdd',
    name: 'notifyAdd',
    layout: HeaderAside,
    component: notifyAdd,
    meta:{
      requiresAuth: true,
      title: '新增通知'
    }
  },
  {
    path: '/operate/notify/notifyDetail',
    name: 'notifyDetail',
    layout: HeaderAside,
    component: notifyDetail,
    meta:{
      requiresAuth: true,
      title: '查看通知'
    }
  },
  {
    path: '/operate/question/questionAdd',
    name: 'questionAdd',
    layout: HeaderAside,
    component: questionAdd,
    meta:{
      requiresAuth: true,
      title: '新增Q&A'
    }
  },
  {
    path: '/operate/question/questionEdit',
    name: 'questionEdit',
    layout: HeaderAside,
    component: questionEdit,
    meta:{
      requiresAuth: true,
      title: '编辑Q&A'
    }
  },
  {
    path: '/operate/prohibition/prohibitionEdit',
    name: 'prohibitionEdit',
    layout: HeaderAside,
    component: prohibitionEdit,
    meta:{
      requiresAuth: true,
      title: '编辑禁词'
    }
  },
  {
    path: '/operate/prohibition/prohibitionAdd',
    name: 'prohibitionAdd',
    layout: HeaderAside,
    component: prohibitionAdd,
    meta:{
      requiresAuth: true,
      title: '新增禁词'
    }
  },
  {
    path: '/operate/mstype/mstypeAdd',
    name: 'mstypeAdd',
    layout: HeaderAside,
    component: mstypeAdd,
    meta:{
      requiresAuth: true,
      title: '新增Ms类型'
    }
  },
  {
    path: '/operate/mstype/mstypeEdit',
    name: 'mstypeEdit',
    layout: HeaderAside,
    component: mstypeEdit,
    meta:{
      requiresAuth: true,
      title: 'Ms类型编辑'
    }
  },
  {
    path: '/operate/institution/institutionAdd',
    name: 'institutionAdd',
    layout: HeaderAside,
    component: institutionAdd,
    meta:{
      requiresAuth: true,
      title: '新增机构'
    }
  },
  {
    path: '/operate/institution/institutionEdit',
    name: 'institutionEdit',
    layout: HeaderAside,
    component: institutionEdit,
    meta:{
      requiresAuth: true,
      title: '机构编辑'
    }
  },
  {
    path: '/operate/institution/institutionDetail',
    name: 'institutionDetail',
    layout: HeaderAside,
    component: institutionDetail,
    meta:{
      requiresAuth: true,
      title: '查看机构'
    }
  },
  {
    path: '/authority/account/accountDetail',
    name: 'accountDetail',
    layout: HeaderAside,
    component: accountDetail,
    meta: {
      requiresAuth: true,
      title: '查看'
    }
  },
  {
    path: '/authority/account/accountEdit',
    name: 'accountEdit',
    layout: HeaderAside,
    component: accountEdit,
    meta: {
      requiresAuth: true,
      title: '编辑'
    }
  },
  {
    path: '/authority/account/accountAdd',
    name: 'accountAdd',
    layout: HeaderAside,
    component: accountAdd,
    meta: {
      requiresAuth: true,
      title: '新增账户'
    }
  },
  {
    path: '/authority/role/roleAdd',
    name: 'roleAdd',
    layout: HeaderAside,
    component: roleAdd,
    meta: {
      requiresAuth: true,
      title: '新增角色'
    }
  },
  {
    path: '/authority/role/roleDetail',
    name: 'roleDetail',
    layout: HeaderAside,
    component: roleDetail,
    meta: {
      requiresAuth: true,
      title: '查看'
    }
  },
  {
    path: '/authority/role/roleEdit',
    name: 'roleEdit',
    layout: HeaderAside,
    component: roleEdit,
    meta: {
      requiresAuth: true,
      title: '编辑'
    }
  },
  {
    path: '/authority/role/roleSetting',
    name: 'roleSetting',
    layout: HeaderAside,
    component: roleSetting,
    meta: {
      requiresAuth:true,
      title: '权限设置'
    }
  }
]

// 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理
const rc = routerConfig.concat(auditrouterConfig, rfrouterConfig);
const menuRc = routerConfigMenuOut.concat(auditrouterConfigMenuOut, rfConfigMenuOut);
export default UtilIce.recursiveRouterConfig([
  ...rc,
  ...menuRc
])

// 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = UtilIce.recursiveRouterConfig(rc).map(e => {
  const route = e.children ? e.children[0] : e
  return {
    path: e.path,
    name: route.name,
    meta: route.meta
  }
})
