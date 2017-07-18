import {DemoFilter} from '../constants'

const DemoTodo = {
    addNum({...params}) {
        return {type: DemoFilter.ADD_NUM, ...params}
    },
    clearNum({...params}) {
        return {type: DemoFilter.CLEAR_NUM, ...params}
    },
    setDemoName({...params}) {
        return {type: DemoFilter.SET_NAME, ...params}
    }
}

export default DemoTodo