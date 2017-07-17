import React from 'react'
import {renderToString} from 'react-dom/server'
import {
    match,
    RouterContext
} from 'react-router'

import config from '../../client/router/config'

const clientRoute = function (req, res, next) {
    match({
        routes: config,
        location: req.url
    }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.send(500, error.message)
        } else if (redirectLocation) {
            // res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            const html = renderToString(
                <RouterContext {...renderProps}/>
            )

            res.render('index', {
                root: html
            })
        } else {
            next()
        }
    })
}

module.exports = clientRoute