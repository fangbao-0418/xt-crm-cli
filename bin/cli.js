#!/usr/bin/env node

var program = require('commander')
var version = require('../package.json').version
program.version(version, '-v, --version', 'output the version number');

program.command('start', 'start named service', {executableFile: 'xtreact-start'})

program.command('build', 'build the project', {executableFile: 'xtreact-build'})

program.parse(process.argv)

