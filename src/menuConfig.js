/* eslint-disable */
import utilIce from './libs/util-ice'
import util from '@/libs/util.js'
import account from "./pages/authority/account";
import Index from "./pages/Index";
import user from "./pages/user";
import recharge from "./pages/order/recharge";
import withdraw from "./pages/order/withdraw";
import assets from "./pages/assets";
import HeaderAside from "./layouts/HeaderAside";
import d2admin from "./store/modules/d2admin";
import role from "./pages/authority/role";

// 菜单配置

// 侧栏菜单配置
// ice 会在新建页面的时候 push 数据
// ice 自动添加的菜单记录是以下格式：(不会有嵌套)
// {
//   name: 'Nav',
//   path: '/page',
//   icon: 'home',
// },

/*let asideMenuConfig = [
  {
    title: '订单中心',
    icon: 'folder-o',
    children: [
      {
          title: '充值订单',
          path: '/order/recharge',
      },
      {
          title: '提币订单',
          path: '/order/withdraw/',
      }
    ]
  },
  {
      title: '用户管理',
      icon: 'folder-o',
      children: [
        {
            title: '用户列表',
            path: '/user/'
        }
      ]
  },
  {
    title: '资产流水',
    icon: 'folder-o',
    children: [
        {
            title: '资产流水列表',
            path: '/assets/'
        }
    ]
  },
  {
    title: '权限管理',
    icon: 'folder-o',
    children: [
      {
        title: '账号管理',
        path: '/authority/account/'
      },
      {
        title: '角色管理',
        path: '/authority/role/'
      }
    ]
  },
  {
    title: '配置中心',
    icon: 'folder-o',
    children: [
        {
            title: '配置中心列表',
            path: '/configuration/'
        }
    ]
  }
]*/
var asideMenuConfig = [];
if(util.cookies.get('d2adminMenuAside') && util.cookies.get('d2adminMenuAside') !== ''){
  asideMenuConfig = JSON.parse(util.cookies.get('d2adminMenuAside'));
} else {
  asideMenuConfig = [];
}


// 顶栏菜单配置
// ice 不会修改 headerMenuConfig
// 如果你需要功能开发之前就配置出菜单原型，可以只设置 name 字段
// D2Admin 会自动添加不重复 id 生成菜单，并在点击时提示这是一个临时菜单
const headerMenuConfig = [
  {
    name: '空菜单',
    icon: 'flask',
    children: [
      {
        name: 'menu 1',
        children: [
          {
            name: 'menu 1-1',
            children: [
              { name: 'menu 1-1-1' },
              { name: 'menu 1-1-2' }
            ]
          },
          { name: 'menu 1-2' }
        ]
      },
      { name: 'menu 2' },
      { name: 'menu 3' }
    ]
  },
  {
    name: '演示页面',
    icon: 'folder-o',
    children: [
      {
        name: '演示 1',
        path: '/demo1/'
      },
      {
        name: '演示 2',
        path: '/demo2/'
      }
    ]
  }
]

// 请根据自身业务逻辑修改导出设置，并在合适的位置赋给对应的菜单

// 参考
// 设置顶栏菜单的方法 (vuex)
// $store.commit('d2adminMenuHeaderSet', menus)
// 设置侧边栏菜单的方法 (vuex)
// $store.commit('d2adminMenuAsideSet', menus)
// 你可以在任何地方使用上述方法修改顶栏和侧边栏菜单

// 导出顶栏菜单
export const menuHeader = utilIce.recursiveMenuConfig(headerMenuConfig);

// 导出侧边栏菜单
export const menuAside = utilIce.recursiveMenuConfig(asideMenuConfig);
