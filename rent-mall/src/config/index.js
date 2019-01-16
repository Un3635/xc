import config from '../../config';

const AppConfig = {
  apiEndpoint: config.baseURL,   // 接口请求地址
  apiTimeout: 20000// 接口超时时间(单位:ms)
};

export default AppConfig;

