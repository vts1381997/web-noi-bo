const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
    entry: {
        client: resolve('./src/index.js'),
    },
    output: {
        path: resolve('./dist'),
        filename: '[name].[hash:4].js',
        chunkFilename: 'chunks/[name].[hash:4].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@src': path.join(__dirname, './src'),
            '@app': path.join(__dirname, './src/App.js'),
            '@util': path.join(__dirname, './src/utils'),
            '@actions': path.join(__dirname, './src/redux/actions'),
            '@reducers': path.join(__dirname, './src/redux/reducers'),
            '@redux' : path.join(__dirname, './src/redux'),
            '@constants': path.join(__dirname, './src/redux/constants'),
            '@apis': path.join(__dirname, './src/apis'),
            '@components': path.join(__dirname, './src/components'),
            '@configs': path.join(__dirname, './src/configs'),
            '@config': path.join(__dirname, './src/configs/config.js'),
            '@reg': path.join(__dirname, './src/configs/regular.config.js'),
            '@images': path.join(__dirname, './src/images'),
            '@pages': path.join(__dirname, './src/components/pages'),
            '@styles': path.join(__dirname, './src/styles'),
        },
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                include: [resolve('./src')],

                loaders: [

                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: [
                                "@babel/preset-react", ["@babel/preset-env", { modules: false }],
                            ],
                        }
                    },


                    // Webpack 2+ "options" object instead of "query"
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react', ["@babel/preset-env", { modules: false }], ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                // exclude: /node_modules/,
                include: [
                    resolve('./src/styles'),
                    resolve('./src/component'),
                    resolve('./node_modules/antd'),
                    resolve('./node_modules/draft-js'),
                ],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style',
                    use: [{
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {

                            javascriptEnabled: true,
                        },
                    }],
                }),

            },
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                loader: ExtractTextPlugin.extract({
                    fallback: 'style',
                    use: [{
                        loader: 'css-loader',

                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true,
                        },
                    }],
                }),
                // ... other settings
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                include: [resolve('./src/images')],
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[hash:4].[ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'font/[name].[hash:4].[ext]'
                }
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minChunks: 3
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader',
                // here you configure babel:
                options: { babelrc: true, cacheDirectory: true }
            }],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new HappyPack({
            id: 'happyStyle',
            loaders: ['css-loader?sourceMap=true', 'less-loader?sourceMap=true'],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new ExtractTextPlugin('style.[hash:4].css'),


        new webpack.DllReferencePlugin({
            manifest: require('./src/resource/dll/vendor.manifest.json'),
            context: __dirname,
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./src/resource/dll/redux.manifest.json'),
            context: __dirname,
        }),

    ]
}

module.exports = webpackConfigBase