const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '/src/SortableTable.js')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  devtool: 'none',
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new ExtractTextPlugin("tableStyles.css", {
        allChunks: true
    }),
  ],
}
