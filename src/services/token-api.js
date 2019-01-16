import api from './api';
import AppConfig from '../config';
import {getStore, removeStore, setStore, removeSessionStore} from '../plugins/utils';
import {MutationTypes} from '../store/mutations';
import store from '../store';
import {Channel, WL_CHANNEL} from '../config/constants';

const TOKEN_KEY = 'wl_token';

/**
 * 获取本地token
 * @return {string | null}
 */
const getToken = () => getStore(TOKEN_KEY);

/**
 * 远端token是否可用
 * @param  {string}  token   用户token
 * @param {string} channel 1 挖链APP 2 挖链网 3 算立方
 * @return {Promise<String>} 可用resolve(token),不可用为reject
 */
const remoteValid = (token, channel = Channel) => api.$post(AppConfig.loginCheck, {token, channel}).then(() => token);

/**
 * 登录检查
 * @param {string} token
 * @param {string} channel 1 挖链APP 2 挖链网 3 算立方
 */
const loginCheck = (token, channel = Channel) => api.$$post(AppConfig.loginCheck, {token, channel});

/**
 * 获取有效的token
 * @param  {Boolean} serverValid  server端是否可用，false-本地可用,true-local,server端均可用 默认为false
 * @param {string} channel 1 挖链APP 2 挖链网 3 算立方
 * @return {Promise<String>} 有效resolve(token),其他情况返回reject
 */
const getValidToken = (serverValid = false, channel = Channel) => {
  const token = getToken();
  if (!token) {
    store.commit(MutationTypes.LOGIN_OUT);
    return Promise.reject({code: 100, msg: '用户未登录'});
  }
  if (!serverValid) {
    return Promise.resolve(token);
  }
  if (serverValid && token) {
    return remoteValid(token, channel);
  }
};

/**
 * remove storage token
 */
const removeToken = () => {
  removeStore(TOKEN_KEY);
};

/**
 * 持久化token到本地
 * @param {string} token
 */
const saveToken = token => {
  setStore(TOKEN_KEY, token);
};

/**
 * 退出登录
 * @param {string} token
 */
const loginOut = () => {
  removeSessionStore(WL_CHANNEL);
  return api.$$post(AppConfig.loginOut, {token: getToken()});
};

const TokenAPI = {
  get: getToken,
  getValid: getValidToken,
  loginCheck: loginCheck,
  save: saveToken,
  remove: removeToken,
  loginOut: loginOut
};
export default TokenAPI;
