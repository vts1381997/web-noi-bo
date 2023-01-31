const webpack = require('webpack')
const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router',
            'axios',
        ],
        redux: [
            'redux',
            'redux-thunk',
            'react-redux',
            'react-router-redux',
        ],
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, './src/resource/dll'),
        library: '[name]_[hash]',
        publicPath: '/'
    },
    performance: {
        maxEntrypointSize: 5000000,
        maxAssetSize: 5000000
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: true,
        }),
        new CleanWebpackPlugin({
            root: path.join(__dirname, './src/resource/dll'),
            verbose: false,
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, './src/resource/dll', '[name].manifest.json'),
            name: '[name]_[hash]',
            context: __dirname
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
    ]
};