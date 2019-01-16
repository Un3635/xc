import {AppConfig} from './config';
import API from './api';
import TokenAPI from './token-api';

/**
 * 进入收银中心时查询收银信息
 * @param {string} orderNo 订单No
 * @param {string} goodsType 商品类型 1-矿机 2-算力
 * @returns {Promise<*>}
 */
const getPayInfo = (orderNo, goodsType) => TokenAPI.getValid().then(token => API.$post(AppConfig.getPayInfo, {
  orderNo,
  goodsType,
  token
}));


/**
 * 提交付款凭证信息
 * @param {integer} orderId 订单ID
 * @param {string} desc 付款备注信息
 * @param {string} remitName 汇款人名字
 * @param {string} remitBankNo 汇款银行卡号
 * @param {string} remitBankName 汇款银行
 * @param {string} remitSubbranchName 汇款银行支行
 * @param {string} remitAmount 汇款金额
 * @param {string} remitDate 汇款日期
 * @param {string} channel 渠道 1-线下付款
 * @param {integer} goodsType 商品类型 1-矿机线下付款 2-算力
 * @returns {Promise<*>}
 */
const submit = ({orderId, desc, remitName, remitBankNo, remitBankName, remitSubbranchName, remitAmount, remitDate, channel, goodsType}) => TokenAPI.getValid().then(token => API.$post(AppConfig.submitPayInfo, {
  token,
  orderId,
  desc,
  remitName,
  remitBankNo,
  remitBankName,
  remitSubbranchName,
  remitAmount,
  remitDate,
  channel,
  goodsType
}));

/**
 * 我的信用卡信息
 * @returns {Promise<*>}
 */
const myCardInfo = () => TokenAPI.getValid().then(token => API.$get(AppConfig.myCardInfo, {
  params: {token}
}));

/**
 * 支付时是否需要发送短信验证码
 * @param {string} authCode 之前提交订单的验证码
 * @returns {Promise<*>}
 */
const needValid = authCode => TokenAPI.getValid().then(token => API.$get(AppConfig.needValid, {
  params: {token, authCode}
}));

/**
 * 绑定信用卡/更换信用卡
 * @param {string} holderName 持卡人姓名
 * @param {string} cardNo 信用卡卡号
 * @param {string} expireDate 信用卡过期日期yyyy-MM
 * @param {integer} update 0.绑定信用卡1.更换信用卡
 * @returns {Promise<*>}
 */
const bindingCard = ({holderName, cardNo, expireDate, update}) => TokenAPI.getValid().then(token => API.$post(AppConfig.bindingCard, {
  token,
  holderName,
  cardNo,
  expireDate,
  update
}));

/**
 * 信用卡支付
 * @param {string} orderNo 订单号
 * @param {integer} type 订单类型:0.矿机1.算力2.电费管理费账单
 * @param {string} authCode 验证码
 * @param {string} codeToken 验证码Token
 * @returns {Promise<*>}
 */
const pay = ({orderNo, type, authCode, codeToken}) => TokenAPI.getValid().then(token => API.$post(AppConfig.cardPay, {
  token,
  orderNo,
  type,
  authCode,
  codeToken
}));

const payAPI = {
  getPayInfo,
  submit,
  myCardInfo,
  needValid,
  bindingCard,
  pay
};

export default payAPI;
