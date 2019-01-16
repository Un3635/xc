import API from './api';
import AppConfig from '../config';

/**
 *  获取页面banner
 *
 * @param {string|number} type  banner类型  1-首页  2-云算力页  3-矿机页
 * @returns {*}
 */
const bannerList = (type) => API.$post(AppConfig.bannerList, {
  pageType: type,
  channelType: AppConfig.appTag
});

/**
 * 获取推荐商品列表
 * @returns {*}
 */
const getRecommendGoodsList = () => API.$post(AppConfig.recommendGoodsList, {
  channelType: AppConfig.appTag
});

/**
 * 获取推荐算力商品列表
 * @returns {*}
 */
const getRecommendHashGoodsList = () => API.$post(AppConfig.recommendHashGoodsList, {
  channelType: AppConfig.appTag
});

/**
 * 获取首页视频列表
 * @returns {*}
 */
const getVideo = () => API.$post(AppConfig.video);

/**
 * 获取通知列表
 * @returns {*}
 */
const notice = () => API.$post(AppConfig.notice);


export default {
  bannerList,
  getRecommendGoodsList,
  getRecommendHashGoodsList,
  getVideo,
  notice
};
