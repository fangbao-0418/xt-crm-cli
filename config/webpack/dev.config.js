/*
 * @Date: 2019-11-18 14:02:56
 * @LastEditors: fangbao
 * @LastEditTime: 2020-04-21 17:28:13
 * @FilePath: /xt-wms/Users/fangbao/Documents/xituan/xt-cli/config/webpack/dev.config.js
 */
const fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var paths = require('../paths')
const customWebpackConfig = fs.existsSync(paths.webpack) ? require(paths.webpack) : null
module.exports = (config) => {
  var baseConfig = require('./base.config')(config, true)
  var __cwd = process.cwd()
  // const tsconfigFileContent = require(path.resolve(__dirname, '../tsconfig.json'))
  // tsconfigFileContent.compilerOptions.baseUrl = __cwd
  baseConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      include: path.resolve(__cwd, 'src'),
      exclude: /node_modules/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            // configFileContent: tsconfigFileContent,
            // configFileName: path.resolve(__dirname, '../tsconfig.json'),
            useCache: true,
            useBabel: true,
            babelOptions: {
              configFile: path.resolve(__cwd, './.babelrc')
            },
            babelCore: '@babel/core'
          }
        }
      ]
    }
  )
  if (customWebpackConfig) {
    const finalConfig = customWebpackConfig(baseConfig, 'dev')
    if (finalConfig) {
      baseConfig = finalConfig
    }
  }
  return baseConfig
}
