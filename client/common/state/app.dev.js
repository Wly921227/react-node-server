import React, {Component} from 'react'
import DevTools from './devTools'
import Common from './app'

class App extends Component {
    constructor() {
        super()
        this.state = {isMounted: false}
    }

    componentDidMount() {
        this.setState({isMounted: true})
        console.log('Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.')
    }

    render() {
        const {isMounted} = this.state
        const {children} = this.props

        return (
            <div>
                <Common>{children}</Common>
                {isMounted && <DevTools/>}
            </div>
        )
    }
}

export default App
