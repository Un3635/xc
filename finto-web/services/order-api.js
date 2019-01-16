import {AppConfig} from './config';
import TokenAPI from './token-api';
import API from './api';

/**
 * 生成预订单
 * @param {JSON<string|number>} params
 * @returns {Promise<*>}
 */
const createPreOrder = (params) => API.$post(AppConfig.prepareSubmitOrder, params, {
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
  transformRequest: []
});

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
}, {headers: {'Content-Type': 'application/json;charset=UTF-8'}, transformRequest: []}));

const submitOrderVertify = params => API.$post(AppConfig.submitOrder, params, {
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
  transformRequest: []
});
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
 * @param {string|number} orderId  订单id
 * @param {string|number} goodsType  商品类型 1-矿机 2-算力
 * @returns {Promise<*>}
 */
const cancelOrder = (orderId, goodsType) => TokenAPI.getValid().then(token => API.$post(AppConfig.cancelOrder, {
  token,
  orderId,
  goodsType
}));


/**
 * 获取订单信息
 * @param {string} orderNo 订单编号
 * @return {Promise<*>}
 */
const getOrder = orderNo => TokenAPI.getValid().then(token => API.$post(AppConfig.getOrder, {
  orderNo,
  token
}));

/**
 * 获取获取订单的物流单号
 * @param {string} orderNo 订单编号
 * @return {Promise<*>}
 */
const getExpressNoList = orderNo => TokenAPI.getValid().then(token => API.$get(AppConfig.getExpressNoList, {
  params: {
    orderNo: orderNo,
    token: token
  }
}));

/**
 * 查询订单列表（各种状态）
 * @param {integer} type  列表类型,1-待支付  2-矿机待发货、算力待交割  3-待托管 4-待收货 5-矿机已收货、算力已交割 6-已托管 7-其他订单
 * @param {integer} goodsType  商品类型，1-矿机 2-算力
 * @param {integer} currentPage  当前页
 * @param {integer} pageSize  每页大小
 * @return {Promise<*>}
 */
const centerList = (type, goodsType, currentPage, pageSize) => TokenAPI.getValid()
  .then(token => API.$get(AppConfig.centerList, {
    params: {
      type,
      currentPage,
      goodsType,
      pageSize,
      token
    }
  }));

/**
 * 订单汇总信息
 * @returns {Promise<*>}
 */
const orderSummary = () => TokenAPI.getValid().then(token => API.$get(AppConfig.orderSummary, {params: {token}}));

const OrderAPI = {
  create: createPreOrder,
  get: getOrderList,
  cancel: cancelOrder,
  submit: submitOrder,
  submitOrderVertify,
  centerList,
  getExpressNoList,
  orderSummary,
  getOrder
};

export default OrderAPI;

