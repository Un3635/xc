import { AppConfig } from "~/service/config";
import axios from "axios";
import Qs from "qs";
import cookie from "cookie";
import loginmodalevent from "./loginmodalevent";

var instance = axios.create();
instance.defaults.timeout = 3000000;
instance.defaults.baseURL = AppConfig.apiEndpoint;

instance.interceptors.request.use(
  function(config) {
    if (config.needtoken) {
      var ck = cookie.parse(document.cookie || "");
      if(ck&&ck.token){
        config.headers.token=ck.token;
      }else{
        loginmodalevent.$emit("login");
        return Promise.reject();
      }
    }
    return config;
  },
  function(error) {
    return Promise.reject({
      msg: "网络错误code:0009",
      error: error
    });
  }
);

instance.interceptors.response.use(
  function(response) {
    if (response.data && response.data.code == "000000") {
      if (
        response.data.data &&
        (response.data.data.result ||
          response.data.data.result == false ||
          response.data.data.result == 0)
      ) {
        return response.data.data.result;
      } else {
        return response.data.data;
      }
    } else if (response.data && response.data.code == "100008") {
      loginmodalevent.$emit("login");
    } else {

      return Promise.reject(response.data);
    }
  },
  function(error) {
    return Promise.reject({
      msg: "网络错误code:0010",
      error: error
    });
  }
);

export const httppost = (url, data, needtoken = true) => {
  return instance.post(url, Qs.stringify(data), { needtoken });
};
export const httpget = (url, data, needtoken = true) => {
  return instance.get(url, { params: data, needtoken });
};

var instance_common = axios.create();
export const get = (url, data) => {
  return instance_common.get(url, { params: data });
};
