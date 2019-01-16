import AppConfig from '../config';
import TokenAPI from './token-api';
import API from './api';

/**
 * 生成预订单
 * @param {Array<string|number>}  batchGoodsIds        商品Id数组
 * @param {Array<number>}         goodsCounts          商品数量数组
 * @returns {Promise<*>}
 */
const createPreOrder = (batchGoodsIds, goodsCounts) => TokenAPI.getValid().then(token => API.$get(AppConfig.perOrder, {
  params: {
    batchGoodsId: batchGoodsIds.join(),
    goodsCount: goodsCounts.join(),
    requestType: AppConfig.appTag,
    token
  }
}));

/**
 * 提交订单
 * @param {Object} params 参数
 * @param {Array<number>}         params.goodsCounts     商品数量数组
 * @param {Array<string|number>}  params.batchGoodsIds   批次商品Id数组
 * @param {string|number}         params.addressId       地址Id
 * @param {string}                params.remark          订单备注
 * @param {string|number}         params.authCode        验证码
 * @param {boolean}               params.submitType      下单类型 true-购物车下单
 * @return {Promise<*>}
 */
const submitOrder = (params) => TokenAPI.getValid().then(token => API.$post(AppConfig.submitOrder, {
  batchGoodsId: params.batchGoodsIds.join(),
  goodsCount: params.goodsCounts.join(),
  addressId: params.addressId,
  desc: params.remark,
  smsOrderCode: params.authCode,
  submitType: params.submitType,
  token
}));

/**
 * 获取订单列表
 * 不同接口：http://192.168.50.175:8079/api
 * @param {Object} [params] 若params为空，则获取全部订单
 * @param {number} params.statusPay  支付状态
 * @param {number} params.stausSend 配送状态
 * @returns {Promise<*>}
 */
const getOrderList = params => TokenAPI.getValid().then(token => API.$get(AppConfig.newOrderList, {
  params: {
    ...params,
    token
  }
}));

/**
 * 取消订单
 * @param {string|number} orderId
 * @returns {Promise<*>}
 */
const cancelOrder = orderId => TokenAPI.getValid().then(token => API.$post(AppConfig.cancelOrder, {token, orderId}));


/**
 * 订单托管
 * @param {object} params 参数
 * @param {string} params.mallOrderNo 商城订单号
 * @param {number} params.mallBatchGoodsId 商城批次商品id
 * @param {string} params.mallBatchNo 商品批次号
 * @param {number} params.deliveryCount 交割数量
 * @param {number} params.payWay  付费方式
 * @returns {Promise<*>}
 */

const orderTrusteeship = params => TokenAPI.getValid().then(token => API.$post(AppConfig.insertDelivery, {
  ...params,
  token
}, null, AppConfig.apiEndpoint2));


/**
 * 获取订单详情
 * @param {string} orderNo 订单编号
 * @return {Promise<*>}
 */
const getOrderDetail = orderNo => TokenAPI.getValid().then(token => API.$post(AppConfig.getOrderDetail, {
  orderNo,
  token
}));

/**
 * 获取物流信息
 * @param {string} orderNo 订单编号
 * @return {Promise<*>}
 */
const getExpressInfo = orderNo => TokenAPI.getValid().then(token => API.$get(AppConfig.getExpressInfo, {
  params: {
    orderNo: orderNo,
    token: token
  }
}, AppConfig.apiEndpoint2));

/**
 * 下单前校验验证码
 * @param {string} countryNum 国别号码,默认+86(可选)
 * @param {string} account    手机号码/邮箱地址
 * @param {string} token
 * @return {Promise<*>}
 */
const orderSms = ({countryNum, account}) => TokenAPI.getValid().then(token => API.$post(AppConfig.smsOrderCodeSend, {
  countryNum,
  account,
  token
}));

/**
 * 查询订单失败原因
 * @param {string} orderNo 订单号
 * @return {Promise<any>}
 */
const refuseReason = orderNo => TokenAPI.getValid().then(token => API.$get(AppConfig.orderFailReason, {
  params: {
    token,
    orderNo
  }
}));

const OrderAPI = {
  create: createPreOrder,
  get: getOrderList,
  cancel: cancelOrder,
  submit: submitOrder,
  orderTrusteeship,
  detail: getOrderDetail,
  express: getExpressInfo,
  orderSms: orderSms,
  reason: refuseReason
};

export default OrderAPI;

