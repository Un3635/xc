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
    .get('/static/js/country-code.json')
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
 * @returns {Promise<Array<*>>}
 */
const getAreaData = () => {
  if (cache.area) {
    return Promise.resolve(cache.area);
  }
  return API.$axios
    .get('/static/js/area.json')
    .then(res => {
      cache.area = res.data;
      return cache.area;
    });
};


/**
 * 获取产品列表
 * @return {Promise<Array<*>>}
 */
const getProductList = () => {
  if (cache.productList) {
    return Promise.resolve(JSON.parse(JSON.stringify(cache.productList)));
  }
  const productAPI = API.$axios
    .get('/static/js/product-list.json')
    .then(res => res.data || []);
  const batchInfos = API.$get(AppConfig.getGoodsBatch);
  return Promise.all([productAPI, batchInfos])
    .then(([productList, batchInfos]) => {
      const {batchNo, list} = batchInfos;
      productList.forEach((product = {}) => {
        list.forEach(item => {
          if (product.id === item.goodsId) {
            product.batches[0].id = item.batchId;
            product.batches[0].no = batchNo;
          }
        });
      });
      cache.productList = productList;
      return JSON.parse(JSON.stringify(cache.productList));
    });
};


const friendsLinks = () => API.$post(AppConfig.friendsLinks);

const CommonAPI = {
  country: getCountryCode,
  area: getAreaData,
  product: getProductList,
  friendsLinks
};

export default CommonAPI;

