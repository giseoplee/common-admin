const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outputDirectory = path.join(__dirname, '..', 'dist');

module.exports = {
  entry: {
    index : ['babel-polyfill', './src/client/index.js']
  },
  output: {
    path: outputDirectory,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      '/auth': 'http://localhost:9090',
      '/bot': 'http://localhost:9090'
    }
  },
  devtool: 'inline-source-map',
  // mode: 'development',
  plugins: [
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      // inject: true,
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true
      // },
      template: './public/index.html',
      favicon: './public/lotte_logo.png'
    })
  ]
};
