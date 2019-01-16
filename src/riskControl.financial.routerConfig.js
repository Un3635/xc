import HeaderAside from "./layouts/HeaderAside";
import topup from './pages/financial/topup.vue'
import withdrawal from './pages/financial/withdrawal.vue'
import exchange from './pages/financial/exchange.vue'
import diamonds from './pages/financial/diamonds.vue'
import gemstone from './pages/financial/gemstone.vue'
import agency from './pages/financial/agency.vue'
import Detail from './pages/financial/detail'

import blackWhite from './pages/riskControl/blackWhite.vue';
import additional from './pages/riskControl/additional.vue';
import alarm from './pages/riskControl/alarm.vue';
import platForm from './pages/riskControl/platform.vue';

import institutions from './pages/institutions';
import signSign from './pages/institutions/sign';
import signEdit from './pages/institutions/edit';
import blackWhiteDetail from './pages/riskControl/detail/blackWhite.vue'
import additionalDetail from './pages/riskControl/detail/checkAdditional.vue'
import additionalAdd from './pages/riskControl/detail/addAddtionnal.vue'

const rfrouterConfig = [
  // 财务中心
  {
    path: "/financial/topup",
    name: "topup",
    layout: HeaderAside,
    component: topup,
    meta: {
      requiresAuth: true,
      title: "充值记录"
    }
  },
  {
    path: "/financial/withdrawal",
    name: "withdrawal",
    layout: HeaderAside,
    component: withdrawal,
    meta: {
      requiresAuth: true,
      title: "Ms提现记录"
    }
  },
  {
    path: "/financial/exchange",
    name: "exchange",
    layout: HeaderAside,
    component: exchange,
    meta: {
      requiresAuth: true,
      title: "兑换记录"
    }
  },
  {
    path: "/financial/diamonds",
    name: "diamonds",
    layout: HeaderAside,
    component: diamonds,
    meta: {
      requiresAuth: true,
      title: "钻石流水"
    }
  },
  {
    path: "/financial/gemstone",
    name: "gemstone",
    layout: HeaderAside,
    component: gemstone,
    meta: {
      requiresAuth: true,
      title: "宝石流水"
    }
  },
  {
    path: "/financial/agency",
    name: "agency",
    layout: HeaderAside,
    component: agency,
    meta: {
      requiresAuth: true,
      title: "机构收益"
    }
  },
  // 风控中心
  {
    path: "/riskControl/platform",
    name: "platform",
    layout: HeaderAside,
    component: platForm,
    meta: {
      requiresAuth: true,
      title: "平台规则"
    }
  },
  {
    path: "/riskControl/blackWhite",
    name: "blackWhite",
    layout: HeaderAside,
    component: blackWhite,
    meta: {
      requiresAuth: true,
      title: "黑白名单"
    }
  },
  {
    path: "/riskControl/additional",
    name: "additional",
    layout: HeaderAside,
    component: additional,
    meta: {
      requiresAuth: true,
      title: "附加管理"
    }
  },
  {
    path: "/riskControl/alarm",
    name: "alarm",
    layout: HeaderAside,
    component: alarm,
    meta: {
      requiresAuth: true,
      title: "聊天警报"
    }
  },
  // 机构中心
  {
    path: "/institutions/signing",
    name: "signing",
    layout: HeaderAside,
    component: institutions,
    meta: {
      requiresAuth: true,
      title: "签约管理"
    },
    children: [
      {
        path: '/institutions/signing/sign',
        name: 'signSign',
        layout: HeaderAside,
        component: signSign,
        meta: {
          requiresAuth: true,
          title: "签约"
        }
      },
      {
        path: '/institutions/signing/edit',
        name: 'signEdit',
        layout: HeaderAside,
        component: signEdit,
        meta: {
          requiresAuth: true,
          title: "编辑"
        }
      },
    ]
  }
];
const rfConfigMenuOut = [
  {
    path: '/financial/agency/detail',
    name: 'agencyDetail',
    layout: HeaderAside,
    component: Detail,
    meta: {
      requiresAuth: true,
      title: "机构收益"
    }
  },
  {
    path: "/riskControl/additional/detail",
    name: "additionalDetail",
    layout: HeaderAside,
    component: additionalDetail,
    meta: {
      requiresAuth: true,
      title: "附加管理"
    }
  },
  {
    path: "/riskControl/additional/add",
    name: "additionalAdd",
    layout: HeaderAside,
    component: additionalAdd,
    meta: {
      requiresAuth: true,
      title: "附加管理"
    }
  },
  {
    path: "/riskControl/blackWhite/detail",
    name: "blackWhiteDetail",
    layout: HeaderAside,
    component: blackWhiteDetail,
    meta: {
      requiresAuth: true,
      title: "黑白名单"
    }
  }
]

export { rfrouterConfig, rfConfigMenuOut };