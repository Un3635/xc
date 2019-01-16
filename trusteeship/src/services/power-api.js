import AppConfig from '../config';
import API from './api';
import TokenAPI from './token-api';

/**
 * 查询商品信息列表
 * @param {string}   currencyName  币种名称
 * @returns {Promise<*>}
 */
const jyGoodsList = (currencyName) => API.$post(AppConfig.jyGoodsList, {
  currencyName,
  type: AppConfig.appTag
}, {}, AppConfig.apiEndpoint3);

/**
 * 查询商品信息详情
 * @param {string|number}   goodsId   商品id
 * @returns {Promise<*>}
 */
const jyGoodsInfo = (goodsId) => API.$post(AppConfig.jyGoodsInfo, {
  goodsId,
  type: AppConfig.appTag
}, {}, AppConfig.apiEndpoint3);

/**
 * 查询矿机介绍信息
 * @param {integer}   goodsId   商品id
 * @returns {Promise<*>}
 */
const jyGoodsDetail = goodsId => API.$post(AppConfig.jyGoodsDetail, {goodsId}, {}, AppConfig.apiEndpoint3);

/**
 * 查询购买记录
 * @param {integer}   goodsId   商品id
 * @param {integer}   pageNum   页码
 * @param {integer}   pageSize   每页条数
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
  type: AppConfig.appTag,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 获取算力综合信息
 * @param {string|number}   currencyId   币种id
 * @returns {Promise<*>}
 */
const powerColligate = (currencyId) => TokenAPI.getValid().then(token => API.$post(AppConfig.powerColligate, {
  type: currencyId,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力产出列表
 * @param {string|number}   currencyId   币种id
 * @param {string|number}   currentPage   当前页数
 * @param {string|number}   pageSize   页数大小
 * @returns {Promise<*>}
 */
const powerIncomeList = (currencyId, currentPage, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.powerIncomeList, {
  type: currencyId,
  currentPage,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint3));

/**
 * 算力明细(概述)
 * @param {string|number}   currencyId    币种id，多币种以逗号分隔
 * @param {string|number}   status        算力类型，多个类型以逗号隔开 (合约到期:0,正常:1,交易明细:2，奖励明细:3）
 * @returns {Promise<*>}
 */
const powerDetail = (currencyId, status) => TokenAPI.getValid().then(token => API.$$post(AppConfig.powerDetail, {
  powerType: currencyId,
  status,
  token
}, {}, AppConfig.apiEndpoint3))
  .then(res => res.data);

/**
 * 算力明细(列表)
 * @param {string|number}   currencyId    币种id，多币种以逗号分隔
 * @param {string|number}   status        算力类型，多个类型以逗号隔开 (合约到期:0,正常:1,交易明细:2，奖励明细:3）
 * @param {string|number}   currentPage   当前页数
 * @param {string|number}   pageSize      页数大小
 * @returns {Promise<*>}
 */
const powerDetailList = (currencyId, status, currentPage, pageSize) => TokenAPI.getValid().then(token => API.$$post(AppConfig.powerDetailList, {
  curryencyIds: currencyId,
  status,
  currentPage,
  pageSize,
  token
}, {}, AppConfig.apiEndpoint3))
  .then(res => res.data);

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
 * 算力币种获取
 * @return {Promise<any>}
 */
const currencyTypeList = () => API.$post(AppConfig.getCurrencyList, null);

/**
 * 查询矿机算力属性参数信息
 * @param   id (对应类型1:batchGoodsId 2:jySGoodsId 3:goodsId)
 * @param   type (1:矿机商品上架 2:算力商品上架 3:矿机参数)
 * @return {Promise<any>}
 */
const getGoodsAttributeList = (id, type) => API.$post(AppConfig.getGoodsAttributeList, {
  id,
  type,
  language: AppConfig.appTag
});

const powerApi = {
  jyOrderList,
  jyOrderSubmit,
  jyGoodsList,
  jyGoodsInfo,
  jyGoodsDetail,
  powerColligate,
  powerIncomeList,
  powerDetail,
  powerDetailList,
  powerInfo,
  powerInfoList,
  powerValidCode,
  hashOrderSms,
  personalPowerLimit,
  currencyTypeList,
  getGoodsAttributeList
};

export default powerApi;
