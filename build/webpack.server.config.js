const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const VueSSRPlugin = require('vue-ssr-webpack-plugin');
const vuxLoader = require('vux-loader');


const config = merge(base, {
  target: 'node',
  entry: './src/server-entry.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': path.resolve(__dirname, '../src/api/create-api-server.js')
    }
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ]
});

if (process.env.NODE_ENV === 'production') {
  for (let item of config.module.rules) {
    if (item.loader === 'vue-loader') item.options = {};
  }
}

module.exports = vuxLoader.merge(config, {
  plugins: ['vux-ui', {
    name: 'less-theme',
    path: 'src/assets/less/variables.less' // 相对项目根目录路径
  }, {
    name: 'duplicate-style'
  }]
});
