// Provide custom regenerator runtime and core-js
require('babel-polyfill')

// Node babel source map support
require('source-map-support').install()

// Javascript require hook
require('babel-register')({
    presets: ['es2015', 'stage-0'],
    plugins: ['add-module-exports']
})

const path = require('path')
const app = require('../server/app')
const port = process.env.port || 3000

// view engine setup
app.set('views', path.join(__dirname, '../views/dev'))
app.set('view engine', 'ejs')

app.use('/', require('../server/routes/index'))

console.log(`\n==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)

app.listen(port)
