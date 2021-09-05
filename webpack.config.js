const path = require('path');
const webpack = require('webpack');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: false,
  context: __dirname,
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false
    }
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  plugins: [
    // GASにBufferが含まれていないので含める必要がある
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new GasPlugin()
  ]
};
