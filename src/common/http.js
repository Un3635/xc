import axios from "axios";
import Qs from "qs";
import appconfig from "./config";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import xcqbapp from "./jsbridge";

axios.defaults.timeout = 20000;
axios.defaults.baseURL = appconfig.apiurl;
axios.defaults.headers.version = appconfig.version;

axios.interceptors.request.use(
  function(config) {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    config.headers.token = localStorage.token || "";
    return config;
  },
  function(error) {
    Indicator.close();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    Indicator.close();

    if (response.data && response.data.code == "000000") {
      return response.data.data;
    } else {
      if(response.config.url.indexOf('/article/detail.open')>=0){
        return  Promise.reject()
      }
      Toast(response.data.msg || "网络错误");
      return Promise.reject(response.data.msg);
    }
    return response;
  },
  function(error) {
    Indicator.close();
    if (
      error &&
      error.message &&
      error.message.indexOf("timeout") >= 0 &&
      error.message.indexOf("exceeded") >= 0
    ) {
      Toast("网络超时");
    } else {
      Toast(error.message || "网络错误");
    }

    return Promise.reject(error);
  }
);

var get = (url, data, needlogin) => {
  if (needlogin) {
    if (xcqbapp.hockAPP()) {
      return new Promise((res, rej) => {
        xcqbapp.call("getUserId", {}, function(token) {
          localStorage.token = token;
          res(
            axios.get(url, {
              params: data
            })
          );
        });
      });
    } else {
      return axios.get(url, {
        params: data
      });
    }
  } else {
    return axios.get(url, {
      params: data
    });
  }
};

var post = (url, data, needlogin) => {
  if (needlogin) {
    if (xcqbapp.hockAPP()) {
      return new Promise((res, rej) => {
        xcqbapp.call("getUserId", {}, function(token) {
          localStorage.token = token;
          res(axios.post(url, Qs.stringify(data)));
        });
      });
    } else {
      //   localStorage.token = "14_5feac8da8f40499db8d34f40897e8411";

      return axios.post(url, Qs.stringify(data));
    }
  } else {
    return axios.post(url, Qs.stringify(data));
  }
};

export default {
  get: get,
  post: post
};
