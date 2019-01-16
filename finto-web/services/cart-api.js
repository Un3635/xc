import {AppConfig} from './config';
import api from './api';
import TokenAPI from './token-api';

/**
 * 查询购物车商品数量
 * @param {string|number} batchGoodsId 批次商品Id
 * @param {string|number} buyType 购买类型,0-发货 1-托管
 * @param {string|number} token  token
 */
const byGoodsId = (batchGoodsId, buyType) =>
  TokenAPI.getValid().then(token => api.$post(AppConfig.byGoodsId, {batchGoodsId, buyType, token}));

/**
 * 修改购物车商品数量
 * @param {string|number} batchGoodsId  批次商品Id
 * @param {number}        count         数量
 * @param {string|number}  buyType 购买类型,0-发货 1-托管
 * @return {Promise<*>}
 */
const updateCount = (batchGoodsId, count, buyType) => TokenAPI.getValid().then(token => api.$post(AppConfig.updateCount, {
  batchGoodsId,
  count,
  check: true,
  requestType: AppConfig.appTag,
  buyType,
  token
}));

/**
 * 获取购物车商品信息
 * @return {Promise<*>}
 */
const getCartList = () => TokenAPI.getValid().then(token => api.$post(AppConfig.getCartList, {
  token
}));

/**
 * 删除购物车商品
 * @param {string|number} batchGoodsId  批次商品ID
 * @param {string|number}  token
 * @param {string|number} buyType 购买类型,0-发货 1-托管
 * @return {Promise<*>}
 */
const delGoods = (batchGoodsId, buyType) => TokenAPI.getValid().then(token => api.$post(AppConfig.delGoods, {
  batchGoodsId,
  buyType,
  token
}));

const CartAPI = {
  byGoodsId,
  updateCount,
  getCartList,
  delGoods
};

export default CartAPI;
