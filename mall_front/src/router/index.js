import Vue from 'vue'
import Router from 'vue-router'

import personalPart from '@/components/personalCenter/personalPart'//个人中心主页面

import home from '@/components/home'//个人中心主页面

import accountInfo from '@/components/personalCenter/accountInfo'//账号信息初始态|正常态
import balanceDetail from '@/components/personalCenter/balanceDetail' //账户余额
import freeDeposit from '@/components/personalCenter/freeDeposit'//免押金额度-初始态
import companyCertification from '@/components/personalCenter/companyCertification'//免押金额度-中间态-企业认证
import applyQuota from '@/components/personalCenter/applyQuota'//免押金额度-中间态-申请额度
import applySubmitSuccess from '@/components/personalCenter/applySubmitSuccess'//免押金额度-首次申请Waiting态
import freeDepositNoUse from '@/components/personalCenter/freeDepositNoUse'//免押金额度-完成态-未使用
import freeDepositUsed from '@/components/personalCenter/freeDepositUsed'//免押金额度-完成态-已使用
import promoteQuota from '@/components/personalCenter/promoteQuota'//免押金额度-提升额度-操作业
import promoteQuotaSubmitSuccess from '@/components/personalCenter/promoteQuotaSubmitSuccess'//免押金额度-提升额度-waiting页
import companyManage from '@/components/personalCenter/companyManage'//企业管理
import modifyRentProduct from '@/components/personalCenter/modifyRentProduct'//修改租凭商品
import subCompanyManage from '@/components/personalCenter/subCompanyManage'//根节点公司管理
import assetMarket from '@/components/personalCenter/assetMarket'//资产大盘
import underAssetMarket from '@/components/personalCenter/underAssetMarket'//资产大盘
import approvalManage from '@/components/personalCenter/approvalManage'//审批管理
import approval from '@/components/personalCenter/approval'//审批页面
import lookApproval from '@/components/personalCenter/lookApproval'//查看审批页面
import assetDetail from '@/components/personalCenter/assetDetail'//资产详单
import machineD from '@/components/personalCenter/machineD'//机器详单
import facilityManager from '@/components/personalCenter/facilityManager'//在租设备
import inRentDetail from '@/components/personalCenter/inRentDetail'//在租设备
import applyOrder from '@/components/personalCenter/applyOrder'//我的申请订单

import companyCertificationSuccess from '@/components/personalCenter/companyCertificationSuccess'//账号认证成功页
import companyCertificationFailed from '@/components/personalCenter/companyCertificationFailed'//账号认证失败页
import RecompanyCertification from '@/components/personalCenter/RecompanyCertification'//账号重新认证页

import productPage from '@/components/productPage'//全部机型页
import cashierIndex from '@/components/cashierCenter/cashierIndex'//收银中心
import cashierResult from '@/components/cashierCenter/cashierResult'//收银中心支付结果
import forgetPassword from '@/components/forgetPassword'//忘记密码
import detail from '@/components/detail'//免押金额度-提升额度-waiting页
import error from '@/components/error'//免押金额度-提升额度-waiting页


import myOrder from '@/components/personalCenter/myOrder'
import myBill from '@/components/personalCenter/myBill'//我的账单页面
import myBillMore from '@/components/personalCenter/myBillMore'//我的账单页面
import myBillEmpty from '@/components/personalCenter/myBillEmpty'//我的账单 空 页面
// import helpCenter from '@/components/helpCenter'
import accountVerify from '@/components/personalCenter/accountVerify'
import myAccount from '@/components/personalCenter/myAccount'
// 购物车
import cart from '@/components/cart'
//提交订单
import buy from '@/components/buy'
//帮助中心
import helpCenter from '@/components/helpCenter/index'
import rentMachineFlow from '@/components/helpCenter/rentMachineFlow'
import rentPay from '@/components/helpCenter/rentPay'
import leaseWay from '@/components/helpCenter/leaseWay'
import alsoMachine from '@/components/helpCenter/alsoMachine'
import attentionMatters from '@/components/helpCenter/attentionMatters'
import afterSales from '@/components/helpCenter/afterSales'
import proceduresAndExpenses from '@/components/helpCenter/proceduresAndExpenses'
import undamage from '@/components/helpCenter/undamage'
import breakAContact from '@/components/helpCenter/breakAContact'
import machineError from '@/components/helpCenter/machineError'
import machineBreakdown from '@/components/helpCenter/machineBreakdown'
import machineMissing from '@/components/helpCenter/machineMissing'
import freightCollect from '@/components/helpCenter/freightCollect'
import advancedSurrender from '@/components/helpCenter/advancedSurrender'
import whatFreeDeposit from '@/components/helpCenter/whatFreeDeposit'

import alipay from '@/components/blank'
import shoppingStreet from '@/components/activityPage/shoppingStreet'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: home,
      children: [
        {
          path: '/shoppingStreet',
          name: 'shoppingStreet',
          component: shoppingStreet,
        },
        {
          path: '/i',
          redirect: {
            name: '个人中心'
          },
          component: personalPart,
          children: [
            {
              path: '/',
              name: '账号信息',
              component: accountInfo,
              meta:{
                breadcrumb:'个人中心'
              }
            },
            {
              path: '/balanceDetail',
              name: '账户余额',
              component: balanceDetail
            },
            {
              path: '/freeDeposit',
              name: '免押金额度',
              component: freeDeposit,
            },
            {
              path: '/myOrder',
              name: '我的订单',
              component: myOrder
            },
            {
              path: '/myBillMore',
              name: '我的账单',
              component: myBillMore
            },
            // {
            //   path: 'helpCenter',
            //   name: 'helpCenter',
            //   component: helpCenter
            // },
            {
              path: '/companyCertificationFailed',
              name: '账号认证',
              component: companyCertificationFailed
            },
            {
              path: '/myAccount',
              name: '我的账号',
              component: myAccount
            },
            {
              path: '/companyManage',
              name: '企业管理',
              component: companyManage,
            },
            {
              path: '/modifyRentProduct',
              name: '修改租凭的商品',
              component: modifyRentProduct,
              meta:{
                breadcrumb:{
                  label: '修改租凭的商品',
                  parent: '根节点公司管理'
                }
              }
            },
            {
              path: '/subCompanyManage',
              name: '根节点公司管理',
              component: subCompanyManage,
              meta:{
                breadcrumb:{
                  label: '根节点公司管理',
                  parent: '企业管理'
                }
              }
            },
            {
              path: '/assetMarket',
              name: '资产大盘',
              component: assetMarket
            },
            {
              path: '/underAssetMarket',
              name: '下属公司资产列表',
              component: underAssetMarket,
              meta:{
                breadcrumb:{
                  label: '下属公司资产列表',
                  parent: '资产大盘'
                }
              }
            },
            {
              path: '/approvalManage',
              name:'审批管理',
              component: approvalManage
            },
            {
              path: '/facilityManager',
              name:'在租设备',
              component: facilityManager
            },
            {
              path: '/inRentDetail/:productNo',
              name:'在租详单',
              component: inRentDetail
            },
            {
              path: '/applyOrder',
              name:'我的申请订单',
              component: applyOrder
            },
            {
              path: '/approval',
              name:'审批详情',
              component: approval,
              meta:{
                breadcrumb:{
                  label: '审批详情',
                  parent: '审批管理'
                }
              }
            },
            {
              path: '/lookApproval',
              name:'查看审批',
              component: lookApproval,
              meta:{
                breadcrumb:{
                  label: '审批详情',
                  parent: '我的订单'
                }
              }
            },
            {
              path: '/assetDetail',
              name: '资产详情',
              component: assetDetail,
              meta:{
                breadcrumb:{
                  label: '资产详情',
                  parent: '资产大盘'
                }
              }
            },
            {
              path: '/machineD',
              name: '机器详单',
              component: machineD,
              meta:{
                breadcrumb:{
                  label: '机器详单',
                  parent: '资产大盘'
                }
              }
            },
            // {
            //   path: '/companyCertification',
            //   name: '企业认证',
            //   component: companyCertification
            // },
            // {
            //   path: '/applyQuota',
            //   name: 'applyQuota',
            //   component: applyQuota
            // },
            // {
            //   path: '/promoteQuota',
            //   name: 'promoteQuota',
            //   component: promoteQuota
            // },
            // {
            //   path: '/applySubmitSuccess',
            //   name: 'applySubmitSuccess',
            //   component: applySubmitSuccess
            // },
            // {
            //   path: '/freeDepositNoUse',
            //   name: 'freeDepositNoUse',
            //   component: freeDepositNoUse
            // },
            // {
            //   path: '/freeDepositUsed',
            //   name: 'freeDepositUsed',
            //   component: freeDepositUsed
            // },
            // {
            //   path: '/companyCertificationSuccess',
            //   name: 'companyCertificationSuccess',
            //   component: companyCertificationSuccess
            // },
            // {
            //   path: '/RecompanyCertification',
            //   name: 'RecompanyCertification',
            //   component: RecompanyCertification
            // },
            // {
            //   path: '/myBillEmpty',
            //   name: 'myBillEmpty',
            //   component: myBillEmpty
            // },
            // {
            //   path: '/promoteQuotaSubmitSuccess',
            //   redirect: {
            //     name: 'promoteQuotaSubmitSuccess'
            //   },
            //   component: promoteQuotaSubmitSuccess
            // },

          ]
        },
        {
          path: '/list',
          name: '全部机型',
          component: productPage,
        },
        {
          path: '/detail',
          name: 'detail',
          component: detail
        },
        {
          path: '/cart',
          name: '购物车',
          component: cart
        },
        {
          path: '/buy',
          name: '提交订单',
          component: buy
        },
        {
          path: '/resetPassword',
          name: '重置密码',
          component: forgetPassword,
        },
        {
          path: '/pay',
          name: 'pay',
          component: cashierIndex,
        },
        {
          path: '/result',
          name: 'result',
          component: cashierResult,
          // beforeEnter: (to, from, next) => {
          //   if(from.path === '/pay'){
          //     next();
          //   }else{
          //     next('/');
          //   }
          // }
        },
        {
          path: '/promoteQuotaSubmitSuccess',
          name: 'promoteQuotaSubmitSuccess',
          component: promoteQuotaSubmitSuccess
        },
        {
          path: '/helpCenter',
          redirect: {
            name: '帮助中心'
          },
          component: helpCenter,
          children: [
            {
              path: '/',
              name: '什么是免押金额度',
              component: whatFreeDeposit
            },
            {
              path: '/rentMachineFlow',
              name: '租机流程',
              component: rentMachineFlow
            },
            {
              path: '/rentPay',
              name: '租金缴付',
              component: rentPay
            },
            {
              path: '/leaseWay',
              name: '租赁方式',
              component: leaseWay
            },
            {
              path: '/alsoMachine',
              name: '取还机',
              component: alsoMachine
            },
            {
              path: '/attentionMatters',
              name: '签收注意事项',
              component: attentionMatters
            },
            {
              path: '/proceduresAndExpenses',
              name: '退机、换机流程与费用',
              component: proceduresAndExpenses
            },
            {
              path: '/afterSales',
              name: '售后服务',
              component: afterSales
            },
            {
              path: '/undamage',
              name: '非损害鉴定标准与收费',
              component: undamage
            },
            {
              path: '/breakAContact',
              name: '违约行为',
              component: breakAContact
            },
            {
              path: '/machineError',
              name: '机器故障怎么办',
              component: machineError
            },
            {
              path: '/machineBreakdown',
              name: '使用中机器损坏怎么办',
              component: machineBreakdown
            },
            {
              path: '/machineMissing',
              name: '机器丢失怎么办',
              component: machineMissing
            },
            {
              path: '/freightCollect',
              name: '运费收取',
              component: freightCollect
            },
            {
              path: '/advancedSurrender',
              name: '提前退租怎么办',
              component: advancedSurrender
            }
          ]
        },
        {
          path: '/error',
          name: 'error',
          component: error
        }

      ]
    },
    {
      path: '/alipay',
      name: 'alipay',
      component: alipay,
    }
  ]
})
