import React from 'react'
import {renderToString} from 'react-dom/server'
import {
    match,
    RouterContext
} from 'react-router'
import {
    Provider
} from 'react-redux'

import config from '../../client/router/config'
import configureStore from '../../client/common/state/store'

const clientRoute = function (req, res, next) {
    console.log(req.url)
    match({
        routes: config,
        location: req.url
    }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.send(500, error.message)
        } else if (redirectLocation) {
            // res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            const store = configureStore({DemoState: {name: 'from server 123', num: 10}})

            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps}/>
                </Provider>
            )

            res.render('index', {
                root: html,
                state: store.getState()
            })
        } else {
            next()
        }
    })
}

module.exports = clientRoute