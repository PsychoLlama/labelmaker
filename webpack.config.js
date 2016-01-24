/*jslint node: true*/

var webpack = require('webpack');
module.exports = {
  entry: './index.js',
  output: {
    path: './',
    filename: 'tag.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
};
