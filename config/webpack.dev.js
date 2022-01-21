const path = require('path')
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

devConfig = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
}

module.exports = merge(commonConfig, devConfig)