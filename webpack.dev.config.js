
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const PORT = 3069
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.PORT' : JSON.stringify(PORT),
      IS_DEVELOPMETN: true,
    }),
    new HtmlWebpackPlugin({
      template: resolve('./index.html'),
      dlls: [
        '/resource/dll/vendor.dll.js', 
        '/resource/dll/redux.dll.js',
      ],
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/`,
    }),

  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('./src'),
    historyApiFallback: true,
    hot: false,
    host: 'localhost',
    port: PORT,
  }
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
