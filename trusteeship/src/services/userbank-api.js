import AppConfig from "../config";
import API from "./api";
import TokenAPI from './token-api';

/**
 * 先锋认证支付绑卡
 * @param {string} mobile 手机号
 * @param {string} realName 真实名字
 * @param {string} cardNo 身份证号
 * @param {string} bankCardNo 银行卡号
 * @returns {Promise<*>}
 */
const sendVerifyCode = ({mobile,realName,cardNo,bankCardNo}) => TokenAPI.getValid().then(token => API.$post(AppConfig.bindCard,{
  mobile,
  realName,
  cardNo,
  bankCardNo,
  token
}));

/**
 * 先锋认证支付预支付(未绑卡)
 * @param {string} mobile 手机号
 * @param {string} bankCode 银行编号
 * @param {string} realName 真实名字
 * @param {string} cardNo 身份证号
 * @param {string} bankCardNo 银行卡号
 * @param {string} outOrderId 订单号
 * @param {string} type 订单类型：S：算立订单、K:矿机订单、C:充值订单
 * @returns {Promise<*>}
 */
const fristPreparePay = params => API.$post(AppConfig.fristPreparePay,params,{headers: {"Content-Type": "application/json;charset=UTF-8"},transformRequest:[]});

/**
 * 先锋认证支付预支付(已绑卡)
 * @param {string} outOrderId 订单号
 * @param {string} type 订单类型：S：算立订单、K:矿机订单、C:充值订单
 * @returns {Promise<*>}
 */
const preparePay = params => API.$post(AppConfig.preparePay,params,{headers: {"Content-Type": "application/json;charset=UTF-8"},transformRequest:[]});

/**
 * 先锋认证支付查询银行卡bin
 * @param {string} bankCardNo 银行卡号
 * @returns {Promise<*>}
 */
const queryCardBin = (bankCardNo) => TokenAPI.getValid().then(token => API.$post(AppConfig.queryCardBin,{
  bankCardNo,
  token
}));

/**
 * 先锋认证支付确认支付
 * @param {string} bankCardNo 银行卡号
 * @param {string} bankCode 银行编号
 * @param {string} bankName 银行名称
 * @param {string} cardNo 身份证
 * @param {string} memberUserId 先锋支付会员id
 * @param {string} outOrderId 订单号
 * @param {string} paymentId 支付流水
 * @param {string} realName 真实名字
 * @param {string} smsCode 验证码
 * @param {string} tradeNo 交易流水
 * @returns {Promise<*>}
 */
const bankPay = params => API.$post(AppConfig.bankPay,params,{headers: {"Content-Type": "application/json;charset=UTF-8"},transformRequest:[]});

/**
 * 先锋认证支付重发短信
 * @returns {Promise<*>}
 */
const bankSendSms = () => TokenAPI.getValid().then(token => API.$post(AppConfig.bankSendSms,{token}));

/**
 * 先锋认证支付查询绑卡信息
 * @returns {Promise<*>}
 */
const getBindCard = () => TokenAPI.getValid().then(token => API.$post(AppConfig.getBindCard,{token}));

export default {
  sendVerifyCode,
  fristPreparePay,
  queryCardBin,
  preparePay,
  bankPay,
  bankSendSms,
  getBindCard
}
