'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  APP_ROOT:'"http://116.62.225.79:8287/api/mall"'//测试环境ip
})
