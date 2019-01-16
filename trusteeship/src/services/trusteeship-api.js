import api from './api';
import TokenAPI from './token-api';
import AppConfig from '../config';

/**
 * 获取托管综合信息
 * @returns {Promise<*>}
 */
const Colligate = () => TokenAPI.getValid().then(token => api.$get(AppConfig.colligate, {params: {token}}, AppConfig.apiEndpoint2));

/**
 * 托管排名
 * @return {Promise<any>}
 */
const trustRank = () => TokenAPI.getValid().then(token => api.$get(AppConfig.trustRank, {params: {token}}, AppConfig.apiEndpoint2));

/**
 * 获取托管单列表
 * @param {string}  type      托管状态（0.待托管 1.托管中 -1.已终止）
 * @param {string}  coinId    币种id
 * @param {string|number}  currentPage    当前页数
 * @param {string|number}  pageSize    页数大小* @returns {Promise<*>}
 */
const TmList = (type, coinId, currentPage, pageSize) => TokenAPI.getValid().then(token => api.$get(AppConfig.tmList, {
  params: {
    token,
    type,
    coinId,
    currentPage,
    pageSize
  }
}, AppConfig.apiEndpoint2));

/**
 * 获取待交割列表
 * @param {string}  days      查询条件（交割时间:单位天 例：30 代表30天）
 * @param {string}  filter    条件：in:天数之内，out:天数之外，空为所有
 * @param {string|number}  currentPage    当前页数
 * @param {string|number}  pageSize    页数大小
 * @returns {Promise<*>}
 */
const DeliveryList = (days, filter, currentPage, pageSize) => TokenAPI.getValid().then(token => api.$get(AppConfig.deliveryList, {
  params: {
    token,
    days,
    filter,
    currentPage,
    pageSize
  }
}, AppConfig.apiEndpoint2));


/**
 * 修改付费方式
 * @param {String} no      单据编号
 * @param {Number} type    订单类型  0-交割单 1-托管单 2-云算力订单
 * @param {Number} payType 付费方式  0-以币抵费  1-余额付费 ref: constants.BalanceType
 * @return {Promise<any>}
 */
const updatePayWay = (no, type, payType) => TokenAPI.getValid().then(token => api.$post(AppConfig.updatePayWay, {
  orderNo: no,
  goodType: type,
  payWay: payType,
  token
}, null, AppConfig.apiEndpoint3));


const TrusteeshipApi = {
  Colligate: Colligate,
  TmList: TmList,
  DeliveryList: DeliveryList,
  updatePayWay,
  trustRank
};

export default TrusteeshipApi;
