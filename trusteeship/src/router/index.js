import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('../pages/home');
const Cart = () => import('../pages/cart/cart');
const Buy = () => import('../pages/buy/buy');
const Pay = () => import('../pages/pay/pay');
const PayTemp = () => import('../pages/pay/temp');
const PayResult = () => import('../pages/pay/result');
const User = () => import('../pages/user/user');
const UserOrder = () => import('../pages/user/children/order');
const UserAddress = () => import('../pages/user/children/address');
const AddressAdd = () => import('../pages/user/children/address-add');
const UserInvitation = () => import('../pages/user/children/invitation');
const MyAccount = () => import('../pages/user/children/account');
const SafeCenter = () => import('../pages/user/children/safe-center');
const TrusteeshipDetail = () =>
  import('../pages/user/children/trusteeship-detail');
const IncomeDetail = () => import('../pages/user/children/income-detail');
const SignIn = () => import('../pages/sign/sign-in');
const SignUp = () => import('../pages/sign/sign-up');
const SignBack = () => import('../pages/sign/sign-back');
const UserTrusteeship = () => import('../pages/user/children/trusteeship');
const AccountBalance = () => import('../pages/user/children/account-balance');
const AccountDetail = () => import('../pages/user/children/account-detail');
const GuideIos = () => import('../pages/user/children/guide-ios');
const GuideAndroid = () => import('../pages/user/children/guide-android');
const TradingTerms = () => import('../pages/rules/trading-terms');
const PreSaleContract = () => import('../pages/rules/presale-contract');
const TrusteeshipAgreement = () => import('../pages/rules/trusteeship-agreement');
const BindAuthenticator = () => import('../pages/user/children/bind-authenticator');
const Hosting = () => import('../pages/hosting');
const Hash = () => import('../pages/hash/hash');
const HashDetail = () => import('../pages/hash/hash-detail');
const Power = () => import('../pages/user/children/power');
const PowerDetail = () => import('../pages/user/children/power-detail');
const PowerInfo = () => import('../pages/user/children/power-info');
const Exchange = () => import('../pages/exchange/exchange');
const Product = () => import('../pages/product/product');
const ProductDetail = () => import('../pages/product/product-detail');
const Error = () => import('../pages/error/error');
const AboutUs = () => import('../pages/about-us');
const Activity = () => import('../pages/activity/activity');
const Pool = () => import('../pages/pool');
const PoolDetail = () => import('../pages/pool/pool-detail');
const PoolBlockInfo = () => import('../pages/pool/pool-block-info');
const WalletAddress = () => import('../pages/pool/wallet-address');

Router.install(Vue);

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: '首页', component: Home, meta: {breadcrumb: '首页'}},
    {
      path: '/product',
      name: '矿机',
      component: {template: '<router-view/>'},
      children: [
        {path: '', component: Product},
        {
          path: 'detail',
          name: '详情',
          component: ProductDetail,
          meta: {
            breadcrumb: {
              label: '详情',
              parent: '首页'
            }
          }
        },
        {path: ':categoryId', component: Product}
      ]
    },
    {
      path: '/hosting',
      name: '托管',
      component: Hosting,
      meta: {breadcrumb: '托管'}
    },
    {
      path: '/hash',
      name: '云算力',
      component: {
        template: '<router-view/>'
      },
      children: [
        {path: '', component: Hash},
        {
          path: 'detail',
          name: '云算力详情',
          component: HashDetail,
          meta: {
            breadcrumb: {
              label: '云算力详情',
              parent: '云算力'
            }
          }
        },
        {path: ':currencyName', component: Hash}
      ]
    },
    {path: '/exchange', name: '算力交易', component: Exchange},
    {path: '/sign-in', component: SignIn, meta: {full: true}},
    {path: '/sign-up', component: SignUp, meta: {full: true}},
    {path: '/sign-back', component: SignBack, meta: {full: true}},
    {
      path: '/cart',
      name: '购物车',
      component: Cart,
      meta: {
        breadcrumb: {
          label: '购物车',
          parent: '首页'
        },
        auth: true
      }
    },
    {
      path: '/buy',
      name: '提交订单',
      component: Buy,
      meta: {
        breadcrumb: {
          label: '提交订单',
          parent: '购物车'
        },
        auth: true
      }
    },
    {path: '/pay', component: Pay, meta: {auth: true}},
    {path: '/pay-temp', component: PayTemp, meta: {auth: true, full: true}},
    {path: '/pay-result', component: PayResult},
    {path: '/trading-terms', component: TradingTerms},
    {path: '/presale-contract', component: PreSaleContract},
    {path: '/trusteeship-agreement', component: TrusteeshipAgreement},
    {
      path: '/i',
      name: '个人中心',
      meta: {
        // breadcrumb: {
        //   label: '个人中心'
        // },
        auth: true
      },
      component: User,
      children: [
        {path: '', redirect: 'account'},
        {
          path: 'order',
          name: '我的订单',
          component: UserOrder,
          meta: {
            breadcrumb: {
              label: '我的订单',
              parent: '个人中心'
            },
            auth: true
          }
        },
        {
          path: 'invitation',
          name: '我的邀请',
          component: UserInvitation,
          meta: {
            breadcrumb: {
              label: '我的邀请',
              parent: '个人中心'
            },
            auth: true
          }
        },
        {
          path: 'address',
          component: {
            template: '<router-view/>'
          },
          children: [
            {
              path: '',
              component: UserAddress,
              name: '我的收获地址',
              meta: {
                breadcrumb: {
                  label: '我的收获地址',
                  parent: '个人中心'
                },
                auth: true
              }
            },
            {
              path: 'add',
              component: AddressAdd,
              name: '新增收货地址',
              meta: {
                breadcrumb: {
                  label: '新增收货地址',
                  parent: '我的收获地址'
                },
                auth: true
              }
            }
          ]
        },
        {
          path: 'account',
          component: {
            template: '<router-view/>'
          },
          children: [
            {
              path: '',
              component: MyAccount,
              name: '我的账户',
              meta: {
                breadcrumb: {
                  label: '我的账户',
                  parent: '个人中心'
                },
                auth: true
              }
            },
            {
              path: 'account-balance',
              component: AccountBalance,
              meta: {
                breadcrumb: {
                  label: '余额明细',
                  parent: '我的账户'
                },
                auth: true
              }
            },
            {
              path: 'account-detail',
              component: AccountDetail,
              meta: {
                breadcrumb: {
                  label: '账户明细',
                  parent: '我的账户'
                },
                auth: true
              }
            }
          ]
        },
        {
          path: 'safety',
          component: {
            template: '<router-view/>'
          },
          children: [
            {
              path: '',
              component: SafeCenter,
              name: '安全中心',
              meta: {
                breadcrumb: {
                  label: '安全中心',
                  parent: '个人中心'
                },
                auth: true
              }
            },
            {
              path: 'bind-authenticator',
              component: {
                template: '<router-view/>'
              },
              children: [
                {
                  path: '',
                  component: BindAuthenticator,
                  name: '绑定谷歌验证器',
                  meta: {
                    breadcrumb: {
                      label: '绑定谷歌验证器',
                      parent: '安全中心'
                    },
                    auth: true
                  }
                },
                {
                  path: 'guide-ios',
                  component: GuideIos,
                  name: 'ios绑定指南',
                  meta: {
                    breadcrumb: {
                      label: 'ios绑定指南',
                      parent: '绑定谷歌验证器'
                    }
                  }
                },
                {
                  path: 'guide-android',
                  component: GuideAndroid,
                  name: 'android绑定指南',
                  meta: {
                    breadcrumb: {
                      label: 'android绑定指南',
                      parent: '绑定谷歌验证器'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'trusteeship',
          component: {
            template: '<router-view/>'
          },
          children: [
            {
              path: '',
              name: '我的托管',
              component: UserTrusteeship,
              meta: {
                breadcrumb: {
                  label: '我的托管',
                  parent: '个人中心'
                },
                auth: true
              }
            },
            {
              path: 'trusteeship-detail',
              name: '托管详情',
              component: {
                template: '<router-view/>'
              },
              children: [
                {
                  path: '',
                  component: TrusteeshipDetail,
                  meta: {
                    breadcrumb: {
                      label: '托管详情',
                      parent: '我的托管'
                    },
                    auth: true
                  }
                },
                {
                  path: 'income-detail',
                  component: IncomeDetail,
                  meta: {
                    auth: true
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'power',
          component: {
            template: '<router-view/>'
          },
          children: [
            {
              path: '',
              component: Power,
              name: '我的云算力',
              meta: {
                breadcrumb: {
                  label: '我的云算力',
                  parent: '个人中心'
                },
                auth: true
              }
            },
            {
              path: 'power-detail',
              component: PowerDetail,
              name: '算力明细',
              meta: {
                breadcrumb: {
                  label: '算力明细',
                  parent: '我的云算力'
                },
                auth: true
              }
            },
            {
              path: 'power-info',
              component: PowerInfo,
              name: '算力详情',
              meta: {
                breadcrumb: {
                  label: '算力详情',
                  parent: '我的云算力'
                },
                auth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/about-us',
      component: AboutUs,
      meta: {
        breadcrumb: {
          label: '算立方简介',
          parent: '首页'
        }
      }
    },
    {path: '/activity', component: Activity, meta: {full: true}},
    {
      path: '/pool',
      name: '矿池',
      component: Pool
    },
    {
      path: '/pool/:coin',
      name: '矿池详情',
      component: PoolDetail
    },
    {
      path: '/pool-block-info',
      name: '矿池出块详情',
      component: PoolBlockInfo
    },
    {
      path: '/wallet-address',
      name: '钱包地址',
      component: WalletAddress
    },
    {path: '*', component: Error}
  ]
});
