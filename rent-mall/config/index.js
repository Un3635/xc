const env = {
  development: {
    debug: true,
    baseURL: 'http://116.62.225.79:8287/api/mall',
    timeout: 10000
  },
  testing: {
    debug: true,
    baseURL: 'http://116.62.225.79:8287/api/mall',
    timeout: 10000
  },
  production: {
    debug: false,
    baseURL: 'http://116.62.225.79:8287',
    timeout: 10000
  }
};

const config = env[process.env.NODE_ENV || 'development'];

module.exports = config;
