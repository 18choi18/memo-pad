const path = require('path');
const CaseSensitivePath = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const argv = require('minimist')(process.argv);

module.exports = {
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    extensions: ['.js', '.ts', 'json', 'html'],
  },
  module: {
    rules: [
      { test: /\.(js|mjs|ts)?$/, loader: 'babel-loader' },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CaseSensitivePath(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/answer.html',
      minify: {
        removeComments: true,
        useShortDoctype: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
      },
    }),
    new DotEnv({
      path: path.resolve(process.cwd(), `environments/.env.${argv.env || 'dev'}`),
    }),
  ],
};
