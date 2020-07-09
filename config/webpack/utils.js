var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var __cwd = process.cwd()

function getCssLoaderConfig (dev, modules = false) {
  return {
    loader: 'css-loader',
    options: {
      modules: {
        mode: modules ? 'local' : 'global',
        localIdentName: '[local]-[hash:base64:5]',
        context: path.resolve(__cwd, 'src'),
        hashPrefix: ''
      },
      sourceMap: dev
    }
  }
}

function getPostCssLoaderConfig (dev) {
  return {
    loader: 'postcss-loader',
    options: {
      sourceMap: dev,
      config: {
        path: path.resolve(__dirname, '../postcss.config.js'),
        ctx: {
          env: dev ? 'development' : 'production'
        }
      }
    }
  }
}

function getStylusLoaderConfig (dev, modules) {
  return {
    loader: 'stylus-loader',
    options: {
      sourceMap: dev
    }
  }
}

function getMiniCssExtractLoaderConfig (dev) {
  return {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: dev
    }
  }
}

function getStyleLoaderConfig (dev = true) {
  return [{
    test: /\.css$/,
    exclude: /\.m(odule)?\.css$/,
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev),
      getPostCssLoaderConfig(dev)
    ]
  }, {
    test: /\.m(oudle)?.css$/,
    include: path.resolve(__cwd, 'src'),
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev, true),
      getPostCssLoaderConfig(dev, true)
    ]
  }, {
    test: /\.styl$/,
    include: path.resolve(__cwd, 'src'),
    exclude: /\.m(odule)?\.styl$/,
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev),
      getPostCssLoaderConfig(dev),
      getStylusLoaderConfig(dev)
    ]
  }, {
    test: /\.m(odule)?.styl$/,
    include: path.resolve(__cwd, 'src'),
    use: [
      getMiniCssExtractLoaderConfig(dev),
      getCssLoaderConfig(dev, true),
      getPostCssLoaderConfig(dev, true),
      getStylusLoaderConfig(dev, true)
    ]
  }]
}
function getImageLoaderConfig (dev = true) {
  return {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: dev ? '' : 'assets/images/' + '[name].[hash:7].[ext]'
    }
  }
}
function getFileLoaderConfig (dev = true) {
  return {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: dev ? '' : 'assets/files/' + '[name].[hash:7].[ext]'
    }
  }
}
function ExtractTextPlugin (dev = true) {
  return new MiniCssExtractPlugin({
    filename: dev ? '[name].css' : 'css/' + '[name].css',
    chunkFilename: dev ? '[name].css' : 'css/' + '[name].[hash:8].css',
    allChunks: true,
    ignoreOrder: true
  })
}
module.exports = {
  getMiniCssExtractLoaderConfig,
  MiniCssExtractPlugin,
  getCssLoaderConfig,
  getPostCssLoaderConfig,
  getStyleLoaderConfig,
  getImageLoaderConfig,
  getFileLoaderConfig,
  ExtractTextPlugin
}
