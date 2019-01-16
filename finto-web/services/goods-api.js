import API from './api';
import {AppConfig} from './config';

/**
 * 获取商品类别
 * @returns {*}
 */
const category = () => API.$post(AppConfig.goodsCategory);

/**
 * 获取商品列表
 * @param {number|string} categoryId 矿机类型
 * @param {number|string} type 类型 (1:日文)
 * @param {number|string} pageNum 页码
 * @param {number|string} pageSize 每页条数
 * @return {*}
 */
const list = (categoryId, pageNum, pageSize) => API.$post(AppConfig.goodsList, {
  categoryId,
  pageNum,
  pageSize,
  type: AppConfig.appTag
});

/**
 * 获取商品详情
 * @param {string|number}  batchGoodsId  批次商品ID
 * @returns {*}
 */
const detail = (batchGoodsId) => API.$post(AppConfig.goodsDetail, {batchGoodsId});

/**
 * 获取商品属性列表
 * @param {string|number}  id    1--batchGoodsId,2--jyGoodsId,3--shopGoodsId
 * @param {string|number}  type  ID类型 (1--矿机商品属性  2--算力  3--矿机参数)
 * @returns {*}
 */
const goodsAttribute = (id, type) => API.$post(AppConfig.goodsAttribute, {
  id,
  type,
  language: AppConfig.appTag
});

/**
 * 获取算力商品消费税
 * @returns {*}
 */
const getGoodsTax = () => API.$post(AppConfig.getGoodsTax);

const GoodsAPI = {
  category,
  list,
  detail,
  goodsAttribute,
  getGoodsTax
};

export default GoodsAPI;
