import React, {Children, Component, cloneElement} from 'react'
import {connect} from 'react-redux'
import mapDispatchToProps from './actions'

require('../style.less')

class Main extends Component {
    constructor() {
        super()
    }

    render() {
        const {children, ...props} = this.props

        return (
            <div>
                {Children.map(children, child =>
                    cloneElement(child, {...props})
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)
