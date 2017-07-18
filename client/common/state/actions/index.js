import DemoTodo from './demo'
import {bindActionCreators} from 'redux'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            DemoTodo: bindActionCreators(DemoTodo, dispatch)
        }
    }
}

export default mapDispatchToProps