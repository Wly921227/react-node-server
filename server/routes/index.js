import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import Route from '../../client/router'

const router = express.Router()

router.get('/', function (req, res) {
    // TODO 请求接口
})

module.exports = router