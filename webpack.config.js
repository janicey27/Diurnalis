const path = require('path');
const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
const outputDir = path.resolve(__dirname, 'client', 'dist');

const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', entryFile],
  output: {
    publicPath:"/",
    filename: 'bundle.js',
    path: outputDir
  },
  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './client/dist',
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000'
    }
  }
};