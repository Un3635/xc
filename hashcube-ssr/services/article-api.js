import AppConfig from '../config';
import api from './api';

/**
 * 获取文章list
 * @param {integer} tagId 标签Id
 * @param {integer} pageNum 页数
 * @param {integer} pageSize list条数
 */
const getArticleList = ({tagId, pageNum, pageSize}) => api.$get(AppConfig.getArticleList, {
  params: {
    tagId,
    pageNum,
    pageSize
  }
});

/**
 * 获取文章信息
 * @param {string|number} articleId 文章Id
 */
const getArticleInfo = articleId => api.$post(AppConfig.getArticleInfo, {articleId});

/**
 * 获取矿机信息
 * @param {string|number} type 广告类型（1-矿机;2-算力）
 */
const getGoodsInfo = (type) => api.$post(AppConfig.getArticleGoodsInfo, {type, plat: AppConfig.appTag});


const ArticleAPI = {
  getList: getArticleList,
  getInfo: getArticleInfo,
  getGoodsInfo
};

export default ArticleAPI;
