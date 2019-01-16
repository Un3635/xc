import API from './api';
import AppConfig from '../config';

//缓存
const cache = {
  countryCode: null,
  area: null,
  productList: null
};

/**
 * 获取国别号
 * @returns {Promise<Array<*>>}
 */
const getCountryCode = () => {
  if (cache.countryCode) {
    return Promise.resolve(cache.countryCode);
  }
  return API
    .get('/js/country-code.json')
    .then(res => {
      res.data.forEach(item => {
        item.code = '+' + item.code;
      });
      cache.countryCode = res.data;
      return cache.countryCode;
    });
};

/**
 * 获取区域信息
 * @returns {Promise<*>}
 */
const getAreaData = () => {
  if (cache.area) {
    return Promise.resolve(cache.area);
  }
  return API.$axios
    .get('/js/area.json')
    .then(res => {
      cache.area = res.data;
      return cache.area;
    });
};

/**
 * 底部友情链接
 * @returns {*}
 */
const friendsLinks = () => API.$post(AppConfig.friendsLinks);

/**
 * 获取底部二维码链接
 * @returns {*}
 */
const qrCodeList = () => API.$post(AppConfig.getQrCode);

/**
 * 统计单日UV
 * @param {string} uniqueId
 * @param {string} firChannelId
 * @param {string} secChannelId
 * @returns {Promise<*>}
 */
const statisticPV = (uniqueId, firChannelId, secChannelId = '') => API.$get(AppConfig.statisticPV, {
  params: {
    sessionId: uniqueId,
    firChannelId,
    secChannelId
  }
});

const CommonAPI = {
  country: getCountryCode,
  area: getAreaData,
  friendsLinks,
  statisticPV,
  qrCodeList
};

export default CommonAPI;

