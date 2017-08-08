var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
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
  ]
}
