import axios from 'axios';
import AppConfig from '../config';
import errToast from '../components/errToast';
// import store from '../store';
// import router from '../router';
// import {MutationTypes} from '../store/mutations';
import qs from 'qs';

const errToastInstance = errToast.install();
const showError = err => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  if (err && process.env.VUE_ENV === 'client') {
    errToastInstance.show(err.msg);
  }
};

axios.defaults.timeout = AppConfig.apiTimeout;
axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    t: Date.now()
  };
  return config;
});

// 用于解决response interceptor导致请求报错
function globalResponseHandler(res) {
  if (!res) {
    return Promise.reject({msg: '系统错误，请稍后重试'});
  }
  if (res.status >= 200 && res.status < 300) {
    return Promise.resolve(res.data);
  }
  switch (res.status) {
    case 400:
      res.msg = '请求错误';
      break;
    case 401:
      res.msg = '未授权，请登录';
      break;
    case 403:
      res.msg = '拒绝访问';
      break;
    case 404:
      res.msg = `请求地址出错`;
      break;
    case 408:
      res.msg = '请求超时';
      break;
    case 500:
      res.msg = '服务器内部错误';
      break;
    case 501:
      res.msg = '服务未实现';
      break;
    case 502:
      res.msg = '网关错误';
      break;
    case 503:
      res.msg = '服务不可用';
      break;
    case 504:
      res.msg = '网关超时';
      break;
    case 505:
      res.msg = 'HTTP版本不受支持';
      break;
    default:
      res.msg = '未知错误,请稍后重试';
  }
  return Promise.reject(res);
}

// 全局http响应处理
function responseHandler(data) {
  if (data.code === '1000') {
    return Promise.resolve(data.data);
  }
  if (data.code === '7024') {
    // store.commit(MutationTypes.LOGIN_OUT);
    // 已在登录页面则不跳转
    // if (router.currentRoute.path !== '/sign-in') {
    //   router.replace({
    //     path: '/sign-in',
    //     query: {
    //       redirectUrl: router.currentRoute.fullPath
    //     }
    //   });
    // }
    return Promise.reject({msg: '登录信息已过期，请重新登录'});
  }
  // if (data.code === '2100') {
  //   return Promise.reject({msg: '该商品已下架'});
  // }
  let errMsg = data.msg || '系统异常,请联系管理员或稍后重试';
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
  $post: (url, data, config, endpoint = AppConfig.apiEndpoint) =>
    axios.post(endpoint + '/' + url, data, Object.assign({}, baseFormCfg, config))
      .then(globalResponseHandler)
      .catch(err => globalResponseHandler(err.response))
      .then(responseHandler)
      .catch(err => showError(err)),
  $get: (url, config, endpoint = AppConfig.apiEndpoint) =>
    axios.get(endpoint + '/' + url, config)
      .then(globalResponseHandler).catch(err => globalResponseHandler(err.response))
      .then(responseHandler)
      .catch(err => showError(err)),
  $$post: (url, data, config, endpoint = AppConfig.apiEndpoint) =>
    axios.post(endpoint + '/' + url, data, Object.assign({}, baseFormCfg, config))
      .then(globalResponseHandler)
      .catch(err => globalResponseHandler(err.response)),
  $$get: (url, config, endpoint = AppConfig.apiEndpoint) =>
    axios.get(endpoint + '/' + url, config)
};

export default API;
