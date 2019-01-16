import AppConfig from '../config';
import API from './api';
import TokenAPI from './token-api';

// /**
//  * 查询商品信息列表
//  * @param {integer}   computingUnit   矿机类别id T/M
//  * @returns {Promise<*>}
//  */
// const jyGoodsList = computingUnit => API.$post(AppConfig.jyGoodsList, {computingUnit}, {}, AppConfig.apiEndpoint3);

/**
 * 查询商品信息列表
 * @param {string}  currencyName 币种名称
 * @param {integer} type 类型
 * @returns {Promise<*>}
 */
const jyGoodsList = (currencyName, type) => API.$post(AppConfig.jyGoodsList, {
  currencyName,
  type
}, {}, AppConfig.apiEndpoint3);

/**
 * 查询商品信息详情
 * @param {integer}   goodsId   商品id
 * @param {integer}   type   类型(1:web中文 2:web英文 3:m站)
 * @returns {Promise<*>}
 */
const jyGoodsInfo = (goodsId, type) => API.$post(AppConfig.jyGoodsInfo, {goodsId, type}, {}, AppConfig.apiEndpoint3);

/**
 * 获取商品属性列表
 * @param {integer}   id     Id(对应类型1:batchGoodsId 2:jySGoodsId 3:goodsId)
 * @param {integer}   type   类型(1:矿机商品上架 2:算力商品上架 3:矿机参数)
 * @param {integer}   language   语言(1:中文 2:英文)
 * @returns {Promise<*>}
 */
const getGoodsAttributeList = (id, type, language) => API.$post(AppConfig.getGoodsAttributeList, {
  id,
  type,
  language
});

/**
 * 查询购买记录
 * @param {integer}   goodsId   商品id
 * @param {integer}   pageNum       页码
 * @param {integer}   pageSize      每页条数
 * @returns {Promise<*>}
 */
const jyOrderList = (goodsId, pageNum, pageSize) => API.$post(AppConfig.jyOrderList, {
  goodsId,
  pageNum,
  pageSize
}, {}, AppConfig.apiEndpoint3);

/**
 * 算力订短信验证
 * @param {string} code    验证码
 * @return {Promise<*>}
 */
const powerValidCode = code => TokenAPI.getValid().then(token => API.$post(AppConfig.powerOrderValidCode, {
  code,
  token
}));

/**
 * 购买算力
 * @param {string|number}   goodsId   商品id
 * @param {string|number}   goodsCount   购买数量
 * @returns {Promise<*>}
 */
const jyOrderSubmit = (goodsId, goodsCount) => TokenAPI.getValid().then(token => API.$post(AppConfig.jyOrderSubmit, {
  goodsId,
  goodsCount,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 获取算力综合信息
 * @param {string}   type   币种id
 * @param {string}   goodsId  机器id
 * @returns {Promise<*>}
 */
const powerColligate = (type, goodsId) => TokenAPI.getValid().then(token => API.$post(AppConfig.powerColligate, {
  type,
  goodsId,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力产出列表
 * @param {string}   type   币种id
 * @param {string}   currentPage   当前页数
 * @param {string}   pageSize   页数大小
 * @returns {Promise<*>}
 */
const powerIncomeList = (type, currentPage, pageSize) => TokenAPI.getValid().then(token => API.$$post(AppConfig.powerIncomeList, {
  type,
  currentPage,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力明细(概述)
 * @param {string}   powerType   币种id
 * @param {string}   status   (合约到期:0,正常:1,交易明细:2，奖励明细:3）
 * @param {string}   goodsId   机器id
 * @returns {Promise<*>}
 */
const powerDetail = (powerType, status, goodsId) => TokenAPI.getValid().then(token => API.$post(AppConfig.powerDetail, {
  powerType,
  status,
  goodsId,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力明细(列表)
 * @param {string}   powerType  币种id
 * @param {string}   status   (合约到期:0,正常:1,交易明细:2，奖励明细:3）
 * @param {string}   goodsId    机器id 多个用逗号分隔
 * @param {integer}   currentPage   当前页数
 * @param {integer}   pageSize   页数大小
 * @returns {Promise<*>}
 */
const powerDetailList = (powerType, status, goodsId, currentPage, pageSize) => TokenAPI.getValid().then(token => API.$$post(AppConfig.powerDetailList, {
  powerType,
  status,
  goodsId,
  currentPage,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力明细(列表)M站
 * @param {string}   status   (合约到期:0,正常:1,交易明细:2，奖励明细:3）
 * @param {string}   curryencyIds   币种id 多个用逗号分隔
 * @param {integer}   currentPage   当前页数
 * @param {integer}   pageSize   页数大小
 * @returns {Promise<*>}
 */
const powerMDetailList = ({status, curryencyIds, currentPage, pageSize}) => TokenAPI.getValid().then(token => API.$$post(AppConfig.powerMDetailList, {
  status,
  curryencyIds,
  currentPage,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力详情(概述)
 * @param {string}   powerId   算力号
 * @returns {Promise<*>}
 */
const powerInfo = powerId => TokenAPI.getValid().then(token => API.$post(AppConfig.powerInfo, {
  powerId,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力详情（列表）
 * @param {string}   powerId   算力号
 * @param {string|number}   currentPage   当前页数
 * @param {string|number}   pageSize   页数大小
 * @returns {Promise<*>}
 */
const powerInfoList = (powerId, currentPage, pageSize) => TokenAPI.getValid().then(token => API.$$post(AppConfig.powerInfoList, {
  powerId,
  currentPage,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 下单前校验验证码
 * @param {string} countryNum 国别号码,默认+86(可选)
 * @param {string} account    手机号码/邮箱地址
 * @return {Promise<*>}
 */
const hashOrderSms = (countryNum, account) => TokenAPI.getValid()
  .then(token => API.$post(AppConfig.hashOrderSms, {
    countryNum,
    account,
    token
  }));

/**
 * 单人算力购买限制
 * @param {string|number} powerGoodsId 算力商品ID
 * @return {Promise<any>}
 */
const personalPowerLimit = powerGoodsId => TokenAPI.getValid().then(token => API.$post(AppConfig.personalPowerLimit, {
  goodsId: powerGoodsId,
  token
}, null, AppConfig.apiEndpoint3));

/**
 * 获取算力综合信息
 * @param {string} type 算力币种id
 * @return {Promise<*>}
 */
const getMColligate = (type) => TokenAPI.getValid()
  .then(token => API.$post(AppConfig.getMColligate, {
    type,
    token
  }, null, AppConfig.apiEndpoint3));

/**
 * 获取商品活动列表
 * @param {integer} goodsId 商品Id
 * @param {integer} goodsType 商品类型
 * @param {integer} type 类型
 * @return {Promise<*>}
 */
const getGoodsActivityList = (goodsId, goodsType, type) => TokenAPI.getValid().then(token => API.$post(AppConfig.getGoodsActivityList, {
  goodsId,
  goodsType,
  type,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 获取币中列表
 * @return {Promise<*>}
 */
const getCurrencyList = () => API.$post(AppConfig.getCurrencyList, '', [], AppConfig.apiEndpoint);

const powerApi = {
  jyOrderList,
  jyOrderSubmit,
  jyGoodsList,
  jyGoodsInfo,
  // jyGoodsDetail,
  powerColligate,
  powerIncomeList,
  powerDetail,
  powerDetailList,
  powerMDetailList,
  powerInfo,
  powerInfoList,
  powerValidCode,
  hashOrderSms,
  personalPowerLimit,
  getMColligate,
  getGoodsActivityList,
  getGoodsAttributeList,
  getCurrencyList
};

export default powerApi;
