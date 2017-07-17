// Provide custom regenerator runtime and core-js
require('babel-polyfill')

// Node babel source map support
require('source-map-support').install()

// Javascript require hook
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
})


// Css require hook
// const lessParser = require('postcss-less').parse
// require('css-modules-require-hook')({
//     extensions: ['.less'],
//     processorOpts: {parser: lessParser},
//     generateScopedName: '[name]__[local]__[hash:base64:8]'
// })
// 忽略less文件，
const Module = require('module')
Module._extensions['.less'] = (module, fn) => ''

const fs = require('fs')
const path = require('path')
const app = require('../server/app')
const port = process.env.port || 3000
// server middlewares
const clientRoute = require('../server/middlewares/clientRoute')
// React page
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const config = require('../config/webpack.dev.config')

const compiler = webpack(config)

// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data

    Object.keys(assets).forEach(key => {
        if (key.match(/\.ejs/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

// view engine setup
app.set('views', path.join(__dirname, '../views/dev'))
app.set('view engine', 'ejs')

app.use(clientRoute)
// server route
// app.use('/', require('../server/routes/index'))
app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        chunks: false,
        hash: false,
        colors: true
    }
}))
app.use(hotMiddleware(compiler))
console.log(`\n==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)

app.listen(port)
