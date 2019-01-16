import axios from "axios";
import Qs from "qs";
import { AppConfig } from "~/service/config";

var instance = axios.create();
instance.defaults.timeout = 10000;
instance.defaults.baseURL = AppConfig.apiEndpoint;

instance.interceptors.request.use(config => {
  config.headers.token = config.token;
  return config;
});

export const myAccount = token =>
  instance.post("/web_user/myAccount.wl", Qs.stringify({  }), {
    token
  });
