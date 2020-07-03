'use strict';
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp (relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appPath: resolveApp('.'),
  appDist: resolveApp('dist'),
  webpack: resolveApp('webpack.config.js')
};
