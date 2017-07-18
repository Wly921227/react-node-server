import './style.less'
import React, {Component} from 'react'

class Demo extends Component {

    interval = 0

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log('will mount')
    }

    componentDidMount() {
        const {
            DemoTodo
        } = this.props.actions
        console.log('did mount')
        this.interval = setInterval(() => {
            DemoTodo.addNum()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const {
            DemoState
        } = this.props

        const {
            DemoTodo
        } = this.props.actions

        return <div className="demo">
            <div>
                <button onClick={() => DemoTodo.clearNum()}>清零</button>
            </div>
            React Demo page, {DemoState.name} --> time: {DemoState.num}
        </div>
    }

}

export default Demo