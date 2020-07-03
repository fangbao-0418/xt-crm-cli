const yParser = require('yargs-parser')
const args = yParser(process.argv.slice(3))
const port = args.port || '3001'
const entry = args.entry || ''
module.exports = {
  port,
  entry
}
