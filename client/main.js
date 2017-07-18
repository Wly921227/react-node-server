import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import routes from './router/config'
import {Router, match, browserHistory} from 'react-router'
import configureStore from './common/state/store'

const store = configureStore(window.REDUX_STATE)

match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router {...renderProps}/>
        </Provider>,
        document.getElementById('main')
    )
})
