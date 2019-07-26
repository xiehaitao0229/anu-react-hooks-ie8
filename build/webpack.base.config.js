const path = require('path');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const argv = require('yargs-parser')(process.argv.slice(2));
const pro = argv.mode == 'production';  //  区别是生产环境还是开发环境;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const entry = {
  index: resolve('src/index.js')
}
const entryKeys = Object.keys(entry);
const htmls = [];
entryKeys.map((item) => {
  htmls.push(
    new HtmlWebpackPlugin({
      filename: pro ? `../${item}.html` : `./${item}.html`,
      template: `./template/${item}.ejs`,
      chunks: ['vendor', 'common', `${item}`]
    })
  )
  return item
})

let plugins = [
  new CleanWebpackPlugin(),
  new WebpackBar(),
];

plugins = plugins.concat(htmls)


module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.j|tsx$/,
        use: ['babel-loader'],
        include: /src/,  //  只转化src目录下的js
        exclude: /node_modules/,  // 排除掉node_modules，优化打包速度
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'images/', // 图片打包后存放的目录
          },
        }],
      },
      {
        test: /\.(html|ejs)$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        }],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: pro ? './fonts/[name].[hash:7].[ext]' : 'static/fonts/[name].[hash:7].[ext]',
        },
      },
    ]
  },
  plugins: plugins,
  resolve: {
    // 省略后缀
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.less'],
    alias: {
      "router": "@reach/router/index.js",
    },
  },
  //  提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {  // 抽离第三方插件
          test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',  //  打包后的文件名
          priority: 10,  // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        common: {
          // 抽离自己写的公共代码
          chunks: 'initial',
          name: 'common', //  任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 2,
        }
      }
    }
  }
}