import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import Demo from '../../client/pages/demo'

const router = express.Router()

router.get('/', function (req, res) {

    const html = renderToString(<Demo/>)

    res.render('index.ejs', {
        root: html
    })
})

module.exports = router