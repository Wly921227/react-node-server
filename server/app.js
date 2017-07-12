import express from 'express'
import logger from 'morgan'

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(logger())
} else {
    app.use(logger('dev'))
}

module.exports = app