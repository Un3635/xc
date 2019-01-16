import axios from 'axios';
import AppConfig from '../config';
import {ErrorMapping} from '../config/constants';
import {LOGIN_OUT} from '../store/mutation-types';
import * as qs from 'qs';
import {EventBus} from '../utils';

axios.defaults.timeout = AppConfig.apiTimeout;
axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    t: Date.now()
  };
  return config;
});
axios.interceptors.response.use((res) => res, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.msg = '请求错误';
        break;
      case 401:
        err.msg = '未授权，请登录';
        break;
      case 403:
        err.msg = '拒绝访问';
        break;
      case 404:
        err.msg = `请求地址出错`;
        break;
      case 408:
        err.msg = '请求超时';
        break;
      case 500:
        err.msg = '服务器内部错误';
        break;
      case 501:
        err.msg = '服务未实现';
        break;
      case 502:
        err.msg = '网关错误';
        break;
      case 503:
        err.msg = '服务不可用';
        break;
      case 504:
        err.msg = '网关超时';
        break;
      case 505:
        err.msg = 'HTTP版本不受支持';
        break;
      default:
        err.msg = '未知错误,请稍后重试';
    }
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
    return Promise.reject({msg: '登录信息已过期，请重新登录'});
  }
  let errMsg = ErrorMapping[data.code] || data.msg || '系统异常,请联系管理员或稍后重试';
  return Promise.reject({code: data.code, msg: errMsg});
}

// 全局http响应处理
function responseHandler2(response) {
  let data = response.data;
  if (data.code === '000000') {
    return Promise.resolve(data);
  }
  if (data.code === '100008') {
    EventBus.$emit(LOGIN_OUT);
    return Promise.reject({msg: '登录信息已过期，请重新登录'});
  }
  let errMsg = ErrorMapping[data.code] || data.msg || '系统异常,请联系管理员或稍后重试';
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
  get: axios.get,
  post: axios.post,
  // 以FormData方式发送post请求并有默认的responseHandler
  $post: (url, data, config, endpoint = AppConfig.apiEndpoint) => axios.post(endpoint + '/' + url, data, Object.assign({}, baseFormCfg, config)).then(responseHandler),
  // 针对外层有数据项的接口
  $post2: (url, data, config, endpoint = AppConfig.apiEndpoint) => axios.post(endpoint + '/' + url, data, Object.assign({}, baseFormCfg, config)).then(responseHandler2),
  $get: (url, config, endpoint = AppConfig.apiEndpoint) => axios.get(endpoint + '/' + url, config).then(responseHandler),
  $$post: (url, data, config, endpoint = AppConfig.apiEndpoint) => axios.post(endpoint + '/' + url, data, Object.assign({}, baseFormCfg, config))
};

export default API;
