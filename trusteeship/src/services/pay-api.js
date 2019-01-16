import qs from 'qs';
import TokenAPI from './token-api';
import AppConfig from '../config';
import api from './api';

const HOST = AppConfig.apiEndpoint;

const PAY_ORDER = HOST + '/' + AppConfig.pay;
/**
 * 打开新窗口支付订单
 * @param orderNo 订单号
 * @param returnUrl 回调url
 * @param tempWindow 新开窗口
 */
const payOrder = (orderNo, returnUrl, tempWindow) => TokenAPI.getValid(true)
  .then(token => {
    tempWindow.location = PAY_ORDER + '?' + qs.stringify({
      token,
      orderNo,
      returnUrl
    });
  });

/**
 * 支付宝支付
 * @param {string} orderNo   订单号
 * @param {string} returnUrl 同步通知url
 */
const alipay = (orderNo, returnUrl) => TokenAPI.getValid(true)
  .then(token => api.$post(AppConfig.alipay, {
    token,
    orderNo,
    returnURl: returnUrl,
    type: 'PC'
  }));

/**
 * 支付宝充值
 * @param {string} orderNo   订单号
 * @param {string} returnUrl 同步通知url
 */
const rechargeAlipay = (orderNo, returnUrl) => TokenAPI.getValid(true)
  .then(token => api.$post(AppConfig.rechargeAlipay, {
    token,
    orderNo,
    returnURl: returnUrl,
    type: 'PC'
  }));

/**
 * 支付宝支付结果查询
 * @param {string} orderNo   订单号
 * @return {Promise<*>}
 */
const alipayResult = (orderNo) => TokenAPI.getValid(true)
  .then(token => api.$post(AppConfig.alipayResult, {
    token,
    orderNo
  }))
  .then(res => res.result)
  .then(res => {
    if (res === '1') {
      return res;
    }
    return Promise.reject({msg: '支付失败'});
  });

/**
 * 支付结果查询
 * @param {string|number} orderNo 订单号
 * @return {Promise<*>} 正常结果为resolve,异常结果reject
 */
const payResultQuery = orderNo => TokenAPI.getValid()
  .then(token => api.$get(AppConfig.payQuery, {params: {token, orderNo}}));

/**
 * 查询订单是否支付成功
 *
 * @param  {string|number} orderNo 订单号
 * @return {Promise<*>}  支付成功为resolve，其他情况为reject
 */
const payCheck = orderNo => payResultQuery(orderNo)
  .then(data => {
    if (data.status === 'S') {
      return data;
    }
    if (data.status === 'I') {
      return Promise.reject({msg: '支付处理中，请稍后'});
    }
    return Promise.reject({msg: '支付失败,请联系管理员或稍后重试'});
  });

/**
 *
 * @param {Object} params 参数
 * @param {string}        params.orderId  支付单号
 * @param {string}        params.channel  1:线下充值  0:线下付款
 * @param {string}        params.imgURL   支付凭证图片链接
 * @param {string}        params.name     汇款人姓名
 * @param {string}        params.account  汇款账户
 * @param {string}        params.bank     开户行
 * @param {string|number} params.amount   汇款金额
 * @param {string}        params.date     汇款日期,e.g. 2018-02-01
 * @return {Promise<*>}
 */
const payOffline = params => TokenAPI.getValid().then(token => api.$post(AppConfig.payOffline, {
  orderId: params.orderId,
  picUrl: params.imgURL,
  remitName: params.name,
  remitBankNo: params.account,
  channel: params.channel,
  remitBankName: params.bank,
  remitAmount: params.amount,
  remitDate: params.date,
  token
}));

/**
 * 微信web支付
 *
 * @param {string}  orderNo  待支付订单号
 * @return {Promise<any>}
 */
const wechatPay = (orderNo) => TokenAPI.getValid().then(token => api.$post(AppConfig.weChatPay, {
  token,
  orderNo,
  type: 'PC'
}));

/**
 * 账户余额支付
 * @param {string} orderNo 订单号
 * @return {Promise<any>}
 */
const balancePay = (orderNo) => TokenAPI.getValid().then(token => api.$post(AppConfig.balancePay, {
  orderNo,
  token
}));


const PayAPI = {
  pay: payOrder,
  result: payResultQuery,
  check: payCheck,
  payOffline: payOffline,
  alipay,
  rechargeAlipay,
  alipayResult,
  wechatPay,
  balancePay
};

export default PayAPI;
