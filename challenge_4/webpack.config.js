const webpack = require('webpack');
const path = require('path');


const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');


var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
    resolve: {
    extensions: ['.js', '.jsx'],  
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: __dirname + '/node_modules/',
        loader: 'babel-loader'
      },
    ],
  }
};

module.exports = config;