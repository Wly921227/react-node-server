import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import Route from '../../client/router'

const router = express.Router()

router.get('/', function (req, res) {

    const html = renderToString(<Route/>)

    res.render('index.ejs', {
        root: html
    })
})

module.exports = router