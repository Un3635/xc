import api from './api';
import AppConfig from '../config';
import CommonAPI from './common-api';

/**
 * 获取批次商品状态
 *
 * @param batchGoodsId 批次商品编号
 * @return {Promise<Number>} 0:未售罄；1:售罄; 2:未发售
 */
const batchGoodsStatus = batchGoodsId => api.$post(AppConfig.batchGoodsStatus, {batchGoodsId});

/**
 * 获取某一批次中商品的信息
 *
 * @param batchNo 批次号
 * @return {*}
 */
const batchGoodsInfo = batchNo => api.$post(AppConfig.batchGoodsInfo, {batchNo});

/**
 * 获取远端商品详情
 * @param  {String|Number} goodsId 商品ID
 * @return {Promise<*>}
 */
const goodsRemoteDetail = goodsId => api.$post(AppConfig.goodsDetail, {goodsId});

/**
 * 获取可用产品列表
 * @return {Promise<Array>} 产品列表
 */
const getGoodsList = () => CommonAPI.product().then(res => res.filter(item => item.active));

/**
 * 根据产品Id获取产品详情
 * @param {number} id  产品id
 * @return {Promise<*>}
 */
const getDetail = id => CommonAPI.product().then(res => res.find(item => item.id === id));

/**
 * 获取批次商品购买限制
 * @param {number|string}batchGoodsId
 * @return {*}
 */
const getLimitInfo = batchGoodsId => api.$post(AppConfig.goodsBuyLimit, {batchGoodsId});

const getDetailByBatchGoodsId = batchGoodsId => getGoodsList().then(res => {
  let product;
  let batchInfo;
  for (let i = 0; i < res.length; i++) {
    product = res[i];
    batchInfo = product.batches.find(batchInfo => batchInfo.id === batchGoodsId);
    if (batchInfo) {
      break;
    }
  }
  return {product, batchInfo};
});

/**
 * 获取当前可用矿机列表
 * @return {Promise<*>}
 */
const getGoodsIds = () => api.$get(AppConfig.getGoodsIds);

const ProductAPI = {
  get: getGoodsList,
  batchStatus: batchGoodsStatus,
  batchInfo: batchGoodsInfo,
  remoteDetail: goodsRemoteDetail,
  detail: getDetail,
  buyLimit: getLimitInfo,
  getDetailByBatchGoodsId: getDetailByBatchGoodsId,
  getGoodsIds
};
export default ProductAPI;
