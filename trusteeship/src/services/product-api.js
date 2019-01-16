import api from './api';
import AppConfig from '../config';
import CommonAPI from './common-api';
import TokenAPI from './token-api';

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
 * 获取商品物流费，托管费，上架费
 * @param  {String|Number} batchGoodsId 批次商品ID
 * @return {Promise<*>}
 */
const goodsRemoteDetail = batchGoodsId => api.$post(AppConfig.goodsDetail, {batchGoodsId});

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

/**
 * 获取批次商品购买限制
 * @param {number|string}batchGoodsId
 * @return {*}
 */
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
 * 获取商品列表
 * @param {number|string} categoryId 矿机类型
 * @param {number|string} pageNum 页码
 * @param {number|string} pageSize 每页条数
 * @return {*}
 */
const getProductsList = (categoryId, pageNum, pageSize) => api.$post(AppConfig.getProductsList, {
  categoryId,
  pageNum,
  pageSize,
  type: AppConfig.appTag
});
/**
 * 获取商品优惠金额
 * @param {number|string}  goodsId 商品Id
 * @param  {number|string}  [goodsType] 商品类型（1：矿机商品；2：算力商品）
 * @return {*}
 */
const getDiscountedPric = (goodsId, goodsType = 1) => TokenAPI.getValid().then(token => api.$post(AppConfig.getDiscountedPric, {
  token,
  goodsId,
  goodsType
}));
/**
 * 获取矿机分类列表
 * @return {*}
 */
const getGoodsCategoryList = () => api.$post(AppConfig.getGoodsCategoryList);
/**
 * 获取商品活动列表
 * @param {number|string} token
 * @param {number|string} goodsId   商品Id
 * @param {number|string} goodsType 商品类型（1：矿机商品；2：算力商品）
 * @param {number|string} type   类型（1:web中文 2:web英文 3:m站）
 * @return {*}
 */
const getGoodsActivityList = (token, goodsId, goodsType, type) => api.$post(AppConfig.getGoodsActivityList, {
  token,
  goodsId,
  goodsType,
  type
});
/**
 * 获取商品活动奖励规则
 * @param {number|string} inviteCommissionId   邀请返佣活动id
 * @return {*}
 */
const getRewardRuleList = (inviteCommissionId) => api.$post(AppConfig.getRewardRuleList, {inviteCommissionId});


/**
 * 获取商品信息
 * @param {string|number}  batchGoodsId 批次商品ID
 * @return {*}
 */
const getGoodsInfo = (batchGoodsId) => api.$post(AppConfig.getGoodsInfo, {
  batchGoodsId,
  type: 1 // type 1 - web中文  2 - web英文 3 - m站
});

const ProductAPI = {
  get: getGoodsList,
  batchStatus: batchGoodsStatus,
  batchInfo: batchGoodsInfo,
  remoteDetail: goodsRemoteDetail,
  detail: getDetail,
  buyLimit: getLimitInfo,
  getDetailByBatchGoodsId: getDetailByBatchGoodsId,
  getProductsList,
  getGoodsCategoryList,
  getDiscountedPric,
  getGoodsActivityList,
  getRewardRuleList,
  getGoodsInfo
};
export default ProductAPI;
