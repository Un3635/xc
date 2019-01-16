import api from './api';
import AppConfig from '../config';

/**
 * 商品详情数据
 * @param {string}  goodsNo    商品编号
 * @returns {Promise<*>}
 */
const commodityInfo = goodsNo => api.$get(AppConfig.commodityInfo, {params: {goodsNo}});

/**
 * 商品详情图解
 * @param {string}  goodsNo   商品编号
 * @returns {Promise<*>}
 */
const commodityDetail = goodsNo => api.$get(AppConfig.commodityDetail, {params: {goodsNo}});

/**
 * 商品参数配置
 * @param {string}  productNo   货品编号
 * @returns {Promise<*>}
 */
const commodityParameter = productNo => api.get(AppConfig.apiEndpoint + AppConfig.commodityParameter, {params: {productNo}});

export default {
  commodityInfo,
  commodityDetail,
  commodityParameter
};
