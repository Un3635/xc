import API from './api';
import AppConfig from '../config';

// 缓存
const cache = {
  countryCode: null,
  area: null,
  productList: null
};
/**
 * 获取产品列表
 * @return {Promise<Array<*>>}
 */
const getProductList = () => {
  if (cache.productList) {
    return Promise.resolve(JSON.parse(JSON.stringify(cache.productList)));
  }
  const promise = new Promise((resolve, reject) => {
    require(['../assets/json/product-list.json'], module => {
      resolve(module);
    });
  });
  const batchInfos = API.$get(AppConfig.getGoodsBatch);
  return Promise.all([promise, batchInfos])
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

const CommonAPI = {
  product: getProductList
};

export default CommonAPI;

