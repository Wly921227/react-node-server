import React, {Component} from 'react'

class Demo extends Component {

    interval = 0

    constructor(props) {
        super(props)
        this.state = {
            name: 'Hallo World'
        }
    }

    componentWillMount() {
        console.log('will mount')
        this.state.name = this.state.name + '!!!'
        this.setState(this.state)
    }

    componentDidMount() {
        console.log('did mount')
        this.state.name = this.state.name + '--> time: '
        this.state.num = 0
        this.interval = setInterval(() => {
            this.state.num++
            this.setState(this.state)
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let {
            name,
            num
        } = this.state || {}

        return <div className="demo">
            React Demo page, {name} {num ? num : ''}
        </div>
    }

}

export default Demo