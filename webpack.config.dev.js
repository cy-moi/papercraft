const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const config = {
  mode: 'development',
  entry: './src/index.js',
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, './src/assets'),
    contentBasePublicPath: '/assets'
  },
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
    new webpack.DefinePlugin({
      ENV: JSON.stringify('dev'),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' }),
    // new BundleAnalyzerPlugin()
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     maxInitialRequests: 5,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //         priority: -9
  //       },
  //     }
  //   }
  // },
};

// const speedMeasure = new SpeedMeasurePlugin();
// module.exports = speedMeasure.wrap(config)

module.exports = config
