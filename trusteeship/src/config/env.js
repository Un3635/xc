const env = {
  development: {
    debug: true,
    oldApiEndpoint: 'https://shoptest.hc.top',
    newApiEndpoint: 'https://apitest.hc.top',
    apiEndpointV1_1: 'https://powertest.hc.top'
  },
  production: {
    debug: false,
    oldApiEndpoint: 'https://shoptest.hc.top',
    newApiEndpoint: 'https://apitest.hc.top',
    apiEndpointV1_1: 'https://powertest.hc.top'
  }
};
export default env;
