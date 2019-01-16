import {AppConfig} from './config';
import API from './api';
import TokenAPI from './token-api';

/**
 * 查询我的账户
 * @returns {Promise<*>}
 */
const userAccountInfo = () => TokenAPI.getValid().then(token => API.$post(AppConfig.userAccountInfo, {token}));

/**
 * 历史账单明细
 * @param {string}    startTime 开始时间
 * @param {string}    endTime   结束时间
 * @param {number}    flag
 * @param {number}    pageNum   页码
 * @param {number}    pageSize  每页条数
 * @returns {Promise<*>}
 */
const billList = (startTime, endTime, flag, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.userRefundList, {
  startTime,
  endTime,
  flag,
  pageNum,
  pageSize,
  token
}));

/**
 * 通过订单状态查询历史账单
 * @param {string|number}  status         状态(1-待还款，2-已还款)
 * @param {number}         pageNum        页码
 * @param {number}         pageSize       每页条数
 * @returns {Promise<String>}
 */
const getBillListByStatus = (status, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.billList, {
  status,
  pageNum,
  pageSize,
  token
}));

/**
 * 账单总金额
 * @returns {Promise<String>}
 */
const billAmount = () => TokenAPI.getValid().then(token => API.$post(AppConfig.billAmount, {token}));

/**
 * 用户还款信息
 * @param {string} userRefundId  用户还款记录Id
 * @returns {Promise<String>}
 */
const billInfo = (userRefundId) => TokenAPI.getValid().then(token => API.$post(AppConfig.billInfo, {
  token,
  userRefundId
}));

/**
 * 用户还款关联历史
 * @param {string} userRefundId  用户还款记录Id
 * @param {number} pageNum       页码
 * @param {number} pageSize      每页条数
 * @returns {Promise<String>}
 */
const billInfoList = (userRefundId, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.billInfoList, {
  token,
  userRefundId,
  pageNum,
  pageSize
}));


/**
 * 币种账户历史账单明细
 * @param {string|number} currencyId   币种Id
 * @param {string} startTime           开始时间
 * @param {string} endTime             结束时间
 * @param {number} flag                时间段标识
 * @param {number} pageNum             页码
 * @param {number} pageSize            每页条数
 * @returns {Promise<String>}
 */
const currencyInfoList = (currencyId, startTime, endTime, flag, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.currencyInfoList, {
  userAccountCurrencyId: currencyId,
  startTime,
  endTime,
  flag,
  pageNum,
  pageSize,
  token
}));

/**
 * 查询用户币种信息
 * @param {string|number}   currencyId   币种Id
 * @returns {Promise<*>}
 */
const userAccountCurrencyInfo = currencyId => TokenAPI.getValid().then(token => API.$post(AppConfig.userAccountCurrencyInfo, {
  token,
  currencyId
}));

/**
 * 币提现
 * @param {object}  params
 * @param {string|number}   params.currencyId             币种Id
 * @param {string}          params.currencyName           币种名称
 * @param {string|number}   params.withdrawNumber         提币数量
 * @param {string|number}   params.userAccountAddressId   对应币种钱包地址
 * @param {string|number}   params.googleCode             谷歌验证码
 * @param {string|number}   params.smsCode                短信验证码
 * @param {string|number}   params.smsCodeToken           短信验证码识别码
 * @returns {Promise<*>}
 */
const userAccountCoin = (params) => TokenAPI.getValid().then(token => API.$post(AppConfig.userAccountCoin, {
  ...params,
  token
}));

/**
 * 查询币种提现信息
 * @param {integer}   userAccountCurrencyDetailId           用户钱包明细表id
 * @returns {Promise<*>}
 */
const accountDetail = (userAccountCurrencyDetailId) => TokenAPI.getValid().then(token => API.$post(AppConfig.accountDetail, {
  userAccountCurrencyDetailId,
  token
}));

const AccountAPI = {
  userAccountInfo,
  userAccountCurrencyInfo,
  userAccountCoin,
  currencyInfoList,
  billList,
  billAmount,
  getBillListByStatus,
  billInfo,
  billInfoList,
  accountDetail
};

export default AccountAPI;


export const BillStatus = {
  UNPAID: 1,
  PAID: 2
};
