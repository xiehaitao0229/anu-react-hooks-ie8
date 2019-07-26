const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackBaseConfig = require('./webpack.base.config.js');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

webpackBaseConfig.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true,
    statsOptions: { source: false }
  })
)

webpackBaseConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[id].[hash].css',
  })
)

webpackBaseConfig.optimization.minimizer = [
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true,
  }),
  new OptimizeCSSAssetsPlugin({}),
];

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[chunkhash].js', // 打包后的文件名称
    chunkFilename: 'js/[name].[chunkhash].js',
    path: resolve('dist/static'), // 打包后的目录，必须是绝对路径
    publicPath: 'static/',
  },
})
