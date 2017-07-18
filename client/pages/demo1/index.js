import React, {Component} from 'react'

const image = require('../../images/shengrenhui.jpg')

class Demo1 extends Component {

    render() {

        return <div className="demo">
            React Demo page one
            <img src={image}/>
        </div>
    }

}

export default Demo1