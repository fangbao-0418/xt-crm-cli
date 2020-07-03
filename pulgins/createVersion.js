/*
 * @Date: 2020-05-15 18:46:20
 * @LastEditors: fangbao
 * @LastEditTime: 2020-05-16 11:24:15
 * @FilePath: /eslint-plugin-xt-react/Users/fangbao/Documents/xituan/xt-cli/pulgins/createVersion.js
 */
function CreateVersionPlugin (options) {
  this.options = options
}

CreateVersionPlugin.prototype.apply = function (compiler) {
  const options = this.options
  console.log(options)
  compiler.plugin('emit', function (compilation, callback) {
    // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
    const content = JSON.stringify(options)
    compilation.assets.version = {
      source: function () {
        return content
      },
      size: function () {
        return content.length
      }
    }

    callback()
  })
}

module.exports = CreateVersionPlugin
