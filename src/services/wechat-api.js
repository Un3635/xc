import AppConfig from '../config';
import API from './api';

/**
 * H5专用： 获取微信openid
 * @param {string} code 微信code
 * @returns {Promise<*>}
 */
const getOpenidByCode = (code) => API.$get(AppConfig.getOpenidByCode, {params: {code}});

/**
 * H5专用： 获取微信pay config配置参数
 * @param {string} url 当前url（没用）
 * @returns {Promise<*>}
 */
const getPayConfigParams = url => API.$post(AppConfig.getPayConfigParams, {url});

export default {
  getOpenidByCode,
  getPayConfigParams
};
