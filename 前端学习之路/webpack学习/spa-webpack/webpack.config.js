const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const path = require('path');
const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          // options: {
          //   modules: {
          //     localIdentName: 'purify_[hash:base64:5]'
          //   }
          // }
        }
      ]
      }
    ]
  },
  plugins: [
    new WebpackDeepScopeAnalysisPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, './src/index.html'))
    })
  ]
}
module.exports = webpackConfig
