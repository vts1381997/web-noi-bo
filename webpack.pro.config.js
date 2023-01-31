const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
    output: {
        publicPath: './',
    },
    performance: {
        maxEntrypointSize: 5000000,
        maxAssetSize: 5000000
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: false,
        }),
        new HtmlWebpackPlugin({
            template: resolve('./src/index.html'),

            dlls: [
                './resource/dll/vendor.dll.js',
                './resource/dll/redux.dll.js',
            ],
        }),

        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),

        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
        new Copy([
            { from: './src/resource/dll', to: './resource/dll' },
        ]),
        new CleanWebpackPlugin({
            root: path.join(__dirname, './'),
            verbose: false,
        }),
    ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)