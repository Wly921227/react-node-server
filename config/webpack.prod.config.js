const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`

            return externals
        }, {})
}

let clientConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
        bundle: './client',
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'lodash'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less!autoprefixer?browsers=last 2 version&remove=false')
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                loader: 'url?limit=8192&name=images/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(html|ejs)$/,
                loader: 'html?minimize=false'
            }
        ]
    },
    postcss: [autoprefixer({browsers: ['> 5%']})],
    resolve: {extensions: ['', '.js', '.json', '.less']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            names: ['vendor', 'manifest'],
            filename: 'js/[name].[hash].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            filename: '../views/index.ejs',
            template: './views/template/index.tpl.ejs',
            favicon: './client/images/favicon.ico',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'none'
        }),
        new ExtractTextPlugin('css/bundle.[hash].css', {allChunks: true})
    ]
}

let serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {server: './server/server.prod'},
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'js/[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.less$/,
                loader: 'css!less'
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                loader: 'url?limit=8192&name=images/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    externals: getExternals(),
    resolve: {extensions: ['', '.js', '.json', '.less']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    ]
}

module.exports = [clientConfig, serverConfig]
