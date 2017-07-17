import React, {Component} from 'react'

class App extends Component {
    render() {
        return <div className="app">
            {this.props.children}
        </div>
    }
}

module.exports = App