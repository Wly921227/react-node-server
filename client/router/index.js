import React from 'react'
import {Router, hashHistory} from 'react-router'

import config from './config'

class Route extends React.Component {
    render() {
        return <Router routes={config} history={hashHistory}>
        </Router>
    }
}

export default Route