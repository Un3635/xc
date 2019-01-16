import TokenAPI from "./token-api";
import API from "./api";
import AppConfig from "../config";

/**
 * 获取托管单列表
 * @param {number} type 托管状态 0:待托管 1:托管中 -1:已终止
 * @param {number} coinId 币种Id
 * @return {Promise<*>}
 */
const getDepositList = (type, coinId) => TokenAPI.getValid()
  .then(token => API.$post(AppConfig.depositList, {
    token,
    type,
    coinId
  }));


/**
 * 获取托管单详情
 * @param {string|number} depositId 托管单Id
 * @return {Promise<*>}
 */
const getDepositDetail = depositId => TokenAPI.getValid()
  .then(token => API.$get(AppConfig.depositDetail, {
    params: {
      trustId: depositId,
      token
    }
  }, AppConfig.apiEndpoint2));


/**
 * 获取托管单对应的矿机列表
 * @param {string|number} depositId 托管单ID
 * @param {number} page 页码
 * @param {number} size 分页大小
 * @return {Promise<*>}
 */
const getDepositMachineList = (depositId, page = 1, size = 10) => TokenAPI.getValid()
  .then(token => API.$get(AppConfig.depositMachineList, {
    params: {
      trustId: depositId,
      currentPage: page,
      pageSize: size,
      token
    }
  }, AppConfig.apiEndpoint2));

/**
 * 矿机运行信息
 * @param {string|number} trustId  托管单Id
 * @param {string|number} machineId 矿机编号
 * @return {Promise<*>}
 */
const machineDetail = (trustId, machineId) => TokenAPI.getValid()
  .then(token => API.$get(AppConfig.machineDetail, {
    params: {
      trustId,
      machineId,
      token
    }
  }, AppConfig.apiEndpoint2));

/**
 * 矿机运行信息
 * @param {string|number} machineId 矿机编号
 * @return {Promise<*>}
 */
const machineRunningDetail = machineId => TokenAPI.getValid()
  .then(token => API.$get(AppConfig.machineRunningDetail, {
    params: {
      machineId,
      token
    }
  }, AppConfig.apiEndpoint2));

/**
 * 矿机收益信息
 * @param {string|number} machineId
 * @param {number} page 页码
 * @param {number} size 分页大小
 * @return {Promise<*>}
 */
const machineIncomeDetail = (machineId, page = 1, size = 10) => TokenAPI.getValid()
  .then(token => API.$get(AppConfig.machineIncomeDetail, {
    params: {
      machineId,
      currentPage: page,
      pageSize: size,
      token
    }
  }, AppConfig.apiEndpoint2));

const DepositAPI = {
  get: getDepositList,
  detail: getDepositDetail,
  machineList: getDepositMachineList,
  machineDetail: machineDetail,
  runningDetail: machineRunningDetail,
  incomeDetail: machineIncomeDetail
};

export default DepositAPI;

