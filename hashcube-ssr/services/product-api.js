import api from './api';
import AppConfig from '../config';
import TokenAPI from './token-api';

/**
 * 获取商品物流费，托管费，上架费
 * @param  {String|Number} batchGoodsId 批次商品ID
 * @return {Promise<*>}
 */
const goodsRemoteDetail = batchGoodsId => api.$post(AppConfig.goodsDetail, {batchGoodsId});


/**
 * 获取批次商品购买限制
 * @param {number|string}batchGoodsId
 * @return {*}
 */
const getLimitInfo = batchGoodsId => api.$post(AppConfig.goodsBuyLimit, {batchGoodsId});


/**
 * 获取商品列表
 * @param {number|string} categoryId 矿机类型
 * @param {number|string} pageNum 页码
 * @param {number|string} pageSize 每页条数
 * @param {number|string} goodsType 矿机0，合约矿机1
 * @return {*}
 */
const getProductsList = (categoryId, pageNum, pageSize, goodsType = 0) => api.$post(AppConfig.getProductsList, {
  categoryId,
  pageNum,
  pageSize,
  type: AppConfig.appTag,
  goodsType
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
  remoteDetail: goodsRemoteDetail,
  buyLimit: getLimitInfo,
  getProductsList,
  getGoodsCategoryList,
  getDiscountedPric,
  getGoodsActivityList,
  getRewardRuleList,
  getGoodsInfo
};
export default ProductAPI;
