import axios from 'axios';
import qs from 'qs';
import {AppConfig} from './config';
import {ErrorMapping} from './config';
import {EventBus} from './utils';
import {LOGIN_OUT} from '../store/mutation-types';

axios.defaults.timeout = AppConfig.apiTimeout;
axios.defaults.baseURL = AppConfig.baseURL;

axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    t: Date.now()
  };
  return config;
});
axios.interceptors.response.use((res) => res, (err) => {
  if (err && err.response) {
    err.msg = err.response.statusText;
  }
  return Promise.reject(err);
});

// 全局http响应处理
function responseHandler(response) {
  let data = response.data;
  if (data.code === '000000') {
    return Promise.resolve(data.data);
  }
  if (data.code === '100008') {
    EventBus.$emit(LOGIN_OUT);
    return Promise.reject({msg: 'ログインはタイムアウトになりました。もう一度ログインしてください'});
  }
  let errMsg = ErrorMapping[data.code] || data.msg || 'システムエラーです。管理員に連絡してください。あるいは時間をあけてもう一度試してください。';
  return Promise.reject({code: data.code, msg: errMsg});
}

// axios以FormData方式提交post请求的config
const baseFormCfg = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [(data) => qs.stringify(data)]
};

const API = {
  // default axios 对象
  $axios: axios,
  // 以FormData方式发送post请求并有默认的responseHandler
  $post: (url, data, config) => axios.post(url, data, Object.assign({}, baseFormCfg, config)).then(responseHandler),
  $get: (url, config) => axios.get(url, config).then(responseHandler),
  $$post: (url, data, config) => axios.post(url, data, Object.assign({}, baseFormCfg, config))
};

export default API;
