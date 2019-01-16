import api from './api';
import AppConfig from '../config';
import {getStore, removeStore, setStore} from '../plugins/utils';
import store from '../store';
import {LOGIN_OUT} from '../store/mutation-types';

const TOKEN_KEY = 'wl_token';

/**
 * 获取本地token
 * @return {string | null}
 */
const getToken = () => getStore(TOKEN_KEY);

/**
 * 远端token是否可用
 * @param  {string}  token   用户token
 * @return {Promise<String>} 可用resolve(token),不可用为reject
 */
const remoteValid = token => api.$post(AppConfig.loginCheck, {token, channel: AppConfig.channel}).then(() => token);

/**
 * 登录检查
 * @param token
 */
const loginCheck = token => api.$$post(AppConfig.loginCheck, {token, channel: AppConfig.channel}).then(res => res.data);

/**
 * 获取有效的token
 * @param  {Boolean} serverValid  server端是否可用，false-本地可用,true-local,server端均可用 默认为false
 * @return {Promise<String>} 有效resolve(token),其他情况返回reject
 */
const getValidToken = (serverValid = false) => {
  const token = getToken();
  if (!token) {
    store.commit(LOGIN_OUT);
    return Promise.reject({code: 100, msg: '用户未登录'});
  }
  if (!serverValid) {
    return Promise.resolve(token);
  }
  if (serverValid && token) {
    return remoteValid(token);
  }
};

/**
 * remove storage token
 */
const removeToken = () => removeStore(TOKEN_KEY);

/**
 * 持久化token到本地
 * @param {string} token
 */
const saveToken = token => setStore(TOKEN_KEY, token);

const TokenAPI = {
  get: getToken,
  getValid: getValidToken,
  loginCheck: loginCheck,
  save: saveToken,
  remove: removeToken
};
export default TokenAPI;
