/*
 * @Date: 2019-11-18 14:02:56
 * @LastEditors: fangbao
 * @LastEditTime: 2020-05-12 10:53:10
 * @FilePath: /xt-crm/Users/fangbao/Documents/xituan/xt-cli/config/webpack/base.config.js
 */
var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var __cwd = process.cwd()
var {
  getFileLoaderConfig,
  getStyleLoaderConfig,
  getImageLoaderConfig,
  ExtractTextPlugin
} = require('./utils')

const BUILD_TIME = new Date().getTime()

module.exports = (config = {}, dev = true) => {
  const entry = config.entry
  const outdir = config.outdir || 'dist'
  var plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__cwd, 'src/index.html'),
      // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
      inject: true,
      favicon: path.resolve(__cwd, 'src/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin(),
    ExtractTextPlugin(dev),
    new webpack.ProvidePlugin({
      APP: path.resolve(__cwd, 'src/utils/app')
    })
  ]
  return {
    mode: dev ? 'development' : 'production',
    entry: {
      app: path.resolve(__cwd, 'src/', entry)
    },
    output: {
      path: path.resolve(__cwd, outdir),
      filename: dev ? undefined : 'js/[name].js?v=' + BUILD_TIME,
      chunkFilename: dev ? undefined : 'js/' + '[name]-[chunkhash:8].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|ts)x?$/,
          include: path.resolve(__cwd, 'src'),
          use: [
            'source-map-loader',
            'eslint-loader'
          ]
        },
        {
          test: /\.jsx?$/,
          include: path.resolve(__cwd, 'src'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__cwd, './.babelrc')
            }
          }
        },
        ...getStyleLoaderConfig(dev),
        getImageLoaderConfig(dev),
        getFileLoaderConfig(dev)
      ]
    },
    plugins: plugins,
    resolve: {
      modules: [
        path.resolve(__cwd, 'node_modules'),
        path.resolve(__cwd, 'src')
      ],
      extensions: [
        '.min.js',
        '.jsx',
        '.js',
        '.tsx',
        '.ts',
        '.json',
        '.styl',
        '.css'
      ],
      alias: {
        '@': path.join(__cwd, 'src')
      }
    },
    devtool: dev ? 'source-map' : ''
  }
}
