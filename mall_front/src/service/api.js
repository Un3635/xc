import axios from 'axios';
import { AppConfig } from "../config";

export default {
  $axios: axios,
  get: (url, config) => axios.get(process.env.APP_ROOT + url, Object.assign({withCredentials: true}, config)),
  post: (url, data, config) => axios.post(process.env.APP_ROOT + url, Object.assign({withCredentials: true}, config)),
  $get: (url, config) => axios.get(process.env.APP_ROOT + url, Object.assign({withCredentials: false}, config)),
  $post: (url, data, config) => axios.post(process.env.APP_ROOT + url, Object.assign({withCredentials: true}, config)),
  postForm: (url, data) => axios({
    url,
    data,
    method: 'post',
    transformRequest: [(data) => {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
