const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
// const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    // new webpack.DefinePlugin({
    //   'process.env.SQUARE_APP_ID': JSON.stringify(process.env.SQUARE_APP_ID),
    //   'process.env.SQUARE_LOCATION_ID': JSON.stringify(
    //     process.env.SQUARE_LOCATION_ID
    //   ),
    //   'process.env.SERVER_URL': JSON.stringify('http://127.0.0.1:3000'),
    // }),
  ],
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    https: {
      key: fs.readFileSync('./127.0.0.1-key.pem'),
      cert: fs.readFileSync('./127.0.0.1.pem'),
    },
    host: '127.0.0.1',
  },
};
