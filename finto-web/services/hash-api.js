import {AppConfig} from './config';
import TokenAPI from './token-api';
import API from './api';

/**
 * 获取算力币种列表
 * @returns {*}
 */
const getHashCurrencyList = () => API.$post(AppConfig.getHashCurrencyList);

/**
 * 查询算力商品信息列表
 * @param {string} currencyName  币种名称
 * @returns {*}
 */
const getJyGoodsList = (currencyName = '') => API.$post(AppConfig.getJyGoodsList, {
  currencyName
});

/**
 * 查询算力商品信息详情
 * @param {string} goodsId  商品id
 * @returns {*}
 */
const getJyGoodsInfo = (goodsId) => API.$post(AppConfig.getJyGoodsInfo, {
  goodsId
});

/**
 * 查询算力购买记录
 * @param {string} goodsId  商品id
 * @param {string} pageNum  页码 
 * @param {string} pageSize  每页条数
 * @returns {*}
 */
const getHashOrderList = (goodsId, pageNum, pageSize) => API.$post(AppConfig.getHashOrderList, {
  goodsId,
  pageNum,
  pageSize
});

/**
 * 购买算力
 * @param {string} goodsId  商品id
 * @param {string} pageNum  页码 
 * @param {string} pageSize  每页条数
 * @returns {*}
 */
const hashOrderSubmit = params => TokenAPI.getValid().then(token => API.$post(AppConfig.hashOrderSubmit, {
  ...params
}));

const HashAPI = {
  getHashCurrencyList,
  getJyGoodsList,
  getJyGoodsInfo,
  getHashOrderList,
  hashOrderSubmit
};

export default HashAPI;

