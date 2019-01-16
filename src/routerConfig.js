/* eslint-disable */

// 工具
import UtilIce from '@/libs/util-ice.js'
// 页面和布局
import Index from './pages/Index'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import HeaderAside from './layouts/HeaderAside'

import recharge from './pages/order/recharge'
import Detail from './pages/order/recharge/componnets/detail'

import withdraw from './pages/order/withdraw'
import Service from './pages/order/withdraw/componnets/service'
import WithdrawDetail from './pages/order/withdraw/componnets/withdrawDetail'

import user from './pages/user'
import UserDetail from './pages/user/componnets/userDetail'
import assets from './pages/assets'

import role from './pages/authority/role'
import roleDetail from './pages/authority/role/componnets/roleDetail'
import roleEdit from './pages/authority/role/componnets/roleEdit'
import roleAdd from './pages/authority/role/componnets/roleAdd'
import roleSetting from './pages/authority/role/componnets/roleSettintg'
import account from './pages/authority/account'
import accountDetail from './pages/authority/account/componnets/accountDetail'
import accountEdit from './pages/authority/account/componnets/accountEdit'
import accountAdd from './pages/authority/account/componnets/accountAdd'

import configuration from './pages/configuration/configuration'
import configEdit from './pages/configuration/componnets/configEdit'
import d2admin from "./store/modules/d2admin";




// 变量名 routerConfig 为 iceworks 检测关键字
// ice 会自动在这个变量下添加路由数据
// 请不要修改名称
// 备注 ice 自动添加的路由记录是以下格式
// {
//   path: '/page4',
//   layout: d2LayoutMain,
//   component: 4
// }

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
    {
        path: '/order/recharge',
        name: 'recharge',
        layout: HeaderAside,
        component: recharge,
        meta: {
            requiresAuth: true,
            title: '充值订单'
        }
    },
    {
      path: '/order/withdraw',
      name: 'withdraw',
      layout: HeaderAside,
      component: withdraw,
      meta: {
          requiresAuth: true,
          title: '提币订单'
      }
    },
    {
        path: '/user',
        name: 'user',
        layout: HeaderAside,
        component: user,
        meta: {
            requiresAuth: true,
            title: '用户列表'
        }
    },
    {
        path: '/assets',
        name: 'assets',
        layout: HeaderAside,
        component: assets,
        meta: {
            requiresAuth: true,
            title: '资产流水列表'
        }
    },
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
    },
    {
      path: '/configuration',
      name: 'configuration',
      layout: HeaderAside,
      component: configuration,
      meta: {
        requiresAuth: true,
        title: '配置中心列表'
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
    path: '/order/recharge/detail',
    name:'detail',
    layout: HeaderAside,
    component:Detail,
    meta: {
       requiresAuth: true
    }
  },
 {
    path: '/order/withdraw/service',
    name:'service',
    layout: HeaderAside,
    component:Service,
    meta: {
        requiresAuth: true
    }
 },
 {
    path: '/order/withdraw/withdrawDetail',
    name:'withdrawDetail',
    layout: HeaderAside,
    component:WithdrawDetail,
     meta: {
         requiresAuth: true
     }
 },
 {
    path: '/user/userDetail',
    name:'userDetail',
    layout: HeaderAside,
    component:UserDetail,
    meta: {
       requiresAuth: true
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
  },
  {
    path: '/configuration/configEdit',
    name: 'configEdit',
    layout: HeaderAside,
    component: configEdit,
    meta: {
      requiresAuth: true,
      title: '编辑'
    }
  }
]

// 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default UtilIce.recursiveRouterConfig([
  ...routerConfig,
  ...routerConfigMenuOut
])

// 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = UtilIce.recursiveRouterConfig(routerConfig).map(e => {
  const route = e.children ? e.children[0] : e
  return {
    path: e.path,
    name: route.name,
    meta: route.meta
  }
})
