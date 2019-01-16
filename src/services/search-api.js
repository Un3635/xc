import api from './api';
import AppConfig from '../config';

/**
 * 用户搜索商品
 * @param {string}  token   token
 * @param {string}  keyWord    搜索关键词
 * @param {string}  barandId      品牌表id
 * @param {string} category 分类id
 * @param {string}  sceneId   场景id
 * @param {double}  rentMin    最小金额,保留参数,不传
 * @param {double}  rentMax      最大金额,保留参数,不传
 * @param {string} priceRange 租金范围的name值
 * @param {string}  goodsIsNew   商品新旧name值
 * @param {string}  leaseholdType    租赁方式name值
 * @param {integer}  pageNum      当前页
 * @param {integer} pageSize 每页页数
 * @param {string}  orderBy   排序 create_time (创建时间,默认) rent (租金)
 * @param {string}  asc    排序规则 ASC(升序) DESC(倒序,默认)
 * @returns {Promise<*>}
 */
const searchExecute = ({token, keyWord, barandId, category, sceneId, rentMin, rentMax, priceRange, goodsIsNew, leaseholdType, pageNum, pageSize, orderBy, asc}) => api.$post(AppConfig.searchExecute, {
  token,
  keyWord,
  barandId,
  category,
  sceneId,
  rentMin,
  rentMax,
  priceRange,
  goodsIsNew,
  leaseholdType,
  pageNum,
  pageSize,
  orderBy,
  asc
});

/**
 * 商品搜索条件
 * @param {string}  keyword   关键词
 * @returns {Promise<*>}
 */
const searchParam = keyword => api.$get(AppConfig.searchParam, {params: {keyword}});

export default {
  searchExecute,
  searchParam
};
