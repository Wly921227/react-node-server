import 'babel-polyfill'
import path from 'path'
import express from 'express'
import helmet from 'helmet'

import app from './app'
import clientRoute from './middlewares/clientRoute'

const port = process.env.port || 3030

// view engine setup
app.set('views', path.join(__dirname, '../dist/views'))
app.set('view engine', 'ejs')
app.use(helmet())
app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '../dist/client')))

app.use(clientRoute)
app.listen(port)
console.log(`\n==>  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
