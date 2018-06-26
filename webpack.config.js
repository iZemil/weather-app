const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  devtool: 'inline',

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['public'], { root: path.resolve(__dirname, ''), verbose: true }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
