const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(gif|png|jpe?g|svg|xml|wav)$/i,
      //   use: "file-loader"
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prd'),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' }),
    new CopyPlugin([
      {
        from: './src/assets',
        to: './assets'
      }
    ])
  ],
  output: {
    // filename: `${getAppName()}/[name].bundle.[hash:8].js`,
    filename: 'nomanland.bundle.js',
    path: path.resolve(__dirname, './public'),
    // publicPath: '/',
  },
};
