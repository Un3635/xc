const env = {
  development: {
    debug: true,
    baseURL: 'http://www.hc.top',
    oldApiEndpoint: 'https://shoptest.hc.top',
    newApiEndpoint: 'https://apitest.hc.top',
    apiEndpointV1_1: 'https://powertest.hc.top',
    // oldApiEndpoint: 'http://192.168.50.49:8079',
    // newApiEndpoint: 'http://192.168.50.49:8091',
    // apiEndpointV1_1: 'http://192.168.50.49:8092',
    timeout: 10000
  },
  production: {
    debug: false,
    baseURL: 'http://www.hc.top',
    oldApiEndpoint: 'https://shoptest.hc.top',
    newApiEndpoint: 'https://apitest.hc.top',
    apiEndpointV1_1: 'https://powertest.hc.top',
    timeout: 10000
  }
};

const config = env[process.env.NODE_ENV || 'development'];

module.exports = config;
