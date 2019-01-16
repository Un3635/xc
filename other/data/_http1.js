import axios from "axios";
import Qs from "qs";
import { apiEndpoint } from "../config";
var instance = axios.create();
instance.defaults.timeout = 10000;
instance.defaults.baseURL = apiEndpoint;

instance.interceptors.response.use(
  function(response) {
    if (response.data && response.data.code == "000000") {
      if (response.data.data && response.data.data.result) {
        return response.data.data.result;
      } else {
        return response.data.data;
      }
    } else {
      return Promise.reject({
        code: "0002",
        error: response.data
      });
    }
  },
  function(error) {
    return Promise.reject({
      code: "0001",
      error: error
    });
  }
);

export const post = (url, data, needtoken = true) => {
  return instance.post(url, Qs.stringify(data), { needtoken });
};
export const get = (url, data, needtoken = true) => {
  return instance.get(url, { params: data, needtoken });
};
