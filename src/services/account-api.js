import AppConfig from '../config';
import API from './api';
import TokenAPI from './token-api';

/**
 * 查询账户金额信息
 * @returns {Promise<*>}
 */
const userMoneyTotal = () => TokenAPI.getValid().then(token => API.$post(AppConfig.userMoneyTotal, {token}));

/**
 * 查询账户明细
 * @param {string}   startTime   开始时间
 * @param {string}   endTime   结束时间
 * @param {integer}   pageNum   页码
 * @param {integer}   pageSize   每页条数
 * @returns {Promise<*>}
 */
const userMoneyDetailList = (startTime, endTime, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.userMoneyDetailList, {
  startTime,
  endTime,
  pageNum,
  pageSize,
  token
}));

/**
 * 查询周期账户明细
 * @param {integer}   flag   日期标识
 * @param {integer}   pageNum   页码
 * @param {integer}   pageSize   每页条数
 * @returns {Promise<*>}
 */
const userMoneyDetailByFlag = (flag, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.userMoneyDetailByFlag, {
  flag,
  pageNum,
  pageSize,
  token
}));

/**
 * 查询用户币种详情信息
 * @param {integer}   id   主键
 * @returns {Promise<*>}
 */
const accountDetail = (id) => TokenAPI.getValid().then(token => API.$post(AppConfig.accountDetail, {token, id}, {}, AppConfig.apiEndpoint2));

/**
 * 查询币种账户明细
 * @param {string}   startTime   开始时间
 * @param {string}   endTime   结束时间
 * @param {integer}   currencyId   币种Id
 * @param {integer}   pageNum   页码
 * @param {integer}   pageSize   每页条数
 * @returns {Promise<*>}
 */
const accountDetailList = (startTime, endTime, currencyId, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.accountDetailList, {
  startTime,
  endTime,
  currencyId,
  pageNum,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint2));

/**
 * 查询周期币种账户明细
 * @param {integer}   flag   日期标识
 * @param {integer}   currencyId   币种Id
 * @param {integer}   pageNum   页码
 * @param {integer}   pageSize   每页条数
 * @returns {Promise<*>}
 */
const accountDetailByFlag = (flag, currencyId, pageNum, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.accountDetailByFlag, {
  flag,
  currencyId,
  pageNum,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint2));

/**
 * 查询用户币种信息列表
 * @returns {Promise<*>}
 */
const userAccountCurrencyList = () => TokenAPI.getValid().then(token => API.$post(AppConfig.userAccountCurrencyList, {token}, {}, AppConfig.apiEndpoint2));

/**
 * 查询用户币种信息
 * @param {integer}   currencyId   币种Id
 * @returns {Promise<*>}
 */
const userAccountCurrencyInfo = currencyId => TokenAPI.getValid().then(token => API.$post(AppConfig.userAccountCurrencyInfo, {
  token,
  currencyId
}, {}, AppConfig.apiEndpoint2));

/**
 * 币提现
 * @param {integer}   currencyId   币种Id
 * @param {double}   withdrawNumber   提现数量
 * @param {integer}   userAccountAddressId   地址Id
 * @returns {Promise<*>}
 */
const userAccountCoin = ({currencyId, withdrawNumber, userAccountAddressId}) => TokenAPI.getValid().then(token => API.$post(AppConfig.userAccountCoin, {
  token,
  currencyId,
  withdrawNumber,
  userAccountAddressId
}, {}, AppConfig.apiEndpoint2));

const accountApi = {
  userMoneyTotal,
  userMoneyDetailList,
  userMoneyDetailByFlag,
  accountDetail,
  accountDetailList,
  accountDetailByFlag,
  userAccountCurrencyList,
  userAccountCurrencyInfo,
  userAccountCoin
};

export default accountApi;
