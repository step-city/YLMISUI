// 使用 NodeJS 自带的文件路径插件
var path = require('path')
// 引入 config/index.js
var config = require('../config')
// 引入一些小工具
var utils = require('./utils')
// 拼接我们的工作区路径为一个绝对路径
var projectRoot = path.resolve(__dirname, '../')
// 将 NodeJS 环境作为我们的编译环境
var isProduction = process.env.NODE_ENV === 'production'

//引入分离插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// vue中的css 会被打包到 app.css 中
let appCSS = new ExtractTextPlugin('static/css/app.css');
module.exports = {
  entry: {
    // 编译文件入口
    app: './src/main.js'
  },
  output: {
    // 编译输出的根路径
    path: config.build.assetsRoot,
    // 正式发布环境下编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // 编译输出的文件名
    filename: '[name].js'
  },
  resolve: {
    // 自动补全的扩展名
    extensions: ['', '.js', '.vue', '.json'],
    // 不进行自动补全或处理的文件或者文件夹
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      'vue$': 'vue/dist/vue.common.js',
      '@': path.resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components'),
      'ocomponents': path.resolve(__dirname, '../src/ocomponents'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'api': path.resolve(__dirname, '../src/api'),
      'static': path.resolve(__dirname, '../static'),
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('./image/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('./fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  stylus: {
    use: [
      require('autoprefixer-stylus')({
        browsers: ["Chrome >= 1", "Safari >= 1", "Firefox >= 1", "ie >= 8"]
      })
    ]
  },
  postcss: [
    require('autoprefixer')({
      browsers: ["Chrome >= 1", "Safari >= 1", "Firefox >= 1", "ie >= 8"]
    })
  ],
  vue: {
    loaders: utils.cssLoaders({
      extract: isProduction,
      sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
      ExtractPlugin: appCSS
    })
  },
  plugins: [
    appCSS, // 设置插件
  ]
}
