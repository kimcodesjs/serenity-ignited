const path = require('path');
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
    //   'process.env.SERVER_URL': JSON.stringify(
    //     'https://serenity-ignited.onrender.com'
    //   ),
    // }),
  ],
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
};
