const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

webpackBaseConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(), // 热更新，热更新不是刷新
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[id].css',
  }),
)

module.exports = merge(webpackBaseConfig,{
  devtool:'cheap-module-source-map',
  output:{
    filename:'js/[name].js',  //  打包后的文件名称
    chunkFilename:'js/[name].js',
    publicPath:'/',
  },
  devServer:{
    disableHostCheck:true,
    host:'0.0.0.0',  //  默认是localhost
    hot:true,
    proxy:{
      
    }
  }
})