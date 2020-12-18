const argv = require('minimist')(process.argv);
const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack-common.config');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: argv.port || 80,
    hot: true,
    open: false,
    overlay: true,
    noInfo: true,
    historyApiFallback: true,
  },
});
