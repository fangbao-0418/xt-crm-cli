module.exports = ({ file, options, env }) => {
  return ({
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009'
      },
      'postcss-csso': options.env === 'production' ? {} : false
    }
  })
}
