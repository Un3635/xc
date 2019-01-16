import AppConfig from '../config';
import API from './api';
import TokenAPI from './token-api';

/**
 * 获取活动优惠金额
 * @param {string}   token   用户Token
 * @param {integer}   goodsId  商品Id
 * @param {integer}   goodsType 商品类型（1：矿机商品；2：算力商品）
 * @returns {Promise<*>}
 */
const getDiscountedPrice = (goodsId, goodsType) => TokenAPI.getValid().then(token => API.$post(AppConfig.getDiscountedPrice, {
  goodsId,
  goodsType,
  token
}));

/**
 * 获取商品活动列表登录之后
 * @param {string}   token   用户Token
 * @param {integer}   goodsId  商品Id
 * @param {integer}   goodsType 商品类型（1：矿机商品；2：算力商品）
 * @param {integer}   type    类型（1:web中文 2:web英文 3:m站）
 * @returns {Promise<*>}
 */
const getGoodsActivityList = (goodsId, goodsType, type) => TokenAPI.getValid().then(token => API.$post(AppConfig.getGoodsActivityList, {
  goodsId,
  goodsType,
  type,
  token
}));

/**
 * 获取商品活动列表登录之前
 * @param {integer}   goodsId  商品Id
 * @param {integer}   goodsType 商品类型（1：矿机商品；2：算力商品）
 * @param {integer}   type    类型（1:web中文 2:web英文 3:m站）
 * @returns {Promise<*>}
 */
const getGoodsActivityLists = (goodsId, goodsType, type) => API.$post(AppConfig.getGoodsActivityList, {
  goodsId,
  goodsType,
  type
});

/**
 * 获取活动奖励规则
 * @param {integer}   inviteCommissionId    邀请返佣活动id
 * @returns {Promise<*>}
 */
const getRewardRuleList = inviteCommissionId => API.$post(AppConfig.getRewardRuleList, {
  inviteCommissionId
});

const activityApi = {
  getDiscountedPrice,
  getGoodsActivityList,
  getRewardRuleList,
  getGoodsActivityLists
};

export default activityApi;
