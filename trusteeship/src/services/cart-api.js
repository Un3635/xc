import AppConfig from '../config';
import api from './api';
import TokenAPI from './token-api';

/**
 * 获取远端购物车中的商品信息
 * @param {string|number} batchGoodsId 批次商品Id
 */
const getCartItem = batchGoodsId =>
  TokenAPI.getValid().then(token => api.$post(AppConfig.cartInfo, {batchGoodsId, token}));

/**
 * 更新购物车里的商品信息
 * @param {string|number} batchGoodsId  批次商品Id
 * @param {number}        count         数量
 * @param {boolean}       check         是否选中支付,默认为true
 * @return {Promise<*>}
 */
const updateCount = (batchGoodsId, count, check = true) => TokenAPI.getValid().then(token => api.$post(AppConfig.cartUpdate, {
  batchGoodsId,
  count,
  check,
  token
}));

/**
 * 获取购物车商品信息
 * @return {Promise<*>}
 */
const cartInfo = () => TokenAPI.getValid().then(token => api.$post(AppConfig.cartList, {
  token
}));

/**
 * 删除购物车商品
 * @param {string|number} batchGoodsId  批次商品ID
 * @return {Promise<*>}
 */
const removeItem = (batchGoodsId) => TokenAPI.getValid().then(token => api.$post(AppConfig.cartItemRemove, {
  batchGoodsId,
  token
}));

const CartAPI = {
  getItem: getCartItem,
  update: updateCount,
  get: cartInfo,
  remove: removeItem
};

export default CartAPI;
