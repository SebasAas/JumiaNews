const path = require('path')
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    minimize: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}

module.exports = merge(commonConfig, prodConfig)