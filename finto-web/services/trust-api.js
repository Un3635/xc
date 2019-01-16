import {AppConfig} from './config';
import API from './api';
import TokenAPI from './token-api';


/**
 * 获取托管综合信息
 * @returns {Promise<*>}
 */
const Colligate = () => TokenAPI.getValid().then(token => API.$post(AppConfig.colligate, {
  token
}));

/**
 * 获取待托管列表
 * @param {integer}  days  查询条件（托管时间:单位天 例：30 代表30天）
 * @param {string}  filter  条件：in:天数之内，out:天数之外，空为所有
 * @param {integer}  currentPage  当前页数
 * @param {integer}  pageSize  页数大小
 * @returns {Promise<*>}
 */
const DeliveryList = (days, filter, currentPage, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.deliveryList, {
  token,
  days,
  filter,
  currentPage,
  pageSize
}));

/**
 * 获取托管单列表
 * @param {string}  trustStatus      trustStatus 托管状态（2.待托管 3.托管中 5.已终止）
 * @param {string}  coinId    币种id
 * @param {string|number}  currentPage    当前页数
 * @param {string|number}  pageSize    页数大小* @returns {Promise<*>}
 */

const TmList = (trustStatus, coinId, currentPage, pageSize) => TokenAPI.getValid().then(token => API.$post(AppConfig.tmList, {
  token,
  trustStatus,
  coinId,
  currentPage,
  pageSize
}));

/**
 * 获取托管单详情
 * @param {string|number} trustId 托管单Id
 * @return {Promise<*>}
 */
const getDepositDetail = trustId => TokenAPI.getValid().then(token => API.$post(AppConfig.trustDetail, {
  trustId,
  token
}));


/**
 * 获取托管单对应的矿机列表
 * @param {string|number} trustId 托管单ID
 * @param {number} page 页码
 * @param {number} size 分页大小
 * @return {Promise<*>}
 */
const getDepositMachineList = (trustId, page = 1, size = 10) => TokenAPI.getValid().then(token => API.$post(AppConfig.trustMachineList, {
  trustId,
  currentPage: page,
  pageSize: size,
  token
}));

/**
 * 矿机运行信息
 * @param {string|number} trustId  托管单Id
 * @param {string|number} trustGoodsDetailId 矿机编号
 * @return {Promise<*>}
 */
const machineDetail = (trustId, trustGoodsDetailId) => TokenAPI.getValid().then(token => API.$post(AppConfig.machineDetail, {
  trustId,
  trustGoodsDetailId,
  token
}));


/**
 * 矿机运行信息
 * @param {string|number} trustGoodsDetailId 矿机编号
 * @param {number} pageNum 页码
 * @param {number} pageSize 每页条数
 * @return {Promise<*>}
 */
const runningDetail = (trustGoodsDetailId, pageNum = 1, pageSize = 10) => TokenAPI.getValid().then(token => API.$post(AppConfig.machineRunningDetail, {
  trustGoodsDetailId,
  pageNum,
  pageSize,
  token
}));

/**
 * 矿机收益信息
 * @param {string|number} trustGoodsDetailId
 * @param {number} pageNum 页码
 * @param {number} pageSize 分页大小
 * @return {Promise<*>}
 */
const incomeDetail = (trustGoodsDetailId, pageNum = 1, pageSize = 10) => TokenAPI.getValid().then(token => API.$post(AppConfig.machineIncomeDetail, {
  trustGoodsDetailId,
  pageNum,
  pageSize,
  token
}));

const trustAPI = {
  Colligate,
  DeliveryList,
  TmList,
  getDepositDetail,
  getDepositMachineList,
  machineDetail,
  runningDetail,
  incomeDetail
};

export default trustAPI;
