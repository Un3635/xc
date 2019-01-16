import API from './api';
import AppConfig from '../config';

/**
 *获取矿池自身所有币种当前的信息
 */
const getAllPoolStatus = () => API.$post(AppConfig.getAllPoolStatus, {});
/**
 * 获取矿池自身最近发现的100个块
 * @param {string}   coin 币种
 * @returns {Promise<*>}
 */
const getBlockInfo = (coin) => API.$post(AppConfig.getBlockInfo, {coin});
/**
 *  根据钱包地址检索
 * @param {integer}   wallet 钱包地址
 * @returns {Promise<*>}
 */
const searchWallet = (wallet) => API.$post(AppConfig.searchWallet, {wallet});
/**
 *  获取当前矿工状态--分页接口
 * @param {integer}   coin 币种
 * @param {integer}   wallet  钱包地址
 * @param {integer}   online_status  在线状态标志（ALL:所有 ONLINE_STATUS:在线 OFFLINE_STATUS:掉线)
 * @param {integer}   skip  分页
 * @returns {Promise<*>}
 */
const getCurrentWorker = (coin, wallet, online_status, skip) => API.$post(AppConfig.getCurrentWorker, {
  coin,
  wallet,
  online_status,
  skip
});
/**
 *  获取矿工当前账户信息
 * @param {integer}   coin 币种
 * @param {integer}   wallet  钱包地址
 * @returns {Promise<*>}
 */
const getMinerInfo = (coin, wallet) => API.$post(AppConfig.getMinerInfo, {coin, wallet});
/**
 *  获取单个矿工的转账记录
 * @param {integer}   coin 币种
 * @param {integer}   wallet  钱包地址
 * @returns {Promise<*>}
 */
const getPersonTransfer = (coin, wallet) => API.$post(AppConfig.getPersonTransfer, {coin, wallet});
/**
 * 获取单个矿池自身的基本信息
 * @param {integer}   coin 币种
 * @returns {Promise<*>}
 */
const getPoolStatus = (coin) => API.$post(AppConfig.getPoolStatus, {coin});
/**
 * 获取矿池所有币种加入共享算力的信息
 * @returns {Promise<*>}
 */
const getShareAllPoolStatus = () => API.$post(AppConfig.getShareAllPoolStatus);
/**
 * 获取当前币种全网的基本信息
 * @param {integer}   coin 币种
 * @returns {Promise<*>}
 */
const getShareAllPoolStatusByCoin = (coin) => API.$post(AppConfig.getShareAllPoolStatusByCoin, {coin});
/**
 * 获取加入云矿池全网共享的最近发现的100个块
 * @param {integer}   coin 币种
 * @returns {Promise<*>}
 */
const getShareBlockInfo = (coin) => API.$post(AppConfig.getShareBlockInfo, {coin});
/**
 * 统计页面 云矿池全网24小时打点数据
 * @param {string}   coin 币种
 * @returns {Promise<*>}
 */
const getShareStatusStatistics24 = (coin) => API.$post(AppConfig.getShareStatusStatistics24, {coin});

/**
 * 统计页面 获取矿池自身24小时打点数据
 * @param {string}   coin 币种
 * @returns {Promise<*>}
 */
const getStatusStatistics24 = (coin) => API.$post(AppConfig.getStatusStatistics24, {coin});
/**
 * 获取加入云矿池全网共享的最近发现的100个块
 * @param {integer}   coin 币种
 *  * @param {integer}   wallet 钱包地址
 * @returns {Promise<*>}
 */
const getMinerDot24Hour = (coin, wallet) => API.$post(AppConfig.getMinerDot24Hour, {coin, wallet});
const poolAPI = {
  getAllPoolStatus,
  getBlockInfo,
  searchWallet,
  getCurrentWorker,
  getMinerInfo,
  getPersonTransfer,
  getPoolStatus,
  getShareAllPoolStatus,
  getShareAllPoolStatusByCoin,
  getShareBlockInfo,
  getShareStatusStatistics24,
  getStatusStatistics24,
  getMinerDot24Hour
};
export default poolAPI;
