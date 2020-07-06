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
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
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
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: path.resolve(__cwd, './.babelrc')
          }
        },
        {
          loader: 'ts-loader',
          options: {
            context: __cwd,
            transpileOnly: true,
            configFile: path.resolve(__cwd, './tsconfig.json')
          }
        }
      ]
    }
  )
  baseConfig.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        context: __cwd,
        configFile: path.resolve(__cwd, './tsconfig.json'),
        profile: true
      }
    })
  )
  if (customWebpackConfig) {
    const finalConfig = customWebpackConfig(baseConfig, 'dev')
    if (finalConfig) {
      baseConfig = finalConfig
    }
  }
  return baseConfig
}
