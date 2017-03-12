/* eslint-env node */
const { resolve }  =  require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader' },
    ]
  },
  postcss: function() {
    return [autoprefixer];
  }
}
