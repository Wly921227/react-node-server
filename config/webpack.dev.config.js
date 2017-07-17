const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, '../'),
    devtool: 'eval-source-map',
    entry: {
        vendor: ['react', 'react-dom', 'react-router'],
        main: [
            './client/main',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'common': './common',
            'images': './images',
            'pages': './pages'
        },
        extensions: ['', '.js', '.json', '.less', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.less$/,
                exclude: /(node_modules)/,
                loaders: [
                    'style',
                    'css',
                    'less'
                ]
            },
            {
                test: /\.css/,
                exclude: /(node_modules)/,
                loaders: [
                    'style',
                    'css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]'
                ]
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                loader: 'url?limit=1000'
            },
            {
                test: /\.(html|ejs)$/,
                loader: 'html?minimize=false'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'common'],
            filename: '[name].js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            inject: true,
            filename: '../views/dev/index.ejs',
            template: './views/template/index.tpl.ejs',
            favicon: './client/images/favicon.ico'
        }),
        new ProgressBarPlugin({summary: false})
    ]
}