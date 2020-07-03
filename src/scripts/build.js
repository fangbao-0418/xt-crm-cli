'use strict'
var path = require('path');
var rm = require('rimraf');
var webpack = require('webpack');
var chalk = require('chalk');

const program = require('commander')
program
  .option('-e, --entry <entry>', 'specified entry of app')
  .option('-d, --out-dir <out>', 'specified out dir of app')
program.parse(process.argv)
const entry = program.entry || ''
const outdir = program.outDir || ''
var webpackConfig = require('../../config/webpack/prod.config')({
  outdir,
  entry
}); 

var __cwd = process.cwd();
function callback (err, stats) {
  if (err && !stats) {
    console.error(chalk.red(err))
    return
  }
  process.stdout.write(stats.toJson({
    cached: true,
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  const info = stats.toJson()
  if (stats.hasWarnings()) {
    console.warn(chalk.yellow(info.warnings))
  }
  if (err || stats.hasErrors()) {
    console.error(chalk.red(info.errors))
  } else {
    console.log(stats.toString({
      chunks: false, // 使构建过程更静默无输出
      colors: true // 在控制台展示颜色
    }))
    console.log(chalk.green('[ok] Builded with successful'));
  }
}
rm(path.resolve(__cwd, 'deploy/dist/*'), function (err) {
  if (err) throw err
  var compiler = webpack(webpackConfig);
  compiler.run(callback);
})
